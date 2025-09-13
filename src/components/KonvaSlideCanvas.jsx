import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import KonvaTextBlock from './KonvaTextBlock';
import KonvaImageBlock from './KonvaImageBlock';
import SlideToolbar from './SlideToolbar';
import FloatingAddButtons from './FloatingAddButtons';

export default function KonvaSlideCanvas({
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
  currentSlide,
  onSlideContainerReady
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [stageScale, setStageScale] = useState(0.75);
  const stageRef = useRef();
  const layerRef = useRef();
  const transformerRef = useRef();

  // Slide container ref for export functionality
  const slideContainerRef = useRef();
  const exportContainerRef = useRef();

  // Expose slide container ref to parent component for export functionality
  useEffect(() => {
    if (onSlideContainerReady && exportContainerRef.current) {
      onSlideContainerReady(exportContainerRef);
    }
  }, [onSlideContainerReady]);

  // Update export container when slide changes
  useEffect(() => {
    if (onSlideContainerReady && exportContainerRef.current) {
      onSlideContainerReady(exportContainerRef);
    }
  }, [slides, current, onSlideContainerReady]);

  // Create full-size export container
  const createExportContainer = () => {
    return (
      <div 
        ref={exportContainerRef}
        className="fixed top-[-9999px] left-[-9999px] w-[1920px] h-[1080px] bg-white"
        style={{ zIndex: -1000 }}
      >
        <div className="w-full h-full relative">
          <ThemeErrorBoundary>
            {renderThemedSlide(slides[current], current)}
          </ThemeErrorBoundary>
          <div className="absolute inset-0">
            <Stage
              width={STAGE_WIDTH}
              height={STAGE_HEIGHT}
            >
              <Layer>
                {renderKonvaComponents()}
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    );
  };

  // Stage dimensions - PowerPoint 16:9 widescreen format
  const STAGE_WIDTH = 1920;
  const STAGE_HEIGHT = 1080;

  class ThemeErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }
    componentDidCatch(error, info) {
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

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedId && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault();
        const componentIndex = currentSlide?.components?.findIndex(comp => comp.id === selectedId);
        if (componentIndex !== -1) {
          removeComponent(componentIndex);
          setSelectedId(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, currentSlide, removeComponent]);

  // Handle stage click to deselect
  const handleStageClick = (e) => {
    // Clicked on empty area - deselect
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  // Handle component selection
  const handleComponentSelect = (id) => {
    setSelectedId(id);
  };

  // Handle component drag end
  const handleComponentDragEnd = (id, newPos) => {
    const componentIndex = currentSlide?.components?.findIndex(comp => comp.id === id);
    if (componentIndex !== -1) {
      const updatedComponent = {
        ...currentSlide.components[componentIndex],
        x: newPos.x,
        y: newPos.y
      };
      updateComponent(componentIndex, updatedComponent);
    }
  };

  // Handle component transform
  const handleComponentTransform = (id, newAttrs) => {
    const componentIndex = currentSlide?.components?.findIndex(comp => comp.id === id);
    if (componentIndex !== -1) {
      const updatedComponent = {
        ...currentSlide.components[componentIndex],
        ...newAttrs
      };
      updateComponent(componentIndex, updatedComponent);
    }
  };

  // Render themed slide as background
  const renderThemedSlide = (slide, idx) => {
    if (!slide || !Theme) {
      console.warn('Missing slide or theme:', { slide: !!slide, theme: !!Theme });
      return null;
    }

    console.log(`🎨 Rendering slide ${idx}:`, {
      slideExists: !!slide,
      themeExists: !!Theme,
      componentsCount: slide.components?.length || 0,
      hasLayout: !!slide.layout,
      layout: slide.layout,
      availableThemeComponents: Object.keys(Theme || {})
    });

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
    const imageUrl = slide.components?.find(c => c.type === "image" && !c.isDraggable)?.content || "";

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
          </div>
        </div>
      </div>
    );
  };

  // Render Konva components
  const renderKonvaComponents = () => {
    if (!currentSlide || !currentSlide.components) return null;
    
    return currentSlide.components.map((comp, idx) => {
      // Only render draggable components in Konva
      if (comp.type === 'image' && comp.isDraggable) {
        return (
          <KonvaImageBlock
            key={comp.id}
            component={comp}
            isSelected={selectedId === comp.id}
            onSelect={() => handleComponentSelect(comp.id)}
            onDragEnd={(newPos) => handleComponentDragEnd(comp.id, newPos)}
            onTransform={(newAttrs) => handleComponentTransform(comp.id, newAttrs)}
            onDoubleClick={() => {
              // Trigger image replacement
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          />
        );
      } else if ((comp.type === 'text' || comp.type === 'title') && comp.isDraggable) {
        return (
          <KonvaTextBlock
            key={comp.id}
            component={comp}
            isSelected={selectedId === comp.id}
            onSelect={() => handleComponentSelect(comp.id)}
            onDragEnd={(newPos) => handleComponentDragEnd(comp.id, newPos)}
            onTransform={(newAttrs) => handleComponentTransform(comp.id, newAttrs)}
            onTextChange={(newText) => {
              const componentIndex = currentSlide?.components?.findIndex(c => c.id === comp.id);
              if (componentIndex !== -1) {
                const updatedComponent = {
                  ...currentSlide.components[componentIndex],
                  content: newText
                };
                updateComponent(componentIndex, updatedComponent);
              }
            }}
          />
        );
      }
      return null;
    });
  };

  return (
    <div 
      className="w-[960px] h-[540px] bg-white rounded-2xl shadow-2xl border-2 border-purple-200 flex flex-col relative overflow-hidden backdrop-blur-lg"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div 
        ref={slideContainerRef}
        className="w-full h-full bg-white relative overflow-hidden"
      >
        {slides[current] ? (
          <div className="w-full h-full relative overflow-hidden">
            {console.log(`📊 Current slide ${current}:`, {
              slideExists: !!slides[current],
              componentsCount: slides[current]?.components?.length || 0,
              totalSlides: slides.length,
              currentSlide: current
            })}
            {/* Container for perfectly aligned theme and stage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: '960px', height: '540px' }}>
                {/* Theme background - scaled to fit exactly */}
                <div 
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ 
                    transform: 'scale(0.5)', 
                    transformOrigin: 'top left',
                    width: '1920px',
                    height: '1080px'
                  }}
                >
                  <ThemeErrorBoundary>
                    {renderThemedSlide(slides[current], current)}
                  </ThemeErrorBoundary>
                </div>
                
                {/* Konva Stage overlay - perfectly aligned */}
                <div 
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ 
                    transform: 'scale(0.5)', 
                    transformOrigin: 'top left',
                    width: '1920px',
                    height: '1080px'
                  }}
                >
                  <Stage
                    ref={stageRef}
                    width={STAGE_WIDTH}
                    height={STAGE_HEIGHT}
                    onClick={handleStageClick}
                    onTap={handleStageClick}
                  >
                    <Layer ref={layerRef}>
                      {renderKonvaComponents()}
                    </Layer>
                  </Stage>
                </div>
              </div>
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
          <div className="absolute inset-0 flex items-center justify-center text-center text-neutral-400">
            <div>
              <div className="text-xl mb-4">No slide selected</div>
              <div className="text-sm opacity-75">Please select a slide from the sidebar</div>
            </div>
          </div>
        )}
      </div>

      {/* Formatting toolbar */}
      {showToolbar && (
        <SlideToolbar
          toolbarState={toolbarState}
          applyToolbarToBlock={() => {}} // Will be implemented
          deleteEditingBlock={() => {}} // Will be implemented
          cancelEdit={cancelEdit}
          saveEdit={saveEdit}
          selectedText={selectedText}
          inlineEditing={inlineEditing}
        />
      )}


      {/* Author bottom right */}
      {author && <div className="absolute bottom-8 right-16 text-gray-400 text-lg font-semibold select-none">{author}</div>}
      
      {/* Hidden full-size export container */}
      {createExportContainer()}
    </div>
  );
}
