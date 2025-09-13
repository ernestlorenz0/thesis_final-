import React from "react";
import { FaRobot, FaMicrochip } from "react-icons/fa";
import { MdOutlineTrendingUp } from "react-icons/md";
import { Cpu, Wifi, Cloud, CircuitBoard, Code2, Database } from "lucide-react";

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

/* Main Slide 4 – Circuit board background + tech icons */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-950 text-white flex items-center justify-center overflow-hidden">
      {/* Circuit lines */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <path d="M200 0 V1080 M600 0 V1080 M1000 0 V1080 M1400 0 V1080" stroke="#3b82f6" strokeWidth="2"/>
          <path d="M0 200 H1920 M0 600 H1920 M0 1000 H1920" stroke="#8b5cf6" strokeWidth="2"/>
        </svg>
      </div>

      {/* Floating icons */}
      <Cpu className="absolute top-24 left-20 text-blue-400 opacity-40 w-16 h-16" />
      <CircuitBoard className="absolute bottom-32 right-32 text-purple-400 opacity-30 w-20 h-20" />
      <Cloud className="absolute top-1/2 left-1/3 text-cyan-400 opacity-30 w-16 h-16" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl text-center px-16">
        <h2 className="text-6xl font-extrabold text-blue-400 mb-8">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-300">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 5 – Holographic panels + icons */
export function MainSlide5({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white flex items-center justify-center p-16 overflow-hidden">
      {/* Holographic panels */}
      <div className="absolute top-24 left-20 w-72 h-44 bg-blue-600/30 border border-blue-400/40 rounded-xl backdrop-blur-md transform rotate-6"></div>
      <div className="absolute bottom-24 right-32 w-80 h-52 bg-purple-600/30 border border-purple-400/40 rounded-xl backdrop-blur-md transform -rotate-6"></div>

      {/* Floating icons */}
      <Wifi className="absolute top-12 right-16 text-cyan-400 opacity-30 w-14 h-14" />
      <Database className="absolute bottom-20 left-32 text-blue-400 opacity-40 w-16 h-16" />
      <Code2 className="absolute top-1/3 right-1/4 text-purple-300 opacity-30 w-12 h-12" />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
        {/* Image */}
        <div className="w-[500px] h-[350px] flex items-center justify-center border-4 border-blue-500/50 rounded-xl shadow-[0_0_40px_rgba(59,130,246,0.6)] bg-gray-900/60">
          {imageUrl ? (
            <img src={imageUrl} alt="Hologram visual" className="w-full h-full object-contain rounded-lg" />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold text-purple-300 mb-6">{title}</h2>
          <p className="text-2xl leading-relaxed text-gray-300">{content}</p>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 6 – Futuristic HUD + icons */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-950 text-white flex items-center justify-center overflow-hidden">
      {/* HUD background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f_1px,transparent_1px),linear-gradient(to_bottom,#0ff_1px,transparent_1px)] bg-[size:100px_100px] opacity-10"></div>

      {/* Futuristic rings */}
      <div className="absolute w-[900px] h-[900px] border-8 border-blue-500/30 rounded-full animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] border-4 border-purple-400/30 rounded-full"></div>

      {/* Floating icons */}
      <Cpu className="absolute top-40 left-40 text-blue-400 opacity-30 w-16 h-16" />
      <CircuitBoard className="absolute bottom-40 right-40 text-purple-400 opacity-30 w-16 h-16" />
      <Cloud className="absolute top-1/3 right-1/3 text-cyan-400 opacity-30 w-14 h-14" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <h2 className="text-6xl font-extrabold text-cyan-300 mb-8">{title}</h2>
        <p className="text-3xl leading-relaxed text-gray-300">{content}</p>
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
