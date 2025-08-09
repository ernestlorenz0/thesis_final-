import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <div className="bg-playful-100 text-playful-900 p-12 rounded-2xl shadow-xl flex flex-col items-center justify-center h-full animate-bounce-in">
      <h1 className="text-5xl font-extrabold font-sans mb-4 text-playful-900 drop-shadow">{title}</h1>
      <h2 className="text-2xl font-semibold font-sans opacity-90">{subtitle}</h2>
    </div>
  );
}

export function ContentSlide({ title, content }) {
  return (
    <div className="bg-playful-100 text-playful-900 p-10 rounded-xl shadow flex flex-col gap-4 animate-bounce-in">
      <h2 className="text-3xl font-bold font-sans mb-2">{title}</h2>
      <p className="text-lg font-sans leading-7">{content}</p>
    </div>
  );
}

export function ImageSlide({ title, imageUrl }) {
  return (
    <div className="bg-playful-100 text-playful-900 p-10 rounded-xl shadow flex flex-col items-center animate-bounce-in">
      <img src={imageUrl} alt="slide visual" className="rounded-lg max-h-80 mb-4 shadow-md border-4 border-playful-900" />
      <h3 className="text-xl font-bold font-sans mt-2">{title}</h3>
    </div>
  );
}
