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
import { saveHistoryItem } from '../firebaseAuth';

export default function SlideEditor({ initialSlides, selectedTemplate, onBack, previewMode }) {
  const [slides, setSlides] = useState(initialSlides || []);
  const [current, setCurrent] = useState(0);
  const [author, setAuthor] = useState('');
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
  const exportPdf = async () => {
    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [960, 540] });
      
      // Generate PDF content from slide data
      slides.forEach((slide, idx) => {
        if (idx !== 0) pdf.addPage([960, 540], 'landscape');
        
        // Set background color based on theme
        pdf.setFillColor(246, 245, 239); // #F6F5EF
        pdf.rect(0, 0, 960, 540, 'F');
        
        let y = 80;
        
        // Title
        const titleComp = slide.components.find(c => c.type === 'title');
        if (titleComp && titleComp.content) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(36);
          pdf.setTextColor(34, 34, 34); // #222
          const titleLines = pdf.splitTextToSize(String(titleComp.content), 840);
          pdf.text(titleLines, 60, y);
          y += (titleLines.length * 45) + 30;
        }
        
        // Paragraphs
        const paragraphs = slide.components.filter(c => c.type === 'paragraph' && c.content);
        if (paragraphs.length > 0) {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(20);
          pdf.setTextColor(68, 68, 68); // #444
          paragraphs.forEach(p => {
            const text = String(p.content);
            const lines = pdf.splitTextToSize(text, 840);
            pdf.text(lines, 60, y);
            y += (lines.length * 25) + 20;
          });
        }
        
        // Images (if any)
        const imageComp = slide.components.find(c => c.type === 'image' && c.content);
        if (imageComp && imageComp.content) {
          try {
            // For base64 images, we can add them directly
            if (imageComp.content.startsWith('data:image/')) {
              pdf.addImage(imageComp.content, 'PNG', 60, y, 300, 200);
            }
          } catch (imgError) {
            console.warn('Could not add image to PDF:', imgError);
            // Add a placeholder for the image
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(16);
            pdf.setTextColor(150, 150, 150);
            pdf.text('[Image]', 60, y + 100);
          }
        }
      });
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `presentation_${timestamp}`;
      
      // Save to history
      await saveHistoryItem({
        filename: filename,
        slides: slides,
        templateName: selectedTemplate
      });
      
      // Download the PDF
      pdf.save(`${filename}.pdf`);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
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
        <TopBar exportPdf={exportPdf} onBack={onBack} showReveal={showReveal} setShowReveal={setShowReveal} />
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
