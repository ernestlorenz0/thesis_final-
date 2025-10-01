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

      {/* Two-Column Layout for TOC - Simplified to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-200 hover:text-orange-300 transition-colors duration-300 group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 group-hover:from-orange-400 group-hover:to-yellow-300 text-white text-2xl font-bold flex-shrink-0 shadow-[0_0_20px_rgba(251,146,60,0.6)] group-hover:shadow-[0_0_30px_rgba(251,146,60,0.8)] transition-all duration-300">
                {sectionIndex + 1}
              </div>
              <span className="text-5xl font-bold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="flex items-center gap-8 text-gray-200 hover:text-orange-300 transition-colors duration-300 group">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 group-hover:from-orange-400 group-hover:to-yellow-300 text-white text-2xl font-bold flex-shrink-0 shadow-[0_0_20px_rgba(251,146,60,0.6)] group-hover:shadow-[0_0_30px_rgba(251,146,60,0.8)] transition-all duration-300">
                  {actualIndex + 1}
                </div>
                <span className="text-5xl font-bold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
              </div>
            );
          })}
        </div>
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
export function MainSlide1({ title, content, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-100 flex overflow-hidden">
      {/* Right orbit decoration */}
      <div className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[20px] border-orange-400/30 rounded-full"></div>

      {/* Two-column content */}
      <div className="relative z-10 w-5/6 h-5/6 m-auto flex items-center justify-between">
        {/* Left: auto image or placeholder for 2nd term */}
        <div className="w-1/2 h-full flex items-center justify-center pr-10">
          {autoGeneratedImage ? (
            <div className="relative w-full h-full rounded-full max-w-[520px] max-h-[520px] border-[12px] border-orange-600 shadow-2xl overflow-hidden">
              <img src={autoGeneratedImage} alt={title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="relative w-[520px] h-[520px] rounded-full border-[12px] border-orange-600 shadow-2xl overflow-hidden flex items-center justify-center bg-white/80">
              <div className="text-center text-orange-700">
                <div className="text-3xl font-extrabold mb-2">Auto Image Placeholder</div>
                <div className="text-xl">2nd Term MainSlide</div>
              </div>
            </div>
          )}
        </div>

        {/* Right: title and content */}
        <div className="w-1/2 flex flex-col justify-center pl-10">
          <h2 className="text-7xl font-bold text-orange-800 mb-6">{title}</h2>
          <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>
        </div>
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
export function ImageSlide({ title, content, autoGeneratedImage, imageUrl }) {
  const imageSrc = autoGeneratedImage || imageUrl;
  return (
    <section className="relative w-[1920px] h-[1080px] bg-orange-50 flex items-center justify-center overflow-hidden">
      {/* Orbit rings */}
      <div className="absolute w-[600px] h-[600px] border-8 border-orange-400/30 rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] border-4 border-orange-500/40 rounded-full"></div>

      {/* Image container as planet */}
      <div className="relative w-[450px] h-[450px] rounded-full border-[12px] border-orange-600 shadow-2xl overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Orange Orbit visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-700 bg-white/80">
            <div className="text-center">
              <div className="text-2xl font-extrabold mb-1">Auto Image Placeholder</div>
              <div>1st Term ImageSlide</div>
            </div>
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
