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
export function TOCSlideAcademic({ title = "Table of Contents", items = [] }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle border */}
      <div className="absolute inset-12 border border-gray-300 rounded-lg"></div>

      {/* Title */}
      <h2 className="text-5xl font-serif font-bold text-gray-800 mb-16 tracking-wide">
        {title}
      </h2>

      {/* List */}
      <ul className="text-2xl font-light space-y-6 max-w-3xl text-left">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-baseline gap-4 hover:text-gray-600 transition-colors duration-200"
          >
            <span className="text-gray-500 font-mono text-xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="border-b border-gray-300 flex-1 pb-1">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
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
        <h2 className="font-merriweather font-bold text-3xl text-black text-center">
          {title}
        </h2>
      )}
    </section>
  );
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

export function MainSlide2({ title, content,  }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-3xl mb-12 text-black">{content}</p>
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
                          TOCSlide: TOCSlideAcademic,
                          ContentSlide, 
                          ImageSlide, 
                          ContentSlideText, 
                          MainSlide, MainSlide1, MainSlide2, MainSlide4, MainSlide6,
                          EndSlide };
export default AcademicMinimal;
