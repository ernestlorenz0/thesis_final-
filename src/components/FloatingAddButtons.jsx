import React, { useState } from 'react';

export default function FloatingAddButtons({ addComponent, fileInputRef, slides, current, handleImageUpload }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
      {/* Expanded buttons */}
      {isExpanded && (
        <>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all transform hover:scale-105" 
            onClick={() => {
              addComponent('title');
              setIsExpanded(false);
            }}
            title="Add Title"
          >
            <span className="text-xl font-bold">T</span>
          </button>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all transform hover:scale-105" 
            onClick={() => {
              addComponent('paragraph');
              setIsExpanded(false);
            }}
            title="Add Paragraph"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all transform hover:scale-105" 
            onClick={() => {
              fileInputRef.current && fileInputRef.current.click();
              setIsExpanded(false);
            }}
            title="Add Image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </>
      )}
      
      {/* Main toggle button */}
      <button 
        className={`text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-all transform ${
          isExpanded 
            ? 'bg-red-600 hover:bg-red-700 rotate-45' 
            : 'bg-gray-700 hover:bg-gray-800 hover:scale-105'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Close menu' : 'Add content'}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => {
        const file = e.target.files[0];
        if (file) {
          addComponent('image');
          setTimeout(() => {
            const idx = slides[current]?.components?.length || 0;
            handleImageUpload(idx - 1, file);
          }, 50);
        }
        e.target.value = '';
      }} />
    </div>
  );
}
