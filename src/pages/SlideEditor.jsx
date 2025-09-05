import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import pptxgen from 'pptxgenjs';
import { v4 as uuidv4 } from 'uuid';
import RevealPreview from './RevealPreview'; // Import RevealPreview
import { themeNames, themeComponents, pptxThemeStyles } from '../utils/themes';
import SlideSidebar from '../components/SlideSidebar';
import TopBar from '../components/TopBar';
import SlideToolbar from '../components/SlideToolbar';
import FloatingAddButtons from '../components/FloatingAddButtons';
import SlideCanvas from '../components/SlideCanvas';
import DraggableBlock from '../components/DraggableBlock';
import AssetPicker from '../components/AssetPicker';
import LocalImageModal from '../components/LocalImageModal';

export default function SlideEditor({ initialSlides, selectedTemplate, onBack }) {
  // Local image modal state
  const [showLocalImageModal, setShowLocalImageModal] = useState(false);
  const [localImages, setLocalImages] = useState([]);

  const [slides, setSlides] = useState(initialSlides || []);
  const [current, setCurrent] = useState(0);
  const [author, setAuthor] = useState('Ernest Lorenzo');
  const [showReveal, setShowReveal] = useState(false);
  const fileInputRef = useRef();

  // --- Editing/Toolbar/Drag state ---
  const [editingIdx, setEditingIdx] = useState(null); // index of block being edited
  const [showToolbar, setShowToolbar] = useState(false);
  const [editorValue, setEditorValue] = useState('');
  const [toolbarState, setToolbarState] = useState({
    fontFamily: 'Arial',
    fontSize: 32,
    color: '#222',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textDecoration: 'none',
  });

  // Asset Picker state
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  // Handle double-click to start editing
  const handleTextDoubleClick = (idx, comp) => {
    setEditingIdx(idx);
    setShowToolbar(true);
    setEditorValue(comp.content);
    setToolbarState({
      fontFamily: comp.fontFamily,
      fontSize: comp.fontSize,
      color: comp.color,
      fontWeight: comp.fontWeight,
      fontStyle: comp.fontStyle,
      textDecoration: comp.textDecoration,
    });
  };

  // Apply toolbar changes to block
  const applyToolbarToBlock = (key, value) => {
    setToolbarState(state => ({ ...state, [key]: value }));
    handleFontChange(editingIdx, key, value);
  };

  // Save edited text
  const saveEdit = () => {
    handleTextChange(editingIdx, editorValue);
    setEditingIdx(null);
    setShowToolbar(false);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIdx(null);
    setShowToolbar(false);
  };

  // Remove block from toolbar
  const deleteEditingBlock = () => {
    removeComponent(editingIdx);
    setEditingIdx(null);
    setShowToolbar(false);
  };

  // Download ALL slides as PDF
  const downloadAsPDF = async () => {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [960, 540] });
    const originalCurrent = current;
    for (let i = 0; i < slides.length; i++) {
      setCurrent(i);
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvasEl = document.querySelector('.bg-\\[\\#F6F5EF\\]');
      if (!canvasEl) continue;
      const canvas = await html2canvas(canvasEl, { backgroundColor: null, useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      if (i === 0) {
        pdf.addImage(imgData, 'PNG', 0, 0, 960, 540);
      } else {
        pdf.addPage([960, 540], 'landscape');
        pdf.addImage(imgData, 'PNG', 0, 0, 960, 540);
      }
    }
    setCurrent(originalCurrent);
    pdf.save('presentation.pdf');
  };

  // Export all slides as images in PPTX
  const exportSlidesAsImagesPPTX = async () => {
    const pptx = new pptxgen();
    const originalCurrent = current;
    for (let i = 0; i < slides.length; i++) {
      setCurrent(i); // Render each slide
      // Wait for UI update
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvasEl = document.querySelector('.bg-\\[\\#F6F5EF\\]');
      if (!canvasEl) continue;
      const canvas = await html2canvas(canvasEl, { backgroundColor: null, useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const slide = pptx.addSlide();
      slide.addImage({ data: imgData, x: 0, y: 0, w: 10, h: 5.625 }); // 16:9 ratio
    }
    setCurrent(originalCurrent);
    pptx.writeFile('slides-as-images.pptx');
  };

  // Add new slide
  const addSlide = () => setSlides([...slides, { id: uuidv4(), components: [] }]);
  // Duplicate slide
  const duplicateSlide = () => setSlides([...slides, { ...slides[current], id: uuidv4() }]);
  // Delete slide
  const deleteSlide = () => {
    if (slides.length === 1) return;
    const newSlides = slides.filter((_, idx) => idx !== current);
    setSlides(newSlides);
    setCurrent(Math.max(0, current - 1));
  };
  // Edit text inline
  const handleTextChange = (compIdx, value) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? { ...c, content: value } : c)
    } : slide));
  };

  // Font controls for text blocks
  const handleFontChange = (compIdx, key, value) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? { ...c, [key]: value } : c)
    } : slide));
  };
  // Add Title/Paragraph/Image (stacked, no overlap, clean)
  const addComponent = type => {
    setSlides(slides => slides.map((slide, idx) => {
      if (idx !== current) return slide;
      // Find the lowest y + h among existing blocks
      let y = 60; // Start below description
      if (slide.components.length > 0) {
        const last = slide.components.reduce((a, b) => (a.y + a.h > b.y + b.h ? a : b));
        y = last.y + last.h + 24;
      }
      let w = 400, h = 60;
      if (type === 'image') { w = 320; h = 180; }
      return {
        ...slide,
        components: [
          ...slide.components,
          {
            id: uuidv4(),
            type,
            content: type === 'image' ? '' : '',
            x: (960 - w) / 2,
            y,
            w,
            h,
            fontSize: type === 'title' ? 36 : 20,
            fontFamily: 'Arial',
            fontWeight: type === 'title' ? 'bold' : 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            color: type === 'title' ? '#222' : '#444',
          }
        ]
      };
    }));
  };
  // Remove block
  const removeComponent = idx => {
    setSlides(slides => slides.map((slide, sidx) => sidx === current ? {
      ...slide,
      components: slide.components.filter((_, i) => i !== idx)
    } : slide));
  };
  // Drag block
  const handleBlockDragEnd = (id, event) => {
    if (!event.delta) return;
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map(comp => comp.id === id ? {
        ...comp,
        x: (comp.x || 0) + event.delta.x,
        y: (comp.y || 0) + event.delta.y
      } : comp)
    } : slide));
  };
  // Handle image upload
  const handleImageUpload = (compIdx, file) => {
    const reader = new FileReader();
    reader.onload = e => {
      setSlides(slides => slides.map((slide, idx) => idx === current ? {
        ...slide,
        components: slide.components.map((c, i) => i === compIdx ? { ...c, content: e.target.result } : c)
      } : slide));
    };
    reader.readAsDataURL(file);
  };

  // Handle AI generated image
  const handleAIImageGenerated = (generatedImage) => {
    console.log('🎨 AI Image Generated:', generatedImage);
    
    // Add the generated image as a new image component to the current slide
    setSlides(slides => slides.map((slide, idx) => {
      if (idx !== current) return slide;
      
      // Find the lowest y + h among existing blocks
      let y = 60;
      if (slide.components.length > 0) {
        const last = slide.components.reduce((a, b) => (a.y + a.h > b.y + a.h ? a : b));
        y = last.y + last.h + 24;
      }
      
      let w = 320, h = 180;
      const newImageComponent = {
        id: uuidv4(),
        type: 'image',
        content: generatedImage.url,
        x: (960 - w) / 2,
        y,
        w,
        h,
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#444',
      };
      
      console.log('🖼️ Adding new image component:', newImageComponent);
      
      return {
        ...slide,
        components: [
          ...slide.components,
          newImageComponent
        ]
      };
    }));
    
    console.log('✅ Image component added to slide');
  };
  // PPTX theme style mapping for all 20 themes
  const pptxThemeStyles = {
    'Classic Classroom': {
      bgColor: 'F8F4E3',
      title: { fontSize: 36, color: '3B2F2F', bold: true, fontFace: 'Arial Black' },
      paragraph: { fontSize: 20, color: '3B2F2F', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'STEM Modern': {
      bgColor: 'E3F6FD',
      title: { fontSize: 36, color: '0D47A1', bold: true, fontFace: 'Calibri' },
      paragraph: { fontSize: 20, color: '1976D2', fontFace: 'Calibri' },
      author: { fontSize: 14, color: '888888', fontFace: 'Calibri' }
    },
    'Playful Primary': {
      bgColor: 'FFF9C4',
      title: { fontSize: 36, color: 'F57C00', bold: true, fontFace: 'Comic Sans MS' },
      paragraph: { fontSize: 20, color: 'F57C00', fontFace: 'Comic Sans MS' },
      author: { fontSize: 14, color: '888888', fontFace: 'Comic Sans MS' }
    },
    'Academic Minimal': {
      bgColor: 'FFFFFF',
      title: { fontSize: 36, color: '222222', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: '333333', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'Scholarly Elegant': {
      bgColor: 'F3E5F5',
      title: { fontSize: 36, color: '6A1B9A', bold: true, fontFace: 'Georgia' },
      paragraph: { fontSize: 20, color: '6A1B9A', fontFace: 'Georgia' },
      author: { fontSize: 14, color: '888888', fontFace: 'Georgia' }
    },
    'Digital Chalkboard': {
      bgColor: '263238',
      title: { fontSize: 36, color: 'A5D6A7', bold: true, fontFace: 'Courier New' },
      paragraph: { fontSize: 20, color: 'A5D6A7', fontFace: 'Courier New' },
      author: { fontSize: 14, color: 'B0BEC5', fontFace: 'Courier New' }
    },
    'Science Spectrum': {
      bgColor: 'E0F7FA',
      title: { fontSize: 36, color: '0288D1', bold: true, fontFace: 'Trebuchet MS' },
      paragraph: { fontSize: 20, color: '0288D1', fontFace: 'Trebuchet MS' },
      author: { fontSize: 14, color: '888888', fontFace: 'Trebuchet MS' }
    },
    'History Heritage': {
      bgColor: 'FFF8E1',
      title: { fontSize: 36, color: 'BCA678', bold: true, fontFace: 'Times New Roman' },
      paragraph: { fontSize: 20, color: 'BCA678', fontFace: 'Times New Roman' },
      author: { fontSize: 14, color: '888888', fontFace: 'Times New Roman' }
    },
    'Art Studio': {
      bgColor: 'F8BBD0',
      title: { fontSize: 36, color: '6A1B9A', bold: true, fontFace: 'Brush Script MT' },
      paragraph: { fontSize: 20, color: '6A1B9A', fontFace: 'Brush Script MT' },
      author: { fontSize: 14, color: '888888', fontFace: 'Brush Script MT' }
    },
    'Math Matrix': {
      bgColor: 'E3F2FD',
      title: { fontSize: 36, color: '1565C0', bold: true, fontFace: 'Consolas' },
      paragraph: { fontSize: 20, color: '1565C0', fontFace: 'Consolas' },
      author: { fontSize: 14, color: '888888', fontFace: 'Consolas' }
    },
    'Language Lab': {
      bgColor: 'FFE0B2',
      title: { fontSize: 36, color: 'E65100', bold: true, fontFace: 'Verdana' },
      paragraph: { fontSize: 20, color: 'E65100', fontFace: 'Verdana' },
      author: { fontSize: 14, color: '888888', fontFace: 'Verdana' }
    },
    'Tech Trends': {
      bgColor: '263238',
      title: { fontSize: 36, color: '00B8D4', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: '00B8D4', fontFace: 'Arial' },
      author: { fontSize: 14, color: 'B0BEC5', fontFace: 'Arial' }
    },
    'Research Ready': {
      bgColor: 'F5F5F5',
      title: { fontSize: 36, color: '263238', bold: true, fontFace: 'Georgia' },
      paragraph: { fontSize: 20, color: '263238', fontFace: 'Georgia' },
      author: { fontSize: 14, color: '888888', fontFace: 'Georgia' }
    },
    'Creative Canvas': {
      bgColor: 'FFFDE7',
      title: { fontSize: 36, color: 'F06292', bold: true, fontFace: 'Comic Sans MS' },
      paragraph: { fontSize: 20, color: 'F06292', fontFace: 'Comic Sans MS' },
      author: { fontSize: 14, color: '888888', fontFace: 'Comic Sans MS' }
    },
    'Youthful Yellow': {
      bgColor: 'FFFDE7',
      title: { fontSize: 36, color: 'FFEB3B', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: 'FBC02D', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'Calm Cyan': {
      bgColor: 'E0F7FA',
      title: { fontSize: 36, color: '00ACC1', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: '00ACC1', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'Scholar Green': {
      bgColor: 'E8F5E9',
      title: { fontSize: 36, color: '388E3C', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: '388E3C', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'Vibrant Violet': {
      bgColor: 'E1BEE7',
      title: { fontSize: 36, color: '8E24AA', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: '8E24AA', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'Orange Orbit': {
      bgColor: 'FFE0B2',
      title: { fontSize: 36, color: 'FF6F00', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: 'FF6F00', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
    'Blue Horizon': {
      bgColor: 'E3F2FD',
      title: { fontSize: 36, color: '1976D2', bold: true, fontFace: 'Arial' },
      paragraph: { fontSize: 20, color: '1976D2', fontFace: 'Arial' },
      author: { fontSize: 14, color: '888888', fontFace: 'Arial' }
    },
  };

  // Export to PDF (replaces previous pptx export)
  const exportPptx = async () => {
    await downloadAsPDF();
  };

  // Render thumbnail for sidebar
  const renderThumb = slide => {
    const title = slide.components.find(c => c.type === 'title');
    return (
      <div className="w-full h-16 bg-white rounded border border-neutral-200 shadow flex flex-col justify-center px-2 overflow-hidden">
        <span className="text-xs font-bold truncate text-purple-700">{title ? title.content : 'Untitled'}</span>
      </div>
    );
  };

  // Modern, glassy, big canvas
  // Render main canvas using selected theme
  const Theme = themeComponents[selectedTemplate] || ClassicClassroom;
  const currentSlide = slides[current] || { components: [] };
  const renderThemedSlide = () => {
    // Only show author on first slide
    const isFirstSlide = current === 0;
    // If only one component, try to match TitleSlide/ImageSlide/ContentSlide
    if (currentSlide.components.length === 1) {
      const comp = currentSlide.components[0];
      if (comp.type === 'title') return <Theme.TitleSlide title={comp.content} subtitle={isFirstSlide ? author : ''} />;
      if (comp.type === 'image') return <Theme.ImageSlide title={isFirstSlide ? author : ''} imageUrl={comp.content} />;
      if (comp.type === 'paragraph') return <Theme.ContentSlide title={isFirstSlide ? author : ''} content={comp.content} />;
    }
    // If multiple components, render in order
    return (
      <div className="flex flex-col h-full w-full bg-neutral-900">
        {/* Canva-style top bar */}
        <div className="flex items-center justify-between px-8 py-3 bg-gradient-to-r from-blue-200 to-blue-100 shadow-sm">
          <div className="text-lg font-bold text-gray-700">Slide Editor</div>
          <div className="flex gap-2 ml-auto">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded shadow-lg text-lg" onClick={downloadAsPDF}>
              Export as PDF
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 rounded shadow" onClick={exportSlidesAsImagesPPTX}>Export as Images in PPTX</button>
          </div>
        </div>
        {/* Main editor area */}
        <div className="flex-1 flex flex-col items-center justify-center py-8 relative">
          {/* Centered modern canvas with subtle border/shadow, 16:9 aspect */}
          <div className="relative bg-[#F6F5EF] rounded-lg shadow-2xl border border-gray-300" style={{ width: 960, height: 540, margin: '0 auto' }}>
            {/* Short description section above title */}
            <input
              className="absolute left-1/2 -translate-x-1/2 top-6 w-2/3 bg-transparent border-b-2 border-dashed border-gray-400 text-lg text-gray-700 text-center outline-none placeholder-gray-400"
              placeholder="Add a short description"
              value={currentSlide.description || ''}
              onChange={e => setSlides(slides => slides.map((slide, idx) => idx === current ? { ...slide, description: e.target.value } : slide))}
              maxLength={120}
            />
            {/* Render slide blocks (text/images) */}
            {currentSlide.components.map((comp, idx) => {
              if (comp.type === 'image') {
                return (
                  <div
                    key={comp.id}
                    style={{ position: 'absolute', left: comp.x, top: comp.y, width: comp.w, height: comp.h, zIndex: 1, background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: 10, boxShadow: '0 2px 8px #0002', marginBottom: 8 }}
                    className="group"
                  >
                    {comp.content ? (
                      <img src={comp.content} alt="slide visual" className="w-full h-full object-contain rounded shadow" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 border border-gray-300 rounded">No Image</div>
                    )}
                    <button className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100" onClick={() => removeComponent(idx)}>✕</button>
                  </div>
                );
              }
              // Editable text block (title or paragraph)
              const isEditing = editingIdx === idx;
              return (
                <div
                  key={comp.id}
                  style={{
                    position: 'absolute',
                    left: comp.x,
                    top: comp.y,
                    width: comp.w,
                    minHeight: 40,
                    zIndex: 2,
                    cursor: isEditing ? 'text' : 'move',
                    fontSize: comp.fontSize,
                    fontFamily: comp.fontFamily,
                    fontWeight: comp.fontWeight,
                    fontStyle: comp.fontStyle,
                    textDecoration: comp.textDecoration,
                    color: comp.color,
                    background: '#fff',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: 10,
                    boxShadow: '0 2px 8px #0002',
                    padding: 12,
                    marginBottom: 8,
                  }}
                  className="group"
                  onDoubleClick={() => handleTextDoubleClick(idx, comp)}
                  // Drag logic
                  draggable={!isEditing}
                  onDragStart={e => {
                    e.dataTransfer.setData('text/plain', idx);
                  }}
                  onDragEnd={e => {
                    if (!isEditing) {
                      const rect = e.target.parentNode.getBoundingClientRect();
                      const dx = e.clientX - rect.left;
                      const dy = e.clientY - rect.top;
                      setSlides(slides => slides.map((slide, sidx) => sidx === current ? {
                        ...slide,
                        components: slide.components.map((c, i) => i === idx ? { ...c, x: dx, y: dy } : c)
                      } : slide));
                    }
                  }}
                >
                  {isEditing ? (
                    <textarea
                      value={editorValue}
                      onChange={e => setEditorValue(e.target.value)}
                      className="w-full bg-transparent text-black outline-none resize-none text-lg font-medium"
                      style={{ fontFamily: toolbarState.fontFamily, fontWeight: toolbarState.fontWeight, fontStyle: toolbarState.fontStyle, textDecoration: toolbarState.textDecoration, color: toolbarState.color, fontSize: toolbarState.fontSize }}
                      rows={comp.type === 'title' ? 1 : 3}
                      placeholder={comp.type === 'title' ? 'Title...' : 'Paragraph...'}
                      autoFocus
                      onBlur={saveEdit}
                    />
                  ) : (
                    <div
                      style={{ fontFamily: comp.fontFamily, fontWeight: comp.fontWeight, fontStyle: comp.fontStyle, textDecoration: comp.textDecoration, color: comp.color, fontSize: comp.fontSize }}
                      className="w-full text-black outline-none resize-none text-lg font-medium select-none"
                    >
                      {comp.content}
                    </div>
                  )}
                </div>
              );
            })}
            {/* Floating formatting toolbar */}
            {showToolbar && (
              <div className="fixed left-1/2 top-8 -translate-x-1/2 z-50 flex items-center gap-2 bg-neutral-800/90 rounded-lg py-2 px-4 shadow-xl border border-neutral-600" style={{ minWidth: 420 }}>
                <select value={toolbarState.fontFamily} onChange={e => applyToolbarToBlock('fontFamily', e.target.value)} className="bg-neutral-900 text-white border border-neutral-700 rounded px-2 py-1">
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Comic Sans MS">Comic Sans</option>
                  <option value="Courier New">Courier</option>
                  <option value="Times New Roman">Times</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Trebuchet MS">Trebuchet</option>
                  <option value="Consolas">Consolas</option>
                </select>
                <button className="bg-neutral-700 text-white rounded px-2 text-xl" onClick={() => applyToolbarToBlock('fontSize', Math.max(toolbarState.fontSize - 2, 10))}>-</button>
                <input type="number" min={10} max={120} value={toolbarState.fontSize} onChange={e => applyToolbarToBlock('fontSize', parseInt(e.target.value)||20)} className="w-14 bg-neutral-900 text-white border border-neutral-700 rounded px-1 text-center" />
                <button className="bg-neutral-700 text-white rounded px-2 text-xl" onClick={() => applyToolbarToBlock('fontSize', Math.min(toolbarState.fontSize + 2, 120))}>+</button>
                <input type="color" value={toolbarState.color} onChange={e => applyToolbarToBlock('color', e.target.value)} className="w-7 h-7 border border-neutral-700 rounded" />
                <button onClick={() => applyToolbarToBlock('fontWeight', toolbarState.fontWeight === 'bold' ? 'normal' : 'bold')} className={`rounded px-2 py-1 font-bold ${toolbarState.fontWeight==='bold'?'bg-purple-500 text-white':'bg-neutral-700 text-white'}`}>B</button>
                <button onClick={() => applyToolbarToBlock('fontStyle', toolbarState.fontStyle === 'italic' ? 'normal' : 'italic')} className={`rounded px-2 py-1 italic ${toolbarState.fontStyle==='italic'?'bg-purple-500 text-white':'bg-neutral-700 text-white'}`}>I</button>
                <button onClick={() => applyToolbarToBlock('textDecoration', toolbarState.textDecoration === 'underline' ? 'none' : 'underline')} className={`rounded px-2 py-1 underline ${toolbarState.textDecoration==='underline'?'bg-purple-500 text-white':'bg-neutral-700 text-white'}`}>U</button>
                <button className="rounded px-2 py-1 text-white bg-red-600 ml-2" onClick={deleteEditingBlock}>Delete</button>
                <button className="rounded px-2 py-1 text-white bg-neutral-600 ml-2" onClick={cancelEdit}>Cancel</button>
                <button className="rounded px-2 py-1 text-white bg-green-600 ml-2" onClick={saveEdit}>Save</button>
              </div>
            )}
          </div>
        </div>
        {/* Slide thumbnails at bottom */}
        <div className="flex gap-2 px-8 py-2 bg-neutral-100 border-t border-gray-200 overflow-x-auto">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`w-32 h-20 rounded border-2 ${idx === current ? 'border-blue-500' : 'border-transparent'} shadow cursor-pointer flex flex-col items-center justify-center bg-white/90`}
              onClick={() => setCurrent(idx)}
            >
              <span className="text-xs font-bold truncate text-purple-700 mb-1">{slide.components.find(c => c.type === 'title')?.content || 'Untitled'}</span>
              <div className="w-full h-12 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <SlideSidebar
        slides={slides}
        current={current}
        setCurrent={setCurrent}
        renderThumb={renderThumb}
        addSlide={addSlide}
      />
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <TopBar exportPptx={exportPptx} onBack={onBack} showReveal={showReveal} setShowReveal={setShowReveal} />
        <SlideCanvas
          slides={slides}
          current={current}
          author={author}
          showToolbar={showToolbar}
          toolbarState={toolbarState}
          editingIdx={editingIdx}
          editorValue={editorValue}
          Theme={themeComponents[selectedTemplate] || themeComponents['Classic Classroom']}
          currentSlide={slides[current] || { components: [] }}
          handleBlockDragEnd={handleBlockDragEnd}
          handleTextDoubleClick={handleTextDoubleClick}
          handleTextChange={handleTextChange}
          handleFontChange={handleFontChange}
          removeComponent={removeComponent}
          applyToolbarToBlock={applyToolbarToBlock}
          deleteEditingBlock={deleteEditingBlock}
          cancelEdit={cancelEdit}
          saveEdit={saveEdit}
          addComponent={addComponent}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}

        />
        <div className="flex gap-4 mt-8">
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow" onClick={() => addComponent('title')}>Add Title</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow" onClick={() => addComponent('paragraph')}>Add Paragraph</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow" onClick={() => addComponent('image')}>Add Image</button>
<button className="bg-purple-500 text-white px-4 py-2 rounded shadow" onClick={async () => {
  setShowLocalImageModal(true);
  try {
    const res = await fetch('/api/local-images');
    const data = await res.json();
    setLocalImages(data.images || []);
  } catch {
    setLocalImages([]);
  }
}}>Insert Local Image</button>
          <button className="bg-gray-200 text-purple-700 px-4 py-2 rounded shadow" onClick={duplicateSlide}>Duplicate Slide</button>
          <button className="bg-gray-200 text-red-400 px-4 py-2 rounded shadow" onClick={deleteSlide}>Delete Slide</button>
        </div>
        {/* Reveal.js preview (now live) */}
        {showReveal && (
          <RevealPreview slides={slides} selectedTemplate={selectedTemplate} onClose={() => setShowReveal(false)} />
        )}
      {/* Floating Insert Asset Button */}
      <AssetPicker
        open={showAssetPicker}
        onClose={() => setShowAssetPicker(false)}
        onAIImageGenerated={handleAIImageGenerated}
        onSelect={asset => {
          setShowAssetPicker(false);
          // Add as image block to current slide
          setSlides(slides => slides.map((slide, idx) => {
            if (idx !== current) return slide;
            // Find the lowest y + h among existing blocks
            let y = 60;
            if (slide.components.length > 0) {
              const last = slide.components.reduce((a, b) => (a.y + a.h > b.y + b.h ? a : b));
              y = last.y + last.h + 24;
            }
            let w = 180, h = 180;
            return {
              ...slide,
              components: [
                ...slide.components,
                {
                  id: uuidv4(),
                  type: 'image',
                  content: asset.url,
                  x: (960 - w) / 2,
                  y,
                  w,
                  h,
                  fontSize: 20,
                  fontFamily: 'Arial',
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  textDecoration: 'none',
                  color: '#444',
                }
              ]
            };
          }));
        }}
      />


    {/* Local Image Modal */}
    <LocalImageModal
      open={showLocalImageModal}
      images={localImages}
      onSelect={img => {
        setShowLocalImageModal(false);
        // Insert as image component to current slide
        setSlides(slides => slides.map((slide, idx) => {
          if (idx !== current) return slide;
          // Find the lowest y + h among existing blocks
          let y = 60;
          if (slide.components.length > 0) {
            const last = slide.components.reduce((a, b) => (a.y + a.h > b.y + b.h ? a : b));
            y = last.y + last.h + 24;
          }
          let w = 320, h = 180;
          return {
            ...slide,
            components: [
              ...slide.components,
              {
                id: uuidv4(),
                type: 'image',
                content: img.url,
                x: (960 - w) / 2,
                y,
                w,
                h,
                fontSize: 20,
                fontFamily: 'Arial',
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: 'none',
                color: '#444',
              }
            ]
          };
        }));
      }}
      onClose={() => setShowLocalImageModal(false)}
    />
    </main>
  </div>
  );
}
