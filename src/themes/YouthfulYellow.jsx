import React from "react";

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

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-800 hover:text-orange-600 transition-colors duration-300 group">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg flex-shrink-0 border-3 border-yellow-200 group-hover:border-yellow-300 transition-all duration-300
                ${sectionIndex % 4 === 0 ? "bg-orange-500 group-hover:bg-orange-600" : sectionIndex % 4 === 1 ? "bg-pink-500 group-hover:bg-pink-600" : sectionIndex % 4 === 2 ? "bg-purple-500 group-hover:bg-purple-600" : "bg-red-500 group-hover:bg-red-600"}`}>
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
              <div key={actualIndex} className="flex items-center gap-8 text-gray-800 hover:text-orange-600 transition-colors duration-300 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg flex-shrink-0 border-3 border-yellow-200 group-hover:border-yellow-300 transition-all duration-300
                  ${actualIndex % 4 === 0 ? "bg-orange-500 group-hover:bg-orange-600" : actualIndex % 4 === 1 ? "bg-pink-500 group-hover:bg-pink-600" : actualIndex % 4 === 2 ? "bg-purple-500 group-hover:bg-purple-600" : "bg-red-500 group-hover:bg-red-600"}`}>
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

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#fff9c4] via-[#fff176] to-[#fdd835] text-[#2b2b2b] flex items-center justify-center overflow-hidden">
      {/* Background playful blobs */}
      <div className="absolute top-16 left-10 w-64 h-64 bg-yellow-300/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-24 right-24 w-72 h-72 bg-orange-300/40 rounded-full blur-2xl"></div>

      {/* Doodle accents */}
      <div className="absolute top-32 right-1/4 text-6xl rotate-12 text-orange-500/70">✨</div>
      <div className="absolute bottom-32 left-1/4 text-6xl -rotate-12 text-pink-500/70">⭐</div>

      <div className="relative z-10 w-3/4 bg-white/80 backdrop-blur-sm border-4 border-yellow-400 rounded-3xl p-12 text-center shadow-2xl">
        <h2 className="text-8xl font-extrabold text-orange-600 mb-8 drop-shadow-lg">{title}</h2>
        <p className="text-5xl leading-relaxed text-gray-800">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-yellow-100 flex overflow-hidden">
      {/* Left column for title */}
      <div className="w-1/3 bg-yellow-400/90 p-12 flex flex-col justify-center items-start shadow-lg z-10">
        <h2 className="text-6xl font-bold text-yellow-900 mb-6">{title}</h2>
      </div>

      {/* Right content with curved wave */}
      <div className="flex-1 p-16 flex items-center justify-center relative">
        <div className="absolute inset-y-0 left-1/3 w-[200%] bg-yellow-200 rounded-l-[50%]"></div>
        <p className="relative z-10 text-4xl text-yellow-900 leading-relaxed max-w-2xl">
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

/* ---------------- MAIN SLIDE 3 ---------------- */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-yellow-50 flex overflow-hidden">
      {/* Background pattern dots */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-6 opacity-20">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        ))}
      </div>

      {/* Content split */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-16">
        <h2 className="text-7xl font-extrabold text-yellow-900 mb-6">{title}</h2>
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



/* ---------------- IMAGE SLIDE ---------------- */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-t from-orange-200 to-yellow-100 flex flex-col items-center justify-center">
      {/* Title banner */}
      <div className="bg-yellow-400 text-yellow-900 px-10 py-4 rounded-full mb-6 shadow-md">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      {/* Framed image */}
      <div className="relative w-[900px] h-[500px] bg-white rounded-2xl shadow-xl border-[12px] border-yellow-400 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Youthful visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-yellow-700 flex items-center justify-center w-full h-full">
            No Image
          </span>
        )}
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
  ImageSlide,
  EndSlide,
};
export default YouthfulYellow;
