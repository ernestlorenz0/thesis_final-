import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center overflow-hidden">
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

/* ---------------- MAIN SLIDE 1 ---------------- */
/* Split left text, right orbit graphics */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-orange-100 flex overflow-hidden">
      {/* Right orbit decoration */}
      <div className="absolute right-[-150px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[20px] border-orange-400/30 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-20 max-w-xl">
        <h2 className="text-6xl font-bold text-orange-800 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
/* Title in center, orbit lines in background */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-amber-200 to-orange-100 flex items-center justify-center overflow-hidden">
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
    <section className="relative w-[1280px] h-[720px] flex items-center justify-center overflow-hidden">
      {/* Diagonal orbit band */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-yellow-500 clip-path-diagonal"></div>
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Text block */}
      <div className="relative z-10 text-center px-16 max-w-3xl">
        <h2 className="text-6xl font-bold text-white mb-6">{title}</h2>
        <p className="text-3xl text-orange-50 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- IMAGE SLIDE ---------------- */
/* Image in a planet-like circle */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-orange-50 flex items-center justify-center overflow-hidden">
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
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-orange-700 to-amber-500 flex items-center justify-center overflow-hidden">
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

const OrangeOrbit = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
  style,
};
export default OrangeOrbit;
