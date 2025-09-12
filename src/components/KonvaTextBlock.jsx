import React, { useState, useRef, useEffect } from 'react';
import { Text, Transformer, Group } from 'react-konva';

export default function KonvaTextBlock({
  component,
  isSelected,
  onSelect,
  onDragEnd,
  onTransform,
  onTextChange
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(component.content || '');
  const textRef = useRef();
  const transformerRef = useRef();
  const groupRef = useRef();
  const textareaRef = useRef();

  // Update transformer when selection changes
  useEffect(() => {
    if (isSelected && transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // Handle text editing
  useEffect(() => {
    if (isEditing) {
      // Create textarea for editing
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textareaRef.current = textarea;

      const textPosition = textRef.current.absolutePosition();
      const stageBox = textRef.current.getStage().container().getBoundingClientRect();
      const areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      textarea.value = editText;
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.width = (component.w || 200) + 'px';
      textarea.style.height = (component.h || 50) + 'px';
      textarea.style.fontSize = (component.fontSize || 16) + 'px';
      textarea.style.fontFamily = component.fontFamily || 'Arial, sans-serif';
      textarea.style.fontWeight = component.fontWeight || 'normal';
      textarea.style.fontStyle = component.fontStyle || 'normal';
      textarea.style.color = component.color || '#000';
      textarea.style.textAlign = component.textAlign || 'left';
      textarea.style.lineHeight = component.lineHeight || '1.2';
      textarea.style.border = '2px solid #4F46E5';
      textarea.style.borderRadius = '4px';
      textarea.style.padding = '4px';
      textarea.style.margin = '0px';
      textarea.style.overflow = 'hidden';
      textarea.style.background = 'white';
      textarea.style.outline = 'none';
      textarea.style.resize = 'none';
      textarea.style.zIndex = '1000';

      textarea.focus();
      textarea.select();

      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleFinishEdit();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          handleCancelEdit();
        }
      };

      const handleBlur = () => {
        handleFinishEdit();
      };

      textarea.addEventListener('keydown', handleKeyDown);
      textarea.addEventListener('blur', handleBlur);
      textarea.addEventListener('input', (e) => {
        setEditText(e.target.value);
      });

      return () => {
        textarea.removeEventListener('keydown', handleKeyDown);
        textarea.removeEventListener('blur', handleBlur);
        if (document.body.contains(textarea)) {
          document.body.removeChild(textarea);
        }
      };
    }
  }, [isEditing]);

  const handleFinishEdit = () => {
    setIsEditing(false);
    if (textareaRef.current) {
      const newText = textareaRef.current.value;
      setEditText(newText);
      onTextChange(newText);
      if (document.body.contains(textareaRef.current)) {
        document.body.removeChild(textareaRef.current);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(component.content || '');
    if (textareaRef.current && document.body.contains(textareaRef.current)) {
      document.body.removeChild(textareaRef.current);
    }
  };

  const handleDoubleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      setEditText(component.content || '');
    }
  };

  const handleClick = (e) => {
    e.cancelBubble = true;
    onSelect();
  };

  const handleDragEnd = (e) => {
    onDragEnd({
      x: e.target.x(),
      y: e.target.y()
    });
  };

  const handleTransformEnd = () => {
    const node = groupRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    // Reset scale and apply to width/height
    node.scaleX(1);
    node.scaleY(1);
    
    onTransform({
      x: node.x(),
      y: node.y(),
      w: Math.max(50, (component.w || 200) * scaleX),
      h: Math.max(20, (component.h || 50) * scaleY),
      rotation: node.rotation()
    });
  };

  return (
    <>
      <Group
        ref={groupRef}
        x={component.x || 0}
        y={component.y || 0}
        width={component.w || 200}
        height={component.h || 50}
        rotation={component.rotation || 0}
        draggable
        onClick={handleClick}
        onTap={handleClick}
        onDblClick={handleDoubleClick}
        onDblTap={handleDoubleClick}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        <Text
          ref={textRef}
          text={isEditing ? '' : (component.content || 'Click to edit text')}
          fontSize={component.fontSize || 16}
          fontFamily={component.fontFamily || 'Arial, sans-serif'}
          fontStyle={component.fontWeight === 'bold' ? 'bold' : 'normal'}
          fontVariant={component.fontStyle || 'normal'}
          textDecoration={component.textDecoration || ''}
          fill={component.color || '#000'}
          align={component.textAlign || 'left'}
          width={component.w || 200}
          height={component.h || 50}
          lineHeight={parseFloat(component.lineHeight || '1.2')}
          padding={4}
          wrap="word"
          ellipsis={true}
        />
      </Group>
      
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 50) {
              return oldBox;
            }
            if (newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
            'middle-left',
            'middle-right',
            'top-center',
            'bottom-center'
          ]}
          rotateEnabled={true}
          borderEnabled={true}
          borderStroke="#4F46E5"
          borderStrokeWidth={2}
          anchorFill="#4F46E5"
          anchorStroke="#ffffff"
          anchorStrokeWidth={2}
          anchorSize={8}
          rotateAnchorOffset={20}
        />
      )}
    </>
  );
}
