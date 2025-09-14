import React from "react";

/* Title Slide – Spectrum gradient background with atom motif */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Floating science icons */}
      <div className="absolute top-10 left-12 text-6xl opacity-40">⚛️</div>
      <div className="absolute bottom-14 right-16 text-5xl opacity-40">🧬</div>
      <div className="absolute top-1/3 right-1/4 text-7xl opacity-30">🧪</div>

      {/* Title text */}
      <h1 className="text-6xl font-extrabold font-sans drop-shadow-lg mb-4">
        {title}
      </h1>
      <h2 className="text-2xl font-light opacity-90">{subtitle}</h2>
    </section>
  );
}

/* Table of Contents Slide – History Heritage */
export function TOCSlideHistoryHeritage({ title = "Table of Contents", items = [] }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#fdfaf3] text-[#2b2b2b] flex flex-col items-center justify-center overflow-hidden">
      {/* Parchment texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-40"></div>

      {/* Ornamental borders */}
      <div className="absolute inset-12 border-[6px] border-[#8b5e3c] rounded-xl shadow-md"></div>

      {/* Decorative icons */}
      <div className="absolute top-24 left-24 text-6xl text-[#8b5e3c]/50">🏛️</div>
      <div className="absolute bottom-24 right-24 text-6xl text-[#b08d57]/50">📜</div>

      {/* Title */}
      <h2 className="text-6xl font-serif font-bold text-[#5a3d2b] mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* TOC List */}
      <ul className="text-3xl font-serif space-y-8 max-w-3xl text-left">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-6">
            {/* Number marker in old-gold circle */}
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#a67c00] text-white font-bold shadow-md">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}


/* Table of Contents Slide – Science Spectrum */
export function TOCSlideScienceSpectrum({ title = "Table of Contents", items = [] }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0a0a0f] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient spectrum background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-purple-700 to-cyan-500 opacity-40 blur-2xl"></div>

      {/* Orbiting circles */}
      <div className="absolute w-[600px] h-[600px] border border-cyan-400/40 rounded-full animate-pulse"></div>
      <div className="absolute w-[900px] h-[900px] border border-purple-400/30 rounded-full animate-spin-slow"></div>

      {/* Floating geometric accents */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-60"></div>
      <div className="absolute bottom-32 right-24 w-32 h-32 bg-gradient-to-tr from-pink-400 to-purple-500 rotate-45"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h2>

      {/* TOC List */}
      <ul className="text-3xl space-y-8 max-w-3xl text-left font-medium">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-6 group"
          >
            {/* Spectrum bullet */}
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
              {index + 1}
            </span>
            <span className="group-hover:text-cyan-300 transition-colors duration-200">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}


/* Main Slide 1 – Title on top, spectrum underline, content below */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex flex-col px-24 py-16">
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
      <div className="flex-1 flex items-center justify-center text-8xl opacity-40">
        🧬
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

/* Image Slide – Spectrum border with centered image */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex flex-col items-center justify-center">
      <div className="absolute inset-8 border-[6px] border-transparent rounded-xl bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-border"></div>
      <img
        src={imageUrl}
        alt="science visual"
        className="rounded-lg shadow-lg max-h-[500px] mb-6 border-4 border-gray-200 object-contain"
      />
      <h3 className="text-2xl font-bold">{title}</h3>
    </section>
  );
}

/* Main Slide 4 – Left Image, Right Text with Spectrum Accent */
export function MainSlide4({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-blue-800 via-purple-700 to-pink-600 text-white flex overflow-hidden">
      {/* Left image area */}
      <div className="w-1/2 flex items-center justify-center bg-black/30">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="visual"
            className="max-h-[600px] rounded-xl border-4 border-pink-400 shadow-lg object-contain"
          />
        )}
      </div>
      {/* Right text area */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-6xl font-bold mb-8">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-100">{content}</p>
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

const ScienceSpectrum = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default ScienceSpectrum;
