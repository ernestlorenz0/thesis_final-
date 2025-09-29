import React from "react";

/* Title Slide – Chalkboard with center text + doodles */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#1b1b1b] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Chalk smudge border */}
      <div className="absolute inset-4 border-[6px] border-green-400/60 rounded-xl opacity-50"></div>

      {/* Chalk doodles */}
      <div className="absolute top-10 left-16 text-pink-400/70 text-5xl">✏️</div>
      <div className="absolute bottom-14 right-20 text-yellow-300/70 text-4xl">★</div>
      <div className="absolute top-1/3 left-1/4 text-cyan-300/60 text-6xl">+</div>

      {/* Title */}
      <h1 className="text-6xl font-bold font-mono text-green-200 mb-4 drop-shadow-lg">
        {title}
      </h1>
      <h2 className="text-2xl font-mono text-gray-200">{subtitle}</h2>
    </section>
  );
}

/* Table of Contents Slide – Digital Chalkboard */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#1b1b1b] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Chalk smudge border */}
      <div className="absolute inset-8 border-[6px] border-green-400/60 rounded-xl opacity-60"></div>

      {/* Chalk doodles */}
      <div className="absolute top-20 left-24 text-yellow-300/70 text-5xl">★</div>
      <div className="absolute bottom-24 right-24 text-pink-400/70 text-4xl">✏️</div>
      <div className="absolute top-2/3 left-12 text-cyan-300/60 text-5xl">+</div>

      {/* Title */}
      <h2 className="text-6xl font-mono font-bold text-green-300 mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Main section */}
              <div className="flex items-start gap-4 hover:text-yellow-300 transition-colors duration-200">
                <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400 text-green-300 font-bold flex-shrink-0 mt-1">
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
                      <div className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full border border-pink-400/60 text-pink-300 text-xs flex-shrink-0 mt-1">
                          {sectionIndex + 1}.{catIndex + 1}
                        </span>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                              <span className="text-green-400 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-pink-400/60 text-pink-300 text-xs flex-shrink-0 mt-1">
                        {sectionIndex + 1}.{subIndex + 1}
                      </span>
                      <span className="text-lg opacity-90 text-left leading-tight flex-1">{subsection}</span>
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
              <div key={actualIndex} className="space-y-3">
                {/* Main section */}
                <div className="flex items-start gap-4 hover:text-yellow-300 transition-colors duration-200">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-green-400 text-green-300 font-bold flex-shrink-0 mt-1">
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
                        <div className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-pink-400/60 text-pink-300 text-xs flex-shrink-0 mt-1">
                            {actualIndex + 1}.{catIndex + 1}
                          </span>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                                <span className="text-green-400 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full border border-pink-400/60 text-pink-300 text-xs flex-shrink-0 mt-1">
                          {actualIndex + 1}.{subIndex + 1}
                        </span>
                        <span className="text-lg opacity-90 text-left leading-tight flex-1">{subsection}</span>
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


/* Main Slide 1 – Left title bar, chalk text on right */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2a2a2a] text-white flex">
      {/* Vertical title bar */}
      <div className="w-1/3 bg-[#1b1b1b] flex flex-col justify-center items-center border-r-4 border-green-400/40">
        <h2 className="text-7xl font-mono text-green-300 -rotate-2">{title}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-16 flex items-center">
        <p className="text-4xl font-mono leading-relaxed text-gray-200 whitespace-pre-line">
          {content}
        </p>
      </div>
    </section>
  );
}

/* Main Slide 2 – Top title, chalk underline, centered content */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#1b1b1b] text-white flex flex-col items-center justify-start p-16">
      <h2 className="text-7xl font-mono text-yellow-300 mb-2">{title}</h2>
      <div className="w-64 h-[3px] bg-pink-400/70 mb-12 -rotate-1"></div>
      <p className="text-4xl font-mono leading-relaxed max-w-4xl text-center text-gray-200">
        {content}
      </p>
    </section>
  );
}

/* Main Slide 3 – Chalkboard grid background, content left, doodle right */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2c2c2c] text-white flex items-center px-20">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Content */}
      <div className="flex-1 z-10 pr-12">
        <h2 className="text-7xl font-mono text-cyan-300 mb-20 mt-[-200px]">{title}</h2>
        <p className="text-4xl font-mono text-gray-200 leading-relaxed">{content}</p>
      </div>

      {/* Doodle area */}
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="text-8xl text-pink-400/70">✎</div>
      </div>
    </section>
  );
}

// Main Slide 4 – Orange Highlight
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#1a1a1a] text-white overflow-hidden flex items-center">
      {/* Orange gradient half overlay */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-bl from-yellow-600/90 to-yellow-800/70"></div>

      {/* Chalk doodles */}
      <div className="absolute top-20 left-20 text-6xl opacity-20">✏️</div>
      <div className="absolute bottom-20 right-24 text-6xl opacity-20">📐</div>

      {/* Text */}
      <div className="relative z-10 px-24 max-w-4xl">
        <h2 className="font-mono font-bold text-7xl mb-6 text-yellow-200">
          {title}
        </h2>
        <p className="font-mono text-4xl leading-relaxed text-white/90">
          {content}
        </p>
      </div>

      <div className="absolute flex-1 pl-16 z-10 ml-[1000px]">
        <img src="src/pngs/Elearning.png" alt="Elearning1" className="w-[700px] border-none"/>
      </div>
    </section>
  );
}

// Main Slide 5 – Split Notes Chalkboard
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex items-center px-24 py-16 overflow-hidden">
      {/* Chalk Doodles */}
      <div className="absolute top-12 left-16 text-6xl opacity-20">📘</div>
      <div className="absolute bottom-16 right-20 text-6xl opacity-20">✒️</div>

      {/* Left column */}
      <div className="flex-1 pr-16 z-10">
        <h2 className="font-mono font-bold text-7xl mb-6 text-yellow-200">
          {title}
        </h2>
        <p className="font-mono text-4xl leading-relaxed text-white/90">{content}</p>
      </div>

      {/* Divider */}
      <div className="w-[3px] h-[70%] bg-yellow-300 opacity-70"></div>

      {/* Right column */}
      <div className="flex-1 pl-16 z-10">
        <img src="src/pngs/Elearning1.png" alt="Elearning1" className="w-[700px] border-none"/>
      </div>
    </section>
  );
}

// Main Slide 6 – Center Highlight Chalk Frame
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#1b1b1b] flex items-center justify-center text-white px-24 py-20 overflow-hidden">
      {/* Chalkboard frame */}
      <div className="absolute inset-16 border-8 border-yellow-300 rounded-lg opacity-70"></div>

      {/* Chalk doodles */}
      <div className="absolute top-12 left-20 text-5xl opacity-20">⭐</div>
      <div className="absolute bottom-12 right-24 text-5xl opacity-20">📚</div>
      <div className="absolute top-1/3 right-1/3 text-4xl opacity-20">✏️</div>

      {/* Main text */}
      <div className="relative z-10 max-w-4xl text-center">
        <h2 className="font-mono font-bold text-7xl mb-8 text-yellow-200">
          {title}
        </h2>
        <p className="font-mono text-4xl leading-relaxed text-white/90">{content}</p>
      </div>
    </section>
  );
}

/* End Slide – Big thanks in chalk */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#1b1b1b] text-white flex flex-col items-center justify-center">
      <div className="absolute inset-10 border-[6px] border-pink-400/60 rounded-xl opacity-60"></div>
      <h2 className="text-8xl font-mono text-green-300 drop-shadow-lg">Thank You!</h2>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideChalkboard({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const DigitalChalkboard = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};

export default DigitalChalkboard;
