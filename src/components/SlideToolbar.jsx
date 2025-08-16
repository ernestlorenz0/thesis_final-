import React from 'react';

export default function SlideToolbar({ toolbarState, applyToolbarToBlock, deleteEditingBlock, cancelEdit, saveEdit }) {
  return (
    <div className="fixed left-1/2 top-8 -translate-x-1/2 z-50 flex items-center gap-2 bg-neutral-800/90 rounded-lg py-2 px-4 shadow-xl border border-neutral-600" style={{ minWidth: 420 }}>
      <select value={toolbarState.fontFamily} onChange={e => applyToolbarToBlock('fontFamily', e.target.value)} className="bg-neutral-900 text-white border border-neutral-700 rounded px-2 py-1">
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Comic Sans MS">Comic Sans</option>
        <option value="Courier New">Courier</option>
        <option value="Times New Roman">Times</option>
        <option value="Verdana">Verdana</option>
        <option value="Trebuchet MS">Trebuchet</option>
        <option value="Consolas">Consolas</option>
      </select>
      <button className="bg-neutral-700 text-white rounded px-2 text-xl" onClick={() => applyToolbarToBlock('fontSize', Math.max(toolbarState.fontSize - 2, 10))}>-</button>
      <input type="number" min={10} max={120} value={toolbarState.fontSize} onChange={e => applyToolbarToBlock('fontSize', parseInt(e.target.value)||20)} className="w-14 bg-neutral-900 text-white border border-neutral-700 rounded px-1 text-center" />
      <button className="bg-neutral-700 text-white rounded px-2 text-xl" onClick={() => applyToolbarToBlock('fontSize', Math.min(toolbarState.fontSize + 2, 120))}>+</button>
      <input type="color" value={toolbarState.color} onChange={e => applyToolbarToBlock('color', e.target.value)} className="w-7 h-7 border border-neutral-700 rounded" />
      <button onClick={() => applyToolbarToBlock('fontWeight', toolbarState.fontWeight === 'bold' ? 'normal' : 'bold')} className={`rounded px-2 py-1 font-bold ${toolbarState.fontWeight==='bold'?'bg-purple-500 text-white':'bg-neutral-700 text-white'}`}>B</button>
      <button onClick={() => applyToolbarToBlock('fontStyle', toolbarState.fontStyle === 'italic' ? 'normal' : 'italic')} className={`rounded px-2 py-1 italic ${toolbarState.fontStyle==='italic'?'bg-purple-500 text-white':'bg-neutral-700 text-white'}`}>I</button>
      <button onClick={() => applyToolbarToBlock('textDecoration', toolbarState.textDecoration === 'underline' ? 'none' : 'underline')} className={`rounded px-2 py-1 underline ${toolbarState.textDecoration==='underline'?'bg-purple-500 text-white':'bg-neutral-700 text-white'}`}>U</button>
      <button className="rounded px-2 py-1 text-white bg-red-600 ml-2" onClick={deleteEditingBlock}>Delete</button>
      <button className="rounded px-2 py-1 text-white bg-neutral-600 ml-2" onClick={cancelEdit}>Cancel</button>
      <button className="rounded px-2 py-1 text-white bg-green-600 ml-2" onClick={saveEdit}>Save</button>
    </div>
  );
}
