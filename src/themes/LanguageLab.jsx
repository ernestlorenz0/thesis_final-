import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
import { MdTranslate } from "react-icons/md";

/* Title Slide – Speech bubble theme */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Speech bubble icons */}
      <FaRegCommentDots className="absolute top-12 left-16 text-7xl opacity-30" />
      <MdTranslate className="absolute bottom-20 right-24 text-8xl opacity-20" />
      <PiTextTBold className="absolute top-1/2 left-1/4 text-6xl opacity-30" />

      <h1 className="relative z-10 text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
      <h2 className="relative z-10 text-2xl opacity-90">{subtitle}</h2>
    </section>
  );
}

/* Main Slide 1 – Split layout with giant quotation mark */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] flex bg-gradient-to-r from-yellow-100 to-pink-50 text-gray-900">
      {/* Big decorative quote mark */}
      <div className="absolute top-10 left-10 text-[200px] text-pink-300 opacity-80 font-serif">“</div>

      <div className="flex-1 p-20 flex flex-col justify-center">
        <h2 className="text-6xl font-bold mb-6">{title}</h2>
        <p className="text-3xl leading-relaxed max-w-3xl">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 2 – Dialogue boxes layout */
export function MainSlide2({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] bg-gradient-to-tr from-blue-100 to-purple-100 flex flex-col items-center justify-center p-16 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 flex justify-around items-center opacity-50 text-9xl text-blue-300">
        <FaRegCommentDots />
        <PiTextTBold />
        <MdTranslate />
      </div>

      {/* Content area */}
      <div className="relative z-10 bg-white shadow-lg rounded-2xl p-12 max-w-4xl">
        <h2 className="text-5xl font-bold mb-4 text-blue-900">{title}</h2>
        <p className="text-3xl leading-8 text-gray-800">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 3 – Asymmetrical floating panels */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-bl from-pink-200 via-yellow-100 to-blue-200 flex p-16 overflow-hidden">
      {/* Floating panels */}
      <div className="absolute top-10 left-16 w-48 h-28 bg-white shadow-lg rounded-lg rotate-6 opacity-70"></div>
      <div className="absolute bottom-16 right-24 w-56 h-32 bg-white shadow-lg rounded-lg -rotate-6 opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center max-w-4xl">
        <h2 className="text-6xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* Image Slide – Dictionary style card */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-white flex flex-col items-center justify-center text-gray-900">
      {/* Border frame */}
      <div className="absolute inset-8 border-4 border-blue-700 rounded-lg"></div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="language visual"
          className="relative z-10 max-h-[400px] object-contain mb-6 shadow-lg rounded-md border-4 border-pink-400"
        />
      ) : (
        <div className="relative z-10 w-[640px] h-[360px] flex items-center justify-center text-gray-400 border-4 border-blue-700">
          No Image
        </div>
      )}

      <h3 className="relative z-10 text-2xl font-bold mt-2">{title}</h3>
    </section>
  );
}

/* End Slide – Speech bubble close */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-r from-purple-700 to-pink-600 flex items-center justify-center text-white">
      {/* Giant bubble background */}
      <div className="absolute w-[800px] h-[400px] rounded-full bg-white/20 blur-3xl"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-bold mb-4">{message}</h2>
        <p className="text-2xl opacity-80">The End</p>
      </div>
    </section>
  );
}

const LanguageLab = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default LanguageLab;
