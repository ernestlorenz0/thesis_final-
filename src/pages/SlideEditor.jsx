import React, { useState, useRef } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import pptxgen from 'pptxgenjs';
import { v4 as uuidv4 } from 'uuid';
import RevealPreview from './RevealPreview'; // Import RevealPreview

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
  // Add Title/Paragraph/Image
  const addComponent = type => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: [...slide.components, {
        id: uuidv4(),
        type,
        content: type === 'image' ? '' : `${type.charAt(0).toUpperCase() + type.slice(1)} here...`,
        x: 100 + Math.random() * 600,
        y: 100 + Math.random() * 400,
        w: 400,
        h: 60
      }]
    } : slide));
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
  // Export to pptx
  const exportPptx = () => {
    const pptx = new pptxgen();
    slides.forEach(slide => {
      const s = pptx.addSlide();
      slide.components.forEach(comp => {
        if (comp.type === 'title') s.addText(comp.content, { x:1, y:0.5, w:8, h:1, fontSize:32, bold:true, color:'363062' });
        if (comp.type === 'paragraph') s.addText(comp.content, { x:1, y:1.7, w:8, h:2, fontSize:18, color:'555' });
        if (comp.type === 'image' && comp.content) s.addImage({ data: comp.content, x:5, y:2.5, w:3, h:3 });
      });
      s.addText(author, { x:7.5, y:6.5, fontSize:12, color:'888', align:'right' });
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
            {slides[current].components.map((comp, idx) => (
              <DraggableBlock key={comp.id} id={comp.id} x={comp.x || 100} y={comp.y || 100} onDragEnd={handleBlockDragEnd}>
                <div className="group bg-white/90 rounded-lg shadow-lg px-6 py-3 border border-purple-100 hover:border-purple-300 relative">
                  {comp.type === 'title' && (
                    <input
                      className="text-5xl font-bold w-full outline-none bg-transparent text-purple-700 mb-2"
                      value={comp.content}
                      onChange={e => handleTextChange(idx, e.target.value)}
                    />
                  )}
                  {comp.type === 'paragraph' && (
                    <textarea
                      className="text-xl w-full outline-none bg-transparent text-gray-700 mb-2 resize-none"
                      value={comp.content}
                      onChange={e => handleTextChange(idx, e.target.value)}
                      rows={3}
                    />
                  )}
                  {comp.type === 'image' && (
                    <div className="flex flex-col gap-2">
                      {comp.content && comp.content.startsWith('data:') ? (
                        <img src={comp.content} alt="slide" className="max-h-48 rounded shadow" />
                      ) : comp.content ? (
                        <img src={comp.content} alt="slide" className="max-h-48 rounded shadow" onError={e => e.target.style.display='none'} />
                      ) : null}
                      <input
                        className="w-full border-b border-purple-100 bg-transparent text-gray-700 mb-2"
                        placeholder="Paste image URL here or upload"
                        value={comp.content}
                        onChange={e => handleTextChange(idx, e.target.value)}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={e => e.target.files && handleImageUpload(idx, e.target.files[0])}
                      />
                    </div>
                  )}
                  <button className="absolute -top-2 -right-2 bg-red-400 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition" onClick={() => removeComponent(idx)}>×</button>
                </div>
              </DraggableBlock>
            ))}
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
          <RevealPreview slides={slides} onClose={() => setShowReveal(false)} />
        )}
      </main>
    </div>
  );
}
