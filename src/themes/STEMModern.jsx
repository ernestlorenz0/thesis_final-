import React from "react";
import { Atom, Beaker, CircuitBoard, FunctionSquare, FlaskConical } from "lucide-react";

// STEM Modern Title Slide
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] text-white flex flex-col items-center justify-center rounded-2xl shadow-2xl overflow-hidden">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#00f6ff20,transparent)]"></div>

      <h1 className="text-6xl font-extrabold font-mono drop-shadow-[0_0_15px_rgba(0,246,255,0.7)] mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-2xl font-light font-mono opacity-90">{subtitle}</p>
      )}
    </section>
  );
}

/* Table of Contents Slide – STEM Modern Artistic */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0d0d0f] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Abstract gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-[180px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400 rounded-full blur-[200px] opacity-40"></div>

      {/* Geometric + STEM-inspired lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-400 drop-shadow-lg mb-16">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              {/* Main section */}
              <div className="flex items-start gap-4 hover:text-cyan-300 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center text-sm text-cyan-400 font-bold flex-shrink-0 mt-1">
                  {sectionIndex + 1}
                </div>
                <span className="text-3xl font-semibold text-left leading-tight flex-1">{section.title}</span>
              </div>
              
              {/* Categories and Terms */}
              {(section.categories || section.subsections) && (
                <div className="ml-14 space-y-3">
                  {/* Handle new categories format */}
                  {section.categories && section.categories.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-2">
                      {/* Category name */}
                      <div className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                        <div className="w-6 h-6 rounded-full border border-pink-400/60 flex items-center justify-center text-xs text-pink-400 flex-shrink-0 mt-1">
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
                    <div key={subIndex} className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                      <div className="w-6 h-6 rounded-full border border-pink-400/60 flex items-center justify-center text-xs text-pink-400 flex-shrink-0 mt-1">
                        {sectionIndex + 1}.{subIndex + 1}
                      </div>
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
              <div key={actualIndex} className="space-y-4">
                {/* Main section */}
                <div className="flex items-start gap-4 hover:text-cyan-300 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center text-sm text-cyan-400 font-bold flex-shrink-0 mt-1">
                    {actualIndex + 1}
                  </div>
                  <span className="text-3xl font-semibold text-left leading-tight flex-1">{section.title}</span>
                </div>
                
                {/* Categories and Terms */}
                {(section.categories || section.subsections) && (
                  <div className="ml-14 space-y-3">
                    {/* Handle new categories format */}
                    {section.categories && section.categories.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        {/* Category name */}
                        <div className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                          <div className="w-6 h-6 rounded-full border border-pink-400/60 flex items-center justify-center text-xs text-pink-400 flex-shrink-0 mt-1">
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
                      <div key={subIndex} className="flex items-start gap-3 hover:text-pink-300 transition-colors duration-200">
                        <div className="w-6 h-6 rounded-full border border-pink-400/60 flex items-center justify-center text-xs text-pink-400 flex-shrink-0 mt-1">
                          {actualIndex + 1}.{subIndex + 1}
                        </div>
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

      {/* Decorative equations/doodles */}
      <div className="absolute top-24 right-24 text-cyan-300/50 text-2xl font-mono">
        E = mc²
      </div>
      <div className="absolute bottom-20 left-24 text-pink-400/50 text-xl font-mono">
        ∫ f(x) dx
      </div>
    </section>
  );
}



export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] flex items-center justify-center">

      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Futuristic glowing circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/20 blur-3xl" />

      {/* STEM icons in background */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />
      <FlaskConical className="absolute top-1/2 left-1/2 w-24 h-24 text-yellow-400/20 -translate-x-1/2" />

      <div className="bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-xl shadow-2xl p-8 max-w-5xl w-full">
        
        {/* Title */}
        <h2 className="text-6xl font-bold font-mono text-cyan-300 mb-3 text-center">
          {title}
        </h2>

        {/* Accent line */}
        <div className="h-[3px] w-24 bg-cyan-400 mx-auto mb-6 shadow-[0_0_10px_rgba(0,246,255,0.7)]"></div>

        {/* Content */}
        <p className="text-3xl font-mono text-gray-200 leading-relaxed text-center">
          {content}
        </p>
      </div>

      {/* Accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#38bdf820,transparent)]"></div>
    </section>
  );
}


export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-[#0a192f] flex">

      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Futuristic glowing circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/20 blur-3xl" />

      {/* STEM icons in background */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />

      {/* Left side text */}
      <div className="w-1/2 flex flex-col justify-center p-12 ml-20">
        <h2 className="text-6xl font-bold font-mono text-cyan-300 mb-4">
          {title}
        </h2>
        <p className="text-3xl font-mono text-gray-200 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Right side image */}
      <div className="w-1/2 flex items-center justify-center p-6">
        <img src="src/pngs/engineer.png" alt="engineer" className="w-[600px]"/>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#0a192f] to-[#112d4e] text-white overflow-hidden">
      {/* Full screen border */}
      <div className="absolute inset-0 border-4 border-cyan-400/40 rounded-xl pointer-events-none"></div>

      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Futuristic glowing circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/20 blur-3xl" />

      {/* STEM icons in background */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />

      {/* Content area */}
      <div className="relative flex flex-col items-center justify-center h-full p-20 text-center">
        <h2 className="text-6xl font-bold font-mono text-cyan-300 mb-6 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-3xl font-mono text-gray-200 leading-relaxed max-w-4xl">
          {content}
        </p>
      </div>
    </section>
  );
}

export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#0a192f] to-[#112d4e] text-white overflow-hidden flex items-center justify-center">
      {/* Diagonal accent background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(56,189,248,0.15)_25%,transparent_25%,transparent_75%,rgba(56,189,248,0.15)_75%)] bg-[length:200px_200px] opacity-20"></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-start max-w-5xl p-16 rotate-[-2deg] bg-white/5 backdrop-blur-md border border-cyan-400/30 rounded-xl shadow-2xl">
        <h2 className="text-6xl font-mono font-bold text-cyan-300 mb-6">{title || "Diagonal Flow"}</h2>
        <p className="text-3xl font-mono text-gray-200 leading-relaxed">{content || "This layout flows diagonally to add movement and break monotony."}</p>
      </div>
    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] text-white flex items-center justify-center overflow-hidden">
      {/* Futuristic grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Abstract glowing blobs */}
      <div className="absolute top-[-150px] left-[-200px] w-[600px] h-[600px] rounded-full bg-cyan-400/25 blur-[180px]"></div>
      <div className="absolute bottom-[-180px] right-[-200px] w-[650px] h-[650px] rounded-full bg-blue-500/25 blur-[180px]"></div>
      <div className="absolute top-[250px] right-[500px] w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[160px]"></div>

      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Futuristic glowing circles */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/20 blur-3xl" />

      {/* STEM icons in background */}
      <Atom className="absolute top-20 left-24 w-28 h-28 text-cyan-400/20" />
      <Beaker className="absolute bottom-24 right-32 w-24 h-24 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/3 right-20 w-32 h-32 text-indigo-400/20 rotate-12" />
      <FunctionSquare className="absolute bottom-40 left-1/4 w-28 h-28 text-green-400/20 rotate-[-15deg]" />

      {/* Text content directly integrated */}
      <div className="relative z-10 flex flex-col items-center text-center px-24">
        {/* Title with glowing underline */}
        <h2 className="text-7xl font-extrabold font-mono text-cyan-300 mb-6 drop-shadow-[0_0_25px_rgba(0,246,255,0.6)]">
          {title || "Immersive Concept"}
        </h2>
        <div className="h-[4px] w-32 bg-cyan-400 mb-10 shadow-[0_0_15px_rgba(0,246,255,0.7)]"></div>

        {/* Content with wide layout */}
        <p className="text-3xl font-mono text-gray-200 leading-relaxed max-w-5xl drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]">
          {content ||
            "This immersive layout integrates glowing gradient blobs with strong typography — no common card, just a futuristic wow factor."}
        </p>
      </div>
    </section>
  );
}



// STEM Modern Section Header
export function EndSlide({ title }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#112d4e] flex items-center justify-center">

      <div className="absolute -top-32 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-600/30 blur-3xl" />
      <div className="absolute bottom-[-150px] right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-500/30 to-indigo-600/30 blur-3xl" />

      {/* STEM icons */}
      <Atom className="absolute top-16 left-24 w-32 h-32 text-cyan-400/20" />
      <Beaker className="absolute bottom-20 right-40 w-28 h-28 text-pink-400/20" />
      <CircuitBoard className="absolute top-1/4 right-16 w-32 h-32 text-indigo-400/20" />
      <FunctionSquare className="absolute bottom-32 left-1/3 w-28 h-28 text-green-400/20" />


      <h2 className="text-8xl font-extrabold font-mono text-cyan-300 tracking-wide drop-shadow-lg">
        Thank You
      </h2>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00f6ff15,transparent)]"></div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideSTEM({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const STEMModern = { TitleSlide, TOCSlides: TOCSlide, MainSlide1, MainSlide2, MainSlide3, MainSlide4, MainSlide6, EndSlide };
export default STEMModern;
