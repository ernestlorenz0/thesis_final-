import React from "react";

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

      {/* Two-Column Layout for TOC - Minimized to show only main sections */}
      <div className="grid grid-cols-2 gap-20 z-10 max-w-6xl w-full">
        {/* Left Column */}
        <div className="space-y-10">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center gap-8 text-gray-800 hover:text-blue-600 transition-colors duration-300 group">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 text-white text-2xl font-bold flex-shrink-0 border-3 border-blue-200 group-hover:border-blue-300 transition-all duration-300 shadow-lg">
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
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 text-white text-2xl font-bold flex-shrink-0 border-3 border-blue-200 group-hover:border-blue-300 transition-all duration-300 shadow-lg">
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

// Keep old component for backward compatibility
export function TOCSlideAcademic({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}


export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center p-24">
      <div className="w-full h-[70%] bg-gray-300 flex items-center justify-center mb-8">
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
      {title && (
        <h2 className="font-merriweather font-bold text-4xl text-black text-center">
          {title}
        </h2>
      )}
    </section>
  );
}

export function ContentSlide({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-4xl leading-relaxed text-black">{content}</p>
    </section>
  );
}

export function ContentSlideText({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-4xl leading-relaxed text-black">{content}</p>
    </section>
  );
}


export function MainSlide({ title, content, imageUrl }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex p-16 gap-12">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center max-w-[60%]">
        <h2 className="font-merriweather font-bold text-6xl mt-[-300px] text-black leading-snug">
          {title}
        </h2>
        <p className="font-lato font-light text-4xl leading-relaxed text-black break-words">
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
        <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
        <p className="font-lato font-light text-4xl leading-relaxed text-black">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ title, content,  }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-4xl mb-12 text-black">{content}</p>
      <div className="flex justify-between">
        
      </div>
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
          <h2 className="font-merriweather font-bold text-8xl mb-4 text-black">
            {title}
          </h2>
          <p className="font-lato font-light text-5xl leading-relaxed text-gray-800">
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
        <h2 className="font-merriweather font-bold text-7xl mb-8 text-black">{title}</h2>
        <p className="font-lato font-light text-4xl leading-relaxed text-black">{content}</p>
      </div>
    </section>
  );
}


const AcademicMinimal = { TitleSlide, 
                          TOCSlide, 
                          ContentSlide, 
                          ImageSlide, 
                          ContentSlideText, 
                          MainSlide, MainSlide1, MainSlide2, MainSlide4, MainSlide6,
                          EndSlide };
export default AcademicMinimal;
