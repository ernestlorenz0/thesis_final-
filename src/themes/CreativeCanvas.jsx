import React from "react";

/* ---------------- TITLE SLIDE ---------------- */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-pink-200 via-yellow-200 to-cyan-200 flex items-center justify-center overflow-hidden">
      {/* Diagonal color overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300/50 to-transparent -skew-y-6"></div>

      {/* Floating title block */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md px-16 py-10 rounded-2xl shadow-2xl border-4 border-pink-400 rotate-2">
        <h1 className="text-6xl font-extrabold font-serif text-gray-900 mb-4 drop-shadow-lg">
          {title}
        </h1>
        <h2 className="text-2xl font-light italic text-gray-700">{subtitle}</h2>
      </div>
    </section>
  );
}

export function TOCSlideCreativeCanvas({
  title = "Table of Contents",
  items = [],
}) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#fafafa] text-[#1c1c1c] flex flex-col items-center justify-center overflow-hidden">
      {/* Background paint strokes */}
      <div className="absolute top-20 left-10 w-[600px] h-[200px] bg-gradient-to-r from-pink-400/60 to-orange-400/60 rounded-[50%] rotate-[-10deg] blur-2xl"></div>
      <div className="absolute bottom-20 right-16 w-[500px] h-[180px] bg-gradient-to-r from-sky-400/60 to-violet-400/60 rounded-[50%] rotate-[15deg] blur-2xl"></div>

      {/* Abstract blobs */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-yellow-300/50 rounded-full mix-blend-multiply"></div>
      <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-purple-300/50 rounded-full mix-blend-multiply"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 drop-shadow-lg">
        {title}
      </h2>

      {/* TOC List */}
      <ul className="text-3xl font-semibold space-y-10 max-w-4xl text-left relative z-10">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-6">
            {/* Brush stroke number marker */}
            <span className="px-6 py-3 bg-gradient-to-r from-violet-500 to-sky-500 text-white rounded-full shadow-md">
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
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-blue-200 to-purple-200 flex overflow-hidden">
      {/* Left angled panel */}
      <div className="w-2/5 bg-white/90 backdrop-blur-md p-10 rotate-[-2deg] shadow-xl m-8 rounded-lg relative z-10">
        <h2 className="text-5xl font-bold font-serif text-purple-800 mb-4">{title}</h2>
        <p className="text-2xl font-sans text-gray-800 leading-relaxed">{content}</p>
      </div>

      {/* Right abstract paint area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-300/50 to-yellow-200/40 rotate-3"></div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 2 ---------------- */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex items-center justify-center overflow-hidden">
      {/* Split diagonal background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200 to-green-200 -skew-y-6"></div>

      {/* Floating framed card */}
      <div className="relative z-10 bg-white/90 p-12 rounded-3xl border-[6px] border-cyan-400 shadow-2xl rotate-1 max-w-3xl">
        <h2 className="text-6xl font-extrabold text-cyan-700 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 3 ---------------- */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-bl from-pink-100 to-purple-200 flex overflow-hidden">
      {/* Overlapping shapes */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-yellow-300/40 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/40 rotate-12 rounded-xl blur-2xl"></div>

      {/* Content card */}
      <div className="relative z-10 m-auto bg-white/90 p-12 rounded-2xl border-4 border-purple-400 shadow-lg max-w-3xl text-center">
        <h2 className="text-6xl font-bold text-purple-800 mb-4">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 4 ---------------- */
/* Split layout: text left, playful graphic right */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-pink-100 via-yellow-100 to-cyan-100 flex items-center overflow-hidden">
      {/* Floating playful shapes */}
      <div className="absolute top-10 left-1/2 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-300/40 rotate-12 rounded-2xl blur-2xl"></div>

      {/* Text column */}
      <div className="relative z-10 w-1/2 pl-24">
        <h2 className="text-7xl font-extrabold text-pink-700 mb-8">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>

      {/* Decorative doodle area */}
      <div className="relative z-10 w-1/2 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-gradient-to-br from-cyan-300 to-purple-300 rounded-full shadow-2xl"></div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 5 ---------------- */
/* Vertical flow with big header + divider */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Soft background strokes */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 via-pink-200/40 to-purple-200/40 rotate-2"></div>

      {/* Title up top */}
      <h2 className="relative z-10 text-8xl font-bold text-yellow-600 mb-8">{title}</h2>

      {/* Divider bar */}
      <div className="relative z-10 w-2/3 h-4 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full mb-10"></div>

      {/* Content text */}
      <p className="relative z-10 text-3xl text-gray-700 leading-relaxed max-w-5xl text-center">
        {content}
      </p>
    </section>
  );
}

/* ---------------- MAIN SLIDE 6 ---------------- */
/* Grid layout with text + icon accents */
import { Cpu, Cloud, Smartphone } from "lucide-react";

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tl from-blue-100 via-cyan-100 to-purple-100 grid grid-cols-2 items-center px-24 overflow-hidden">
      {/* Left column with text */}
      <div className="z-10">
        <h2 className="text-7xl font-extrabold text-blue-700 mb-8">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>

      {/* Right column with icons */}
      <div className="z-10 flex flex-col gap-12 items-center">
        <Cpu size={160} className="text-blue-500" />
        <Cloud size={160} className="text-purple-500" />
        <Smartphone size={160} className="text-cyan-500" />
      </div>

      {/* Background accent */}
      <div className="absolute bottom-10 right-32 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>
    </section>
  );
}


/* ---------------- IMAGE SLIDE ---------------- */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-yellow-100 to-pink-100 flex flex-col items-center justify-center overflow-hidden">
      {/* Title on paint stroke bar */}
      <div className="relative z-10 mb-6 px-8 py-3 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-xl rotate-[-2deg] shadow-lg">
        <h3 className="text-2xl font-bold text-white drop-shadow">{title}</h3>
      </div>

      {/* Image with irregular border */}
      <div className="relative z-10 w-[900px] h-[500px] bg-white rounded-[2rem] border-[10px] border-purple-300 shadow-2xl rotate-2 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Creative visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600 flex items-center justify-center w-full h-full">
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
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
      <h1 className="text-6xl font-extrabold text-white drop-shadow-lg rotate-[-2deg]">
        Thank You 🎨
      </h1>
    </section>
  );
}

const CreativeCanvas = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};
export default CreativeCanvas;
