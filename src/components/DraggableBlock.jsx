import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function DraggableBlock({ id, x, y, children, onDragEnd }) {
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
