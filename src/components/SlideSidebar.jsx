import React from 'react';

export default function SlideSidebar({ slides, current, setCurrent, renderThumb, addSlide }) {
  return (
    <aside className="w-64 bg-white/80 border-r border-gray-200 flex flex-col shadow-xl z-10">
      <div className="p-4 border-b border-gray-200">
        <button className="w-full bg-purple-600 text-white rounded py-2 font-semibold hover:bg-purple-700 transition" onClick={addSlide}>+ New Slide</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-l-4 ${idx === current ? 'border-purple-500 bg-purple-50' : 'border-transparent hover:bg-gray-50'}`}
            onClick={() => setCurrent(idx)}
          >
            <span className="text-xs text-gray-400 w-6">{idx + 1}</span>
            {renderThumb(slide)}
          </div>
        ))}
      </div>
    </aside>
  );
}
