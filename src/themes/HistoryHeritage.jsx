import React from "react";
import { Landmark, Scroll, BookOpen, Feather, Hourglass } from "lucide-react";

/* Title Slide – Split diagonal gold panel */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-yellow-900 text-yellow-100 overflow-hidden flex items-center justify-center">
      {/* Diagonal golden panel */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-600 to-yellow-400 transform -skew-y-6 origin-top-left"></div>

      {/* Text */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-serif font-bold drop-shadow mb-4">{title}</h1>
        <h2 className="text-2xl italic font-serif">{subtitle}</h2>
      </div>
    </section>
  );
}


export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#fdfaf3] text-[#2b2b2b] flex flex-col items-center justify-center overflow-hidden">
      {/* Parchment texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50"></div>

      {/* Ornamental border */}
      <div className="absolute inset-16 border-[8px] border-[#8b5e3c] rounded-xl shadow-lg"></div>

      {/* Classical icons */}
      <div className="absolute top-24 left-24 text-7xl text-[#8b5e3c]/40">🏛️</div>
      <div className="absolute bottom-24 right-24 text-7xl text-[#b08d57]/40">📜</div>

      {/* Title */}
      <h2 className="text-6xl font-serif font-bold text-[#5a3d2b] mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              {/* Main section */}
              <div className="flex items-start gap-4 hover:text-[#8b5e3c] transition-colors duration-200">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#a67c00] text-white font-bold shadow-md flex-shrink-0 mt-1">
                  {sectionIndex + 1}
                </span>
                <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
              </div>
              
              {/* Categories and Terms */}
              {(section.categories || section.subsections) && (
                <div className="ml-14 space-y-3">
                  {/* Handle new categories format */}
                  {section.categories && section.categories.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-2">
                      {/* Category name */}
                      <div className="flex items-start gap-3 hover:text-[#b08d57] transition-colors duration-200">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b08d57] to-[#8b5e3c] text-white text-xs font-semibold flex-shrink-0 mt-1">
                          {sectionIndex + 1}.{catIndex + 1}
                        </span>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-[#8b5e3c] hover:text-[#b08d57] transition-colors duration-200">
                              <span className="text-[#d4af37] text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 hover:text-[#b08d57] transition-colors duration-200">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b08d57] to-[#8b5e3c] text-white text-xs font-semibold flex-shrink-0 mt-1">
                        {sectionIndex + 1}.{subIndex + 1}
                      </span>
                      <span className="text-lg text-left leading-tight flex-1 opacity-90">{subsection}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="space-y-4">
                {/* Main section */}
                <div className="flex items-start gap-4 hover:text-[#8b5e3c] transition-colors duration-200">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#a67c00] text-white font-bold shadow-md flex-shrink-0 mt-1">
                    {actualIndex + 1}
                  </span>
                  <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
                </div>
                
                {/* Categories and Terms */}
                {(section.categories || section.subsections) && (
                  <div className="ml-14 space-y-3">
                    {/* Handle new categories format */}
                    {section.categories && section.categories.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        {/* Category name */}
                        <div className="flex items-start gap-3 hover:text-[#b08d57] transition-colors duration-200">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b08d57] to-[#8b5e3c] text-white text-xs font-semibold flex-shrink-0 mt-1">
                            {actualIndex + 1}.{catIndex + 1}
                          </span>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-[#8b5e3c] hover:text-[#b08d57] transition-colors duration-200">
                                <span className="text-[#d4af37] text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 hover:text-[#b08d57] transition-colors duration-200">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b08d57] to-[#8b5e3c] text-white text-xs font-semibold flex-shrink-0 mt-1">
                          {actualIndex + 1}.{subIndex + 1}
                        </span>
                        <span className="text-lg text-left leading-tight flex-1 opacity-90">{subsection}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Main Slide 1 – Left gold column, right parchment content */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] flex">
      {/* Gold sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-yellow-800 to-yellow-500 flex items-center justify-center">
        <h2 className="text-5xl font-serif font-bold text-yellow-100 text-center px-4">
          {title}
        </h2>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-gradient-to-br from-yellow-50 to-yellow-100 p-16 flex items-center">
        <p className="text-3xl font-serif leading-relaxed text-gray-900">{content}</p>
      </div>
    </section>
  );
}


/* Main Slide 2 – Framed parchment with top banner */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-yellow-200 to-yellow-50 text-gray-900 p-16">
      {/* Ornamental frame */}
      <div className="absolute inset-6 border-[8px] border-yellow-700 rounded-lg"></div>

      {/* Title banner */}
      <div className="relative bg-gradient-to-r from-yellow-800 to-yellow-600 px-12 py-4 mb-10 shadow-lg w-fit">
        <h2 className="text-6xl font-serif font-bold text-yellow-100">{title}</h2>
      </div>

      <p className="text-3xl font-serif max-w-5xl leading-relaxed relative z-10">{content}</p>
    </section>
  );
}

/* Main Slide 3 – Diagonal cut layout with golden overlay */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex text-yellow-100">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-600"></div>

      {/* Diagonal gold overlay */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-yellow-700/80 to-yellow-500/70 transform -skew-x-6 origin-top-right"></div>

      {/* Layout */}
      <div className="relative z-10 flex w-full h-full">
        {/* Title sidebar */}
        <div className="w-1/3 flex items-center justify-center bg-yellow-900/40">
          <h2 className="text-5xl font-serif font-bold text-yellow-100 text-center px-6">
            {title}
          </h2>
        </div>

        {/* Content area */}
        <div className="flex-1 flex items-center p-16">
          <p className="text-3xl font-serif leading-relaxed">{content}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 4 – Scroll layout (ancient scroll effect) */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-yellow-200 to-yellow-50 flex flex-col items-center justify-center text-gray-900 overflow-hidden">

      {/* Subtle background icons */}
      <Landmark className="absolute top-20 left-28 w-32 h-32 text-yellow-600 opacity-25 rotate-6" />
      <Scroll className="absolute bottom-24 right-32 w-28 h-28 text-amber-500 opacity-25 rotate-[-8deg]" />
      <BookOpen className="absolute top-1/3 right-1/4 w-28 h-28 text-orange-400 opacity-25" />
      <Feather className="absolute bottom-1/3 left-1/4 w-24 h-24 text-red-400 opacity-25" />
      <Hourglass className="absolute top-1/2 right-16 w-28 h-28 text-emerald-500 opacity-25 rotate-3" />

      {/* Decorative border */}
      <div className="absolute inset-12 border-4 border-amber-600 rounded-lg opacity-30" />

      {/* Scroll edges */}
      <div className="absolute top-0 left-0 w-full h-20 bg-yellow-700 rounded-b-full"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-yellow-700 rounded-t-full"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-12">
        {/* Title */}
        <h2 className="text-6xl font-serif font-bold text-yellow-900 mb-10">
          {title}
        </h2>

        {/* Content */}
        <p className="max-w-5xl text-3xl font-serif leading-relaxed">
          {content}
        </p>
      </div>

    </section>
  );
}

/* Main Slide 5 – Twin column parchment with gold divider */
export function MainSlide5({  title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center bg-[#fdf6e3] text-gray-900 overflow-hidden">

      {/* Subtle background icons */}
      <Landmark className="absolute top-20 left-28 w-32 h-32 text-yellow-600 opacity-25 rotate-6" />
      <Scroll className="absolute bottom-24 right-32 w-28 h-28 text-amber-500 opacity-25 rotate-[-8deg]" />
      <BookOpen className="absolute top-1/3 right-1/4 w-28 h-28 text-orange-400 opacity-25" />
      <Feather className="absolute bottom-1/3 left-1/4 w-24 h-24 text-red-400 opacity-25" />
      <Hourglass className="absolute top-1/2 right-16 w-28 h-28 text-emerald-500 opacity-25 rotate-3" />

      {/* Decorative border */}
      <div className="absolute inset-12 border-4 border-amber-600 rounded-lg opacity-30" />
      {/* Gold divider */}
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        {/* Title */}
        <h2 className="text-6xl font-serif font-bold text-yellow-900 mb-10">
          {title}
        </h2>

        {/* Content */}
        <p className="max-w-5xl text-3xl font-serif leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  );
}

/* Main Slide 6 – Golden arch motif */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-600 text-yellow-100 flex items-center justify-center overflow-hidden">
      {/* Arch frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1200px] h-[800px] border-[16px] border-yellow-400/70 rounded-t-full rounded-b-lg opacity-40"></div>
      </div>

      {/* Inner glow arch */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1000px] h-[650px] border-[10px] border-yellow-300/50 rounded-t-full rounded-b-lg opacity-50"></div>
      </div>

      {/* Content inside the arch */}
      <div className="relative z-10 text-center max-w-5xl">
        <h2 className="text-6xl font-serif font-bold mb-8">{title}</h2>
        <p className="text-3xl font-serif leading-relaxed">{content}</p>
      </div>
    </section>
  );
}



/* Image Slide – Gold pedestal frame */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-yellow-100 to-yellow-50 flex flex-col items-center justify-center">
      {/* Frame */}
      <div className="absolute inset-10 border-[10px] border-yellow-700 rounded-xl"></div>

      <img
        src={imageUrl}
        alt="heritage visual"
        className="relative z-10 max-h-[420px] rounded-lg shadow-2xl border-8 border-yellow-600 mb-6"
      />
      <h3 className="text-2xl font-serif font-bold text-yellow-900">{title}</h3>
    </section>
  );
}

/* End Slide – Strong regal close with diagonal overlay */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center text-yellow-100 overflow-hidden">
      {/* Gold gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-600"></div>
      {/* Diagonal overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-700/50 to-yellow-500/30 transform skew-y-3"></div>

      {/* Subtle background icons */}
      <Landmark className="absolute top-24 left-24 w-32 h-32 text-yellow-600 opacity-25" />
      <Scroll className="absolute bottom-28 right-28 w-28 h-28 text-amber-500 opacity-25" />
      <BookOpen className="absolute top-1/3 left-1/4 w-28 h-28 text-orange-400 opacity-25" />
      <Feather className="absolute bottom-1/3 right-1/4 w-24 h-24 text-red-400 opacity-25" />
      <Hourglass className="absolute top-1/2 right-16 w-28 h-28 text-emerald-500 opacity-25" />

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-serif font-bold mb-4">{message}</h2>
        <p className="text-8xl italic">Thank You</p>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideHistoryHeritage({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const HistoryHeritage = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default HistoryHeritage;
