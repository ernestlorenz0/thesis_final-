import React from "react";
import { FaRobot, FaMicrochip } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";

/* Title Slide – Futuristic grid + neon glow */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden flex items-center justify-center">
      {/* Tech grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f_1px,transparent_1px),linear-gradient(to_bottom,#00f_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>

      {/* Floating icons */}
      <FaRobot className="absolute top-12 left-20 text-7xl text-blue-400 opacity-30" />
      <FaMicrochip className="absolute bottom-20 right-24 text-8xl text-purple-400 opacity-20" />

      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold tracking-wide mb-6 drop-shadow-lg">{title}</h1>
        <h2 className="text-2xl font-light opacity-80">{subtitle}</h2>
      </div>
    </section>
  );
}

/* Main Slide 1 – Text left, image right */
export function MainSlide1({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gray-900 text-white">
      {/* Left text */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <h2 className="text-6xl font-bold text-blue-400 mb-6">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-300">{content}</p>
      </div>

      {/* Right image */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-l from-purple-700/30 to-transparent">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Tech visual"
            className="max-h-[400px] rounded-lg shadow-lg border border-blue-500"
          />
        ) : (
          <div className="w-[400px] h-[300px] flex items-center justify-center text-gray-500 border border-dashed border-blue-500">
            No Image
          </div>
        )}
      </div>
    </section>
  );
}

/* Main Slide 2 – Image left, text right */
export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-r from-blue-950 to-gray-900 text-white">
      {/* Left image */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-700/30 to-transparent">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Tech visual"
            className="max-h-[420px] rounded-xl shadow-lg border border-purple-400"
          />
        ) : (
          <div className="w-[400px] h-[300px] flex items-center justify-center text-gray-500 border border-dashed border-purple-400">
            No Image
          </div>
        )}
      </div>

      {/* Right text */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <h2 className="text-6xl font-bold text-purple-400 mb-6">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-300">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 3 – Split diagonal futuristic style */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden text-white flex items-center">
      {/* Background diagonal */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-800 to-blue-900"></div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-purple-800/80 to-transparent transform -skew-x-6"></div>

      {/* Content */}
      <div className="relative z-10 px-24 max-w-3xl">
        <h2 className="text-5xl font-extrabold text-blue-300 mb-6 translate-y-[-200px]">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-200 translate-x-[450px] translate-y-[-150px]">{content}</p>
      </div>
    </section>
  );
}

/* Image Slide – Framed neon */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:80px_80px] opacity-10"></div>

      {/* Title holographic bar */}
      <div className="absolute top-10 px-12 py-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-lg shadow-lg backdrop-blur-md border border-blue-400/40">
        <h3 className="text-3xl font-bold tracking-wide text-blue-200">{title}</h3>
      </div>

      {/* Image showcase */}
      <div className="relative z-10 w-[900px] h-[500px] flex items-center justify-center rounded-xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.6)] border-4 border-blue-500/70 transform perspective-[1200px] rotate-x-2">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Tech visual"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900/50">
            No Image
          </div>
        )}
      </div>

      {/* Glow accents */}
      <div className="absolute bottom-20 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      <div className="absolute top-40 right-20 w-[300px] h-[300px] rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
    </section>
  );
}

/* End Slide – Trend line graph vibe */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-900 to-blue-900 flex items-center justify-center text-white overflow-hidden">
      {/* Trend line */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg width="100%" height="100%">
          <polyline
            points="0,600 200,500 400,550 600,400 800,420 1000,300 1280,350"
            fill="none"
            stroke="cyan"
            strokeWidth="8"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-extrabold mb-6">{message}</h2>
        <p className="text-2xl text-blue-300">End of Tech Trends</p>
      </div>
    </section>
  );
}

const TechTrends = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default TechTrends;
