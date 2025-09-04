import React from "react";

/* Title Slide – Chalkboard with center text + doodles */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#1b1b1b] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Chalk smudge border */}
      <div className="absolute inset-4 border-[6px] border-green-400/60 rounded-xl opacity-50"></div>

      {/* Chalk doodles */}
      <div className="absolute top-10 left-16 text-pink-400/70 text-5xl">✏️</div>
      <div className="absolute bottom-14 right-20 text-yellow-300/70 text-4xl">★</div>
      <div className="absolute top-1/3 left-1/4 text-cyan-300/60 text-6xl">+</div>

      {/* Title */}
      <h1 className="text-6xl font-bold font-mono text-green-200 mb-4 drop-shadow-lg">
        {title}
      </h1>
      <h2 className="text-2xl font-mono text-gray-200">{subtitle}</h2>
    </section>
  );
}

/* Main Slide 1 – Left title bar, chalk text on right */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#2a2a2a] text-white flex">
      {/* Vertical title bar */}
      <div className="w-1/3 bg-[#1b1b1b] flex flex-col justify-center items-center border-r-4 border-green-400/40">
        <h2 className="text-4xl font-mono text-green-300 -rotate-2">{title}</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-16 flex items-center">
        <p className="text-2xl font-mono leading-relaxed text-gray-200 whitespace-pre-line">
          {content}
        </p>
      </div>
    </section>
  );
}

/* Main Slide 2 – Top title, chalk underline, centered content */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#1b1b1b] text-white flex flex-col items-center justify-start p-16">
      <h2 className="text-4xl font-mono text-yellow-300 mb-2">{title}</h2>
      <div className="w-64 h-[3px] bg-pink-400/70 mb-12 -rotate-1"></div>
      <p className="text-2xl font-mono leading-relaxed max-w-4xl text-center text-gray-200">
        {content}
      </p>
    </section>
  );
}

/* Main Slide 3 – Chalkboard grid background, content left, doodle right */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#2c2c2c] text-white flex items-center px-20">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* Content */}
      <div className="flex-1 z-10 pr-12">
        <h2 className="text-3xl font-mono text-cyan-300 mb-6">{title}</h2>
        <p className="text-xl font-mono text-gray-200 leading-relaxed">{content}</p>
      </div>

      {/* Doodle area */}
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="text-7xl text-pink-400/70">✎</div>
      </div>
    </section>
  );
}

/* Image Slide – Chalk border with image inside */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#1b1b1b] text-white flex flex-col items-center justify-center">
      <div className="absolute inset-6 border-4 border-cyan-400/70 rounded-lg opacity-60"></div>
      <img
        src={imageUrl}
        alt="slide visual"
        className="rounded-lg shadow-lg max-h-[500px] mb-6 border-4 border-white/20 object-contain"
      />
      <h3 className="text-2xl font-mono text-yellow-300">{title}</h3>
    </section>
  );
}

/* End Slide – Big thanks in chalk */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#1b1b1b] text-white flex flex-col items-center justify-center">
      <div className="absolute inset-10 border-[6px] border-pink-400/60 rounded-xl opacity-60"></div>
      <h2 className="text-6xl font-mono text-green-300 drop-shadow-lg">{message}</h2>
    </section>
  );
}

const DigitalChalkboard = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default DigitalChalkboard;
