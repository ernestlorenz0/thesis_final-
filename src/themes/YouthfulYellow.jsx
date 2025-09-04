import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-yellow-300 via-orange-200 to-yellow-100 flex items-center justify-center overflow-hidden">
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

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-yellow-100 flex overflow-hidden">
      {/* Left column for title */}
      <div className="w-1/3 bg-yellow-400/90 p-12 flex flex-col justify-center items-start shadow-lg z-10">
        <h2 className="text-4xl font-bold text-yellow-900 mb-6">{title}</h2>
      </div>

      {/* Right content with curved wave */}
      <div className="flex-1 p-16 flex items-center justify-center relative">
        <div className="absolute inset-y-0 left-1/3 w-[200%] bg-yellow-200 rounded-l-[50%]"></div>
        <p className="relative z-10 text-xl text-yellow-900 leading-relaxed max-w-2xl">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-yellow-200 to-orange-100 flex items-center justify-center overflow-hidden">
      {/* Floating card tilted */}
      <div className="relative bg-white/90 p-12 rounded-3xl shadow-2xl border-8 border-yellow-400 rotate-[-2deg] max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-yellow-800 mb-6">{title}</h2>
        <p className="text-lg text-yellow-900 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 3 ---------------- */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-yellow-50 flex overflow-hidden">
      {/* Background pattern dots */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-6 opacity-20">
        {Array.from({ length: 72 }).map((_, i) => (
          <div key={i} className="w-3 h-3 bg-yellow-400 rounded-full"></div>
        ))}
      </div>

      {/* Content split */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-16">
        <h2 className="text-4xl font-extrabold text-yellow-900 mb-6">{title}</h2>
        <p className="text-lg text-yellow-800 leading-relaxed max-w-3xl">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- IMAGE SLIDE ---------------- */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-t from-orange-200 to-yellow-100 flex flex-col items-center justify-center">
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
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-yellow-400 to-orange-300 flex items-center justify-center">
      <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
        Thank You 🌞
      </h1>
    </section>
  );
}

const YouthfulYellow = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default YouthfulYellow;
