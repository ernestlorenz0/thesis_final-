import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1280px] h-[720px] bg-white overflow-hidden flex items-center">
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
    <section className="relative w-[1280px] h-[720px] bg-white overflow-hidden flex items-center justify-between p-10">
      {/* Left shapes */}
      <img src="src/svgs/circle-left.svg" alt="circle" className="absolute left-0 top-0 w-[500px]" />
      <img src="src/svgs/circle-right.svg" alt="shape" className="absolute bottom-0 right-0 w-[350px]" />

      <div className="relative z-10 w-1/2 bg-white shadow-lg rounded-lg p-8 ml-auto">
        <h2 className="text-6xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-xl text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function SectionSlide({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] bg-cyan-200 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mt-[-300px]">{title}</h2>
        <div className="mt-2 h-[2px] w-40 bg-gray-700 mx-auto mb-40"></div>
        <p className="text-xl text-gray-700 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function ColumnsSlide({ items = [] }) {
  return (
    <section className="w-[1280px] h-[720px] bg-[#2c3e50] flex items-center justify-center space-x-6 p-10">
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

export function SplitSlide({ leftTitle, leftContent, rightTitle, rightContent }) {
  return (
    <section className="w-[1280px] h-[720px] flex">
      {/* Left cyan side */}
      <div className="w-1/2 bg-cyan-200 flex flex-col items-center justify-center p-10">
        <h3 className="text-2xl font-semibold mb-4">{leftTitle}</h3>
        <p className="text-gray-700">{leftContent}</p>
      </div>
      {/* Right white side */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
        <h3 className="text-2xl font-semibold mb-4">{rightTitle}</h3>
        <p className="text-gray-700">{rightContent}</p>
      </div>
    </section>
  );
}

export function SplitSlide2({ leftTitle, leftContent, rightTitle, rightContent }) {
  return (
    <section className="w-[1280px] h-[720px] flex">
      {/* Left white with cyan wave */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <p className="text-gray-700">{leftContent}</p>
      </div>
      {/* Right navy side */}
      <div className="w-1/2 bg-[#2c3e50] flex flex-col items-center justify-center p-10">
        <h3 className="text-2xl font-semibold text-white mb-4">{rightTitle}</h3>
        <p className="text-white">{rightContent}</p>
      </div>
    </section>
  );
}

export function EndSlide() {
  return (
    <section className="relative w-[1280px] h-[720px] bg-[#2c3e50] flex items-center justify-center">
      <img src="src/svgs/end-circle.svg" alt="circle" className="absolute w-[700px]" />
      <div className="relative z-10 text-center text-black">
        <h1 className="text-6xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl">End of Presentation</p>
      </div>
    </section>
  );
}

const CalmCyan = { TitleSlide, MainSlide, SectionSlide, ColumnsSlide, SplitSlide, SplitSlide2, EndSlide };
export default CalmCyan;
