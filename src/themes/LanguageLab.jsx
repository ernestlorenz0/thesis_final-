import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
import { MdTranslate } from "react-icons/md";

/* Title Slide – Speech bubble theme */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Speech bubble icons */}
      <FaRegCommentDots className="absolute top-12 left-16 text-7xl opacity-30" />
      <MdTranslate className="absolute bottom-20 right-24 text-8xl opacity-20" />
      <PiTextTBold className="absolute top-1/2 left-1/4 text-6xl opacity-30" />

      <h1 className="relative z-10 text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
      <h2 className="relative z-10 text-2xl opacity-90">{subtitle}</h2>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#fdfbff] via-[#f5f2fc] to-[#ece8f9] text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-2xl"></div>

      {/* Floating characters */}
      <div className="absolute top-20 left-40 text-6xl font-bold text-indigo-500 opacity-40">
        あ
      </div>
      <div className="absolute bottom-28 right-48 text-6xl font-bold text-pink-500 opacity-40">
        A
      </div>
      <div className="absolute bottom-52 left-64 text-5xl font-bold text-blue-500 opacity-40">
        Ж
      </div>

      {/* Speech bubble icon */}
      <div className="absolute top-16 right-16 text-7xl text-purple-500/50">
        💬
      </div>

      {/* Title */}
      <h2 className="text-6xl font-bold font-sans text-indigo-900 mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-800 hover:text-orange-600 transition-colors duration-300 group">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 border-3 border-orange-200 group-hover:border-orange-300 shadow-lg transition-all duration-300
                ${sectionIndex % 4 === 0 ? "bg-orange-500 group-hover:bg-orange-600" : sectionIndex % 4 === 1 ? "bg-red-500 group-hover:bg-red-600" : sectionIndex % 4 === 2 ? "bg-yellow-500 group-hover:bg-yellow-600" : "bg-green-500 group-hover:bg-green-600"}`}>
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
              <div key={actualIndex} className="flex items-center gap-8 text-gray-800 hover:text-orange-600 transition-colors duration-300 group">
                <div className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold flex-shrink-0 border-3 border-orange-200 group-hover:border-orange-300 shadow-lg transition-all duration-300
                  ${actualIndex % 4 === 0 ? "bg-orange-500 group-hover:bg-orange-600" : actualIndex % 4 === 1 ? "bg-red-500 group-hover:bg-red-600" : actualIndex % 4 === 2 ? "bg-yellow-500 group-hover:bg-yellow-600" : "bg-green-500 group-hover:bg-green-600"}`}>
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

/* ---------------- MAIN SLIDE 1 ---------------- */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 flex items-center justify-center overflow-hidden">
      {/* Language learning background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-full blur-2xl"></div>
      </div>

      {/* Speech bubble decoration */}
      <div className="absolute top-16 right-16 text-7xl text-purple-500/30">💬</div>

      <div className="relative z-10 w-3/4 bg-white/80 backdrop-blur-sm border-4 border-indigo-500 rounded-2xl p-12 text-center shadow-2xl">
        <h2 className="text-8xl font-bold mb-8 text-indigo-900">{title}</h2>
        <p className="text-5xl leading-relaxed text-gray-700">{content}</p>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideLanguageLab({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const LanguageLab = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  MainSlide5,
  MainSlide6,
  ImageSlide,
  EndSlide,
};

export default LanguageLab;
/* Main Slide 2 – Dialogue boxes layout */
export function MainSlide2({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-tr from-blue-100 to-purple-100 flex flex-col items-center justify-center p-16 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 flex justify-around items-center opacity-50 text-9xl text-blue-300">
        <FaRegCommentDots className="text-7xl" />
        <PiTextTBold className="text-7xl" />
        <MdTranslate className="text-8xl" />
      </div>

      {/* Content area */}
      <div className="relative z-10 bg-white shadow-lg rounded-2xl p-12 max-w-4xl">
        <h2 className="text-5xl font-bold mb-4 text-blue-900">{title}</h2>
        <p className="text-3xl leading-8 text-gray-800">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 3 – Asymmetrical floating panels */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-bl from-pink-200 via-yellow-100 to-blue-200 flex p-16 overflow-hidden">
      {/* Floating panels */}
      <div className="absolute top-10 left-16 w-48 h-28 bg-white shadow-lg rounded-lg rotate-6 opacity-70"></div>
      <div className="absolute bottom-16 right-24 w-56 h-32 bg-white shadow-lg rounded-lg -rotate-6 opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center max-w-4xl">
        <h2 className="text-7xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>
      </div>

      <div className="absolute mt-[200px] bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src="src/svgs/speech.svg" alt="math"/>
      </div>
    </section>
  );
}

/* Main Slide 4 – Split Conversation Layout */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-900">
      {/* Decorative speech bubbles */}
      <FaRegCommentDots className="absolute top-16 left-20 text-7xl text-pink-400 opacity-30" />
      <MdTranslate className="absolute bottom-16 right-24 text-8xl text-purple-400 opacity-20" />

      {/* Left side – title */}
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-7xl font-bold mb-6">{title}</h2>
      </div>

      {/* Right side – content inside bubble */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="relative bg-white shadow-lg rounded-3xl p-12 max-w-xl">
          <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>
          <div className="absolute -bottom-6 left-12 w-8 h-8 bg-white rotate-45 shadow-md"></div>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 5 – Layered Bubble Stack */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-yellow-200 via-pink-100 to-purple-200 flex items-center justify-center overflow-hidden">
      {/* Stacked background bubbles */}
      <div className="absolute w-96 h-96 bg-blue-300/30 rounded-full top-12 left-24"></div>
      <div className="absolute w-80 h-80 bg-pink-400/20 rounded-full bottom-20 right-32"></div>

      {/* Foreground content */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-16 max-w-4xl text-center">
        <h2 className="text-5xl font-bold mb-6 text-purple-900">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 6 – Diagonal split with layered accents */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-2xl"></div>
      
      {/* Diagonal accent bar */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/60 to-transparent transform -skew-y-6"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-32 max-w-5xl">
        <h2 className="text-7xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-4xl leading-relaxed text-gray-800">{content}</p>
      </div>

      <div className="absolute mt-[160px] bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src="src/svgs/talking.svg" alt="math"/>
      </div>
    </section>
  );
}



/* Image Slide – Dictionary style card */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center text-gray-900">
      {/* Border frame */}
      <div className="absolute inset-8 border-4 border-blue-700 rounded-lg"></div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="language visual"
          className="relative z-10 max-h-[400px] object-contain mb-6 shadow-lg rounded-md border-4 border-pink-400"
        />
      ) : (
        <div className="relative z-10 w-[640px] h-[360px] flex items-center justify-center text-gray-400 border-4 border-blue-700">
          No Image
        </div>
      )}

      <h3 className="relative z-10 text-2xl font-bold mt-2">{title}</h3>
    </section>
  );
}

/* End Slide – Speech bubble close */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-700 to-pink-600 flex items-center justify-center text-white">
      {/* Giant bubble background */}
      <div className="absolute w-[800px] h-[400px] rounded-full bg-white/20 blur-3xl"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-bold mb-4">{message}</h2>
        <p className="text-2xl opacity-80">The End</p>
      </div>
    </section>
  );
}
