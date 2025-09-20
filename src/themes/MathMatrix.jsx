import React from "react";
import { PiSigmaBold } from "react-icons/pi";
import { FaSquareRootAlt } from "react-icons/fa";
import { TbMathFunction } from "react-icons/tb";

/* Title Slide – Matrix digital grid background */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black overflow-hidden flex flex-col items-center justify-center text-green-400">
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

export function TOCSlideMathMatrix(props) {
  const {
    title,
    items,
    accent
  } = props;

  const accentMap = {
    cyan: "from-cyan-400 to-blue-500",
    lime: "from-lime-400 to-green-600",
    amber: "from-amber-400 to-yellow-600",
  };

  const grad = accentMap[accent] || accentMap.cyan;

  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#050607] text-white flex items-center justify-center overflow-hidden">
      {/* Subtle grid / matrix background */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>

      {/* Faint glowing diagonal band */}
      <div className="absolute -left-80 -top-40 w-[900px] h-[900px] rounded-full bg-gradient-to-br opacity-40 blur-[160px] from-indigo-800 via-transparent to-transparent"></div>

      <div className="relative z-10 flex w-11/12 gap-12 px-20">
        {/* Left: TOC list */}
        <div className="w-2/3 flex flex-col justify-center">
          <h2 className="text-5xl font-mono font-bold mb-8 tracking-tight">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${grad}`}>
              {title}
            </span>
          </h2>

          <ul className="text-2xl font-mono space-y-6 text-gray-200 max-w-3xl">
            {items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-6 group transition-colors duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-sm bg-[#0b0b0d] border border-white/10 shadow-inner">
                  <div className={`text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r ${grad}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xl font-medium group-hover:text-white transition-colors duration-200">
                    {item}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-1">
                    {`Section ${idx + 1}`}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
 
        <div className="w-1/3 flex items-center justify-center relative">
          <div className="absolute left-0 transform -translate-x-6 text-8xl text-white/30 font-mono select-none">⎡</div>
          <div className="relative w-[320px] h-[320px] bg-[#071018]/50 border border-white/10 rounded-lg flex items-center justify-center p-4">
            <pre className="font-mono text-lg text-white/80 leading-[1.05]">
              {`[ 1  0  0  ... ]
              [ 0  1  2  ... ]
              [ 3  5  8  ... ]
              [ .  .  .  ... ]`}
            </pre>
            <div className={`absolute -bottom-6 left-6 w-36 h-2 rounded-full bg-gradient-to-r ${grad} opacity-80 blur-sm`}></div>
          </div>
          <div className="absolute right-0 transform translate-x-6 text-8xl text-white/30 font-mono select-none">⎦</div>
        </div>
      </div>
    </section>
  );
}

TOCSlideMathMatrix.defaultProps = {
  title: "Table of Contents",
  items: [],
  accent: "cyan",
};


/* Main Slide 1 – Split screen with math sidebar */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] flex bg-black text-green-300">
      {/* Sidebar with math symbols */}
      <div className="w-1/5 bg-gradient-to-b from-green-900/70 to-black flex flex-col items-center justify-center gap-6 text-3xl">
        <PiSigmaBold className="opacity-50" />
        <FaSquareRootAlt className="opacity-50" />
        <TbMathFunction className="opacity-50" />
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <h2 className="text-6xl font-mono font-bold border-b-2 border-green-500 pb-3 mb-4">
          {title}
        </h2>
        <p className="text-3xl font-mono leading-relaxed">{content}</p>
      </div>
    </section>

    
  );
}

/* Main Slide 2 – Grid board with equations */
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-black to-green-950 text-green-300 p-8">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

      {/* Floating math notes */}
      <p className="absolute top-8 right-12 text-green-500 opacity-40 text-lg font-mono">∫ f(x) dx</p>
      <p className="absolute bottom-8 left-8 text-green-500 opacity-40 text-lg font-mono">E = mc²</p>

      <div className="relative z-10 max-w-5xl ml-[100px] mt-[100px]">
        <h2 className="text-7xl font-mono font-bold mb-4">{title}</h2>
        <p className="text-4xl font-mono leading-relaxed">{content}</p>
      </div>

      <div className="absolute bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src="src/svgs/math.svg" alt="math"/>
      </div>
    </section>
  );
}

/* Main Slide 3 – Diagonal matrix panel */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] overflow-hidden bg-black text-green-300 flex items-center">
      {/* Diagonal panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-black transform -skew-x-6"></div>

      {/* Math symbols background */}
      <PiSigmaBold className="absolute top-12 left-1/2 text-6xl opacity-20" />
      <FaSquareRootAlt className="absolute bottom-12 right-1/3 text-5xl opacity-20" />

      {/* Text */}
      <div className="relative z-10 px-12">
        <h2 className="text-6xl font-mono font-bold mb-4">{title}</h2>
        <p className="text-3xl font-mono leading-relaxed">{content}</p>
      </div>

      <div className="absolute bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src="src/svgs/math1.svg" alt="math"/>
      </div>
    </section>
  );
}

/* Main Slide 4 – Equation Split Showcase */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-green-300 flex">
      {/* Left panel – math spotlight */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-green-900/40 to-black border-r-4 border-green-700 relative">
        <p className="text-7xl font-mono opacity-40 absolute top-1/4 left-1/4">∫</p>
        <p className="text-6xl font-mono opacity-40 absolute bottom-1/4 right-1/4">∞</p>
        <h2 className="text-6xl font-mono font-bold z-10">{title}</h2>
      </div>

      {/* Right panel – content */}
      <div className="flex-1 flex items-center justify-center p-12">
        <p className="text-3xl font-mono leading-relaxed max-w-3xl">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-b from-black to-green-950 text-green-300 flex items-center justify-center">
      {/* Circular formula orbit */}
      <div className="absolute w-[700px] h-[700px] rounded-full border-4 border-green-800 animate-spin-slow"></div>

      {/* Orbiting equations */}
      <p className="absolute top-20 left-1/2 -translate-x-1/2 text-green-500 font-mono text-xl opacity-70">
        E = mc²
      </p>
      <p className="absolute bottom-24 left-1/3 text-green-500 font-mono text-xl opacity-70">
        a² + b² = c²
      </p>
      <p className="absolute top-1/2 right-32 text-green-500 font-mono text-xl opacity-70">
        ∑ xᵢ
      </p>

      {/* Core content */}
      <div className="relative z-10 text-center max-w-4xl">
        <h2 className="text-6xl font-mono font-bold mb-6">{title}</h2>
        <p className="text-3xl font-mono leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-green-300 flex flex-col items-center justify-center px-24 py-16">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:60px_60px] opacity-10"></div>

      {/* Timeline layout */}
      <div className="relative z-10 flex flex-col gap-12 max-w-5xl">
        <h2 className="text-6xl font-mono font-bold mb-8 text-center">{title}</h2>

        <div className="flex gap-8 items-start">
          <div className="w-8 h-8 bg-green-500 rounded-full mt-2"></div>
          <p className="text-3xl font-mono leading-relaxed flex-1">{content}</p>
        </div>
      </div>
    </section>
  );
}


/* Image Slide – Framed like a chalkboard */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black flex flex-col items-center justify-center text-green-400 p-8">
      {/* Frame */}
      <div className="absolute inset-4 border-4 border-green-700"></div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="math visual"
          className="relative z-10 max-h-[500px] object-contain mb-4 border-4 border-green-500 shadow-lg"
        />
      ) : (
        <div className="relative z-10 w-[800px] h-[400px] flex items-center justify-center border-4 border-green-700 text-green-600">
          No Image
        </div>
      )}
      <h3 className="relative z-10 text-xl font-mono font-bold mt-2">{title}</h3>
    </section>
  );
}

/* End Slide – Digital matrix style */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-green-400 flex items-center justify-center">
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
  TOCSlide: TOCSlideMathMatrix,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  ImageSlide,
  EndSlide,
};

export default MathMatrix;
