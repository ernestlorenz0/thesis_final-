import React from 'react';
import { DndContext } from '@dnd-kit/core';
import DraggableBlock from './DraggableBlock';
import SlideToolbar from './SlideToolbar';
import FloatingAddButtons from './FloatingAddButtons';

export default function SlideCanvas({
  slides,
  current,
  author,
  showToolbar,
  toolbarState,
  editingIdx,
  editorValue,
  Theme,
  currentSlide,
  handleBlockDragEnd,
  handleTextDoubleClick,
  handleTextChange,
  handleFontChange,
  removeComponent,
  applyToolbarToBlock,
  deleteEditingBlock,
  cancelEdit,
  saveEdit,
  addComponent,
  fileInputRef,
  handleImageUpload
}) {
  // Themed slide rendering function (moved from SlideEditor)
  const renderThemedSlide = () => {
    const isFirstSlide = current === 0;
    if (currentSlide.components.length === 1) {
      const comp = currentSlide.components[0];
      if (comp.type === 'title') return <Theme.TitleSlide title={comp.content} subtitle={isFirstSlide ? author : ''} />;
      if (comp.type === 'image') return <Theme.ImageSlide title={isFirstSlide ? author : ''} imageUrl={comp.content} />;
      if (comp.type === 'paragraph') return <Theme.ContentSlide title={isFirstSlide ? author : ''} content={comp.content} />;
    }
    return (
      <div className="flex flex-col h-full w-full bg-neutral-900">
        <div className="flex items-center justify-between px-8 py-3 bg-gradient-to-r from-blue-200 to-blue-100 shadow-sm">
          <div className="text-lg font-bold text-gray-700">Slide Editor</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-8 relative">
          <div className="relative bg-[#F6F5EF] rounded-lg shadow-2xl border border-gray-300" style={{ width: 960, height: 540, margin: '0 auto' }}>
            <input
              className="absolute left-1/2 -translate-x-1/2 top-6 w-2/3 bg-transparent border-b-2 border-dashed border-gray-400 text-lg text-gray-700 text-center outline-none placeholder-gray-400"
              placeholder="Add a short description"
              value={currentSlide.description || ''}
              onChange={e => {
                /* This should be handled in parent SlideEditor via setSlides */
              }}
              maxLength={120}
            />
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
                  draggable={!isEditing}
                  onDragStart={e => {
                    e.dataTransfer.setData('text/plain', idx);
                  }}
                  onDragEnd={e => {
                    if (!isEditing) {
                      const rect = e.target.parentNode.getBoundingClientRect();
                      const dx = e.clientX - rect.left;
                      const dy = e.clientY - rect.top;
                      // setSlides logic should be handled in parent
                    }
                  }}
                >
                  {isEditing ? (
                    <textarea
                      value={editorValue}
                      onChange={e => {/* setEditorValue in parent */}}
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
            {/* Formatting toolbar */}
            {showToolbar && (
              <SlideToolbar
                toolbarState={toolbarState}
                applyToolbarToBlock={applyToolbarToBlock}
                deleteEditingBlock={deleteEditingBlock}
                cancelEdit={cancelEdit}
                saveEdit={saveEdit}
              />
            )}
            {/* Floating add buttons */}
            <FloatingAddButtons addComponent={addComponent} fileInputRef={fileInputRef} slides={slides} current={current} handleImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-[1280px] h-[720px] bg-white/80 rounded-3xl shadow-2xl border-4 border-purple-200 mt-24 flex flex-col relative overflow-hidden p-12 backdrop-blur-lg">
      <DndContext onDragEnd={event => {
        if (event.active && event.over && event.delta) {
          handleBlockDragEnd(event.active.id, event);
        }
      }}>
        <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 rounded-2xl shadow-xl relative overflow-hidden min-h-[450px]">
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
  );
}
