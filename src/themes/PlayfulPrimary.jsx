import React from "react";

/* Title Slide */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-playful-200 to-playful-400 flex flex-col items-center justify-center text-playful-900 animate-bounce-in overflow-hidden">
      {/* Background playful shapes */}
      <div className="absolute w-64 h-64 bg-yellow-400 rounded-full opacity-30 -top-12 -left-12"></div>
      <div className="absolute w-48 h-48 bg-pink-400 rounded-full opacity-30 bottom-8 left-32"></div>
      <div className="absolute w-56 h-56 bg-blue-400 rotate-12 opacity-30 -bottom-16 right-12"></div>

      {/* Text */}
      <h1 className="text-8xl font-extrabold font-sans mb-8 drop-shadow-lg z-10">
        {title}
      </h1>
      <h2 className="text-4xl font-semibold font-sans opacity-90 z-10">
        {subtitle}
      </h2>
    </section>
  );
}

/* Main Slide 1 - Title + underline + content */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-playful-100 flex flex-col items-center justify-center text-playful-900 animate-fade-in px-24 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-40 h-40 bg-pink-300 rounded-full opacity-20 top-10 left-10"></div>
      <div className="absolute w-60 h-60 bg-blue-300 rotate-45 opacity-20 bottom-12 right-20"></div>

      <h2 className="text-6xl font-bold font-sans mb-6 z-10">{title}</h2>
      <div className="h-2 w-56 bg-playful-900 rounded-full mb-10 z-10"></div>
      <p className="text-3xl font-sans leading-relaxed text-center max-w-6xl z-10">
        {content}
      </p>
    </section>
  );
}

/* Main Slide 2 - Split layout */
export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-r from-playful-300 to-playful-200 flex items-center justify-between text-playful-900 animate-slide-up px-20 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-yellow-300 rounded-full opacity-20 -top-16 right-20"></div>
      <div className="absolute w-52 h-52 bg-green-300 rotate-12 opacity-20 bottom-0 left-10"></div>

      <div className="flex-1 pr-12 z-10">
        <h2 className="text-5xl font-bold font-sans mb-8">{title}</h2>
        <p className="text-3xl font-sans leading-relaxed">{content}</p>
      </div>
      <div className="flex-1 flex items-center justify-center z-10">
        <div className="w-72 h-72 bg-playful-100 border-4 border-playful-900 rounded-2xl shadow-lg flex items-center justify-center text-8xl">
          {imageUrl}
        </div>
      </div>
    </section>
  );
}

/* Main Slide 3 - Card grid style */
export function MainSlide3({ title, points }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-playful-200 flex flex-col text-playful-900 animate-slide-in px-20 py-16 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-48 h-48 bg-red-300 rounded-full opacity-20 top-10 right-12"></div>
      <div className="absolute w-64 h-64 bg-blue-400 rotate-45 opacity-20 bottom-0 left-16"></div>

      <h2 className="text-5xl font-bold font-sans mb-12 text-center z-10">
        {title}
      </h2>
      <div className="grid grid-cols-3 gap-12 flex-1 z-10">
        {points.map((point, idx) => (
          <div
            key={idx}
            className="bg-playful-100 border-2 border-playful-900 rounded-xl p-12 text-center font-sans font-semibold shadow-md text-2xl flex items-center justify-center"
          >
            {point}
          </div>
        ))}
      </div>
    </section>
  );
}

/* Image Slide */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-playful-100 flex flex-col items-center justify-center text-playful-900 animate-bounce-in px-16 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-80 h-80 bg-green-300 rounded-full opacity-20 -top-10 left-20"></div>
      <div className="absolute w-64 h-64 bg-yellow-300 rotate-12 opacity-20 bottom-12 right-12"></div>

      <img
        src={imageUrl}
        alt="slide visual"
        className="rounded-2xl max-h-[70%] mb-8 shadow-lg border-4 border-playful-900 object-contain z-10"
      />
      <h3 className="text-3xl font-bold font-sans z-10">{title}</h3>
    </section>
  );
}

/* End Slide */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-tr from-playful-400 to-playful-200 flex flex-col items-center justify-center text-playful-900 animate-fade-in overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-20 -top-20 left-20"></div>
      <div className="absolute w-56 h-56 bg-pink-400 rotate-12 opacity-20 bottom-12 right-12"></div>

      <h2 className="text-7xl font-extrabold font-sans mb-6 z-10">{message}</h2>
      <p className="text-3xl font-sans opacity-90 z-10"> 🎨✨</p>
    </section>
  );
}

const PlayfulPrimary = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default PlayfulPrimary;
