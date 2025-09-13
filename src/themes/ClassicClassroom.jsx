import React from "react";
import { Pencil, BookOpen, Ruler, Sigma } from "lucide-react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] flex items-center justify-center text-center text-white overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="relative z-10">
        <h1 className="font-[HedvigLettersSerif] text-8xl mb-2">{title}</h1>
        {subtitle && <p className="text-teal-300 text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex items-center justify-center overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="relative z-10 w-3/4 bg-[#0D3B36] border-4 border-[#EAD7B7] rounded-lg p-8 text-center shadow-lg">
        <h2 className="font-[HedvigLettersSerif] text-5xl mb-4">{title}</h2>
        <p className="text-3xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex items-center overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="relative ml-20 z-10 w-1/2 h-4/5 border-8 border-[#EAD7B7] flex items-center justify-center bg-black/20">
        {imageUrl ? (
          <img src={imageUrl} alt="content" className="w-full h-full object-contain" />
        ) : (
          <span>No Image</span>
        )}
      </div>
      <div className="relative z-10 w-1/2 p-8">
        <h2 className="font-[HedvigLettersSerif] text-6xl mb-4 translate-y-[-100px]">{title}</h2>
        <p className="text-3xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex items-center overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="relative z-10 w-1/2 p-8 text-right">
        <h2 className="font-[HedvigLettersSerif] text-6xl mb-4 translate-y-[-100px]">{title}</h2>
        <p className="text-3xl leading-relaxed">{content}</p>
      </div>
      <div className="relative mr-20 z-10 w-1/2 h-4/5 border-8 border-[#EAD7B7] flex items-center justify-center bg-black/20">
        {imageUrl ? (
          <img src={imageUrl} alt="content" className="w-full h-full object-contain" />
        ) : (
          <span>No Image</span>
        )}
      </div>
    </section>
  );
}

export function MainSlide4({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] flex items-center justify-center overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="relative z-10 w-5/6 h-5/6 border-4 border-[#EAD7B7] flex flex-col items-center justify-center bg-black/20">
        {imageUrl ? (
          <img src={imageUrl} alt="content" className="w-full h-full object-contain" />
        ) : (
          <span className="text-white">No Image</span>
        )}
        {(title || content) && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white bg-black/50 px-4 py-2 rounded">
            {title && <h2 className="font-[HedvigLettersSerif] text-5xl">{title}</h2>}
            {content && <p className="text-2xl">{content}</p>}
          </div>
        )}
      </div>
    </section>
  );
}

export function MainSlide5({ title, content }) {
  // Placeholder for second content block (until backend supports multiple)
  const secondTitle = "Second Section";
  const secondContent = "This is the second content block placeholder. It will later be filled from backend.";

  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex flex-col p-24 overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full opacity-40" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full opacity-40" />

      {/* Title */}
      <h2 className="relative z-10 font-[HedvigLettersSerif] text-5xl text-center mb-12 text-[#EAD7B7]">
        {title || "Class Notes"}
      </h2>

      {/* Two-column content with divider */}
      <div className="relative z-10 flex flex-1 gap-12 items-start">
        <div className="flex-1 text-right pr-8">
          <h3 className="font-[HedvigLettersSerif] text-2xl mb-4">{title || "First Section"}</h3>
          <p className="text-lg leading-relaxed">{content || "This is the first block of text."}</p>
        </div>

        {/* Divider (chalk line effect) */}
        <div className="w-[2px] bg-[#EAD7B7]/50 mx-4"></div>

        <div className="flex-1 text-left pl-8">
          <h3 className="font-[HedvigLettersSerif] text-2xl mb-4">{secondTitle}</h3>
          <p className="text-lg leading-relaxed">{secondContent}</p>
        </div>
      </div>
    </section>
  );
}



export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] flex items-center justify-center overflow-hidden">
      {/* Background swirls */}
      <img
        src="src/svgs/line-swirl1.svg"
        alt="swirl top"
        className="absolute top-0 left-0 w-full opacity-40"
      />
      <img
        src="src/svgs/line-swirl2.svg"
        alt="swirl bottom"
        className="absolute bottom-0 left-0 w-full opacity-40"
      />

      {/* Chalk-style background icons */}
      <Pencil className="absolute top-20 left-20 w-24 h-24 text-[#EAD7B7]/20" />
      <BookOpen className="absolute bottom-24 left-40 w-28 h-28 text-[#EAD7B7]/20" />
      <Sigma className="absolute top-32 right-32 w-28 h-28 text-[#EAD7B7]/20" />
      <Ruler className="absolute bottom-32 right-16 w-28 h-28 text-[#EAD7B7]/20" />

      {/* Blackboard-style card */}
      <div className="relative z-10 max-w-[70%] text-center border-[14px] border-[#EAD7B7] rounded-2xl p-16 bg-white shadow-2xl">
        <h2 className="font-[HedvigLettersSerif] text-5xl mb-6 text-[#0D3B36]">
          {title || "Key Concept"}
        </h2>
        <p className="font-[HedvigLettersSerif] text-2xl leading-relaxed text-[#222]">
          {content ||
            "This is a central highlighted concept, styled as if it were written on a framed classroom blackboard."}
        </p>
      </div>
    </section>
  );
}




export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] flex items-center justify-center text-white overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />
      <h1 className="relative z-10 font-[HedvigLettersSerif] text-6xl">Thank You</h1>
    </section>
  );
}

const ClassicClassroom = { TitleSlide, 
                         MainSlide, 
                         MainSlide2, 
                         MainSlide3, 
                         MainSlide4, 
                         MainSlide5,
                         MainSlide6,
                         EndSlide };
export default ClassicClassroom;
