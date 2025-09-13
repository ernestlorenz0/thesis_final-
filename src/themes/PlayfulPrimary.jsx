import React from "react";

/* Title Slide */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-playful-200 to-playful-400 flex flex-col items-center justify-center text-playful-900 animate-bounce-in overflow-hidden">
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
    <section className="relative w-[1920px] h-[1080px] bg-playful-100 flex flex-col items-center justify-center text-playful-900 animate-fade-in px-12 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-32 h-32 bg-pink-300 rounded-full opacity-20 top-8 left-8"></div>
      <div className="absolute w-48 h-48 bg-blue-300 rotate-45 opacity-20 bottom-8 right-12"></div>

      <h2 className="text-6xl font-bold font-sans mb-4 z-10">{title}</h2>
      <div className="h-2 w-40 bg-playful-900 rounded-full mb-6 z-10"></div>
      <p className="text-3xl font-sans leading-relaxed text-center max-w-5xl z-10">
        {content}
      </p>
    </section>
  );
}

/* Main Slide 2 - Split layout */
export function MainSlide2({ title, content, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-playful-300 to-playful-200 flex items-center justify-between text-playful-900 animate-slide-up px-20 overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-yellow-300 rounded-full opacity-20 -top-16 right-20"></div>
      <div className="absolute w-52 h-52 bg-green-300 rotate-12 opacity-20 bottom-0 left-10"></div>

      <div className="flex-1 pr-12 z-10">
        <h2 className="text-6xl font-bold font-sans mb-8">{title}</h2>
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

export function MainSlide3({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-playful-200 via-playful-300 to-playful-400 flex items-center justify-center overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-12 left-16 w-28 h-28 bg-playful-500 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-playful-600 rounded-2xl opacity-70 rotate-12 animate-pulse"></div>
      <div className="absolute top-[30%] right-1/4 w-20 h-20 bg-playful-700 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-playful-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-playful-300 rounded-lg opacity-60 animate-pulse"></div>

      {/* Main framed image container */}
      <div className="relative z-10 max-w-[1000px] w-[80%] bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-playful-700 flex flex-col items-center justify-center p-6">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || "Slide image"}
            className="object-contain max-h-[500px] w-full rounded-md"
          />
        ) : (
          <div className="w-full h-[500px] flex items-center justify-center text-playful-800 font-bold text-3xl">
            No Image
          </div>
        )}

        {/* Title badge (only show if title exists) */}
        {title && (
          <div className="mt-4 px-5 py-2 bg-playful-600 text-white rounded-full text-xl font-semibold shadow-md">
            {title}
          </div>
        )}
      </div>
    </section>
  );
}


export function MainSlide4({ title, content }) {
  const points = [
    title || "First Point",
    "Second Point Placeholder",
    "Third Point Placeholder",
  ];

  return (
    <section className="relative w-[1920px] h-[1080px] bg-playful-100 flex items-center justify-center overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-10 left-16 w-40 h-40 bg-pink-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>

      <div className="relative z-10 flex gap-8 w-4/5">
        {points.map((p, i) => (
          <div
            key={i}
            className="flex-1 bg-white/80 rounded-2xl shadow-xl border-4 border-playful-700 p-8 flex items-center justify-center text-center font-sans text-4xl font-bold text-playful-900"
          >
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}

export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-playful-200 to-playful-400 flex items-center justify-center overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute top-12 left-16 w-32 h-32 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-24 right-32 w-36 h-36 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>

      {/* Speech bubble */}
      <div className="relative z-10 max-w-4xl bg-white rounded-3xl shadow-2xl border-8 border-playful-700 p-12 text-center text-playful-900 font-sans">
        <h2 className="text-6xl font-extrabold mb-6">{title}</h2>
        <p className="text-3xl leading-relaxed">{content}</p>

        {/* Tail of bubble */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] border-r-[40px] border-t-[40px] border-l-transparent border-r-transparent border-t-white drop-shadow-lg"></div>
      </div>
    </section>
  );
}

export function MainSlide6() {
  const notes = [
    { color: "bg-pink-300", text: "Idea One" },
    { color: "bg-yellow-300", text: "Idea Two" },
    { color: "bg-green-300", text: "Idea Three" },
    { color: "bg-blue-300", text: "Idea Four" },
  ];

  return (
    <section className="relative w-[1920px] h-[1080px] bg-playful-100 flex items-center justify-center overflow-hidden px-24">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>

      {/* Sticky notes grid */}
      <div className="relative z-10 grid grid-cols-2 gap-12 w-full max-w-6xl">
        {notes.map((note, i) => (
          <div
            key={i}
            className={`${note.color} p-10 rounded-2xl shadow-lg text-4xl font-bold text-playful-900 transform rotate-${i % 2 === 0 ? "2" : "-2"}`}
          >
            {note.text}
          </div>
        ))}
      </div>
    </section>
  );
}



export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-playful-200 via-playful-300 to-playful-400 overflow-hidden flex flex-col">
      {/* Playful floating shapes */}
      <div className="absolute top-12 left-16 w-28 h-28 bg-playful-500 rounded-full opacity-70 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-36 h-36 bg-playful-600 rounded-2xl opacity-70 rotate-12 animate-pulse"></div>
      <div className="absolute top-[30%] right-1/4 w-20 h-20 bg-playful-700 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-playful-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-playful-300 rounded-lg opacity-60 animate-pulse"></div>

      {/* Image + Title */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || "Slide image"}
            className="rounded-2xl shadow-2xl max-h-[70%] object-contain mb-6 border-8 border-white"
          />
        ) : (
          <div className="w-full h-[70%] flex items-center justify-center bg-playful-200 text-playful-800 font-bold rounded-2xl border-8 border-white shadow-xl mb-6">
            No Image
          </div>
        )}
        <h3 className="text-3xl font-extrabold font-sans text-playful-900 drop-shadow-md bg-white/70 px-6 py-2 rounded-xl">
          {title}
        </h3>
      </div>
    </section>
  );
}




/* End Slide */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-playful-400 to-playful-200 flex flex-col items-center justify-center text-playful-900 animate-fade-in overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-20 -top-20 left-20"></div>
      <div className="absolute w-56 h-56 bg-pink-400 rotate-12 opacity-20 bottom-12 right-12"></div>

      <h2 className="text-7xl font-extrabold font-sans mb-6 z-10">Thank You</h2>
      <p className="text-3xl font-sans opacity-90 z-10">🎨✨</p>
    </section>
  );
}

const PlayfulPrimary = {
  TitleSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  MainSlide5,
  MainSlide6,
  ImageSlide,
  EndSlide,
};

export default PlayfulPrimary;
