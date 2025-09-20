import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white overflow-hidden flex items-center">
      {/* Big circle */}
      <img src="src/svgs/big-circle.svg" alt="circle" className="absolute right-0 bottom-0 w-[700px]" />
      {/* Small navy circle */}
      <img src="src/svgs/small-circle.svg" alt="circle" className="absolute top-10 right-40 w-10" />
      {/* Peach corner shape */}
      <img src="src/svgs/small-rec.svg" alt="shape" className="absolute bottom-0 left-0 w-[200px]" />

      <div className="relative z-10 ml-16">
        <h1 className="text-5xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-lg mt-3 text-gray-600">{subtitle}</p>}
      </div>
    </section>
  );
}

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white overflow-hidden flex items-center justify-between p-10">
      {/* Left shapes */}
      <img src="src/svgs/circle-left.svg" alt="circle" className="absolute left-0 top-0 w-[500px]" />
      <img src="src/svgs/circle-right.svg" alt="shape" className="absolute bottom-0 right-0 w-[350px]" />

      <div className="relative z-10 w-1/2 bg-white shadow-lg rounded-lg p-8 ml-[300px]">
        <h2 className="text-6xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-2xl text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-cyan-200 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-800 mt-[-300px]">{title}</h2>
        <div className="mt-2 h-[2px] w-40 bg-gray-700 mx-auto mb-40"></div>
        <p className="text-xl text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide2({ items = [] }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-[#2c3e50] flex items-center justify-center space-x-6 p-10">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-40 h-40 mb-4 bg-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-2xl">📦</span>
          </div>
          <p className="text-white text-lg">{item}</p>
        </div>
      ))}
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] flex">
      {/* Left cyan side */}
      <div className="w-1/2 bg-cyan-200 flex flex-col items-center justify-center p-10">
        <h2 className="text-5xl font-semibold mb-4 text-black translate-y-[-200px]">{title}</h2>
        <p className="text-gray-700 translate-y-[-150px] text-2xl">{content}</p>
      </div>
      {/* Right white side */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
        
      </div>
    </section>
  );
}

export function MainSlide4({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] flex">
      {/* Left white with cyan wave */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
      <img src="src/svgs/thesis1.svg" alt="thesis" />
      </div>
      {/* Right navy side */}
      <div className="w-1/2 bg-[#2c3e50] flex flex-col items-center justify-center p-10">
        <h3 className="text-6xl font-semibold text-white mb-4 translate-y-[-200px]">{title}</h3>
        <p className="text-white translate-y-[-150px] text-3xl">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 5 – Angled split diagonal layout */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex overflow-hidden">
      {/* Background diagonal split */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 to-white clip-path-diagonal"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-40 w-48 h-48 bg-[#2c3e50]/30 rounded-full"></div>
      <div className="absolute bottom-20 left-40 w-64 h-64 bg-cyan-400/30 rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-32 text-center">
        <h2 className="text-6xl font-semibold text-gray-800 mb-10">{title}</h2>
        <p className="text-2xl text-gray-700 leading-relaxed max-w-5xl">{content}</p>
      </div>
    </section>
  );
}

/* Main Slide 6 – Circle focal point layout */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex items-center justify-center overflow-hidden">
      {/* Big background circle */}
      <div className="absolute w-[900px] h-[900px] rounded-full bg-cyan-200 opacity-50"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#2c3e50]/40"></div>

      {/* Overlay shapes */}
      <div className="absolute top-16 left-16 w-32 h-32 bg-cyan-400/40 rounded-full"></div>
      <div className="absolute bottom-16 right-32 w-40 h-40 bg-cyan-300/40 rounded-full"></div>

      {/* Content centered inside circle */}
      <div className="relative z-10 max-w-4xl text-center">
        <h2 className="text-6xl font-semibold text-gray-800 mb-6">{title}</h2>
        <p className="text-2xl text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}



export function TOCSlideCalmCyan({
  title = "Table of Contents",
  items = [],
}) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] text-[#044e54] flex flex-col items-center justify-center overflow-hidden">
      {/* Background soft waves */}
      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-cyan-600/30 to-transparent rounded-t-[100%]"></div>
      <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-cyan-400/20 to-transparent rounded-b-[100%]"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-cyan-300/30 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 rounded-full bg-teal-400/30 blur-2xl"></div>

      {/* Title */}
      <h2 className="text-6xl font-bold mb-16 tracking-wide text-cyan-900 drop-shadow-sm">
        {title}
      </h2>

      {/* TOC Items */}
      <ul className="text-3xl font-medium space-y-10 max-w-3xl text-left relative z-10">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-6">
            {/* Minimal badge number */}
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500 text-white font-bold shadow-md">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#2c3e50] flex items-center justify-center">
      <img src="src/svgs/end-circle.svg" alt="circle" className="absolute w-[700px]" />
      <div className="relative z-10 text-center text-black">
        <h1 className="text-6xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl">End of Presentation</p>
      </div>
    </section>
  );
}

const CalmCyan = { TitleSlide, TOCSlide: TOCSlideCalmCyan, MainSlide, EndSlide };
export default CalmCyan;
