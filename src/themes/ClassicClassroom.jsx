import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0D3B36] flex items-center justify-center text-center text-white overflow-hidden">
      <img src="src/svgs/line-swirl1.svg" alt="swirl top" className="absolute top-0 left-0 w-full" />
      <img src="src/svgs/line-swirl2.svg" alt="swirl bottom" className="absolute bottom-0 left-0 w-full" />

      <div className="relative z-10">
        <h1 className="font-[HedvigLettersSerif] text-6xl mb-2">{title}</h1>
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
        <h2 className="font-[HedvigLettersSerif] text-2xl mb-4">{title}</h2>
        <p className="text-lg leading-relaxed">{content}</p>
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
        <h2 className="font-[HedvigLettersSerif] text-5xl mb-4 translate-y-[-100px]">{title}</h2>
        <p className="text-lg leading-relaxed">{content}</p>
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
        <h2 className="font-[HedvigLettersSerif] text-5xl mb-4 translate-y-[-100px]">{title}</h2>
        <p className="text-lg leading-relaxed">{content}</p>
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
            {title && <h2 className="font-[HedvigLettersSerif] text-xl">{title}</h2>}
            {content && <p className="text-sm">{content}</p>}
          </div>
        )}
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
                         EndSlide };
export default ClassicClassroom;
