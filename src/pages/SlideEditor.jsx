import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import { v4 as uuidv4 } from 'uuid';
import RevealPreview from './RevealPreview';
import { themeComponents, pptxThemeStyles } from '../utils/themes';
import SlideSidebar from '../components/SlideSidebar';
import TopBar from '../components/TopBar';
import SlideCanvas from '../components/SlideCanvas';
import AssetPicker from '../components/AssetPicker';
import LocalImageModal from '../components/LocalImageModal';

export default function SlideEditor({ initialSlides, selectedTemplate, onBack, previewMode }) {
  const [slides, setSlides] = useState(initialSlides || []);
  const [current, setCurrent] = useState(0);
  const [author, setAuthor] = useState('Ernest Lorenzo');
  const [showReveal, setShowReveal] = useState(false);
  const [showLocalImageModal, setShowLocalImageModal] = useState(false);
  const [localImages, setLocalImages] = useState([]);
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  const fileInputRef = useRef();

  // --- Editing state ---
  const [editingIdx, setEditingIdx] = useState(null);
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

  // === Toolbar actions ===
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

  const applyToolbarToBlock = (key, value) => {
    setToolbarState(state => ({ ...state, [key]: value }));
    handleFontChange(editingIdx, key, value);
  };

  const saveEdit = () => {
    handleTextChange(editingIdx, editorValue);
    setEditingIdx(null);
    setShowToolbar(false);
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setShowToolbar(false);
  };

  const deleteEditingBlock = () => {
    removeComponent(editingIdx);
    setEditingIdx(null);
    setShowToolbar(false);
  };

  // === Export functions ===
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

  const exportSlidesAsImagesPPTX = async () => {
    const pptx = new pptxgen();
    const originalCurrent = current;
    for (let i = 0; i < slides.length; i++) {
      setCurrent(i);
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvasEl = document.querySelector('.bg-\\[\\#F6F5EF\\]');
      if (!canvasEl) continue;
      const canvas = await html2canvas(canvasEl, { backgroundColor: null, useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const slide = pptx.addSlide();
      slide.addImage({ data: imgData, x: 0, y: 0, w: 10, h: 5.625 });
    }
    setCurrent(originalCurrent);
    pptx.writeFile('slides-as-images.pptx');
  };

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
    });
    pptx.writeFile('presentation.pptx');
  };

  // === Slide manipulation ===
  const addSlide = () => setSlides([...slides, { id: uuidv4(), components: [] }]);
  const duplicateSlide = () => setSlides([...slides, { ...slides[current], id: uuidv4() }]);
  const deleteSlide = () => {
    if (slides.length === 1) return;
    const newSlides = slides.filter((_, idx) => idx !== current);
    setSlides(newSlides);
    setCurrent(Math.max(0, current - 1));
  };

  const handleTextChange = (compIdx, value) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? { ...c, content: value } : c)
    } : slide));
  };

  const handleFontChange = (compIdx, key, value) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? { ...c, [key]: value } : c)
    } : slide));
  };

  const addComponent = type => {
    setSlides(slides => slides.map((slide, idx) => {
      if (idx !== current) return slide;
      return {
        ...slide,
        components: [
          ...slide.components,
          {
            id: uuidv4(),
            type,
            content: '',
            x: 200,
            y: 200,
            w: type === 'image' ? 320 : 400,
            h: type === 'image' ? 180 : 60,
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

  const removeComponent = idx => {
    setSlides(slides => slides.map((slide, sidx) => sidx === current ? {
      ...slide,
      components: slide.components.filter((_, i) => i !== idx)
    } : slide));
  };

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

  // === Render ===
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <SlideSidebar
        slides={slides}
        current={current}
        setCurrent={setCurrent}
        addSlide={addSlide}
        renderThumb={(slide) => {
          const title = slide.components.find(c => c.type === "title")?.content;
          return (
            <div className="flex-1 px-2 py-1 text-xs text-gray-700 truncate">
              {title || "Untitled"}
            </div>
          );
        }}
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
        </div>

        {showReveal && (
          <RevealPreview slides={slides} selectedTemplate={selectedTemplate} onClose={() => setShowReveal(false)} />
        )}

        <AssetPicker
          open={showAssetPicker}
          onClose={() => setShowAssetPicker(false)}
          onSelect={asset => {
            setShowAssetPicker(false);
            setSlides(slides => slides.map((slide, idx) => idx === current ? {
              ...slide,
              components: [
                ...slide.components,
                { id: uuidv4(), type: 'image', content: asset.url, x: 200, y: 200, w: 180, h: 180 }
              ]
            } : slide));
          }}
        />

        <LocalImageModal
          open={showLocalImageModal}
          images={localImages}
          onSelect={img => {
            setShowLocalImageModal(false);
            setSlides(slides => slides.map((slide, idx) => idx === current ? {
              ...slide,
              components: [
                ...slide.components,
                { id: uuidv4(), type: 'image', content: img.url, x: 200, y: 200, w: 320, h: 180 }
              ]
            } : slide));
          }}
          onClose={() => setShowLocalImageModal(false)}
        />
      </main>
    </div>
  );
}
