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

export function TOCSlideResearchReady({
  title = "Table of Contents",
  items = [],
}) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#f7f9fc] to-[#e6ecf5] text-[#1c1c1c] flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle grid / notebook lines */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      {/* Accent shapes */}
      <div className="absolute top-16 left-24 w-24 h-24 rounded-full bg-blue-500/20"></div>
      <div className="absolute bottom-24 right-36 w-32 h-32 rounded-lg bg-indigo-400/20 rotate-12"></div>

      {/* Title */}
      <h2 className="text-6xl font-bold text-[#1e3a8a] mb-16 drop-shadow-sm tracking-wide">
        {title}
      </h2>

      {/* TOC List */}
      <ul className="text-3xl font-sans space-y-10 max-w-3xl text-left">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-6"
          >
            {/* Number badge */}
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold shadow-md">
              {index + 1}
            </span>
            <span className="text-[#1c1c1c]">{item}</span>
          </li>
        ))}
      </ul>
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

/* ---------------- MAIN SLIDE 4 ---------------- */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-gray-50 to-white flex items-center px-24 py-16">
      <div className="max-w-5xl">
        {/* Title with underline accent */}
        <h2 className="text-6xl font-serif font-bold text-blue-900 mb-4">
          {title}
        </h2>
        <div className="h-[4px] w-32 bg-blue-700 mb-10 rounded"></div>

        {/* Elegant content box */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-12">
          <p className="text-3xl font-sans text-gray-800 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 5 ---------------- */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white px-24 py-16 flex flex-col">
      {/* Header */}
      <h2 className="text-6xl font-serif font-bold text-blue-900 mb-4">
        {title}
      </h2>
      <div className="h-[3px] w-28 bg-blue-700 mb-10"></div>

      {/* Split layout with diagonal design accent */}
      <div className="grid grid-cols-2 gap-12 items-center">
        <p className="text-3xl font-sans text-gray-800 leading-relaxed">
          {content}
        </p>

        {/* Placeholder for visuals with background accent */}
        <div className="relative bg-gray-50 border border-gray-300 rounded-lg shadow-md p-8 flex items-center justify-center">
          <span className="text-gray-500 font-sans">Insert Graph / Image</span>

          {/* Subtle blue diagonal accent */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-100 rotate-12 rounded-md"></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 6 ---------------- */
export function MainSlide6({ title, points }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-50 px-24 py-16">
      {/* Header with side bar accent */}
      <div className="flex items-center mb-10">
        <div className="w-3 h-20 bg-blue-700 mr-6 rounded"></div>
        <h2 className="text-6xl font-serif font-bold text-blue-900">
          {title}
        </h2>
      </div>

      {/* Bullet points with subtle icon + divider line */}
      <ul className="space-y-8 text-3xl font-sans text-gray-800 leading-relaxed max-w-5xl">
        {points && points.length > 0 ? (
          points.map((point, i) => (
            <li
              key={i}
              className="flex items-start border-b border-gray-200 pb-4"
            >
              <div className="w-6 h-6 bg-blue-700 text-white flex items-center justify-center rounded-full text-lg mr-4">
                {i + 1}
              </div>
              <span>{point}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No points provided</li>
        )}
      </ul>
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
  TOCSlide: TOCSlideResearchReady,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default ResearchReady;
