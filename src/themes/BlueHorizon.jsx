import React from "react";
import { Compass, Globe, Waves, Sun, Star, Moon, Cloud } from "lucide-react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2b6cb0] overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-white font-[HedvigLettersSerif] text-6xl">{title}</h1>
        {subtitle && <p className="text-white text-lg mt-3">{subtitle}</p>}
      </div>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-sky-700 via-sky-500 to-sky-300 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Horizon glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sky-200/40 to-transparent"></div>

      {/* Wave shapes */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-sky-800/80 to-transparent rounded-t-[100%]"></div>
      <div className="absolute bottom-12 w-full h-40 bg-gradient-to-t from-blue-900/70 to-transparent rounded-t-[100%]"></div>

      {/* Floating circles (bubbles/clouds) */}
      <div className="absolute top-20 left-24 w-40 h-40 rounded-full bg-sky-200/30 blur-3xl"></div>
      <div className="absolute top-32 right-40 w-60 h-60 rounded-full bg-blue-300/30 blur-3xl"></div>

      {/* Title */}
      <h2 className="text-6xl font-extrabold mb-16 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-sky-200 via-white to-blue-200 drop-shadow-[0_0_20px_rgba(135,206,250,0.6)]">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-800 hover:text-blue-600 transition-colors duration-300 group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 text-white text-2xl font-bold flex-shrink-0 border-3 border-sky-200 group-hover:border-sky-300 transition-all duration-300 shadow-lg">
                {sectionIndex + 1}
              </div>
              <span className="text-5xl font-bold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="flex items-center gap-8 text-gray-800 hover:text-blue-600 transition-colors duration-300 group">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 text-white text-2xl font-bold flex-shrink-0 border-3 border-sky-200 group-hover:border-sky-300 transition-all duration-300 shadow-lg">
                  {actualIndex + 1}
                </div>
                <span className="text-5xl font-bold text-left leading-tight flex-1 group-hover:translate-x-2 transition-transform duration-300">{section.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex flex-col items-center justify-center p-10 text-center">
      <div className="absolute top-0 left-0 w-32 h-full bg-[#3182ce] clip-path-polygon"></div>
      <div className="absolute bottom-0 right-0 w-32 h-full bg-[#2b6cb0]"></div>

      <Compass className="absolute top-20 left-28 w-32 h-32 text-blue-800 opacity-30 drop-shadow-md" />
      <Globe className="absolute bottom-24 right-40 w-28 h-28 text-indigo-700 opacity-30 drop-shadow-md" />
      <Waves className="absolute bottom-1/3 left-1/4 w-24 h-24 text-blue-900 opacity-25 drop-shadow-md" />
      <Sun className="absolute top-1/2 right-16 w-28 h-28 text-amber-600 opacity-25 drop-shadow-md" />

      <div className="relative z-10 max-w-3xl">
        <h2 className="font-[HedvigLettersSerif] text-6xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-3xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 1 ---------------- */
/* Two-column with auto image left, text right */
export function MainSlide1({ title, content, autoGeneratedImage }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      {/* Left: auto image or placeholder for 2nd term */}
      <div className="w-1/2 flex items-center justify-center p-10">
        {autoGeneratedImage ? (
          <div className="relative w-full max-w-[820px] h-[520px] bg-white rounded-2xl border-8 border-sky-500/60 shadow-2xl overflow-hidden">
            <img src={autoGeneratedImage} alt={title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-[820px] h-[520px] bg-white/80 rounded-2xl border-8 border-sky-400/70 shadow-2xl flex flex-col items-center justify-center">
            <div className="text-sky-800 text-3xl font-bold mb-2">Auto Image Placeholder</div>
            <div className="text-sky-700 text-xl">2nd Term MainSlide</div>
          </div>
        )}
      </div>

      {/* Right: text */}
      <div className="w-1/2 flex flex-col justify-center p-12 text-right">
        <h2 className="font-[HedvigLettersSerif] text-7xl text-[#2b6cb0] mb-6">{title}</h2>
        <p className="text-gray-800 text-4xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      <div className="w-1/2 flex flex-col justify-center p-10">
        <h2 className="font-[HedvigLettersSerif] text-7xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-4xl leading-relaxed">{content}</p>
      </div>
      <div className="w-1/2 flex items-center justify-center p-4">
        <img src="src/svgs/learning2.svg" alt="learning" className="w-[700px]"/>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      <div className="w-1/2 flex items-center justify-center p-4">
        <img src="src/svgs/booklover.svg" alt="booklover" className="w-[700px]"/>
      </div>
      <div className="w-1/2 flex flex-col justify-center p-10 text-right">
        <h2 className="font-[HedvigLettersSerif] text-7xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-4xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- MAIN SLIDE 4 ---------------- */
/* Vertical split: left colored sidebar with title, right side content */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden">
      {/* Left sidebar */}
      <div className="w-1/3 bg-[#2b6cb0] flex flex-col justify-center items-center p-12 text-white">
        <h2 className="font-[HedvigLettersSerif] text-5xl font-bold mb-6">
          {title}
        </h2>
        <div className="h-[4px] w-24 bg-[#f6ad55] rounded-full"></div>
      </div>

      {/* Right content */}
      <div className="flex-1 bg-[#ebf8ff] flex items-center justify-center p-16">
        <p className="text-3xl text-gray-800 leading-relaxed max-w-3xl text-center">
          {content}
        </p>
      </div>
    </section>
  );
}

export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-[#bee3f8] to-[#ebf8ff] flex items-center justify-center overflow-hidden">
      {/* Geometric accents */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#2b6cb0]/40 rotate-45"></div>
      <div className="absolute bottom-10 right-20 w-40 h-40 bg-[#3182ce]/30 rotate-12"></div>

      {/* Center content block */}
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="font-[HedvigLettersSerif] text-6xl text-[#2b6cb0] mb-6">
          {title}
        </h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* ---------------- IMAGE SLIDE ---------------- */
export function ImageSlide({ title, content, autoGeneratedImage, imageUrl }) {
  const imageSrc = autoGeneratedImage || imageUrl;
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex items-center justify-center">
      {/* Frame accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 w-5/6 h-5/6 flex items-center justify-between">
        {/* Left: auto image or placeholder for 1st term */}
        <div className="w-1/2 h-full flex items-center justify-center pr-8">
          {imageSrc ? (
            <div className="w-full h-full bg-white rounded-2xl border-8 border-sky-500/60 shadow-2xl overflow-hidden">
              <img src={imageSrc} alt={title} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-4/5 h-4/5 bg-white/80 border-8 border-sky-400/70 rounded-2xl shadow-2xl flex flex-col items-center justify-center">
              <div className="text-sky-800 text-3xl font-bold mb-2">Auto Image Placeholder</div>
              <div className="text-sky-700 text-xl">1st Term ImageSlide</div>
            </div>
          )}
        </div>

        {/* Right: term and definition */}
        <div className="w-1/2 text-right">
          {title && <h2 className="font-[HedvigLettersSerif] text-6xl text-[#2b6cb0] mb-6">{title}</h2>}
          {content && <p className="text-gray-800 text-3xl leading-relaxed">{content}</p>}
        </div>
      </div>
    </section>
  );
}


export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2b6cb0] overflow-hidden flex items-center justify-center">
      <Star className="absolute top-20 left-40 w-16 h-16 text-cyan-200 opacity-40" />
      <Star className="absolute top-32 right-48 w-12 h-12 text-blue-200 opacity-40" />
      <Moon className="absolute top-1/4 right-1/3 w-28 h-28 text-amber-200 opacity-60" />
      <Cloud className="absolute bottom-28 left-1/4 w-36 h-36 text-blue-300 opacity-30" />
      <Waves className="absolute bottom-12 right-1/4 w-28 h-28 text-cyan-300 opacity-25" />

      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>
      <h1 className="text-white font-[HedvigLettersSerif] text-6xl">End Slide</h1>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideBlueHorizon({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const BlueHorizon = { 
  TitleSlide, 
  TOCSlide,
  MainSlide, 
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  ImageSlide,
  EndSlide 
};
export default BlueHorizon;
