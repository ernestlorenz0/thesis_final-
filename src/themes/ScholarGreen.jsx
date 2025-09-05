import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-green-900 to-emerald-700 flex flex-col items-center justify-center text-center">
      {/* Decorative underline with flourish */}
      <h1 className="text-6xl font-serif text-green-100 font-bold mb-4 drop-shadow-lg">
        {title}
      </h1>
      <div className="h-[4px] w-40 bg-green-400 rounded-full mb-4 shadow-[0_0_10px_rgba(34,197,94,0.7)]"></div>
      <h2 className="text-2xl font-light italic text-green-200">{subtitle}</h2>
    </section>
  );
}

/* ---------------- MAIN SLIDE 1 ---------------- */
/* Left-aligned title sidebar, wide content on right */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-green-50 flex">
      {/* Vertical title bar */}
      <div className="w-1/4 bg-green-700 flex items-center justify-center">
        <h2 className="text-3xl font-serif text-white -rotate-90 whitespace-nowrap tracking-widest">
          {title}
        </h2>
      </div>

      {/* Content side */}
      <div className="flex-1 flex items-center justify-center px-16">
        <p className="text-lg text-green-900 leading-relaxed max-w-3xl">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
/* Title at top, content split into two flowing columns */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-green-200 to-green-100 flex flex-col p-12">
      <h2 className="text-3xl font-bold text-green-900 mb-8">{title}</h2>

      {/* Two-column flowing layout */}
      <div className="flex-1 grid grid-cols-2 gap-12 text-green-800 leading-relaxed text-lg">
        <p>{content}</p>
        <p>{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 3 ---------------- */
/* Fullscreen background with diagonal ribbon for text */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-green-800 overflow-hidden flex items-center justify-center">
      {/* Diagonal ribbon */}
      <div className="absolute -skew-y-6 bg-green-600/80 w-[150%] h-[60%]"></div>

      {/* Text block on ribbon */}
      <div className="relative z-10 text-center px-16">
        <h2 className="text-4xl font-serif font-bold text-green-50 mb-4">
          {title}
        </h2>
        <p className="text-lg text-green-100 leading-relaxed max-w-3xl mx-auto">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- IMAGE SLIDE ---------------- */
/* Split layout: left big image, right caption block */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-green-50 flex">
      {/* Image side */}
      <div className="w-2/3 h-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Scholar Green visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-green-200 flex items-center justify-center text-green-700">
            No Image
          </div>
        )}
      </div>

      {/* Caption side */}
      <div className="flex-1 bg-green-700 flex flex-col justify-center p-12 text-white">
        <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
        <p className="text-lg leading-relaxed opacity-90">
          Supporting text or description goes here.
        </p>
      </div>
    </section>
  );
}

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-b from-emerald-900 to-green-700 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-serif text-green-100 font-bold mb-4">
        End of Presentation
      </h1>
      <div className="h-[3px] w-32 bg-green-400 rounded-full shadow-lg"></div>
    </section>
  );
}

const ScholarGreen = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default ScholarGreen;
