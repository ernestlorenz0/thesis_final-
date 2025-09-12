import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center text-center px-16">
      {/* Top accent bar */}
      <div className="absolute top-0 w-full h-6 bg-blue-900"></div>

      <h1 className="text-6xl font-serif font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <h2 className="text-2xl font-sans font-light text-gray-700">
        {subtitle}
      </h2>

      {/* Bottom bar */}
      <div className="absolute bottom-0 w-full h-4 bg-gray-200"></div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col px-20 py-16">
      {/* Header with divider */}
      <h2 className="text-6xl font-serif font-bold text-blue-900 mb-2">
        {title}
      </h2>
      <div className="h-[3px] w-24 bg-blue-700 mb-6"></div>

      {/* Content */}
      <p className="text-3xl font-sans text-gray-800 leading-relaxed">
        {content}
      </p>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-50 flex items-center justify-center px-24 py-16">
      <div className="max-w-4xl w-full">
        <h2 className="text-6xl font-serif font-semibold text-gray-900 mb-6">
          {title}
        </h2>
        <div className="border-l-4 border-blue-700 pl-6">
          <p className="text-3xl font-sans text-gray-800 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 3 ---------------- */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex">
      {/* Left sidebar accent */}
      <div className="w-8 bg-blue-900"></div>

      <div className="flex-1 flex flex-col justify-center px-16">
        <h2 className="text-6xl font-serif font-bold text-blue-900 mb-4">
          {title}
        </h2>
        <p className="text-3xl font-sans text-gray-800 leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- IMAGE SLIDE ---------------- */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-50 flex flex-col items-center justify-center px-10">
      {/* Title on top */}
      <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
        {title}
      </h3>

      {/* Framed image area (like a research figure) */}
      <div className="w-[1000px] h-[500px] border border-gray-400 rounded-md shadow-md bg-white flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Research visual"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-gray-500 font-sans">No Image</span>
        )}
      </div>
    </section>
  );
}

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-blue-900 flex items-center justify-center">
      <h1 className="text-4xl font-serif font-bold text-white">Thank You</h1>
    </section>
  );
}

const ResearchReady = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default ResearchReady;
