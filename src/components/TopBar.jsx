import React from 'react';

export default function TopBar({ exportPptx, onBack, showReveal, setShowReveal }) {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-16 py-8 z-20">
      <div className="text-2xl font-bold tracking-wide text-purple-700 drop-shadow">KENBILERN</div>
      <div className="flex gap-2">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow" onClick={exportPptx}>Export</button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded shadow" onClick={onBack}>Back</button>
        <button className={`ml-2 px-4 py-2 rounded ${showReveal ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`} onClick={() => setShowReveal(v => !v)}>Preview</button>
      </div>
    </div>
  );
}
