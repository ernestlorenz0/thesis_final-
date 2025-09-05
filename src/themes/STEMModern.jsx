import React from "react";

// STEM Modern Title Slide
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] text-white flex flex-col items-center justify-center rounded-2xl shadow-2xl overflow-hidden">

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


export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] flex items-center justify-center">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-xl shadow-2xl p-12 max-w-4xl w-full">
        
        {/* Title */}
        <h2 className="text-6xl font-bold font-mono text-cyan-300 mb-4 text-center">
          {title}
        </h2>

        {/* Accent line */}
        <div className="h-[3px] w-24 bg-cyan-400 mx-auto mb-8 shadow-[0_0_10px_rgba(0,246,255,0.7)]"></div>

        {/* Content */}
        <p className="text-2xl font-mono text-gray-200 leading-relaxed text-center">
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
    <section className="w-[1280px] h-[720px] bg-[#0a192f] flex">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      {/* Left side text */}
      <div className="w-1/2 flex flex-col justify-center p-12">
        <h2 className="text-6xl font-bold font-mono text-cyan-300 mb-4">
          {title}
        </h2>
        <p className="text-2xl font-mono text-gray-200 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Right side image */}
      <div className="w-1/2 flex items-center justify-center p-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="visual"
            className="rounded-lg shadow-[0_0_25px_rgba(0,246,255,0.4)] max-h-[450px]"
          />
        ) : (
          <div className="w-full h-[400px] bg-white/10 border border-cyan-400/40 flex items-center justify-center text-gray-400 rounded-lg">
            No Image
          </div>
        )}
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-[#0a192f] to-[#112d4e] text-white overflow-hidden">
      {/* Full screen border */}
      <div className="absolute inset-0 border-4 border-cyan-400/40 rounded-xl pointer-events-none"></div>

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      {/* Content area */}
      <div className="relative flex flex-col items-center justify-center h-full p-20 text-center">
        <h2 className="text-6xl font-bold font-mono text-cyan-300 mb-6 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-2xl font-mono text-gray-200 leading-relaxed max-w-4xl">
          {content}
        </p>
      </div>
    </section>
  );
}

// STEM Modern Image Slide
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-r from-[#0a192f] to-[#112d4e] flex items-center justify-center">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      <div className="relative bg-white/5 backdrop-blur-md border border-cyan-400/40 rounded-xl shadow-2xl overflow-hidden w-[900px]">
        {/* Title bar */}
        <div className="bg-cyan-500/20 text-cyan-300 font-mono text-3xl font-semibold px-6 py-3 border-b border-cyan-400/40">
          {title}
        </div>

        {/* Image area */}
        <div className="flex items-center justify-center p-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="slide visual"
              className="rounded-lg max-h-[400px] shadow-[0_0_20px_rgba(0,246,255,0.4)]"
            />
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


// STEM Modern Section Header
export function EndSlide({ title }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#112d4e] flex items-center justify-center">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

      <h2 className="text-6xl font-extrabold font-mono text-cyan-300 tracking-wide drop-shadow-lg">
        Thank You
      </h2>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00f6ff15,transparent)]"></div>
    </section>
  );
}

const STEMModern = { TitleSlide, ImageSlide, MainSlide1, MainSlide2, MainSlide3, EndSlide };
export default STEMModern;