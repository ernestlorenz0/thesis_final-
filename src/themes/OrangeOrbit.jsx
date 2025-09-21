import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center overflow-hidden">
      {/* Orbits */}
      <div className="absolute w-[600px] h-[600px] border-4 border-white/20 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[400px] h-[400px] border-2 border-white/30 rounded-full animate-spin-slower"></div>
      <div className="absolute w-[200px] h-[200px] border border-white/40 rounded-full animate-spin-slowest"></div>

      {/* Title */}
      <div className="relative z-10 text-center">
        <h1 className="text-7xl font-extrabold text-white drop-shadow-xl mb-6">
          {title}
        </h1>
        <h2 className="text-2xl text-orange-100 italic">{subtitle}</h2>
      </div>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Orbital rings */}
      <div className="absolute w-[800px] h-[800px] border-2 border-orange-500/30 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[600px] h-[600px] border border-orange-400/20 rounded-full animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] border border-orange-300/15 rounded-full"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-orange-500/40 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-orange-400/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-orange-600/50 rounded-full blur-lg"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 drop-shadow-[0_0_30px_rgba(251,146,60,0.8)]">
        {title}
      </h2>

      {/* Categories and Terms */}
      <div className="text-3xl font-light space-y-6 max-w-5xl w-full z-10">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            {/* Main section */}
            <div className="flex items-start gap-6 text-gray-200 hover:text-orange-300 transition-colors duration-200">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-xl font-bold shadow-[0_0_20px_rgba(251,146,60,0.6)] flex-shrink-0 mt-1
                ${sectionIndex % 3 === 0 ? "bg-gradient-to-r from-orange-500 to-yellow-400" : sectionIndex % 3 === 1 ? "bg-gradient-to-r from-orange-400 to-red-500" : "bg-gradient-to-r from-yellow-400 to-orange-600"}`}>
                {sectionIndex + 1}
              </div>
              <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
            </div>

            {/* Categories and Terms */}
            {(section.categories || section.subsections) && (
              <div className="ml-18 space-y-4">
                {/* Handle new categories format */}
                {section.categories && section.categories.map((category, catIndex) => (
                  <div key={catIndex} className="space-y-2">
                    {/* Category name */}
                    <div className="flex items-start gap-4 text-orange-200 hover:text-yellow-300 transition-colors duration-200">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold shadow-[0_0_15px_rgba(251,146,60,0.4)] flex-shrink-0 mt-1
                        ${catIndex % 2 === 0 ? "bg-gradient-to-r from-orange-400 to-yellow-400" : "bg-gradient-to-r from-yellow-400 to-orange-500"}`}>
                        {sectionIndex + 1}.{catIndex + 1}
                      </div>
                      <span className="text-2xl font-bold text-left leading-tight flex-1">{category.name}</span>
                    </div>
                    
                    {/* Terms under category */}
                    {category.terms && category.terms.length > 0 && (
                      <div className="ml-12 space-y-1">
                        {category.terms.map((term, termIndex) => (
                          <div key={termIndex} className="flex items-center gap-3 text-orange-100 hover:text-yellow-200 transition-colors duration-200">
                            <span className="text-orange-400 text-lg">-</span>
                            <span className="text-xl text-left leading-tight">{term}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Handle old subsections format for backward compatibility */}
                {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="flex items-start gap-4 text-orange-200 hover:text-yellow-300 transition-colors duration-200">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold shadow-[0_0_15px_rgba(251,146,60,0.4)] flex-shrink-0 mt-1
                      ${subIndex % 2 === 0 ? "bg-gradient-to-r from-orange-400 to-yellow-400" : "bg-gradient-to-r from-yellow-400 to-orange-500"}`}>
                      {sectionIndex + 1}.{subIndex + 1}
                    </div>
                    <span className="text-2xl text-left leading-tight flex-1">{subsection}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* Extra orbit animations */
<style>
{`
  .animate-spin-slow {
    animation: spin 40s linear infinite;
  }
  .animate-spin-slower {
    animation: spin 80s linear infinite;
  }
  @keyframes spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`}
</style>

/* ---------------- MAIN SLIDE 1 ---------------- */
/* Split left text, right orbit graphics */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-100 flex overflow-hidden">
      {/* Right orbit decoration */}
      <div className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[20px] border-orange-400/30 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-20 max-w-5xl">
        <h2 className="text-7xl font-bold text-orange-800 mb-6">{title}</h2>
        <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
/* Title in center, orbit lines in background */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-amber-200 to-orange-100 flex items-center justify-center overflow-hidden">
      {/* Orbit background */}
      <div className="absolute w-[800px] h-[800px] border-4 border-orange-400/30 rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] border-2 border-orange-500/40 rounded-full"></div>
      <div className="absolute w-[250px] h-[250px] border border-orange-600/50 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-16 max-w-3xl">
        <h2 className="text-6xl font-extrabold text-orange-700 mb-6">{title}</h2>
        <p className="text-3xl text-orange-900 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 3 ---------------- */
/* Diagonal orbit strip */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden">
      {/* Left gradient bar */}
      <div className="w-1/3 bg-gradient-to-b from-orange-600 to-amber-500 flex items-center justify-center p-10">
        <h2 className="text-6xl font-extrabold text-white drop-shadow-lg text-center">
          {title}
        </h2>
      </div>

      {/* Right content */}
      <div className="flex-1 bg-orange-50 flex items-center justify-center p-16 relative">
        {/* Orbit accent */}
        <div className="absolute w-[400px] h-[400px] border-8 border-orange-400/20 rounded-full -right-24 -bottom-24"></div>
        <p className="relative z-10 text-3xl text-orange-900 leading-relaxed max-w-2xl">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- IMAGE SLIDE ---------------- */
/* Image in a planet-like circle */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-50 flex items-center justify-center overflow-hidden">
      {/* Orbit rings */}
      <div className="absolute w-[600px] h-[600px] border-8 border-orange-400/30 rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] border-4 border-orange-500/40 rounded-full"></div>

      {/* Image container as planet */}
      <div className="relative w-[450px] h-[450px] rounded-full border-[12px] border-orange-600 shadow-2xl overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Orange Orbit visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-600">
            No Image
          </div>
        )}
      </div>

      {/* Title */}
      <div className="absolute bottom-12 bg-orange-600 text-white px-8 py-3 rounded-full shadow-lg">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
    </section>
  );
}

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-orange-700 to-amber-500 flex items-center justify-center overflow-hidden">
      {/* Glowing orbits */}
      <div className="absolute w-[600px] h-[600px] border-8 border-white/20 rounded-full animate-spin-slow"></div>
      <div className="absolute w-[400px] h-[400px] border-4 border-white/30 rounded-full animate-spin-slower"></div>

      <h1 className="text-6xl font-extrabold text-white drop-shadow-xl z-10">
        The End
      </h1>
    </section>
  );
}

/* Custom slow spin animations */
const style = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spin-slower {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes spin-slowest {
  from { transform: rotate(0deg); }
  to { transform: rotate(180deg); }
}
.animate-spin-slow { animation: spin-slow 30s linear infinite; }
.animate-spin-slower { animation: spin-slower 50s linear infinite; }
.animate-spin-slowest { animation: spin-slowest 80s linear infinite; }
.clip-path-diagonal { clip-path: polygon(0 0, 100% 20%, 100% 100%, 0 80%); }
`;

// Additional MainSlide variants for consistency
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-orange-200 to-amber-100 flex items-center justify-center overflow-hidden">
      {/* Orbit rings */}
      <div className="absolute w-[700px] h-[700px] border-[12px] border-orange-500/20 rounded-full"></div>
      <div className="absolute w-[500px] h-[500px] border-[8px] border-orange-600/30 rounded-full"></div>

      {/* Circular container */}
      <div className="relative z-10 w-[800px] h-[800px] rounded-full bg-white shadow-2xl border-[10px] border-orange-500 flex flex-col items-center justify-center text-center p-16">
        <h2 className="text-6xl font-bold text-orange-700 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed max-w-3xl">
          {content}
        </p>
      </div>
    </section>
  );
}

export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-100 flex items-center justify-center overflow-hidden">
      {/* Ribbon */}
      <div className="absolute w-full h-[400px] bg-gradient-to-r from-orange-600 to-amber-400 top-1/3 shadow-xl transform -skew-y-3"></div>

      {/* Orbit accents */}
      <div className="absolute left-20 top-20 w-40 h-40 border-4 border-orange-500/30 rounded-full"></div>
      <div className="absolute right-32 bottom-24 w-32 h-32 border-2 border-orange-700/30 rounded-full"></div>

      {/* Text on ribbon */}
      <div className="relative z-10 text-center px-20 max-w-4xl">
        <h2 className="text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-3xl text-white/90 leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  );
}

export function MainSlide6({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-100 flex items-center justify-center overflow-hidden">
      {/* Right orbit decoration */}
      <div className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[20px] border-orange-400/30 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-20 max-w-5xl text-center">
        <h2 className="text-7xl font-bold text-orange-800 mb-6">{title}</h2>
        <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideOrangeOrbit({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const OrangeOrbit = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  MainSlide5,
  MainSlide6,
  ImageSlide,
  EndSlide,
  style,
};
export default OrangeOrbit;
