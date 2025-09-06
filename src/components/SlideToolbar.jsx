import React from 'react';

export default function SlideToolbar({ toolbarState, applyToolbarToBlock, deleteEditingBlock, cancelEdit, saveEdit, selectedText, inlineEditing }) {
  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 84, 96];
  
  return (
    <div className="fixed left-1/2 top-8 -translate-x-1/2 z-50 flex flex-wrap items-center gap-2 bg-neutral-800/95 rounded-lg py-3 px-4 shadow-xl border border-neutral-600 backdrop-blur-sm" style={{ minWidth: 500, maxWidth: 800 }}>
      {/* Selection indicator */}
      {inlineEditing && selectedText && selectedText.start !== selectedText.end && (
        <div className="w-full text-xs text-blue-300 mb-2 text-center">
          Formatting selection: {selectedText.end - selectedText.start} characters
        </div>
      )}
      
      {/* Font Family */}
      <select 
        value={toolbarState.fontFamily} 
        onChange={e => applyToolbarToBlock('fontFamily', e.target.value)} 
        className="bg-neutral-900 text-white border border-neutral-700 rounded px-2 py-1 text-sm min-w-[120px]"
        title="Font Family"
      >
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Impact">Impact</option>
        <option value="Consolas">Consolas</option>
        <option value="Monaco">Monaco</option>
        <option value="Palatino">Palatino</option>
        <option value="Garamond">Garamond</option>
      </select>
      
      {/* Font Size Controls */}
      <div className="flex items-center gap-1">
        <button 
          className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-2 py-1 text-sm transition-colors" 
          onClick={() => applyToolbarToBlock('fontSize', Math.max(toolbarState.fontSize - 2, 8))}
          title="Decrease font size"
        >
          A-
        </button>
        <select
          value={toolbarState.fontSize}
          onChange={e => applyToolbarToBlock('fontSize', parseInt(e.target.value) || 20)}
          className="w-16 bg-neutral-900 text-white border border-neutral-700 rounded px-1 py-1 text-center text-sm"
          title="Font Size"
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <button 
          className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-2 py-1 text-sm transition-colors" 
          onClick={() => applyToolbarToBlock('fontSize', Math.min(toolbarState.fontSize + 2, 120))}
          title="Increase font size"
        >
          A+
        </button>
      </div>
      
      {/* Color Picker */}
      <div className="flex items-center gap-1">
        <input 
          type="color" 
          value={toolbarState.color} 
          onChange={e => applyToolbarToBlock('color', e.target.value)} 
          className="w-8 h-8 border border-neutral-700 rounded cursor-pointer"
          title="Text Color"
        />
        {/* Quick color presets */}
        <div className="flex gap-1">
          {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map(color => (
            <button
              key={color}
              className="w-4 h-4 rounded border border-neutral-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => applyToolbarToBlock('color', color)}
              title={`Set color to ${color}`}
            />
          ))}
        </div>
      </div>
      
      {/* Text Style Buttons */}
      <div className="flex gap-1">
        <button 
          onClick={() => applyToolbarToBlock('fontWeight', toolbarState.fontWeight === 'bold' ? 'normal' : 'bold')} 
          className={`rounded px-2 py-1 font-bold text-sm transition-colors ${
            toolbarState.fontWeight === 'bold' ? 'bg-purple-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600 text-white'
          }`}
          title="Bold"
        >
          B
        </button>
        <button 
          onClick={() => applyToolbarToBlock('fontStyle', toolbarState.fontStyle === 'italic' ? 'normal' : 'italic')} 
          className={`rounded px-2 py-1 italic text-sm transition-colors ${
            toolbarState.fontStyle === 'italic' ? 'bg-purple-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600 text-white'
          }`}
          title="Italic"
        >
          I
        </button>
        <button 
          onClick={() => applyToolbarToBlock('textDecoration', toolbarState.textDecoration === 'underline' ? 'none' : 'underline')} 
          className={`rounded px-2 py-1 underline text-sm transition-colors ${
            toolbarState.textDecoration === 'underline' ? 'bg-purple-500 text-white' : 'bg-neutral-700 hover:bg-neutral-600 text-white'
          }`}
          title="Underline"
        >
          U
        </button>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 ml-auto">
        <button 
          className="rounded px-3 py-1 text-white bg-red-600 hover:bg-red-700 text-sm transition-colors" 
          onClick={deleteEditingBlock}
          title="Delete this text block"
        >
          Delete
        </button>
        <button 
          className="rounded px-3 py-1 text-white bg-neutral-600 hover:bg-neutral-500 text-sm transition-colors" 
          onClick={cancelEdit}
          title="Cancel editing"
        >
          Cancel
        </button>
        <button 
          className="rounded px-3 py-1 text-white bg-green-600 hover:bg-green-700 text-sm transition-colors" 
          onClick={saveEdit}
          title="Save changes"
        >
          Save
        </button>
      </div>
    </div>
  );
}
