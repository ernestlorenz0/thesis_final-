import React from "react";
import { GraduationCap, BookOpen, PenTool } from "lucide-react";

export function TitleSlide({ title, subtitle, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] flex items-center justify-center bg-white">
      <div className="flex w-[80%] h-[80%] items-center justify-between">

        <div className="w-[40%] h-[70%] bg-gray-300 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Presentation visual"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Image Placeholder</span>
          )}
        </div>

        <div className="w-[50%] flex flex-col justify-center pl-12">
          <h1 className="font-merriweather font-bold text-6xl text-black mb-4 leading-tight text-black">
            {title}
          </h1>
          <p className="font-lato font-light text-2xl text-gray-600">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

/* Table of Contents Slide – Academic Minimal */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle border */}
      <div className="absolute inset-12 border border-gray-300 rounded-lg"></div>

      {/* Title */}
      <h2 className="text-5xl font-serif font-bold text-gray-800 mb-16 tracking-wide">
        {title}
      </h2>

      {/* Hierarchical List with proper alignment */}
      <div className="text-2xl font-light space-y-6 max-w-5xl w-full text-left">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            {/* Main section */}
            <div className="flex items-start gap-4 hover:text-gray-600 transition-colors duration-200">
              <span className="text-gray-500 font-mono text-xl flex-shrink-0 mt-1">
                {String(sectionIndex + 1).padStart(2, "0")}
              </span>
              <span className="border-b border-gray-300 flex-1 pb-1 text-left leading-tight font-semibold">
                {section.title}
              </span>
            </div>
            
            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="ml-8 space-y-2">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="flex items-start gap-3 hover:text-gray-500 transition-colors duration-200">
                    <span className="text-gray-400 font-mono text-sm flex-shrink-0 mt-1">
                      {String(sectionIndex + 1).padStart(2, "0")}.{subIndex + 1}
                    </span>
                    <span className="text-lg text-left leading-tight flex-1 opacity-80">
                      {subsection}
                    </span>
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

// Keep old component for backward compatibility
export function TOCSlideAcademic({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

export function ContentSlide({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-3xl leading-relaxed text-black">{content}</p>
    </section>
  );
}

export function ContentSlideText({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-3xl leading-relaxed text-black">{content}</p>
    </section>
  );
}


export function MainSlide({ title, content, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex p-16 gap-12">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center max-w-[60%]">
        <h2 className="font-merriweather font-bold text-5xl mt-[-300px] text-black leading-snug">
          {title}
        </h2>
        <p className="font-lato font-light text-3xl leading-relaxed text-black break-words">
          {content}
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center">
        <img src="src/svgs/paper.svg" alt="paper" />
      </div>
    </section>
  );
}


export function MainSlide1({ title, content, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex p-24 gap-12">
      <div className="w-1/2 flex items-center justify-center">
        <img src="src/svgs/books.svg" alt="books" className="w-[600px]"/>
      </div>
      <div className="w-1/2 flex flex-col">
        <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
        <p className="font-lato font-light text-3xl leading-relaxed text-black">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ title, content, onTitleClick, onContentClick }) {
  console.log("🎯 AcademicMinimal MainSlide2 rendered with props:", {
    title,
    content,
    hasOnTitleClick: !!onTitleClick,
    hasOnContentClick: !!onContentClick,
  });

  const handleTitleClick = (e) => {
    console.log("🎯 Title clicked in AcademicMinimal!");
    if (onTitleClick) {
      onTitleClick(e);
    }
  };

  const handleContentClick = (e) => {
    console.log("🎯 Content clicked in AcademicMinimal!");
    if (onContentClick) {
      onContentClick(e);
    }
  };

  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col p-24 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] [background-size:24px_24px]" />

      {/* Faint academic visuals */}
      <GraduationCap className="absolute top-20 right-28 w-40 h-40 text-gray-400/10" />
      <BookOpen className="absolute bottom-24 left-32 w-36 h-36 text-gray-400/10" />
      <PenTool className="absolute top-1/2 right-1/4 w-32 h-32 text-gray-400/10 rotate-12" />

      {/* Title */}
      <h2
        className="relative z-10 font-merriweather font-bold text-6xl mb-4 text-gray-900 cursor-pointer p-2 transition-all duration-200"
        onClick={handleTitleClick}
        onDoubleClick={handleTitleClick}
      >
        {title}
      </h2>

      {/* Accent underline */}
      <div className="relative z-10 w-40 h-1 bg-gradient-to-r from-gray-700 to-gray-400 mb-8 rounded-full"></div>

      {/* Content area */}
      <p
        className="relative z-10 font-lato font-light text-3xl max-w-4xl leading-relaxed text-gray-800 cursor-pointer hover:bg-gray-50 hover:shadow-md rounded-xl p-6 transition-all duration-200"
        onClick={handleContentClick}
        onDoubleClick={handleContentClick}
      >
        {content}
      </p>
    </section>
  );
}


export function EndSlide({ message = "Thank You!", subtitle }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center text-center">
      <h1 className="font-merriweather font-bold text-6xl text-black mb-6 text-black">
        {message}
      </h1>

      {subtitle && (
        <p className="font-lato font-light text-2xl text-gray-600 text-black">
          {subtitle}
        </p>
      )}
    </section>
  );
}

export function MainSlide4({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      {/* Two-column layout with divider */}
      <div className="flex flex-1 items-stretch justify-center gap-16">
        {/* Left block */}
        <div className="flex-1 flex flex-col justify-center pr-8 text-right">
          <h2 className="font-merriweather font-bold text-7xl mb-4 text-black">
            {title}
          </h2>
          <p className="font-lato font-light text-4xl leading-relaxed text-gray-800">
            {content}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="h-[500px] w-[5px] bg-gray-300 rounded"></div>
        </div>

        {/* Right block */}
        <div className="flex-1 flex flex-col justify-center pl-8 text-left">
          <img src="src/svgs/studying.svg" alt="studying" className="w-[600px]"/>
        </div>
      </div>
    </section>
  );
}

// 3. ContentSlideWideCenterText
// Wide centered block with optional background accent
export function MainSlide6({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex items-center justify-center p-32">
      <div className="max-w-[70%] text-center bg-gray-50 rounded-2xl p-16 shadow-md">
        <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
        <p className="font-lato font-light text-3xl leading-relaxed text-black">{content}</p>
      </div>
    </section>
  );
}


const AcademicMinimal = { TitleSlide, 
                          TOCSlide, 
                          ContentSlide, 
                          ContentSlideText, 
                          MainSlide, MainSlide1, MainSlide2, MainSlide4, MainSlide6,
                          EndSlide };
export default AcademicMinimal;
