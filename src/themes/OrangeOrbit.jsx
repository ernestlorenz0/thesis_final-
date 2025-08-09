import React from "react";
export function TitleSlide({ title, subtitle }) {
  return (
    <div className="bg-orange-300 text-orange-900 p-12 rounded-2xl shadow-lg flex flex-col items-center justify-center h-full animate-fade-in border-4 border-orange-400">
      <h1 className="text-5xl font-bold font-sans mb-4 drop-shadow-lg">{title}</h1>
      <h2 className="text-2xl font-medium font-sans opacity-80">{subtitle}</h2>
    </div>
  );
}
export function ContentSlide({ title, content }) {
  return (
    <div className="bg-orange-100 text-orange-900 p-10 rounded-xl shadow flex flex-col gap-4 animate-slide-up border-2 border-orange-300">
      <h2 className="text-3xl font-bold font-sans mb-2">{title}</h2>
      <p className="text-lg font-sans leading-7">{content}</p>
    </div>
  );
}
export function ImageSlide({ title, imageUrl }) {
  return (
    <div className="bg-orange-200 text-orange-900 p-10 rounded-xl shadow flex flex-col items-center animate-fade-in border-2 border-orange-400">
      <img src={imageUrl} alt="slide visual" className="rounded-lg max-h-80 mb-4 shadow-md border-2 border-orange-400" />
      <h3 className="text-xl font-semibold font-sans mt-2">{title}</h3>
    </div>
  );
}
