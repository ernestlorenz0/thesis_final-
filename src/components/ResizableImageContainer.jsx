import React, { useState, useRef, useEffect } from 'react';

export default function ResizableImageContainer({ comp, idx, removeComponent, slides, current }) {
  const [dimensions, setDimensions] = useState({ 
    width: (comp.w || 320) * 0.75, 
    height: (comp.h || 180) * 0.75 
  });
  const [isResizing, setIsResizing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const containerRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startDimensions = useRef({ width: 0, height: 0 });

  // Handle keyboard events for deletion
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSelected && (e.key === 'Backspace' || e.key === 'Delete')) {
        e.preventDefault();
        if (removeComponent) {
          removeComponent(idx);
        }
      }
    };

    if (isSelected) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelected, idx, comp.id, removeComponent]);

  // Handle clicks outside to deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsSelected(false);
      }
    };

    if (isSelected) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSelected]);

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setIsSelected(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    startDimensions.current = { ...dimensions };
    
    const handleMouseMove = (moveEvent) => {
      requestAnimationFrame(() => {
        const deltaX = moveEvent.clientX - startPos.current.x;
        const deltaY = moveEvent.clientY - startPos.current.y;
        
        let newWidth = startDimensions.current.width;
        let newHeight = startDimensions.current.height;
        
        if (direction.includes('right')) {
          newWidth = Math.max(50, startDimensions.current.width + deltaX);
        }
        if (direction.includes('bottom')) {
          newHeight = Math.max(50, startDimensions.current.height + deltaY);
        }
        
        setDimensions({ width: newWidth, height: newHeight });
      });
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height, 
        background: 'transparent',
        border: 'none', // Remove border completely
        borderRadius: 8, 
        position: 'relative',
        outline: isResizing ? '2px dashed #3b82f6' : 'none'
      }}
      className="group relative"
    >
      {comp.content && (
        <img 
          src={comp.content} 
          alt="draggable asset" 
          className="w-full h-full object-contain rounded" 
          draggable={false}
          onDragStart={e => e.preventDefault()}
          style={{ 
            background: 'transparent',
            border: 'none' // Ensure no border on image
          }}
        />
      )}
      
      {/* Selection overlay */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleImageClick}
      />
      
      {/* Resize handles - only show on hover */}
      <div 
        className="absolute -bottom-2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
        onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
      />
      
      <div 
        className="absolute top-1/2 -right-2 w-4 h-4 bg-blue-500 rounded-full cursor-e-resize opacity-0 group-hover:opacity-100 transition-opacity z-20 transform -translate-y-1/2 shadow-md"
        onMouseDown={(e) => handleResizeStart(e, 'right')}
      />
      
      <div 
        className="absolute -bottom-2 left-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-s-resize opacity-0 group-hover:opacity-100 transition-opacity z-20 transform -translate-x-1/2 shadow-md"
        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
      />
      
      {/* Selection and hover feedback */}
      <div className={`absolute inset-0 border-2 rounded transition-all pointer-events-none ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 bg-opacity-20' 
          : 'border-blue-400 opacity-0 group-hover:opacity-50'
      }`} />
      
      {/* Instructions */}
      <div className={`absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {isSelected ? 'Press Backspace to delete • Drag to move • Resize with handles' : 'Click to select • Drag to move • Resize with handles'}
      </div>
    </div>
  );
}
