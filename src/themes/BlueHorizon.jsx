import React from "react";

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

export function TOCSlideBlueHorizon({
  title = "Table of Contents",
  items = [],
}) {
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

      {/* TOC Items */}
      <ul className="text-3xl font-medium space-y-10 max-w-3xl text-left relative z-10">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-6 hover:text-sky-200 transition duration-300"
          >
            {/* Horizon-style badge */}
            <span className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-sky-600 to-sky-300 text-white font-bold shadow-[0_0_15px_rgba(135,206,250,0.7)]">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex flex-col items-center justify-center p-10 text-center">
      <div className="absolute top-0 left-0 w-32 h-full bg-[#3182ce] clip-path-polygon"></div>
      <div className="absolute bottom-0 right-0 w-32 h-full bg-[#2b6cb0]"></div>

      <div className="relative z-10 max-w-3xl">
        <h2 className="font-[HedvigLettersSerif] text-6xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-3xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      <div className="w-1/2 flex flex-col justify-center p-10">
        <h2 className="font-[HedvigLettersSerif] text-5xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-2xl leading-relaxed">{content}</p>
      </div>
      <div className="w-1/2 flex items-center justify-center p-4">
        {imageUrl ? (
          <img src={imageUrl} alt="Slide visual" className="rounded-lg shadow-lg max-h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
        )}
      </div>
    </section>
  );
}

export function MainSlide3({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex">
      <div className="w-1/2 flex items-center justify-center p-4">
        {imageUrl ? (
          <img src={imageUrl} alt="Slide visual" className="rounded-lg shadow-lg max-h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">No Image</div>
        )}
      </div>
      <div className="w-1/2 flex flex-col justify-center p-10 text-right">
        <h2 className="font-[HedvigLettersSerif] text-5xl text-[#2b6cb0] mb-4">{title}</h2>
        <p className="text-gray-800 text-2xl leading-relaxed">{content}</p>
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

export function MainSlide6({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] flex items-center overflow-hidden">
      {/* Slanted accent bar */}
      <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-b from-[#2b6cb0] to-[#3182ce] clip-path-diagonal"></div>

      {/* Text side */}
      <div className="relative z-10 flex-1 flex flex-col justify-center p-16 text-white max-w-xl">
        <h2 className="font-[HedvigLettersSerif] text-5xl mb-6">{title}</h2>
        <p className="text-2xl leading-relaxed">{content}</p>
      </div>

      {/* Image side */}
      <div className="flex-1 flex items-center justify-center p-8">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Blue Horizon visual"
            className="rounded-xl shadow-2xl max-h-[700px] object-contain"
          />
        ) : (
          <div className="w-full h-[70%] bg-gray-300 flex items-center justify-center text-gray-600 rounded-xl">
            No Image
          </div>
        )}
      </div>
    </section>
  );
}


export function TOCSlide({ title = "Table of Contents", items = [] }) {
  const defaultItems = [
    "Introduction to the Topic",
    "Key Concepts and Definitions", 
    "Historical Background",
    "Current Applications",
    "Case Studies and Examples",
    "Future Implications",
    "Conclusion and Q&A"
  ];
  
  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2b6cb0] overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="text-white font-[HedvigLettersSerif] text-6xl mb-16">
          {title}
        </h2>
        
        <ul className="text-2xl space-y-4 text-left text-white">
          {displayItems.map((item, index) => (
            <li key={index} className="flex items-center hover:text-blue-200 transition-colors duration-200">
              <span className="w-8 h-8 bg-[#f6ad55] rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0 text-[#2b6cb0]">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2b6cb0] overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>
      <h1 className="text-white font-[HedvigLettersSerif] text-6xl">End Slide</h1>
    </section>
  );
}

const BlueHorizon = { 
  TitleSlide, 
  TOCSlide: TOCSlideBlueHorizon,
  MainSlide, 
  MainSlide2,
  MainSlide3,
  MainSlide4,
  EndSlide 
};
export default BlueHorizon;
