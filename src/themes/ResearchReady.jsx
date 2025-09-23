import React from "react";
import { Watermark } from "../components/Watermark";

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

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
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

      {/* Hierarchical List */}
      <div className="text-2xl font-light space-y-6 max-w-5xl w-full text-left z-10">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            {/* Main section */}
            <div className="flex items-start gap-4 hover:text-blue-600 transition-colors duration-200">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm font-bold flex-shrink-0 mt-1">
                {sectionIndex + 1}
              </span>
              <span className="flex-1 text-left leading-tight font-semibold">{section.title}</span>
            </div>
            
            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="ml-12 space-y-2">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="flex items-start gap-3 hover:text-indigo-600 transition-colors duration-200">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-400 text-white text-xs font-semibold flex-shrink-0 mt-1">
                      {sectionIndex + 1}.{subIndex + 1}
                    </span>
                    <span className="text-lg text-left leading-tight flex-1 opacity-90">{subsection}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col px-20 py-16">
      <Watermark type="book" />

      <h2 className="text-6xl font-serif font-bold text-blue-900 mb-2">
        {title}
      </h2>
      <div className="h-[3px] w-24 bg-blue-700 mb-6"></div>

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
      <Watermark type="flask" />

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
      <Watermark type="chart" />

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
      <Watermark type="idea" />

      <div className="max-w-5xl">
        <h2 className="text-6xl font-serif font-bold text-blue-900 mb-4">
          {title}
        </h2>
        <div className="h-[4px] w-32 bg-blue-700 mb-10 rounded"></div>

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
    <section className="relative w-[1920px] h-[1080px] bg-gray-50 px-24 py-16">
      {/* Subtle watermark accent (like the others) */}
      <div className="absolute top-20 right-24 text-blue-100 text-[180px] opacity-10 pointer-events-none select-none">
        📑
      </div>

      {/* Header with divider */}
      <h2 className="text-6xl font-serif font-bold text-blue-900 mb-4 relative z-10">
        {title}
      </h2>
      <div className="h-[3px] w-28 bg-blue-700 mb-10 relative z-10"></div>

      {/* Content */}
      <p className="text-3xl font-sans text-gray-800 leading-relaxed max-w-5xl relative z-10">
        {content}
      </p>
    </section>
  );
}

/* ---------------- MAIN SLIDE 6 ---------------- */
export function MainSlide6({ title, points }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-50 px-24 py-16">
      <Watermark type="academy" />

      <div className="flex items-center mb-10">
        <div className="w-3 h-20 bg-blue-700 mr-6 rounded"></div>
        <h2 className="text-6xl font-serif font-bold text-blue-900">
          {title}
        </h2>
      </div>

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

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-blue-900 flex items-center justify-center">
      <h1 className="text-4xl font-serif font-bold text-white">Thank You</h1>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideResearchReady({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const ResearchReady = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};
export default ResearchReady;
