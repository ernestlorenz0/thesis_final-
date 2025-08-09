import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <div className="bg-academic-100 text-academic-900 p-12 rounded-2xl shadow flex flex-col items-center justify-center h-full animate-fade-in">
      <h1 className="text-5xl font-bold font-sans mb-4 tracking-tight">{title}</h1>
      <h2 className="text-2xl font-light font-sans opacity-80">{subtitle}</h2>
    </div>
  );
}

export function ContentSlide({ title, content }) {
  return (
    <div className="bg-academic-100 text-academic-900 p-10 rounded-xl shadow flex flex-col gap-4 animate-fade-in">
      <h2 className="text-3xl font-semibold font-sans mb-2">{title}</h2>
      <p className="text-lg font-sans leading-7">{content}</p>
    </div>
  );
}

export function ImageSlide({ title, imageUrl }) {
  return (
    <div className="bg-academic-100 text-academic-900 p-10 rounded-xl shadow flex flex-col items-center animate-fade-in">
      <img src={imageUrl} alt="slide visual" className="rounded-lg max-h-80 mb-4 shadow" />
      <h3 className="text-xl font-medium font-sans mt-2">{title}</h3>
    </div>
  );
}
