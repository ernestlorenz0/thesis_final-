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

export function TOCSlideVibrantViolet({
  title = "Table of Contents",
  items = [],
}) {
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

      {/* TOC Items */}
      <ul className="text-3xl font-medium space-y-10 max-w-3xl text-left relative z-10">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-6 hover:text-pink-300 transition duration-300"
          >
            {/* Neon glowing number badge */}
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(255,0,255,0.7)]">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
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
      <div className="relative z-10 px-20 max-w-3xl">
        <h2 className="text-6xl font-bold text-purple-800 mb-6">{title}</h2>
        <p className="text-3xl text-purple-900 leading-relaxed">{content}</p>
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
  TOCSlides: TOCSlideVibrantViolet,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default VibrantViolet;
