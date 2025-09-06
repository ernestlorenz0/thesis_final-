import React, { useState } from 'react';

export default function SlideSidebar({ slides, current, setCurrent, renderThumb, addSlide, moveSlide, duplicateSlide, deleteSlide }) {
  const [draggedSlide, setDraggedSlide] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedSlide(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedSlide !== null && draggedSlide !== dropIndex) {
      moveSlide(draggedSlide, dropIndex);
    }
    setDraggedSlide(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedSlide(null);
    setDragOverIndex(null);
  };

  return (
    <aside className="w-64 bg-white/80 border-r border-gray-200 flex flex-col shadow-xl z-10">
      <div className="p-4 border-b border-gray-200">
        <button className="w-full bg-purple-600 text-white rounded py-2 font-semibold hover:bg-purple-700 transition mb-2" onClick={addSlide}>
          + New Slide
        </button>
        <div className="text-xs text-gray-500 text-center">
          {slides.length} slide{slides.length !== 1 ? 's' : ''}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, idx)}
            onDragEnd={handleDragEnd}
            className={`group relative flex items-center gap-2 px-4 py-3 cursor-pointer border-l-4 transition-all ${
              idx === current 
                ? 'border-purple-500 bg-purple-50' 
                : dragOverIndex === idx
                ? 'border-blue-400 bg-blue-50'
                : 'border-transparent hover:bg-gray-50'
            } ${
              draggedSlide === idx ? 'opacity-50' : ''
            }`}
            onClick={() => setCurrent(idx)}
          >
            {/* Drag handle */}
            <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-70 cursor-grab active:cursor-grabbing">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            
            <span className="text-xs text-gray-400 w-6 font-mono">{idx + 1}</span>
            
            <div className="flex-1">
              {renderThumb(slide, idx)}
            </div>
            
            {/* Action buttons */}
            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateSlide();
                }}
                className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded transition-colors"
                title="Duplicate slide"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              {slides.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Delete this slide?')) {
                      deleteSlide();
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded transition-colors"
                  title="Delete slide"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
