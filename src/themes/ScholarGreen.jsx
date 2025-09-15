import React from "react";
import { BookOpen, PenTool, GraduationCap, Scroll, Globe } from "lucide-react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-green-900 to-emerald-700 flex flex-col items-center justify-center text-center">
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
    <section className="relative w-[1920px] h-[1080px] bg-green-50 flex">
      {/* Vertical title bar */}
      <div className="w-1/4 bg-green-700 flex items-center justify-center">
      </div>

      {/* Content side */}
      <div className="flex-1 p-16 flex flex-col justify-center">
        <h2 className="text-5xl text-black font-bold font-bold border-b-2 border-green-500 pb-4 mb-6 translate-y-[-200px]">
          {title}
        </h2>
        <p className="text-3xl text-black font-light leading-relaxed translate-y-[-150px]">{content}</p>
      </div>
    </section>
  );
}


/* ---------------- MAIN SLIDE 3 ---------------- */
/* Fullscreen background with diagonal ribbon for text */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-green-800 overflow-hidden flex items-center justify-center">
      {/* Diagonal ribbon */}
      <div className="absolute -skew-y-6 bg-green-600/80 w-[150%] h-[60%]"></div>

      {/* Text block on ribbon */}
      <div className="relative z-10 text-center px-16">
        <h2 className="text-6xl font-serif font-bold text-green-50 mb-4">
          {title}
        </h2>
        <p className="text-3xl text-green-100 leading-relaxed max-w-3xl mx-auto">
          {content}
        </p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 4 ---------------- */
/* Centered framed content with decorative leaf accents */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-green-100 flex items-center justify-center overflow-hidden">
      {/* Decorative leaf-like blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-green-400/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-700/20 rounded-full blur-2xl"></div>

      {/* Framed text */}
      <div className="relative z-10 border-4 border-green-600 rounded-2xl bg-white/80 shadow-xl px-20 py-16 text-center max-w-5xl">
        <h2 className="text-6xl font-serif font-bold text-green-900 mb-6">
          {title}
        </h2>
        <p className="text-3xl text-green-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 5 ---------------- */
/* ---------------- MAIN SLIDE 5 ---------------- */
/* Split horizontal bands with content overlay */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex flex-col overflow-hidden">
      {/* Background alternating bands */}
      <div className="flex-1 bg-green-800"></div>
      <div className="flex-1 bg-green-200"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-24 text-center">
        <h2 className="text-6xl font-serif font-bold text-green-100 drop-shadow mb-8">
          {title}
        </h2>
        <p className="text-3xl text-green-900 leading-relaxed max-w-5xl bg-white/70 px-10 py-6 rounded-xl shadow-lg">
          {content}
        </p>
      </div>
    </section>
  );
}


/* ---------------- MAIN SLIDE 6 ---------------- */
/* Split circle spotlight design */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-green-50 flex items-center justify-center overflow-hidden">
      {/* Overlapping spotlight circles */}
      <div className="absolute w-[800px] h-[800px] bg-green-300/30 rounded-full blur-3xl"></div>
      <div className="absolute w-[600px] h-[600px] bg-green-500/20 rounded-full blur-2xl"></div>

      {/* Content in spotlight */}
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="text-6xl font-serif font-bold text-green-900 mb-8">
          {title}
        </h2>
        <p className="text-3xl text-green-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}


/* ---------------- IMAGE SLIDE ---------------- */
/* Split layout: left big image, right caption block */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-green-50 flex">
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
        <h3 className="text-3xl font-serif font-bold mb-4">{title}</h3>
        <p className="text-lg leading-relaxed opacity-90">
          Supporting text or description goes here.
        </p>
      </div>
    </section>
  );
}

export function TOCSlideScholarGreen({
  title = "Table of Contents",
  items = [],
}) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#f0fdf4] via-[#dcfce7] to-[#bbf7d0] text-[#064e3b] flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle leaf accents */}
      <div className="absolute top-16 left-20 text-7xl text-green-600/30">🌿</div>
      <div className="absolute bottom-24 right-24 text-7xl text-green-700/30">📘</div>
      <div className="absolute top-1/2 left-1/3 -rotate-12 text-6xl text-green-500/20">🍃</div>

      {/* Decorative frame */}
      <div className="absolute inset-12 border-[6px] border-green-700/30 rounded-xl"></div>

      {/* Title */}
      <h2 className="text-6xl font-serif font-bold mb-16 tracking-wide text-green-900 drop-shadow-md">
        {title}
      </h2>

      {/* TOC Items */}
      <ul className="text-3xl font-serif space-y-10 max-w-3xl text-left relative z-10">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-6">
            {/* Academic styled number badge */}
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-green-700 to-green-500 text-white font-bold shadow-md">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- END SLIDE ---------------- */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-emerald-900 to-green-700 flex flex-col items-center justify-center">
      <BookOpen className="absolute top-24 left-24 w-32 h-32 text-green-800 opacity-25" />
      <PenTool className="absolute bottom-28 right-28 w-28 h-28 text-emerald-700 opacity-25" />
      <GraduationCap className="absolute top-1/3 left-1/4 w-28 h-28 text-lime-800 opacity-25" />
      <Scroll className="absolute bottom-1/3 right-1/4 w-24 h-24 text-green-900 opacity-25" />
      <Globe className="absolute top-1/2 right-16 w-28 h-28 text-emerald-900 opacity-25" />
      
      <h1 className="text-5xl font-serif text-green-100 font-bold mb-4">
        End of Presentation
      </h1>
      <div className="h-[3px] w-32 bg-green-400 rounded-full shadow-lg"></div>
    </section>
  );
}

const ScholarGreen = {
  TitleSlide,
  TOCSlide: TOCSlideScholarGreen,
  MainSlide1,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default ScholarGreen;
