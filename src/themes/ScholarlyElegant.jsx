import React from "react";

/* Title Slide – Split with vertical divider */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center px-24">
      <div className="flex-1 pr-12">
        <h1 className="text-6xl font-serif font-bold text-gray-900 mb-6">{title}</h1>
        <h2 className="text-2xl font-serif italic text-gray-700">{subtitle}</h2>
      </div>
      <div className="w-[3px] h-64 bg-yellow-600"></div>
      <div className="flex-1 pl-12 flex items-center justify-center">
        <div className="w-64 h-64 border-4 border-yellow-600 rounded-full opacity-20"></div>
      </div>
    </section>
  );
}

/* Main Slide 1 – Title on top, underline, content below */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white text-gray-900 px-24 py-16 flex flex-col">
      <h2 className="text-6xl font-serif font-bold mb-2">{title}</h2>
      <div className="h-[3px] w-40 bg-yellow-600 mb-8"></div>
      <div className="text-3xl font-serif leading-relaxed">{content}</div>
    </section>
  );
}

/* Main Slide 2 – Two columns, left for title+content, right decorative */
export function MainSlide2({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gray-50 text-gray-900 px-20 py-16 flex">
      <div className="flex-1 pr-12">
        <h2 className="text-6xl font-serif font-bold mb-6">{title}</h2>
        <div className="text-3xl font-serif leading-relaxed">{content}</div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[80%] h-[80%] border-2 border-yellow-600 rounded-lg opacity-30"></div>
      </div>
    </section>
  );
}

/* Main Slide 3 – Full border frame with content centered */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-100 to-white text-gray-900 px-24 py-16 flex flex-col items-center justify-center">
      <div className="absolute inset-8 border-4 border-yellow-600 rounded-xl opacity-40"></div>
      <h2 className="text-6xl font-serif font-bold mb-[150px] z-10 mt-[-250px] ">{title}</h2>
      <div className="text-3xl font-serif leading-relaxed max-w-5xl text-center z-10">{content}</div>
    </section>
  );
}

/* Image Slide – Left image, right caption */
export function ImageSlide({ title, imageUrl, caption }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gray-100 text-gray-900 px-20 py-12 flex items-center">
      <div className="flex-1 flex items-center justify-center pr-12">
        <img
          src={imageUrl}
          alt="scholarly visual"
          className="border-4 border-gray-700 rounded-lg shadow-xl max-h-[500px] object-contain"
        />
      </div>
      <div className="w-[2px] h-[80%] bg-yellow-600"></div>
      <div className="flex-1 pl-12">
        <h3 className="text-5xl font-serif font-bold mb-4">{title}</h3>
        <p className="text-lg font-serif leading-relaxed">{caption}</p>
      </div>
    </section>
  );
}

/* End Slide – Framed closing */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-200 to-gray-100 flex flex-col items-center justify-center text-gray-900 overflow-hidden">
      <div className="absolute inset-6 border-4 border-yellow-600 rounded-xl"></div>
      <h2 className="text-5xl font-serif font-bold mb-6">{message}</h2>
      <p className="text-2xl font-serif italic text-gray-700">Thank you</p>
    </section>
  );
}

const ScholarlyElegant = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default ScholarlyElegant;
