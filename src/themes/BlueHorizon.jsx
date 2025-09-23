import React from "react";
import { Compass, Globe, Waves, Sun, Star, Moon, Cloud } from "lucide-react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2b6cb0] overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-white font-[HedvigLettersSerif] text-6xl">{title}</h1>
        {subtitle && <p className="text-white text-lg mt-3">{subtitle}</p>}
      </div>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-sky-700 via-sky-500 to-sky-300 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Horizon glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sky-200/40 to-transparent"></div>

      {/* Wave shapes */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-sky-800/80 to-transparent rounded-t-[100%]"></div>
      <div className="absolute bottom-12 w-full h-40 bg-gradient-to-t from-blue-900/70 to-transparent rounded-t-[100%]"></div>

      {/* Floating circles (bubbles/clouds) */}
      <div className="absolute top-20 left-24 w-40 h-40 rounded-full bg-sky-200/30 blur-3xl"></div>
      <div className="absolute top-32 right-40 w-60 h-60 rounded-full bg-blue-300/30 blur-3xl"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-sky-200 via-white to-blue-200 drop-shadow-[0_0_20px_rgba(135,206,250,0.6)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Main section */}
              <div className="flex items-start gap-4 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold flex-shrink-0 mt-1">
                  {sectionIndex + 1}
                </div>
                <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
              </div>
              
              {/* Categories and Terms */}
              {(section.categories || section.subsections) && (
                <div className="ml-14 space-y-3">
                  {/* Handle new categories format */}
                  {section.categories && section.categories.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-2">
                      {/* Category name */}
                      <div className="flex items-start gap-3 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-400 text-white text-xs font-semibold flex-shrink-0 mt-1">
                          {sectionIndex + 1}.{catIndex + 1}
                        </div>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                              <span className="text-blue-500 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-400 text-white text-xs font-semibold flex-shrink-0 mt-1">
                        {sectionIndex + 1}.{subIndex + 1}
                      </div>
                      <span className="text-lg text-left leading-tight flex-1">{subsection}</span>
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
                <div className="flex items-start gap-4 text-gray-800 hover:text-blue-600 transition-colors duration-200">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white text-lg font-bold flex-shrink-0 mt-1">
                    {actualIndex + 1}
                  </div>
                  <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
                </div>
                
                {/* Categories and Terms */}
                {(section.categories || section.subsections) && (
                  <div className="ml-14 space-y-3">
                    {/* Handle new categories format */}
                    {section.categories && section.categories.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        {/* Category name */}
                        <div className="flex items-start gap-3 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-400 text-white text-xs font-semibold flex-shrink-0 mt-1">
                            {actualIndex + 1}.{catIndex + 1}
                          </div>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                                <span className="text-blue-500 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-400 text-white text-xs font-semibold flex-shrink-0 mt-1">
                          {actualIndex + 1}.{subIndex + 1}
                        </div>
                        <span className="text-lg text-left leading-tight flex-1">{subsection}</span>
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

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex flex-col items-center justify-center p-10 text-center">
      <div className="absolute top-0 left-0 w-32 h-full bg-[#3182ce] clip-path-polygon"></div>
      <div className="absolute bottom-0 right-0 w-32 h-full bg-[#2b6cb0]"></div>

      <Compass className="absolute top-20 left-28 w-32 h-32 text-blue-800 opacity-30 drop-shadow-md" />
      <Globe className="absolute bottom-24 right-40 w-28 h-28 text-indigo-700 opacity-30 drop-shadow-md" />
      <Waves className="absolute bottom-1/3 left-1/4 w-24 h-24 text-blue-900 opacity-25 drop-shadow-md" />
      <Sun className="absolute top-1/2 right-16 w-28 h-28 text-amber-600 opacity-25 drop-shadow-md" />

      <div className="relative z-10 max-w-3xl">
        <h2 className="font-[HedvigLettersSerif] text-6xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-3xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      <div className="w-1/2 flex flex-col justify-center p-10">
        <h2 className="font-[HedvigLettersSerif] text-7xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-4xl leading-relaxed">{content}</p>
      </div>
      <div className="w-1/2 flex items-center justify-center p-4">
        <img src="src/svgs/learning2.svg" alt="learning" className="w-[700px]"/>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      <div className="w-1/2 flex items-center justify-center p-4">
        <img src="src/svgs/booklover.svg" alt="booklover" className="w-[700px]"/>
      </div>
      <div className="w-1/2 flex flex-col justify-center p-10 text-right">
        <h2 className="font-[HedvigLettersSerif] text-7xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-4xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden bg-gradient-to-br from-sky-50 to-blue-100">
      {/* ===== LEFT SIDEBAR ===== */}
      <div className="w-1/3 bg-gradient-to-b from-sky-700 to-blue-800 flex flex-col justify-center items-center p-16 text-white relative overflow-hidden">
        {/* Glow Blob */}
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-sky-400/20 rounded-full blur-3xl"></div>

        {/* Decorative Diagonal Ribbon */}
        <div className="absolute -left-20 bottom-10 w-[350px] h-[80px] bg-sky-500/30 rotate-12 rounded-xl"></div>

        <h2 className="font-[HedvigLettersSerif] text-5xl font-bold mb-6 drop-shadow-lg relative z-10">
          {title}
        </h2>

        {/* Horizon line */}
        <div className="h-[5px] w-28 bg-gradient-to-r from-sky-300 to-amber-300 rounded-full relative z-10"></div>

        {/* Bottom Wave Shape */}
        <svg
          className="absolute bottom-0 left-0 w-full text-sky-500/20"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,256L80,240C160,224,320,192,480,181.3C640,171,800,181,960,202.7C1120,224,1280,256,1360,272L1440,288V320H0Z" />
        </svg>
      </div>

      {/* ===== RIGHT CONTENT ===== */}
      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-tl from-blue-50 to-sky-100 p-20 overflow-hidden">
        {/* Soft Blobs */}
        <div className="absolute top-10 right-16 w-72 h-72 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-16 w-60 h-60 bg-sky-400/20 rounded-full blur-2xl"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border-4 border-sky-300/40 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rotate-45 border-4 border-blue-400/30"></div>

        <p className="text-3xl text-gray-700 leading-relaxed max-w-3xl text-center drop-shadow-sm relative z-10">
          {content}
        </p>
      </div>
    </section>
  );
}

export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#bee3f8] to-[#ebf8ff] flex items-center justify-center overflow-hidden">
      {/* ===== Glowing Blobs for Depth ===== */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#90cdf4]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#63b3ed]/25 rounded-full blur-3xl"></div>

      {/* ===== Geometric Accents with Glow ===== */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#2b6cb0]/40 rotate-45 shadow-[0_0_80px_20px_rgba(43,108,176,0.3)]"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-[#3182ce]/30 rotate-12 shadow-[0_0_100px_25px_rgba(49,130,206,0.25)]"></div>

      {/* Subtle glowing outline circle */}
      <div className="absolute top-1/2 left-1/4 w-60 h-60 border-4 border-sky-400/30 rounded-full blur-sm shadow-[0_0_60px_15px_rgba(56,178,255,0.25)]"></div>

      {/* ===== Center Content ===== */}
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="font-[HedvigLettersSerif] text-6xl text-[#2b6cb0] mb-6 drop-shadow-md">
          {title}
        </h2>
        <p className="text-3xl text-gray-800 leading-relaxed drop-shadow-sm">
          {content}
        </p>
      </div>
    </section>
  );
}


export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2b6cb0] overflow-hidden flex items-center justify-center">
      <Star className="absolute top-20 left-40 w-16 h-16 text-cyan-200 opacity-40" />
      <Star className="absolute top-32 right-48 w-12 h-12 text-blue-200 opacity-40" />
      <Moon className="absolute top-1/4 right-1/3 w-28 h-28 text-amber-200 opacity-60" />
      <Cloud className="absolute bottom-28 left-1/4 w-36 h-36 text-blue-300 opacity-30" />
      <Waves className="absolute bottom-12 right-1/4 w-28 h-28 text-cyan-300 opacity-25" />

      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>
      <h1 className="text-white font-[HedvigLettersSerif] text-6xl">End Slide</h1>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideBlueHorizon({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const BlueHorizon = { 
  TitleSlide, 
  TOCSlide,
  MainSlide, 
  MainSlide2,
  MainSlide3,
  MainSlide4,
  EndSlide 
};
export default BlueHorizon;
