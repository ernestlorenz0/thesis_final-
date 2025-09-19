import React from 'react';

export default function TopBar({ 
  showSlideshow, 
  setShowSlideshow,
  onShare,
  onBack,
  onExport
}) {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 sm:px-8 lg:px-16 py-4 sm:py-6 lg:py-8 z-20">
      <div className="flex items-center gap-2 sm:gap-4">
        {onBack && (
          <button 
            className="group relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm border border-white/30 text-white font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            onClick={onBack}
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-600/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        )}
        <div className="text-lg sm:text-xl lg:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-wide drop-shadow">KENBILEARN</div>
      </div>
      <div className="flex gap-1 sm:gap-2">
        {onExport && (
          <button 
            className="group relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500/50" 
            onClick={onExport}
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
          </button>
        )}
        <button 
          className="group relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/50" 
          onClick={onShare}
        >
          <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span className="hidden sm:inline">Share</span>
          <span className="sm:hidden">Share</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
        </button>
        <button 
          className={`group relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base focus:outline-none focus:ring-2 ${
            showSlideshow 
              ? 'bg-white/20 backdrop-blur-sm border border-cyan-400/50 text-cyan-400 focus:ring-cyan-500/50' 
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white focus:ring-cyan-500/50'
          }`} 
          onClick={() => setShowSlideshow(v => !v)}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${showSlideshow ? 'group-hover:scale-110' : 'group-hover:rotate-12'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">{showSlideshow ? 'Exit Present' : 'Present'}</span>
          <span className="sm:hidden">{showSlideshow ? 'Exit' : 'Present'}</span>
          {!showSlideshow && (
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" />
          )}
        </button>
      </div>
    </div>
  );
}
