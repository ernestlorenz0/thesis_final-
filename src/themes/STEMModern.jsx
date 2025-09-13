import React from "react";

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


export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0a192f] to-[#112d4e] flex items-center justify-center">

      {/* Background shapes (STEM vibe) */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Hexagon shape */}
        <div className="absolute top-16 left-20 w-40 h-40 border-2 border-cyan-400/40 rotate-45"></div>
        <div className="absolute bottom-24 right-24 w-32 h-32 border-2 border-cyan-400/30 rotate-12"></div>
      </div>

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
        <p className="text-3xl font-mono text-gray-200 leading-relaxed">
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
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#0a192f] to-[#112d4e] text-white overflow-hidden">
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
        <p className="text-3xl font-mono text-gray-200 leading-relaxed max-w-4xl">
          {content}
        </p>
      </div>
    </section>
  );
}

// STEM Modern Image Slide
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-[#0a192f] to-[#112d4e] flex items-center justify-center">

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

export function MainSlide5({ title, content }) {
  const steps = [
    { id: 1, text: content || "Step one: placeholder text" },
    { id: 2, text: "Step two: placeholder text" },
    { id: 3, text: "Step three: placeholder text" },
  ];

  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0a192f] text-white flex items-center justify-center overflow-hidden">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Timeline container */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full px-12">
        <h2 className="text-6xl font-mono font-bold text-cyan-300 mb-12 text-center">{title || "Process Flow"}</h2>

        <div className="space-y-10 relative">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center font-mono text-lg text-cyan-300 shadow-[0_0_10px_rgba(0,246,255,0.6)]">
                {step.id}
              </div>
              <p className="text-3xl text-gray-200 font-mono">{step.text}</p>
            </div>
          ))}
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-cyan-400/40"></div>
        </div>
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
