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

export function TOCSlideOrangeOrbit({
  title = "Table of Contents",
  items = [],
}) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-orange-700 via-orange-500 to-yellow-400 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Planet-like glowing orbs */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-orange-300/30 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-yellow-200/40 blur-3xl"></div>

      {/* Orbital rings */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] border-4 border-orange-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] border-2 border-yellow-300/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin-slower"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-200 to-white drop-shadow-[0_0_25px_rgba(255,165,0,0.7)]">
        {title}
      </h2>

      {/* TOC Items */}
      <ul className="text-3xl font-semibold space-y-10 max-w-3xl text-left relative z-10">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-6 hover:text-yellow-200 transition duration-300"
          >
            {/* Orbiting planet-like badge */}
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-yellow-400 text-white font-bold shadow-[0_0_20px_rgba(255,165,0,0.8)]">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
      <div className="relative z-10 flex flex-col justify-center px-20 max-w-xl">
        <h2 className="text-6xl font-bold text-orange-800 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

const OrangeOrbit = {
  TitleSlide,
  TOCSlide: TOCSlideOrangeOrbit,
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
