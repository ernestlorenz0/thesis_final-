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


/* Table of Contents Slide – Tech Trends */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Futuristic glowing grid background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

      {/* Neon circuit lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg"></div>
      <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-b from-pink-500 to-purple-600 shadow-lg"></div>

      {/* Title */}
      <h2 className="text-6xl font-bold tracking-wide text-cyan-300 mb-16 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 hover:text-cyan-300 transition-colors duration-300 group">
              <div className="w-20 h-20 rounded-lg border-3 border-cyan-400 group-hover:border-cyan-300 bg-gray-900/50 group-hover:bg-gray-800/60 flex items-center justify-center text-2xl text-cyan-400 group-hover:text-cyan-300 font-bold flex-shrink-0 shadow-lg transition-all duration-300">
                {sectionIndex + 1}
              </div>
              <span className="text-5xl font-semibold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="flex items-center gap-8 hover:text-cyan-300 transition-colors duration-300 group">
                <div className="w-20 h-20 rounded-lg border-3 border-cyan-400 group-hover:border-cyan-300 bg-gray-900/50 group-hover:bg-gray-800/60 flex items-center justify-center text-2xl text-cyan-400 group-hover:text-cyan-300 font-bold flex-shrink-0 shadow-lg transition-all duration-300">
                  {actualIndex + 1}
                </div>
                <span className="text-5xl font-semibold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center overflow-hidden">
      {/* Tech grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-cyan-400/30"></div>
          ))}
        </div>
      </div>

      {/* Neon accents */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-600 shadow-lg"></div>
      <div className="absolute bottom-0 right-0 w-2 h-full bg-gradient-to-b from-pink-500 to-purple-600 shadow-lg"></div>

      <div className="relative z-10 w-3/4 bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-400 rounded-lg p-12 text-center shadow-2xl">
        <h2 className="text-8xl font-bold mb-8 text-cyan-300 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]">{title}</h2>
        <p className="text-5xl leading-relaxed text-gray-300">{content}</p>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideTechTrends({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const TechTrends = {
  TitleSlide,
  TOCSlides: TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};

export default TechTrends;

/* Main Slide 2 – Image left, text right */
export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-r from-blue-950 to-gray-900 text-white">
      {/* Left image */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-700/30 to-transparent">
        <img src="src/svgs/server.svg" alt="server" className="w-[700px]"/>
      </div>

      {/* Right text */}
      <div className="w-1/2 p-16 flex flex-col justify-center ml-[-100px]">
        <h2 className="text-7xl font-bold text-purple-400 mb-6">{title}</h2>
        <p className="text-4xl leading-relaxed text-gray-300">{content}</p>
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
      <div className="relative z-10 px-24 max-w-4xl">
        <h2 className="text-7xl font-extrabold text-blue-300 mb-6 translate-y-[-200px]">{title}</h2>
        <p className="text-4xl leading-relaxed text-gray-200 translate-x-[700px] translate-y-[-150px]">{content}</p>
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
        <div className="w-[700px] h-[350px] flex items-center justify-center">
          <img src="src/svgs/robot.svg" alt="robot" />
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <h2 className="text-7xl font-bold text-purple-300 mb-6">{title}</h2>
          <p className="text-4xl leading-relaxed text-gray-300">{content}</p>
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
