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
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="flex items-center gap-8 text-white hover:text-pink-300 transition-colors duration-300 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg flex-shrink-0 border-3 border-purple-300 group-hover:border-pink-300 transition-all duration-300
                  ${actualIndex % 3 === 0 ? "bg-purple-500 group-hover:bg-purple-600" : actualIndex % 3 === 1 ? "bg-pink-500 group-hover:bg-pink-600" : "bg-violet-500 group-hover:bg-violet-600"}`}>
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
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-purple-900 via-violet-800 to-pink-900 text-white flex items-center justify-center overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-violet-500/20 rounded-full blur-2xl"></div>

      <div className="relative z-10 w-3/4 bg-black/30 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-12 text-center shadow-2xl">
        <h2 className="text-8xl font-bold mb-8 bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300 bg-clip-text text-transparent">{title}</h2>
        <p className="text-5xl leading-relaxed text-purple-100">{content}</p>
      </div>
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

/* ---------------- MAIN SLIDE 3 ---------------- */
/* Diagonal split background with funky wave */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden">
      {/* Diagonal split */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 to-purple-600 clip-path-diagonal"></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Text block */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full text-center px-16">
        <h2 className="text-6xl font-extrabold text-white mb-6">{title}</h2>
        <p className="text-3xl text-purple-100 leading-relaxed max-w-3xl">
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

/* ---------------- MAIN SLIDE 6 ---------------- */
/* Funky zig-zag ribbon background */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-violet-100 flex items-center justify-center overflow-hidden">
      {/* Zig-zag ribbon */}
      <div className="absolute -rotate-6 w-[140%] h-[300px] bg-gradient-to-r from-purple-600 to-fuchsia-500 top-1/3 shadow-2xl"></div>

      {/* Content block */}
      <div className="relative z-10 text-center max-w-4xl px-12">
        <h2 className="text-6xl font-extrabold text-white-800 mb-6">{title}</h2>
        <p className="text-3xl text-white-900 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}


/* ---------------- IMAGE SLIDE ---------------- */
/* Fun frame with blobs around image */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-violet-50 flex items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-400/30 rounded-full blur-3xl"></div>

      {/* Image container */}
      <div className="relative bg-white border-[10px] border-purple-600 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-[900px] h-[500px]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Vibrant Violet visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-purple-700">
            No Image
          </div>
        )}
      </div>

      {/* Title below image */}
      <div className="absolute bottom-12 bg-purple-700 text-white px-8 py-3 rounded-full shadow-lg">
        <h3 className="text-2xl font-bold">{title}</h3>
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

const VibrantViolet = {
  TitleSlide,
  TOCSlides: TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default VibrantViolet;
