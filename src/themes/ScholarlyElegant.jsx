import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-scholarly-100 to-scholarly-900 text-white p-12 rounded-2xl shadow-2xl flex flex-col items-center justify-center h-full animate-fade-in">
      <h1 className="text-5xl font-extrabold font-serif mb-4 drop-shadow-xl">{title}</h1>
      <h2 className="text-2xl font-light font-serif opacity-90">{subtitle}</h2>
    </div>
  );
}

export function ContentSlide({ title, content }) {
  return (
    <div className="bg-scholarly-100 text-scholarly-900 p-10 rounded-xl shadow flex flex-col gap-4 animate-fade-in">
      <h2 className="text-3xl font-bold font-serif mb-2">{title}</h2>
      <p className="text-lg font-serif leading-7">{content}</p>
    </div>
  );
}

export function ImageSlide({ title, imageUrl }) {
  return (
    <div className="bg-scholarly-900 text-white p-10 rounded-xl shadow flex flex-col items-center animate-fade-in">
      <img src={imageUrl} alt="slide visual" className="rounded-lg max-h-80 mb-4 shadow-lg" />
      <h3 className="text-xl font-semibold font-serif mt-2">{title}</h3>
    </div>
  );
}
