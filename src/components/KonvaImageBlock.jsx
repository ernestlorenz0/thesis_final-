import React, { useState, useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer, Group, Rect, Text } from 'react-konva';
import useImage from 'use-image';

export default function KonvaImageBlock({
  component,
  isSelected,
  onSelect,
  onDragEnd,
  onTransform,
  onDoubleClick
}) {
  const [image, status] = useImage(component.content, 'anonymous');
  const [imageDimensions, setImageDimensions] = useState({ width: 320, height: 180 });
  
  // Calculate proper aspect ratio when image loads
  useEffect(() => {
    if (image) {
      const originalWidth = image.naturalWidth || image.width;
      const originalHeight = image.naturalHeight || image.height;
      
      // Default container size
      const maxWidth = component.w || 320;
      const maxHeight = component.h || 180;
      
      // Calculate aspect ratio preserving dimensions
      const aspectRatio = originalWidth / originalHeight;
      let newWidth, newHeight;
      
      if (aspectRatio > maxWidth / maxHeight) {
        // Image is wider - fit to width
        newWidth = maxWidth;
        newHeight = maxWidth / aspectRatio;
      } else {
        // Image is taller - fit to height
        newHeight = maxHeight;
        newWidth = maxHeight * aspectRatio;
      }
      
      setImageDimensions({ width: newWidth, height: newHeight });
      
      console.log('🖼️ Image aspect ratio calculated:', {
        original: { width: originalWidth, height: originalHeight },
        aspectRatio,
        fitted: { width: newWidth, height: newHeight },
        container: { width: maxWidth, height: maxHeight }
      });
    }
  }, [image, component.w, component.h]);
  const imageRef = useRef();
  const transformerRef = useRef();
  const groupRef = useRef();

  // Update transformer when selection changes
  useEffect(() => {
    if (isSelected && transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleClick = (e) => {
    e.cancelBubble = true;
    onSelect();
  };

  const handleDoubleClick = (e) => {
    e.cancelBubble = true;
    if (onDoubleClick) {
      onDoubleClick();
    }
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
      w: Math.max(50, (component.w || 320) * scaleX),
      h: Math.max(50, (component.h || 180) * scaleY),
      rotation: node.rotation()
    });
  };

  return (
    <>
      <Group
        ref={groupRef}
        x={component.x || 0}
        y={component.y || 0}
        width={component.w || 320}
        height={component.h || 180}
        rotation={component.rotation || 0}
        draggable
        onClick={handleClick}
        onTap={handleClick}
        onDblClick={handleDoubleClick}
        onDblTap={handleDoubleClick}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        {image && (
          <KonvaImage
            ref={imageRef}
            image={image}
            width={imageDimensions.width}
            height={imageDimensions.height}
            x={(component.w || 320) / 2 - imageDimensions.width / 2}
            y={(component.h || 180) / 2 - imageDimensions.height / 2}
            cornerRadius={8}
            shadowColor="rgba(0,0,0,0.2)"
            shadowBlur={isSelected ? 10 : 5}
            shadowOffset={{ x: 2, y: 2 }}
            shadowOpacity={0.3}
          />
        )}
        
        {/* Placeholder if image is not loaded */}
        {!image && (
          <>
            <Rect
              width={component.w || 320}
              height={component.h || 180}
              fill="#f3f4f6"
              stroke="#d1d5db"
              strokeWidth={2}
              cornerRadius={8}
            />
            <Text
              text="Loading image..."
              x={(component.w || 320) / 2}
              y={(component.h || 180) / 2}
              offsetX={50}
              offsetY={10}
              fontSize={14}
              fill="#6b7280"
            />
          </>
        )}
      </Group>
      
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize - maintain aspect ratio option
            const minWidth = 50;
            const minHeight = 50;
            
            if (newBox.width < minWidth || newBox.height < minHeight) {
              return oldBox;
            }
            
            // Optional: maintain aspect ratio when shift is held
            // This would need to be implemented with keyboard event listeners
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
          borderStroke="#3B82F6"
          borderStrokeWidth={2}
          anchorFill="#3B82F6"
          anchorStroke="#ffffff"
          anchorStrokeWidth={2}
          anchorSize={8}
          rotateAnchorOffset={20}
          keepRatio={true} // Maintain aspect ratio during transforms
        />
      )}
    </>
  );
}
