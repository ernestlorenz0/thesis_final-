import React from "react";

export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black flex items-center justify-center overflow-hidden">
      {/* Full paint splatter background */}
      <img
        src="src/svgs/paint-background.svg"
        alt="paint background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blob shapes */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Back blob (purple) */}
        <img
          src="src/svgs/blob-shape1.svg"
          alt="purple blob"
          className="absolute w-[650px] translate-x-2 translate-y-0"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.5))" }}
        />

        {/* Front blob (orange) */}
        <img
          src="src/svgs/blob-shape2.svg"
          alt="orange blob"
          className="w-[750px]"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white font-[BebasNeue] text-6xl text-center leading-snug ml-10">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-white font-[BebasNeue] text-xl text-center mt-2">
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}

/* Table of Contents Slide – Art Studio */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-[#222] flex flex-col items-center justify-center overflow-hidden">
      {/* Background paint strokes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-400/40 rounded-full blur-3xl mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-400/40 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Decorative brush doodles */}
      <div className="absolute top-12 left-24 text-7xl text-orange-400/70 rotate-12">🖌️</div>
      <div className="absolute bottom-20 right-28 text-7xl text-purple-400/70 -rotate-12">🎨</div>

      {/* Title */}
      <h2 className="text-7xl font-bold mb-16 tracking-tight drop-shadow-lg text-[#1f1f1f] font-serif">
        {title}
      </h2>

      {/* Hierarchical List with artistic styling and proper alignment */}
      <div className="text-3xl font-semibold space-y-6 max-w-5xl z-10">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            {/* Main section */}
            <div className="flex items-center gap-6 text-gray-800 hover:text-pink-600 transition-colors duration-200">
              <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-xl font-bold flex-shrink-0
                ${sectionIndex % 4 === 0 ? "bg-pink-500" : sectionIndex % 4 === 1 ? "bg-purple-500" : sectionIndex % 4 === 2 ? "bg-blue-500" : "bg-green-500"}`}>
                {sectionIndex + 1}
              </div>
              <span className="text-3xl font-bold text-left">{section.title}</span>
            </div>
            
            {/* Subsections with proper indentation */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="ml-18 space-y-2">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex} className="flex items-center gap-4 text-gray-700 hover:text-purple-600 transition-colors duration-200">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-semibold flex-shrink-0
                      ${subIndex % 2 === 0 ? "bg-purple-400" : "bg-pink-400"}`}>
                      {sectionIndex + 1}.{subIndex + 1}
                    </div>
                    <span className="text-2xl text-left">{subsection}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white overflow-hidden flex">
      {/* Background Shapes */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gradient-to-br from-orange-500 to-pink-600 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-20 right-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-600 to-blue-500 rotate-45 opacity-40 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] border-4 border-dashed border-yellow-400 rotate-12 opacity-50"></div>

      {/* Title Section (Left side) */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="font-[BebasNeue] text-8xl tracking-widest text-orange-400 drop-shadow-[0_0_20px_rgba(255,150,50,0.8)]">
          {title}
        </h1>
      </div>

      {/* Content Section (Right side framed like art) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative bg-white/10 p-12 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] border-[6px] border-yellow-400">
          <p className="font-[Poppins] text-3xl leading-relaxed text-gray-100 max-w-xl text-center">
            {content}
          </p>
          {/* Subtle corner accents */}
          <div className="absolute -top-4 -left-4 w-10 h-10 border-t-[6px] border-l-[6px] border-yellow-400"></div>
          <div className="absolute -top-4 -right-4 w-10 h-10 border-t-[6px] border-r-[6px] border-yellow-400"></div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 border-b-[6px] border-l-[6px] border-yellow-400"></div>
          <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b-[6px] border-r-[6px] border-yellow-400"></div>
        </div>
      </div>
    </section>
  );
}


export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Left Blob */}
      <img
        src="src/svgs/blob-shape4.svg"
        alt="left blob"
        className="absolute left-0 top-0 h-[420px] opacity-80"
      />

      {/* Bottom Paint */}
      <img
        src="src/svgs/paint-background2.svg"
        alt="paint background"
        className="absolute bottom-0 w-full opacity-90"
      />

      {/* Extra Geometric Shapes */}
      <div className="absolute top-32 right-40 w-40 h-40 border-8 border-pink-500 rotate-12 opacity-60"></div>
      <div className="absolute bottom-32 left-48 w-28 h-28 rounded-full bg-gradient-to-br from-orange-500 to-yellow-400 opacity-70 blur-sm"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 border-4 border-cyan-400 rotate-45 opacity-50"></div>

      {/* Text (centered) */}
      <div className="relative z-10 text-center max-w-2xl px-8">
        <h2 className="font-[BebasNeue] text-7xl mb-10 text-orange-400 drop-shadow-[0_0_25px_rgba(255,150,50,0.8)]">
          {title}
        </h2>
        <p className="font-[Poppins] text-3xl leading-relaxed text-gray-100">
          {content}
        </p>
      </div>
    </section>
  );
}



// Main Slide 3
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-start justify-start">
      {/* Right Blob */}
      <img
        src="src/svgs/shape-right2.svg"
        alt="right blob"
        className="absolute right-0 top-0 h-full"
      />

      {/* Bottom Paint */}
      <img
        src="src/svgs/paint-background2.svg"
        alt="paint background"
        className="absolute bottom-0 w-full"
      />

      {/* Text (now on the left, top-aligned) */}
      <div className="relative z-10 px-12 pt-12 max-w-5xl text-left ml-[50px] mt-[50px]">
        <h2 className="font-[BebasNeue] text-7xl mb-6">{title}</h2>
        <p className="font-[Poppins] text-4xl leading-relaxed">{content}</p>
      </div>

      <div className="absolute right-0 top-0 h-full">
        <img
          src="src/svgs/painting.svg"
          alt="right blob"
          className="h-full w-[600px] translate-y-[-1 00px] translate-x-[-50px] "
        />
      </div>
    </section>
  );
}

export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex">
      {/* Half Orange Shape (paint-like) */}
      <img
        src="src/svgs/rectangle-half.svg"
        alt="half orange"
        className="absolute right-0 top-0 h-full opacity-95"
      />

      {/* Abstract shapes for studio vibe */}
      <div className="absolute top-24 left-20 w-28 h-28 border-8 border-pink-500 rotate-12 opacity-70"></div>
      <div className="absolute bottom-28 left-1/3 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-70 blur-sm"></div>
      <div className="absolute top-1/2 right-1/3 w-20 h-20 border-4 border-yellow-400 rotate-45 opacity-60"></div>

      {/* Title area */}
      <div className="relative z-10 w-1/2 flex items-center justify-center px-12">
        <h2 className="font-[BebasNeue] text-7xl text-orange-400 drop-shadow-[0_0_20px_rgba(255,150,50,0.9)] -translate-y-40 -translate-x-28">
          {title}
        </h2>
      </div>

      {/* Content area (on orange side) */}
      <div className="relative z-20 w-1/2 flex items-center px-16">
        <p className="font-[Poppins] text-3xl leading-relaxed text-white drop-shadow-xl -translate-y-20 -translate-x-16 max-w-xl">
          {content}
        </p>
      </div>
    </section>
  );
}


// Main Slide 6
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Background paint splatter */}
      <img
        src="src/svgs/paint-background2.svg"
        alt="paint background"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Diagonal paint streak */}
      <div className="absolute -rotate-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 w-[1400px] h-[280px] rounded-lg shadow-2xl"></div>

      {/* Overlay blob accents */}
      <img
        src="src/svgs/blob-shape1.svg"
        alt="purple blob"
        className="absolute left-[-100px] bottom-[-80px] w-[400px] opacity-60"
      />
      <img
        src="src/svgs/blob-shape2.svg"
        alt="orange blob"
        className="absolute right-[-120px] top-[-60px] w-[500px] opacity-70"
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center text-center px-12">
        <h2 className="font-[BebasNeue] text-6xl mb-6 drop-shadow-lg">
          {title}
        </h2>
        <p className="font-[Poppins] text-3xl leading-relaxed max-w-4xl">
          {content}
        </p>
      </div>
    </section>
  );
}


// End Slide
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black flex items-center justify-center overflow-hidden">
      {/* Full paint splatter background */}
      <img
        src="src/svgs/paint-background.svg"
        alt="paint background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blob shapes */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Back blob (purple) */}
        <img
          src="src/svgs/blob-shape1.svg"
          alt="purple blob"
          className="absolute w-[570px] translate-x-1 translate-y-0"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.5))" }}
        />

        {/* Front blob (orange) */}
        <img
          src="src/svgs/blob-shape2.svg"
          alt="orange blob"
          className="w-[650px]"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white font-[BebasNeue] text-5xl translate-x-5 text-center leading-snug">
            ENDSLIDE
          </h1>
        </div>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideArtStudio({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const ArtStudio = { TitleSlide, 
                   MainSlide,
                   TOCSlide,
                   MainSlide2, 
                   MainSlide3, 
                   MainSlide4,
                   EndSlide };
export default ArtStudio;
