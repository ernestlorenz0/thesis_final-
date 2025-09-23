import React from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-yellow-300 via-orange-200 to-yellow-100 flex items-center justify-center overflow-hidden">
      {/* Decorative rays */}
      <div className="absolute inset-0 flex justify-center items-center">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[500px] bg-yellow-500/40 origin-bottom"
            style={{ transform: `rotate(${i * 18}deg)` }}
          ></div>
        ))}
      </div>

      {/* Main text */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold text-yellow-900 drop-shadow-xl mb-4">
          {title}
        </h1>
        <h2 className="text-2xl font-semibold text-yellow-800 opacity-90">
          {subtitle}
        </h2>
      </div>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#fff9c4] via-[#fff176] to-[#fdd835] text-[#2b2b2b] flex flex-col items-center justify-center overflow-hidden">
      {/* Background playful blobs */}
      <div className="absolute top-16 left-10 w-64 h-64 bg-yellow-300/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-24 right-24 w-72 h-72 bg-orange-300/40 rounded-full blur-2xl"></div>

      {/* Doodle accents */}
      <div className="absolute top-32 right-1/4 text-6xl rotate-12 text-orange-500/70">✨</div>
      <div className="absolute bottom-32 left-1/4 text-6xl -rotate-12 text-pink-500/70">⭐</div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold text-orange-600 mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Main section */}
              <div className="flex items-start gap-4 text-gray-800 hover:text-orange-600 transition-colors duration-200">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-lg flex-shrink-0 mt-1
                  ${sectionIndex % 4 === 0 ? "bg-orange-500" : sectionIndex % 4 === 1 ? "bg-pink-500" : sectionIndex % 4 === 2 ? "bg-purple-500" : "bg-red-500"}`}>
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
                      <div className="flex items-start gap-3 text-gray-700 hover:text-pink-600 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-md flex-shrink-0 mt-1
                          ${catIndex % 2 === 0 ? "bg-pink-400" : "bg-purple-400"}`}>
                          {sectionIndex + 1}.{catIndex + 1}
                        </div>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors duration-200">
                              <span className="text-orange-500 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 text-gray-700 hover:text-pink-600 transition-colors duration-200">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-md flex-shrink-0 mt-1
                        ${subIndex % 2 === 0 ? "bg-pink-400" : "bg-purple-400"}`}>
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
                <div className="flex items-start gap-4 text-gray-800 hover:text-orange-600 transition-colors duration-200">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-lg flex-shrink-0 mt-1
                    ${actualIndex % 4 === 0 ? "bg-orange-500" : actualIndex % 4 === 1 ? "bg-pink-500" : actualIndex % 4 === 2 ? "bg-purple-500" : "bg-red-500"}`}>
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
                        <div className="flex items-start gap-3 text-gray-700 hover:text-pink-600 transition-colors duration-200">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-md flex-shrink-0 mt-1
                            ${catIndex % 2 === 0 ? "bg-pink-400" : "bg-purple-400"}`}>
                            {actualIndex + 1}.{catIndex + 1}
                          </div>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors duration-200">
                                <span className="text-orange-500 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 text-gray-700 hover:text-pink-600 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-md flex-shrink-0 mt-1
                          ${subIndex % 2 === 0 ? "bg-pink-400" : "bg-purple-400"}`}>
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

export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden bg-yellow-100">
      {/* Decorative Blobs */}
      <div className="absolute -top-20 -left-32 w-[500px] h-[500px] bg-yellow-300/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-3xl"></div>

      {/* Left title column */}
      <div className="w-1/3 bg-yellow-400/90 p-16 flex flex-col justify-center items-start shadow-2xl relative z-10">
        <h2 className="text-7xl font-extrabold text-yellow-950 leading-tight drop-shadow-md">
          {title}
        </h2>
        <div className="mt-6 w-24 h-2 bg-yellow-900/70 rounded-full"></div>
      </div>

      {/* Right content column */}
      <div className="flex-1 flex items-center justify-center px-24 relative">
        {/* Curved divider that blends yellow shades */}
        <div className="absolute inset-y-0 left-0 w-[120%] bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 rounded-l-[50%]"></div>
        
        <p className="relative z-10 text-4xl text-yellow-900 leading-relaxed max-w-3xl font-light">
          {content}
        </p>
      </div>
    </section>
  );
}


/* ---------------- MAIN SLIDE 2 ---------------- */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-yellow-200 to-orange-100 flex items-center justify-center overflow-hidden">
      {/* Floating card tilted */}
      <div className="relative bg-white/90 p-12 rounded-3xl shadow-2xl border-8 border-yellow-400 rotate-[-2deg] max-w-3xl text-center">
        <h2 className="text-7xl font-bold text-yellow-800 mb-6">{title}</h2>
        <p className="text-4xl text-yellow-900 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-yellow-50 flex overflow-hidden">
      {/* Background dots grid */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-6 opacity-20">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        ))}
      </div>

      {/* Soft blobs */}
      <div className="absolute -top-32 -left-40 w-[600px] h-[600px] bg-yellow-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-100px] right-[-150px] w-[700px] h-[700px] bg-orange-200/40 rounded-full blur-3xl"></div>

      {/* Subtle diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/50 via-transparent to-yellow-200/40"></div>

      {/* Floating icons */}
      <FaRegLightbulb className="absolute top-24 left-32 text-yellow-600 opacity-30 text-8xl" />
      <MdOutlineMenuBook className="absolute bottom-32 left-48 text-orange-400 opacity-25 text-9xl" />
      <FaRegCommentDots className="absolute top-40 right-32 text-yellow-500 opacity-30 text-8xl" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-16">
        <h2 className="text-7xl font-extrabold text-yellow-900 mb-6 drop-shadow-md">
          {title}
        </h2>
        <p className="text-4xl text-yellow-800 leading-relaxed max-w-3xl">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 4 ---------------- */
/* Diagonal split design with angled title band */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-100 overflow-hidden flex">
      {/* Diagonal title band */}
      <div className="absolute -left-32 top-0 w-[60%] h-full bg-gradient-to-br from-yellow-400 to-orange-300 -skew-x-12 shadow-xl"></div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-center pl-32 w-2/3">
        <h2 className="text-7xl font-extrabold text-yellow-900 mb-6">{title}</h2>
        <p className="text-4xl text-orange-900 max-w-2xl leading-relaxed">
          {content}
        </p>
      </div>

      <div className="absolute right-20 top-0 w-1/3 h-full flex items-center justify-center">
        <img src="src/svgs/bulb.svg" alt="bulb" />
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 5 ---------------- */
/* Circular spotlight content */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-100 to-yellow-50 overflow-hidden">
      {/* Big circular spotlight */}
      <div className="absolute w-[1400px] h-[1400px] rounded-full bg-white/70 border-[20px] border-yellow-400 shadow-2xl"></div>

      {/* Text inside spotlight */}
      <div className="relative z-10 text-center px-16">
        <h2 className="text-7xl font-bold text-orange-800 mb-8">{title}</h2>
        <p className="text-3xl text-yellow-900 max-w-4xl mx-auto leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 6 ---------------- */
/* Text flowing with layered waves */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden bg-gradient-to-tr from-yellow-100 to-orange-50 flex flex-col justify-center">
      {/* Background waves */}
      <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-r from-yellow-400 to-orange-300 rounded-t-[50%]"></div>
      <div className="absolute bottom-0 w-full h-[250px] bg-orange-400/60 rounded-t-[45%] blur-2xl"></div>

      {/* Title and content directly on canvas */}
      <div className="relative z-10 px-32">
        <h2 className="text-7xl font-extrabold text-orange-900 mb-8">{title}</h2>
        <p className="text-3xl text-yellow-900 leading-relaxed max-w-4xl">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-yellow-400 to-orange-300 flex items-center justify-center">
      <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
        Thank You 🌞
      </h1>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideYouthfulYellow({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const YouthfulYellow = {
  TitleSlide,
  TOCSlides: TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};
export default YouthfulYellow;
