import React from "react";
export function TitleSlide({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-400 text-gray-900 p-12 rounded-2xl shadow-lg flex flex-col items-center justify-center h-full animate-fade-in border-4 border-gray-300">
      <h1 className="text-5xl font-bold font-serif mb-4 drop-shadow-lg">{title}</h1>
      <h2 className="text-2xl font-medium font-sans opacity-80">{subtitle}</h2>
    </div>
  );
}
export function ContentSlide({ title, content }) {
  return (
    <div className="bg-gray-50 text-gray-900 p-10 rounded-xl shadow flex flex-col gap-4 animate-slide-up border-2 border-gray-200">
      <h2 className="text-3xl font-bold font-serif mb-2">{title}</h2>
      <p className="text-lg font-sans leading-7">{content}</p>
    </div>
  );
}
export function ImageSlide({ title, imageUrl }) {
  return (
    <div className="bg-gray-200 text-gray-900 p-10 rounded-xl shadow flex flex-col items-center animate-fade-in border-2 border-gray-300">
      <img src={imageUrl} alt="slide visual" className="rounded-lg max-h-80 mb-4 shadow-md border-2 border-gray-300" />
      <h3 className="text-xl font-semibold font-serif mt-2">{title}</h3>
    </div>
  );
}
