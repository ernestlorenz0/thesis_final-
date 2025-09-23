import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-purple-800 via-fuchsia-600 to-violet-500 flex items-center justify-center overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] bg-fuchsia-400 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-120px] right-[-150px] w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-40"></div>

      {/* Title */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-2xl mb-6">
          {title}
        </h1>
        <h2 className="text-2xl text-purple-100 italic">{subtitle}</h2>
      </div>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#2e026d] via-[#6d28d9] to-[#9333ea] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Glowing background orbs */}
      <div className="absolute top-24 left-16 w-72 h-72 rounded-full bg-pink-500/40 blur-3xl"></div>
      <div className="absolute bottom-24 right-20 w-80 h-80 rounded-full bg-indigo-400/40 blur-3xl"></div>

      {/* Geometric accent shapes */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 border-4 border-pink-400/50 rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-40 h-40 border-4 border-purple-300/50 -rotate-12 rounded-full"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-300 to-indigo-400 drop-shadow-[0_0_25px_rgba(255,0,255,0.6)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              {/* Main section */}
              <div className="flex items-start gap-4 text-white hover:text-purple-300 transition-colors duration-200">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold flex-shrink-0 mt-1
                  ${sectionIndex % 3 === 0 ? "bg-purple-500" : sectionIndex % 3 === 1 ? "bg-pink-500" : "bg-violet-500"}`}>
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
                      <div className="flex items-start gap-3 text-purple-100 hover:text-pink-300 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                          ${catIndex % 2 === 0 ? "bg-pink-400" : "bg-violet-400"}`}>
                          {sectionIndex + 1}.{catIndex + 1}
                        </div>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-purple-200 hover:text-pink-200 transition-colors duration-200">
                              <span className="text-pink-300 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 text-purple-100 hover:text-pink-300 transition-colors duration-200">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                        ${subIndex % 2 === 0 ? "bg-pink-400" : "bg-violet-400"}`}>
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
              <div key={actualIndex} className="space-y-4">
                {/* Main section */}
                <div className="flex items-start gap-4 text-white hover:text-purple-300 transition-colors duration-200">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold flex-shrink-0 mt-1
                    ${actualIndex % 3 === 0 ? "bg-purple-500" : actualIndex % 3 === 1 ? "bg-pink-500" : "bg-violet-500"}`}>
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
                        <div className="flex items-start gap-3 text-purple-100 hover:text-pink-300 transition-colors duration-200">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                            ${catIndex % 2 === 0 ? "bg-pink-400" : "bg-violet-400"}`}>
                            {actualIndex + 1}.{catIndex + 1}
                          </div>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-purple-200 hover:text-pink-200 transition-colors duration-200">
                                <span className="text-pink-300 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 text-purple-100 hover:text-pink-300 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                          ${subIndex % 2 === 0 ? "bg-pink-400" : "bg-violet-400"}`}>
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

/* ---------------- MAIN SLIDE 1 ---------------- */
/* Content inside a funky tilted card */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-violet-100 flex items-center justify-center overflow-hidden">
      {/* Blob accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-2xl"></div>

      {/* Tilted card */}
      <div className="relative bg-white p-12 rounded-3xl shadow-2xl border-4 border-purple-500 rotate-[-3deg] max-w-4xl text-center">
        <h2 className="text-6xl font-bold text-purple-700 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
/* Title on left, big flowing blob background */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-purple-200 to-fuchsia-100 flex items-center overflow-hidden">
      {/* Abstract shape background */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/40 rounded-[40%_60%_70%_30%] blur-3xl -left-32"></div>
      <div className="absolute w-[400px] h-[400px] bg-fuchsia-400/30 rounded-[60%_40%_30%_70%] blur-2xl bottom-10 right-10"></div>

      {/* Content side */}
      <div className="relative z-10 px-20 max-w-5xl">
        <h2 className="text-6xl font-bold text-purple-800 mb-6">{title}</h2>
        <p className="text-3xl text-purple-900 leading-relaxed">{content}</p>
      </div>

      <div className="absolute right-20 top-30">
        <img src="src/svgs/working.svg" alt="working" className="w-[700px]"/>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden bg-black">
      {/* Base diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 via-purple-600 to-indigo-700 clip-path-diagonal"></div>

      {/* Static Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pink blob */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-fuchsia-400/40 rounded-full mix-blend-screen blur-3xl"></div>

        {/* Purple blob */}
        <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-purple-500/40 rounded-full mix-blend-screen blur-3xl"></div>

        {/* Indigo blob */}
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-indigo-400/40 rounded-full mix-blend-screen blur-3xl"></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Triangle */}
        <svg
          className="absolute top-20 left-40 w-24 h-24 text-white/20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M12 2 L22 20 H2 Z" />
        </svg>

        {/* Outline circle */}
        <div className="absolute bottom-40 right-40 w-36 h-36 border-2 border-white/20 rounded-full"></div>

        {/* Thin vertical line */}
        <div className="absolute top-1/3 left-1/2 w-0.5 h-64 bg-white/10"></div>

        {/* Dotted grid */}
        <div className="absolute bottom-16 left-16 grid grid-cols-6 gap-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-white/10 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Text */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-16">
        <h2 className="text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
          {title}
        </h2>
        <p className="text-3xl text-purple-100 leading-relaxed max-w-3xl drop-shadow-xl">
          {content}
        </p>
      </div>
    </section>
  );
}


/* ---------------- MAIN SLIDE 4 ---------------- */
/* Circular focal layout with layered blobs */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center justify-center bg-gradient-to-br from-violet-200 to-fuchsia-100 overflow-hidden">
      {/* Blob accents */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-fuchsia-400/40 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-purple-400/40 rounded-full blur-3xl"></div>

      {/* Circular frame */}
      <div className="relative z-10 w-[850px] h-[850px] rounded-full border-[12px] border-purple-600 bg-white/90 shadow-2xl flex flex-col items-center justify-center text-center p-16">
        <h2 className="text-6xl font-extrabold text-purple-700 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed max-w-3xl">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 5 ---------------- */
/* Vertical split with vibrant gradients */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden">
      {/* Left side */}
      <div className="w-1/2 bg-gradient-to-b from-fuchsia-500 to-purple-700 flex items-center justify-center p-12">
        <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">{title}</h2>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-white flex items-center justify-center p-16">
        <p className="text-3xl text-purple-900 leading-relaxed max-w-lg">{content}</p>
      </div>

      {/* Decorative blob */}
      <div className="absolute top-24 left-1/3 w-64 h-64 bg-fuchsia-400/40 rounded-full blur-3xl"></div>
    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-purple-100 via-violet-200 to-fuchsia-100 flex items-center justify-center overflow-hidden">
      {/* Layered Ribbons */}
      <div className="absolute top-1/3 -rotate-6 w-[160%] h-[340px] bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 shadow-2xl"></div>
      <div className="absolute top-1/3 -rotate-6 w-[160%] h-[340px] bg-gradient-to-r from-pink-400/30 to-purple-400/30 blur-2xl"></div>

      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Big blurred blobs */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-fuchsia-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-3xl"></div>

        {/* Outline circle */}
        <div className="absolute top-20 right-1/3 w-40 h-40 border-4 border-white/30 rounded-full"></div>

        {/* Thin accent line */}
        <div className="absolute bottom-24 left-1/4 w-1 h-64 bg-white/20 rotate-12"></div>

        {/* Small dots grid */}
        <div className="absolute bottom-16 left-16 grid grid-cols-5 gap-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-white/15 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-12">
        <h2 className="text-7xl font-extrabold text-white drop-shadow-2xl mb-6">
          {title}
        </h2>
        <p className="text-3xl text-purple-50 leading-relaxed drop-shadow-xl">
          {content}
        </p>
      </div>
    </section>
  );
}


/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-purple-700 to-fuchsia-600 flex items-center justify-center overflow-hidden">
      {/* Blob accents */}
      <div className="absolute top-20 left-32 w-80 h-80 bg-fuchsia-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-300/40 rounded-full blur-2xl"></div>

      <h1 className="text-6xl font-extrabold text-white drop-shadow-xl">
        The End
      </h1>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideVibrantViolet({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const VibrantViolet = {
  TitleSlide,
  TOCSlides: TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};
export default VibrantViolet;
