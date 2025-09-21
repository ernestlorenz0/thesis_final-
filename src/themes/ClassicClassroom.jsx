import React from "react";
import { Pencil, BookOpen, Ruler, Sigma, Apple, GraduationCap, Book } from "lucide-react";

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

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  // Convert to simple list for Classic Classroom
  const items = [];
  sections.forEach(section => {
    items.push(section.title);
    if (section.subsections && section.subsections.length > 0) {
      section.subsections.forEach(sub => {
        items.push(`  ${sub}`);
      });
    }
  });
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2f3e46] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Chalkboard background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2f3e46] to-[#1c2529]"></div>
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>

      {/* Wooden frame */}
      <div className="absolute inset-0 border-[20px] border-[#5d4037] rounded-xl shadow-2xl"></div>

      {/* Title like chalk writing */}
      <h2 className="text-6xl font-bold mb-16 tracking-wide text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] font-serif">
        {title}
      </h2>

      {/* TOC Items */}
      <ul className="text-3xl space-y-8 max-w-3xl text-left px-12 font-serif">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-6 text-gray-100 hover:text-white transition duration-300"
          >
            {/* Chalk-style number */}
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-[#5d4037]/80 border-2 border-white/40 text-white font-bold shadow-md">
              {index + 1}
            </span>
            <span className="italic">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}


export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex items-center justify-center overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#2f3e46] to-[#1c2529]" />

      {/* Subtle classroom icons */}
      <Book className="absolute top-16 left-24 w-28 h-28 text-white/10 rotate-[-15deg]" />
      <Pencil className="absolute bottom-24 right-40 w-24 h-24 text-white/10 rotate-[20deg]" />
      <Ruler className="absolute top-1/3 right-16 w-28 h-28 text-white/10 rotate-[45deg]" />
      <Apple className="absolute bottom-16 left-40 w-24 h-24 text-white/10" />
      <GraduationCap className="absolute top-1/4 left-1/2 w-28 h-28 text-white/10 -translate-x-1/2" />

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

      {/* Chalk-style background icons */}
      <Pencil className="absolute top-20 left-20 w-24 h-24 text-[#EAD7B7]/20" />
      <BookOpen className="absolute bottom-24 left-40 w-28 h-28 text-[#EAD7B7]/20" />
      <Sigma className="absolute top-32 right-32 w-28 h-28 text-[#EAD7B7]/20" />
      <Ruler className="absolute bottom-32 right-16 w-28 h-28 text-[#EAD7B7]/20" />

      <div className="relative ml-20 z-10 w-[800px] h-4/5 flex items-center justify-center">
        <img src="src/svgs/classroom.svg" alt="classroom_img"/>
      </div>
      <div className="relative z-10 w-1/2 p-8">
        <h2 className="font-[HedvigLettersSerif] text-7xl mb-4 translate-y-[-50px]">{title}</h2>
        <p className="text-4xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide3({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] text-white flex items-center overflow-hidden">
      <div className="absolute inset-0 border-[30px] border-[#5d4037] rounded-xl shadow-2xl" />

      {/* Chalk-style background icons */}
      <Pencil className="absolute top-20 left-20 w-24 h-24 text-[#EAD7B7]/20" />
      <BookOpen className="absolute bottom-24 left-40 w-28 h-28 text-[#EAD7B7]/20" />
      <Sigma className="absolute top-32 right-32 w-28 h-28 text-[#EAD7B7]/20" />
      <Ruler className="absolute bottom-32 right-16 w-28 h-28 text-[#EAD7B7]/20" />

      <div className="relative z-10 w-1/2 p-8 text-right">
        <h2 className="font-[HedvigLettersSerif] text-7xl mb-4 translate-y-[-100px]">{title}</h2>
        <p className="text-4xl leading-relaxed">{content}</p>
      </div>
      <div className="relative mr-20 z-10 w-[800px] h-4/5flex items-center justify-center">
        <img src="src/svgs/classroom1.svg" alt="classroom1" className="w-[700px]"/>
      </div>
    </section>
  );
}

export function MainSlide4({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 border-[30px] border-[#5d4037] rounded-xl shadow-2xl" />

      {/* Chalk-style background icons */}
      <Pencil className="absolute top-20 left-20 w-24 h-24 text-[#EAD7B7]/20" />
      <BookOpen className="absolute bottom-24 left-40 w-28 h-28 text-[#EAD7B7]/20" />
      <Sigma className="absolute top-32 right-32 w-28 h-28 text-[#EAD7B7]/20" />
      <Ruler className="absolute bottom-32 right-16 w-28 h-28 text-[#EAD7B7]/20" />

      <div className="relative z-10 w-5/6 h-5/6  flex flex-col items-center justify-center">
        <div className="absolute left-1/2 -translate-x-1/2 text-center text-white  px-4 py-2 rounded">
            {title && <h2 className="font-[HedvigLettersSerif] text-7xl mb-20">{title}</h2>}
            {content && <p className="text-4xl">{content}</p>}
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

      <div className="absolute inset-0 border-[30px] border-[#5d4037] rounded-xl shadow-2xl" />

      {/* Chalk-style icons */}
      <Book className="absolute top-16 left-24 w-28 h-28 text-white/10 rotate-[-15deg]" />
      <Pencil className="absolute bottom-24 right-40 w-24 h-24 text-white/10 rotate-[20deg]" />
      <Ruler className="absolute top-1/3 right-16 w-28 h-28 text-white/10 rotate-[45deg]" />
      <Apple className="absolute bottom-16 left-40 w-24 h-24 text-white/10" />
      <GraduationCap className="absolute top-1/4 left-1/2 w-28 h-28 text-white/10 -translate-x-1/2" />

      <h1 className="relative z-10 font-[HedvigLettersSerif] text-8xl">Thank You</h1>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideClassicClassroom({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const ClassicClassroom = { TitleSlide, 
                         TOCSlide,
                         MainSlide, 
                         MainSlide2, 
                         MainSlide3, 
                         MainSlide4, 
                         MainSlide6,
                         EndSlide };
export default ClassicClassroom;
