import React, { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function DraggableTextBlock({ comp, idx, updateComponent, removeComponent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [editContent, setEditContent] = useState(comp.content || '');
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: comp.id,
    data: { x: comp.x || 0, y: comp.y || 0 }
  });

  // Handle keyboard events for deletion and editing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSelected && !isEditing) {
        if (e.key === 'Backspace' || e.key === 'Delete') {
          e.preventDefault();
          console.log('🗑️ Deleting text via keyboard:', idx, comp.id);
          if (removeComponent) {
            removeComponent(idx);
          }
        } else if (e.key === 'Enter' || e.key === 'F2') {
          e.preventDefault();
          setIsEditing(true);
        }
      } else if (isEditing && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSaveEdit();
      } else if (isEditing && e.key === 'Escape') {
        e.preventDefault();
        handleCancelEdit();
      }
    };

    if (isSelected || isEditing) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelected, isEditing, idx, comp.id, removeComponent, editContent]);

  // Handle clicks outside to deselect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (isEditing) {
          handleSaveEdit();
        } else {
          setIsSelected(false);
        }
      }
    };

    if (isSelected || isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSelected, isEditing, editContent]);

  // Focus text input when editing starts
  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      textRef.current.select();
    }
  }, [isEditing]);

  const handleTextClick = (e) => {
    if (isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    
    if (isSelected && !isEditing) {
      setIsEditing(true);
    } else {
      setIsSelected(true);
    }
  };

  const handleSaveEdit = () => {
    if (updateComponent && editContent.trim() !== comp.content) {
      updateComponent(idx, { ...comp, content: editContent.trim() });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comp.content || '');
    setIsEditing(false);
  };

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    position: 'absolute',
    left: (comp.x || 0) * 0.75,
    top: (comp.y || 0) * 0.75,
    width: (comp.w || 200) * 0.75,
    height: (comp.h || 50) * 0.75,
    zIndex: isDragging ? 1000 : (isSelected ? 100 : 50),
    cursor: isDragging ? 'grabbing' : (isEditing ? 'text' : 'grab'),
  };

  const textStyle = {
    fontSize: ((comp.fontSize || 16) * 0.75) + 'px',
    fontFamily: comp.fontFamily || 'Arial, sans-serif',
    fontWeight: comp.fontWeight || 'normal',
    fontStyle: comp.fontStyle || 'normal',
    textDecoration: comp.textDecoration || 'none',
    color: comp.color || '#000',
    textAlign: comp.textAlign || 'left',
    lineHeight: comp.lineHeight || '1.2',
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: '4px',
    margin: 0,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        containerRef.current = node;
      }}
      style={style}
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
      {...(isEditing ? {} : { ...listeners, ...attributes })}
    >
      {/* Selection and hover feedback */}
      <div className={`absolute inset-0 border-2 rounded transition-all pointer-events-none ${
        isSelected 
          ? 'border-green-500 bg-green-50 bg-opacity-20' 
          : 'border-green-400 opacity-0 group-hover:opacity-50'
      }`} />

      {/* Text content */}
      {isEditing ? (
        <textarea
          ref={textRef}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          style={textStyle}
          className="w-full h-full resize-none"
          onBlur={handleSaveEdit}
        />
      ) : (
        <div
          style={textStyle}
          className="w-full h-full overflow-hidden cursor-pointer"
          onClick={handleTextClick}
        >
          {comp.content || 'Click to edit text'}
        </div>
      )}

      {/* Instructions */}
      <div className={`absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap ${
        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {isEditing 
          ? 'Enter to save • Escape to cancel' 
          : isSelected 
            ? 'Press Backspace to delete • Click to edit • Drag to move'
            : 'Click to select • Double-click to edit • Drag to move'
        }
      </div>
    </div>
  );
}
