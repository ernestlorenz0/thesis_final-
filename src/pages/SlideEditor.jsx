import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import pptxgen from 'pptxgenjs';
import { v4 as uuidv4 } from 'uuid';
import RevealPreview from './RevealPreview'; // Import RevealPreview
import * as ClassicClassroom from '../themes/ClassicClassroom';
import * as STEMModern from '../themes/STEMModern';
import * as PlayfulPrimary from '../themes/PlayfulPrimary';
import * as AcademicMinimal from '../themes/AcademicMinimal';
import * as ScholarlyElegant from '../themes/ScholarlyElegant';
import * as DigitalChalkboard from '../themes/DigitalChalkboard';
import * as ScienceSpectrum from '../themes/ScienceSpectrum';
import * as HistoryHeritage from '../themes/HistoryHeritage';
import * as ArtStudio from '../themes/ArtStudio';
import * as MathMatrix from '../themes/MathMatrix';
import * as LanguageLab from '../themes/LanguageLab';
import * as TechTrends from '../themes/TechTrends';
import * as ResearchReady from '../themes/ResearchReady';
import * as CreativeCanvas from '../themes/CreativeCanvas';
import * as YouthfulYellow from '../themes/YouthfulYellow';
import * as CalmCyan from '../themes/CalmCyan';
import * as ScholarGreen from '../themes/ScholarGreen';
import * as VibrantViolet from '../themes/VibrantViolet';
import * as OrangeOrbit from '../themes/OrangeOrbit';
import * as BlueHorizon from '../themes/BlueHorizon';

const themeNames = [
  'Classic Classroom',
  'STEM Modern',
  'Playful Primary',
  'Academic Minimal',
  'Scholarly Elegant',
  'Digital Chalkboard',
  'Science Spectrum',
  'History Heritage',
  'Art Studio',
  'Math Matrix',
  'Language Lab',
  'Tech Trends',
  'Research Ready',
  'Creative Canvas',
  'Youthful Yellow',
  'Calm Cyan',
  'Scholar Green',
  'Vibrant Violet',
  'Orange Orbit',
  'Blue Horizon',
];

const themeComponents = {
  'Classic Classroom': ClassicClassroom,
  'STEM Modern': STEMModern,
  'Playful Primary': PlayfulPrimary,
  'Academic Minimal': AcademicMinimal,
  'Scholarly Elegant': ScholarlyElegant,
  'Digital Chalkboard': DigitalChalkboard,
  'Science Spectrum': ScienceSpectrum,
  'History Heritage': HistoryHeritage,
  'Art Studio': ArtStudio,
  'Math Matrix': MathMatrix,
  'Language Lab': LanguageLab,
  'Tech Trends': TechTrends,
  'Research Ready': ResearchReady,
  'Creative Canvas': CreativeCanvas,
  'Youthful Yellow': YouthfulYellow,
  'Calm Cyan': CalmCyan,
  'Scholar Green': ScholarGreen,
  'Vibrant Violet': VibrantViolet,
  'Orange Orbit': OrangeOrbit,
  'Blue Horizon': BlueHorizon,
};

function DraggableBlock({ id, x, y, children, onDragEnd }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = {
    position: 'absolute',
    left: x,
    top: y,
    zIndex: isDragging ? 50 : 10,
    cursor: 'move',
    touchAction: 'none',
    transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0)` : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

export default function SlideEditor({ initialSlides, selectedTemplate, onBack }) {
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

  // Export to pptx
  const exportPptx = () => {
    const pptx = new pptxgen();
    const themeStyle = pptxThemeStyles[selectedTemplate] || pptxThemeStyles['Classic Classroom'];
    slides.forEach((slide, idx) => {
      const s = pptx.addSlide({ background: { fill: themeStyle.bgColor } });
      slide.components.forEach(comp => {
        if (comp.type === 'title') s.addText(comp.content, { x:1, y:0.5, w:8, h:1, ...themeStyle.title });
        if (comp.type === 'paragraph') s.addText(comp.content, { x:1, y:1.7, w:8, h:2, ...themeStyle.paragraph });
        if (comp.type === 'image' && comp.content) s.addImage({ data: comp.content, x:5, y:2.5, w:3, h:3 });
        if (comp.type === 'author' && idx === 0) s.addText(comp.content, { x:7.5, y:6.5, w:2, h:0.5, align:'right', ...themeStyle.author });
      });
      // Only add author if not already present and this is the title slide
      if (idx === 0 && !slide.components.some(c => c.type === 'author')) {
        s.addText('Ernest Lorenzo', { x:7.5, y:6.5, w:2, h:0.5, align:'right', ...themeStyle.author });
      }
    });
    pptx.writeFile('presentation.pptx');
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
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1 rounded shadow" onClick={downloadAsPDF}>Download as PDF</button>
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
            {/* Floating add buttons (no emoji, clean) */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center text-2xl font-bold" onClick={() => addComponent('title')}>T</button>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center text-2xl font-bold" onClick={() => addComponent('paragraph')}>P</button>
              <button className="bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.13a4 4 0 01.88 7.9M12 7v6m0 0l-3-3m3 3l3-3" />
                </svg>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  // Add image block, then upload
                  addComponent('image');
                  setTimeout(() => {
                    const idx = slides[current]?.components?.length || 0;
                    handleImageUpload(idx - 1, file);
                  }, 50);
                }
                e.target.value = '';
              }} />
            </div>
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
      {/* Sidebar */}
      <aside className="w-64 bg-white/80 border-r border-gray-200 flex flex-col shadow-xl z-10">
        <div className="p-4 border-b border-gray-200">
          <button className="w-full bg-purple-600 text-white rounded py-2 font-semibold hover:bg-purple-700 transition" onClick={addSlide}>+ New Slide</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-l-4 ${idx === current ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:bg-gray-50'}`}
              onClick={() => setCurrent(idx)}
            >
              <span className="text-xs text-gray-400 w-6">{idx + 1}</span>
              {renderThumb(slide)}
            </div>
          ))}
        </div>
      </aside>
      {/* Main Canvas Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Top bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-16 py-8 z-20">
          <div className="text-2xl font-bold tracking-wide text-purple-700 drop-shadow">KENBILERN</div>
          <div className="flex gap-2">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow" onClick={exportPptx}>Export PPTX</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded shadow" onClick={onBack}>Back</button>
            <button className={`ml-2 px-4 py-2 rounded ${showReveal ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`} onClick={() => setShowReveal(v => !v)}>Preview</button>
          </div>
        </div>
        {/* Slide Canvas (glassy, big, 1280x720) */}
        <div className="w-[1280px] h-[720px] bg-white/80 rounded-3xl shadow-2xl border-4 border-purple-200 mt-24 flex flex-col relative overflow-hidden p-12 backdrop-blur-lg">
          <DndContext onDragEnd={event => {
            if (event.active && event.over && event.delta) {
              handleBlockDragEnd(event.active.id, event);
            }
          }}>
            <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 rounded-2xl shadow-xl relative overflow-hidden min-h-[450px]">
              {/* Main Canvas: Render with selected theme */}
              {slides[current] && slides[current].components.length > 0 ? (
                renderThemedSlide()
              ) : (
                <span className="text-neutral-400">Add content to start your slide!</span>
              )}
            </div>
          </DndContext>
          {/* Author bottom right */}
          <div className="absolute bottom-8 right-16 text-gray-400 text-lg font-semibold select-none">{author}</div>
        </div>
        {/* Add/duplicate/delete controls */}
        <div className="flex gap-4 mt-8">
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow" onClick={() => addComponent('title')}>Add Title</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow" onClick={() => addComponent('paragraph')}>Add Paragraph</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded shadow" onClick={() => addComponent('image')}>Add Image</button>
          <button className="bg-gray-200 text-purple-700 px-4 py-2 rounded shadow" onClick={duplicateSlide}>Duplicate Slide</button>
          <button className="bg-gray-200 text-red-400 px-4 py-2 rounded shadow" onClick={deleteSlide}>Delete Slide</button>
        </div>
        {/* Reveal.js preview (now live) */}
        {showReveal && (
          <RevealPreview slides={slides} selectedTemplate={selectedTemplate} onClose={() => setShowReveal(false)} />
        )}
      </main>
    </div>
  );
}
