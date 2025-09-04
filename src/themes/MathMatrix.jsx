import React from "react";
import { PiSigmaBold } from "react-icons/pi";
import { FaSquareRootAlt } from "react-icons/fa";
import { TbMathFunction } from "react-icons/tb";

/* Title Slide – Matrix digital grid background */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-black overflow-hidden flex flex-col items-center justify-center text-green-400">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      {/* Floating math icons */}
      <PiSigmaBold className="absolute top-10 left-10 text-6xl opacity-30" />
      <FaSquareRootAlt className="absolute bottom-12 right-20 text-5xl opacity-30" />
      <TbMathFunction className="absolute top-1/2 left-1/4 text-7xl opacity-20" />

      {/* Text */}
      <h1 className="relative z-10 text-6xl font-mono font-bold mb-6">{title}</h1>
      <h2 className="relative z-10 text-2xl font-mono opacity-80">{subtitle}</h2>
    </section>
  );
}

/* Main Slide 1 – Split screen with math sidebar */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] flex bg-black text-green-300">
      {/* Sidebar with math symbols */}
      <div className="w-1/4 bg-gradient-to-b from-green-900/70 to-black flex flex-col items-center justify-center gap-10 text-5xl">
        <PiSigmaBold className="opacity-50" />
        <FaSquareRootAlt className="opacity-50" />
        <TbMathFunction className="opacity-50" />
      </div>

      {/* Content */}
      <div className="flex-1 p-16 flex flex-col justify-center">
        <h2 className="text-4xl font-mono font-bold border-b-2 border-green-500 pb-4 mb-6">
          {title}
        </h2>
        <p className="text-2xl font-mono leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 2 – Grid board with equations */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-gradient-to-br from-black to-green-950 text-green-300 p-20">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-10"></div>

      {/* Floating math notes */}
      <p className="absolute top-16 right-24 text-green-500 opacity-40 text-2xl font-mono">∫ f(x) dx</p>
      <p className="absolute bottom-24 left-16 text-green-500 opacity-40 text-2xl font-mono">E = mc²</p>

      <div className="relative z-10 max-w-4xl">
        <h2 className="text-4xl font-mono font-bold mb-6">{title}</h2>
        <p className="text-2xl font-mono leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 3 – Diagonal matrix panel */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1280px] h-[720px] overflow-hidden bg-black text-green-300 flex items-center">
      {/* Diagonal panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-black transform -skew-x-6"></div>

      {/* Math symbols background */}
      <PiSigmaBold className="absolute top-20 left-1/2 text-8xl opacity-20" />
      <FaSquareRootAlt className="absolute bottom-20 right-1/3 text-7xl opacity-20" />

      {/* Text */}
      <div className="relative z-10 px-24">
        <h2 className="text-5xl font-mono font-bold mb-8">{title}</h2>
        <p className="text-2xl font-mono leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

/* Image Slide – Framed like a chalkboard */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-black flex flex-col items-center justify-center text-green-400">
      {/* Frame */}
      <div className="absolute inset-8 border-4 border-green-700"></div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="math visual"
          className="relative z-10 max-h-[420px] object-contain mb-6 border-4 border-green-500 shadow-lg"
        />
      ) : (
        <div className="relative z-10 w-[640px] h-[360px] flex items-center justify-center border-4 border-green-700 text-green-600">
          No Image
        </div>
      )}
      <h3 className="relative z-10 text-2xl font-mono font-bold mt-2">{title}</h3>
    </section>
  );
}

/* End Slide – Digital matrix style */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-black text-green-400 flex items-center justify-center">
      {/* Falling matrix effect (simple grid illusion) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0f0_2px,transparent_2px)] bg-[size:100px_40px] opacity-10"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-mono font-bold mb-4">{message}</h2>
        <p className="text-2xl font-mono opacity-80">End of Presentation</p>
      </div>
    </section>
  );
}

const MathMatrix = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default MathMatrix;
