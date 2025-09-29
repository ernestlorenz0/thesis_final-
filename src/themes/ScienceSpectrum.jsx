import React from "react";
import { Atom, Microscope, FlaskConical, Beaker, Brain } from "lucide-react";

/* Title Slide – Spectrum gradient background with atom motif */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Floating science icons */}
      <div className="absolute top-10 left-12 text-6xl opacity-40">⚛️</div>
      <div className="absolute bottom-14 right-16 text-5xl opacity-40">🧬</div>
      <div className="absolute top-1/3 right-1/4 text-7xl opacity-30">🧪</div>

      {/* Title text */}
      <h1 className="text-8xl font-extrabold font-sans drop-shadow-lg mb-4">
        {title}
      </h1>
      <h2 className="text-2xl font-light opacity-90">{subtitle}</h2>
    </section>
  );
}

/* Table of Contents Slide – Science Spectrum */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0a0a0f] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient spectrum background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-700 to-cyan-500 opacity-40 blur-2xl"></div>

      {/* Orbiting circles */}
      <div className="absolute w-[600px] h-[600px] border border-cyan-400/40 rounded-full animate-pulse"></div>
      <div className="absolute w-[900px] h-[900px] border border-purple-400/30 rounded-full animate-spin-slow"></div>

      {/* Floating geometric accents */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-cyan-400/30 rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-400/30 rounded-full"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Main section */}
              <div className="flex items-start gap-4 text-gray-200 hover:text-cyan-300 transition-colors duration-200">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-[0_0_20px_rgba(34,211,238,0.6)] flex-shrink-0 mt-1
                  ${sectionIndex % 3 === 0 ? "bg-gradient-to-r from-cyan-400 to-blue-500" : sectionIndex % 3 === 1 ? "bg-gradient-to-r from-purple-400 to-pink-500" : "bg-gradient-to-r from-green-400 to-teal-500"}`}>
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
                      <div className="flex items-start gap-3 text-gray-300 hover:text-purple-300 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] flex-shrink-0 mt-1
                          ${catIndex % 2 === 0 ? "bg-gradient-to-r from-purple-400 to-pink-400" : "bg-gradient-to-r from-cyan-400 to-teal-400"}`}>
                          {sectionIndex + 1}.{catIndex + 1}
                        </div>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-gray-300 hover:text-cyan-200 transition-colors duration-200">
                              <span className="text-cyan-400 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 text-gray-300 hover:text-purple-300 transition-colors duration-200">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] flex-shrink-0 mt-1
                        ${subIndex % 2 === 0 ? "bg-gradient-to-r from-purple-400 to-pink-400" : "bg-gradient-to-r from-cyan-400 to-teal-400"}`}>
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
                <div className="flex items-start gap-4 text-gray-200 hover:text-cyan-300 transition-colors duration-200">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold shadow-[0_0_20px_rgba(34,211,238,0.6)] flex-shrink-0 mt-1
                    ${actualIndex % 3 === 0 ? "bg-gradient-to-r from-cyan-400 to-blue-500" : actualIndex % 3 === 1 ? "bg-gradient-to-r from-purple-400 to-pink-500" : "bg-gradient-to-r from-green-400 to-teal-500"}`}>
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
                        <div className="flex items-start gap-3 text-gray-300 hover:text-purple-300 transition-colors duration-200">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] flex-shrink-0 mt-1
                            ${catIndex % 2 === 0 ? "bg-gradient-to-r from-purple-400 to-pink-400" : "bg-gradient-to-r from-cyan-400 to-teal-400"}`}>
                            {actualIndex + 1}.{catIndex + 1}
                          </div>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-gray-300 hover:text-cyan-200 transition-colors duration-200">
                                <span className="text-cyan-400 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 text-gray-300 hover:text-purple-300 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.4)] flex-shrink-0 mt-1
                          ${subIndex % 2 === 0 ? "bg-gradient-to-r from-purple-400 to-pink-400" : "bg-gradient-to-r from-cyan-400 to-teal-400"}`}>
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

/* Main Slide 1 – Title on top, spectrum underline, content below */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex flex-col px-24 py-16">
      <Microscope className="absolute bottom-24 right-40 w-32 h-32 text-green-400 opacity-30 rotate-[-8deg]" />
      <FlaskConical className="absolute top-1/3 right-1/4 w-28 h-28 text-blue-400 opacity-30" />
      <Beaker className="absolute bottom-1/3 left-1/4 w-28 h-28 text-yellow-400 opacity-30" />
      <Brain className="absolute top-1/2 left-12 w-32 h-32 text-purple-400 opacity-30 rotate-6" />

      {/* Decorative glowing border */}
      <div className="absolute inset-12 border-4 border-cyan-400 rounded-2xl opacity-30 shadow-[0_0_25px_rgba(34,211,238,0.5)]" />

      <h2 className="text-6xl font-bold mb-3">{title}</h2>
      <div className="h-[4px] w-56 bg-gradient-to-r from-yellow-300 via-green-300 to-cyan-400 mb-10"></div>
      <p className="text-3xl leading-relaxed max-w-5xl text-gray-100">{content}</p>
    </section>
  );
}

/* Main Slide 2 – Split layout, left content, right decorative molecule */
export function MainSlide2({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white flex px-20 py-16">
      <div className="flex-1 pr-12 flex flex-col justify-center">
        <h2 className="text-6xl font-bold mb-20 mt-[-200px]">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-100">{content}</p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src="src/pngs/chemistrylab.png" alt="chemistrylab" className="w-[700px]"/>
      </div>
    </section>
  );
}

/* Main Slide 3 – Dark gradient with glowing science shapes */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white flex flex-col items-center justify-center px-24 py-16">
      {/* Background floating icons */}
      <div className="absolute top-12 left-20 text-6xl opacity-25">🪐</div>
      <div className="absolute bottom-20 right-28 text-7xl opacity-25">🔬</div>
      <div className="absolute top-1/2 left-1/3 text-5xl opacity-20">🧪</div>

      <h2 className="text-6xl font-bold mb-20 mt-[-200px] z-10">{title}</h2>
      <p className="text-3xl leading-relaxed max-w-4xl text-center z-10">{content}</p>
    </section>
  );
}

/* Main Slide 4 – Left Image, Right Text with Spectrum Accent */
export function MainSlide4({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 text-white flex overflow-hidden">
      {/* Left image area */}
      <div className="w-1/2 flex items-center justify-center">
        <img src="src/pngs/sciencelab.png" alt="sciencelab" className="w-[600px]"/>
      </div>
      {/* Right text area */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-7xl font-bold mb-8">{title}</h2>
        <p className="text-4xl leading-relaxed text-gray-100">{content}</p>
      </div>

      {/* Science accents */}
      <div className="absolute top-10 left-10 text-6xl opacity-30">🧬</div>
      <div className="absolute bottom-16 right-16 text-6xl opacity-30">🪐</div>
    </section>
  );
}

/* Main Slide 5 – Centered Text with Circular Orbit Icons */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-pink-600 via-yellow-500 to-green-400 text-white flex flex-col items-center justify-center px-24">
      {/* Orbiting icons */}
      <div className="absolute top-24 left-1/4 text-6xl opacity-30">⚛️</div>
      <div className="absolute bottom-28 right-1/4 text-7xl opacity-30">🔭</div>
      <div className="absolute top-1/3 right-1/3 text-5xl opacity-25">🧪</div>

      {/* Content */}
      <h2 className="text-6xl font-bold mb-10 text-center">{title}</h2>
      <p className="text-3xl leading-relaxed max-w-5xl text-center text-gray-100">
        {content}
      </p>
    </section>
  );
}

/* Main Slide 6 – Diagonal Split with Gradient and Molecule Motif */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex text-white overflow-hidden">
      {/* Left diagonal gradient */}
      <div className="w-2/3 bg-gradient-to-br from-indigo-900 via-blue-800 to-cyan-600 transform -skew-x-6 origin-top-left flex items-center justify-center px-20">
        <div className="max-w-3xl">
          <h2 className="text-6xl font-bold mb-8">{title}</h2>
          <p className="text-3xl leading-relaxed text-gray-100">{content}</p>
        </div>
      </div>
      {/* Right decorative area */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-t from-purple-700/60 to-pink-600/60">
        <div className="text-8xl opacity-30">🧬</div>
      </div>
    </section>
  );
}


/* End Slide – Dark background with glowing atom */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-indigo-800 to-purple-700 flex flex-col items-center justify-center text-white">
      <div className="absolute top-10 right-20 text-9xl opacity-20">⚛️</div>
      <h2 className="text-6xl font-bold mb-4">{message}</h2>
      <p className="text-2xl opacity-80">The End</p>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideScienceSpectrum({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const ScienceSpectrum = {
  TitleSlide,
  TOCSlides: TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};

export default ScienceSpectrum;
