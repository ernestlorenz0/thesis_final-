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

export function MainSlide4({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#ebf8ff] overflow-hidden flex items-center justify-center">
      {imageUrl ? (
        <img src={imageUrl} alt="Slide visual" className="absolute inset-0 w-full h-full object-cover opacity-90" />
      ) : (
        <div className="absolute inset-0 bg-gray-400 flex items-center justify-center text-gray-700">
          No Image
        </div>  
      )}
      <div className="relative z-10 text-center text-white bg-black/40 p-6 rounded-lg">
        <h2 className="font-[HedvigLettersSerif] text-6xl mb-2">{title}</h2>
        <p className="text-3xl">{content}</p>
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
  MainSlide, 
  MainSlide2,
  MainSlide3,
  MainSlide4,
  EndSlide 
};
export default BlueHorizon;
