import React from "react";

/* Title Slide – Spectrum gradient background with atom motif */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 flex flex-col items-center justify-center text-white overflow-hidden">
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

/* Main Slide 1 – Title on top, spectrum underline, content below */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white flex flex-col px-24 py-16">
      <h2 className="text-6xl font-bold mb-3">{title}</h2>
      <div className="h-[4px] w-56 bg-gradient-to-r from-yellow-300 via-green-300 to-cyan-400 mb-10"></div>
      <p className="text-3xl leading-relaxed max-w-5xl text-gray-100">{content}</p>
    </section>
  );
}

/* Main Slide 2 – Split layout, left content, right decorative molecule */
export function MainSlide2({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700 text-white flex px-20 py-16">
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
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white flex flex-col items-center justify-center px-24 py-16">
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
    <section className="relative w-[1280px] h-[720px] bg-white text-gray-900 flex flex-col items-center justify-center">
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

/* End Slide – Dark background with glowing atom */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-r from-indigo-800 to-purple-700 flex flex-col items-center justify-center text-white">
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
