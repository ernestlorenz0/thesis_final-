import React from 'react';

export default function FloatingAddButtons({ addComponent, fileInputRef, slides, current, handleImageUpload }) {
  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
      <button className="bg-gray-700 hover:bg-gray-800 text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.13a4 4 0 01.88 7.9M12 7v6m0 0l-3-3m3 3l3-3" />
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
