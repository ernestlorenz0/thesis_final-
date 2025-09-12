import React from 'react';

export default function TopBar({ 
  showSlideshow, 
  setShowSlideshow,
  onShare,
  onBack,
  onExport
}) {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-16 py-8 z-20">
      <div className="flex items-center gap-4">
        {onBack && (
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8C6BFA] text-white hover:bg-[#7B61FF] font-semibold transition-all duration-200 shadow-md"
            onClick={onBack}
          >
            ← Back
          </button>
        )}
        <div className="text-2xl font-bold tracking-wide text-purple-700 drop-shadow">KENBILERN</div>
      </div>
      <div className="flex gap-2">
        {onExport && (
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded shadow flex items-center gap-2" 
            onClick={onExport}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </button>
        )}
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow flex items-center gap-2" 
          onClick={onShare}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          Share
        </button>
        <button 
          className={`px-4 py-2 rounded font-semibold flex items-center gap-2 ${showSlideshow ? 'bg-blue-100 text-blue-700' : 'bg-blue-600 hover:bg-blue-700 text-white'}`} 
          onClick={() => setShowSlideshow(v => !v)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1V4a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0V4" />
          </svg>
          Present
        </button>
      </div>
    </div>
  );
}
