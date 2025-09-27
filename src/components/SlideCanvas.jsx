import React from 'react';
import { DndContext } from '@dnd-kit/core';
import DraggableBlock from './DraggableBlock';
import SlideToolbar from './SlideToolbar';
import FloatingAddButtons from './FloatingAddButtons';
import ResizableImageContainer from './ResizableImageContainer';
import DraggableTextBlock from './DraggableTextBlock';

export default function SlideCanvas({
  slides,
  current,
  author,
  showToolbar,
  toolbarState,
  editingIdx,
  editorValue,
  setEditorValue,
  setEditingIdx,
  setShowToolbar,
  setInlineEditing,
  inlineEditing,
  selectedText,
  setSelectedText,
  handleTextChange,
  handleFontChange,
  removeComponent,
  updateComponent,
  handleBlockDragEnd,
  cancelEdit,
  saveEdit,
  addComponent,
  fileInputRef,
  handleImageUpload,
  handleTextSelection,
  onDragOver,
  onDrop,
  Theme,
  currentSlide
}) {
  class ThemeErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error, info) {
      // eslint-disable-next-line no-console
      console.error('Theme render error:', error, info);
    }
    render() {
      if (this.state.hasError) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="bg-red-50 text-red-700 border border-red-200 rounded p-4 max-w-lg text-center">
              <div className="font-semibold mb-1">There was a problem rendering this slide layout.</div>
              <div className="text-sm opacity-80">Check the theme component for errors. See console for details.</div>
            </div>
          </div>
        );
      }
      return this.props.children;
    }
  }

  // Themed slide rendering function (moved from SlideEditor)
  const renderThemedSlide = (slide, idx) => {
    if (!slide || !Theme) {
      console.warn('Missing slide or theme:', { slide: !!slide, theme: !!Theme });
      return null;
    }

    // Title slide
    if (idx === 0 && Theme.TitleSlide) {
      return (
        <Theme.TitleSlide
          title={slide.components?.find(c => c.type === "title")?.content || "Sample Title"}
          subtitle={slide.components?.find(c => c.type === "paragraph")?.content || "Subtitle placeholder"}
          imageUrl={slide.components?.find(c => c.type === "image")?.content || ""}
        />
      );
    }

    // Table of Contents slide
    if (slide.components?.some(c => c.type === "toc") && Theme.TOCSlide) {
      const tocTitle = slide.components.find(c => c.type === "toc")?.content || "Table of Contents";
      const tocItems = slide.components.filter(c => c.type === "toc_item").map(c => c.content);
      return (
        <Theme.TOCSlide
          title={tocTitle}
          items={tocItems}
        />
      );
    }

    // End slide
    if (slide.components?.some(c => c.type === "end") && Theme.EndSlide) {
      return (
        <Theme.EndSlide
          message={slide.components.find(c => c.type === "end")?.content || "Thank You!"}
          subtitle={slide.components.find(c => c.type === "paragraph")?.content || ""}
        />
      );
    }

    // Content slides
    const title = slide.components?.find(c => c.type === "title")?.content || "";
    const content = slide.components?.find(c => c.type === "paragraph")?.content || "";
    const imageUrl = slide.components?.find(c => c.type === "image")?.content || "";

    // If API assigned a layout, respect it
    if (slide.layout && Theme[slide.layout]) {
      const LayoutComp = Theme[slide.layout];
      return <LayoutComp title={title} content={content} imageUrl={imageUrl} />;
    }

    // Fallback logic - try different theme component names
    if (imageUrl && Theme.ImageSlide) {
      return <Theme.ImageSlide title={title} imageUrl={imageUrl} />;
    }
    
    // Try MainSlide variants for content slides - check if they exist before using
    if (Theme.MainSlide) {
      return <Theme.MainSlide title={title} content={content} />;
    }
    if (Theme.MainSlide1) {
      return <Theme.MainSlide1 title={title} content={content} />;
    }
    if (Theme.MainSlide2) {
      return <Theme.MainSlide2 title={title} content={content} imageUrl={imageUrl} />;
    }
    if (Theme.MainSlide3) {
      return <Theme.MainSlide3 title={title} points={[content]} />;
    }
    if (Theme.MainSlide4) {
      return <Theme.MainSlide4 title={title} content={content} imageUrl={imageUrl} />;
    }
    if (Theme.MainSlide5) {
      return <Theme.MainSlide5 title={title} content={content} imageUrl={imageUrl} />;
    }
    if (Theme.MainSlide6) {
      return <Theme.MainSlide6 title={title} content={content} imageUrl={imageUrl} />;
    }
    
    // Try other common component names
    if (Theme.ContentSlide) {
      return <Theme.ContentSlide title={title} content={content} />;
    }
    if (Theme.ContentSlideText) {
      return <Theme.ContentSlideText title={title} content={content} />;
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
                // Handle slide description change
                const newSlides = slides.map((slide, idx) => 
                  idx === current ? { ...slide, description: e.target.value } : slide
                );
                // This would need to be passed from parent
              }}
              maxLength={120}
            />
            // This code has been moved to renderDraggableComponents function
            {/* Formatting toolbar */}
            {showToolbar && (
              <SlideToolbar
                toolbarState={toolbarState}
                applyToolbarToBlock={applyToolbarToBlock}
                deleteEditingBlock={deleteEditingBlock}
                cancelEdit={cancelEdit}
                saveEdit={saveEdit}
                selectedText={selectedText}
                inlineEditing={inlineEditing}
              />
            )}
            {/* Floating add buttons */}
            <FloatingAddButtons addComponent={addComponent} fileInputRef={fileInputRef} slides={slides} current={current} handleImageUpload={handleImageUpload} />
          </div>
        </div>
      </div>
    );
  };

  // Render individual draggable components as overlay on theme
  const renderDraggableComponents = () => {
    if (!currentSlide || !currentSlide.components) return null;
    
    return currentSlide.components.map((comp, idx) => {
      // Render draggable overlays for images that are added separately
      if (comp.type === 'image' && comp.isDraggable) {
        return (
          <DraggableBlock
            key={comp.id}
            id={comp.id}
            x={(comp.x || 200) * 0.75} // Scale to match theme scaling
            y={(comp.y || 200) * 0.75}
          >
            <ResizableImageContainer
              comp={comp}
              idx={idx}
              removeComponent={removeComponent}
              slides={slides}
              current={current}
            />
          </DraggableBlock>
        );
      }
      // Render draggable text components as overlays
      else if ((comp.type === 'text' || comp.type === 'title') && comp.isDraggable) {
        return (
          <DraggableTextBlock
            key={comp.id}
            comp={comp}
            idx={idx}
            updateComponent={updateComponent}
            removeComponent={removeComponent}
          />
        );
      }
      return null;
    });
  };

  return (
    <div 
      className="w-[1280px] h-[720px] bg-white/80 rounded-3xl shadow-2xl border-4 border-purple-200 mt-24 flex flex-col relative overflow-hidden p-12 backdrop-blur-lg"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <DndContext onDragEnd={event => {
        if (event.active && event.delta) {
          handleBlockDragEnd(event.active.id, event);
        }
      }}>
        <div className="flex-1 flex flex-col items-center justify-center bg-neutral-50 rounded-2xl shadow-xl relative overflow-hidden min-h-[450px]">
          {slides[current] ? (
            <div className="scale-75 origin-center relative">
              <ThemeErrorBoundary>
                {renderThemedSlide(slides[current], current)}
              </ThemeErrorBoundary>
              {/* Overlay draggable components on top of theme */}
              <div className="absolute inset-0">
                {renderDraggableComponents()}
              </div>
              
              {/* Show empty slide message only if no components */}
              {(!slides[current].components || slides[current].components.length === 0) && (
                <div className="absolute inset-0 flex items-center justify-center text-center text-neutral-400 pointer-events-none">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                    <div className="text-xl mb-4">Add content to start your slide!</div>
                    <div className="text-sm opacity-75">Drag and drop images or use the buttons below</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-neutral-400">
              <div className="text-xl mb-4">No slide selected</div>
              <div className="text-sm opacity-75">Please select a slide from the sidebar</div>
            </div>
          )}
        </div>
      </DndContext>
      {/* Author bottom right */}
      {author && <div className="absolute bottom-8 right-16 text-gray-400 text-lg font-semibold select-none">{author}</div>}
    </div>
  );
}
