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

/* Table of Contents Slide – Playful Primary */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#fff9e6] text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Background playful blobs */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-pink-300 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-yellow-300 rounded-full blur-[140px] opacity-50"></div>
      <div className="absolute top-1/3 left-2/3 w-[300px] h-[300px] bg-cyan-300 rounded-full blur-[100px] opacity-50"></div>

      {/* Fun doodles */}
      <div className="absolute top-20 left-32 text-5xl text-yellow-400">⭐</div>
      <div className="absolute bottom-28 right-32 text-5xl text-pink-400">✏️</div>
      <div className="absolute top-2/3 left-16 text-4xl text-cyan-400">🎨</div>

      {/* Title */}
      <h2 className="text-6xl font-bold text-pink-500 mb-12 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Main section with fun emoji markers */}
              <div className="flex items-start gap-4 hover:text-orange-600 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 mt-1">
                  {sectionIndex + 1}
                </div>
                <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
              </div>
              
              {/* Categories and Terms */}
              {(section.categories || section.subsections) && (
                <div className="ml-14 space-y-3">
                  {/* Handle new categories format */}
                  {section.categories && section.categories.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-2">
                      {/* Category name */}
                      <div className="flex items-start gap-3 hover:text-pink-600 transition-colors duration-200">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-300 to-purple-400 flex items-center justify-center text-white font-semibold text-xs shadow-md flex-shrink-0 mt-1">
                          {sectionIndex + 1}.{catIndex + 1}
                        </div>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors duration-200">
                              <span className="text-orange-400 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 hover:text-pink-600 transition-colors duration-200">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-300 to-purple-400 flex items-center justify-center text-white font-semibold text-xs shadow-md flex-shrink-0 mt-1">
                        {sectionIndex + 1}.{subIndex + 1}
                      </div>
                      <span className="text-lg text-left leading-tight flex-1">{subsection}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {sections.slice(Math.ceil(sections.length / 2)).map((section, sectionIndex) => {
            const actualIndex = Math.ceil(sections.length / 2) + sectionIndex;
            return (
              <div key={actualIndex} className="space-y-3">
                {/* Main section with fun emoji markers */}
                <div className="flex items-start gap-4 hover:text-orange-600 transition-colors duration-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 mt-1">
                    {actualIndex + 1}
                  </div>
                  <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
                </div>
                
                {/* Categories and Terms */}
                {(section.categories || section.subsections) && (
                  <div className="ml-14 space-y-3">
                    {/* Handle new categories format */}
                    {section.categories && section.categories.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        {/* Category name */}
                        <div className="flex items-start gap-3 hover:text-pink-600 transition-colors duration-200">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-300 to-purple-400 flex items-center justify-center text-white font-semibold text-xs shadow-md flex-shrink-0 mt-1">
                            {actualIndex + 1}.{catIndex + 1}
                          </div>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors duration-200">
                                <span className="text-orange-400 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 hover:text-pink-600 transition-colors duration-200">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-300 to-purple-400 flex items-center justify-center text-white font-semibold text-xs shadow-md flex-shrink-0 mt-1">
                          {actualIndex + 1}.{subIndex + 1}
                        </div>
                        <span className="text-lg text-left leading-tight flex-1">{subsection}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
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

      <h2 className="text-7xl font-bold font-sans mb-4 z-10">{title}</h2>
      <div className="h-2 w-40 bg-playful-900 rounded-full mb-6 z-10"></div>
      <p className="text-4xl font-sans leading-relaxed text-center max-w-5xl z-10">
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
        <h2 className="text-7xl font-bold font-sans mb-8">{title}</h2>
        <p className="text-4xl font-sans leading-relaxed">{content}</p>
      </div>
      <div className="flex-1 flex items-center justify-center z-10">
        <img src="src/pngs/puzzle.png" alt="puzzle" />
      </div>
    </section>
  );
}

export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-playful-200 via-playful-300 to-playful-400 overflow-hidden flex items-center justify-center">
      {/* --- Strong Background Shapes --- */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-playful-500 rounded-full opacity-70 blur-lg" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-playful-700 rounded-3xl rotate-12 opacity-60 blur-md" />
      
      {/* Triangle */}
      <div className="absolute top-[20%] left-[10%] w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[200px] border-b-playful-600 opacity-80 rotate-12" />

      {/* Zigzag stripe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1400px] h-[200px] bg-playful-400 opacity-25 rotate-12 skew-y-6"></div>
      </div>

      {/* Dotted Circle */}
      <div className="absolute top-[25%] right-[20%] w-[280px] h-[280px] border-[12px] border-dashed border-white rounded-full opacity-70" />

      {/* --- Content Area --- */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        {/* Title */}
        <h2 className="text-7xl font-extrabold text-playful-900 drop-shadow-2xl">
          {title || "Playful Concept"}
        </h2>

        {/* Decorative underline */}
        <div className="mt-6 w-48 h-3 bg-gradient-to-r from-playful-500 via-playful-600 to-playful-700 rounded-full shadow-lg" />

        {/* Content Card */}
        <div className="mt-12 bg-white p-12 rounded-[3rem] border-[8px] border-playful-600 shadow-2xl relative max-w-3xl">
          <p className="text-4xl text-gray-900 leading-relaxed font-medium">
            {content ||
              "Here’s a slide with strong geometric visuals: big colorful blobs, a triangle, zigzag stripe, and dotted circle. They make the background unmistakable while the text stays readable."}
          </p>

          {/* Bubble pointer */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-[8px] border-playful-600 rotate-45" />
        </div>
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
        <h2 className="text-7xl font-extrabold mb-6">{title}</h2>
        <p className="text-4xl leading-relaxed">{content}</p>

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

/* End Slide */
export function EndSlide() {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-playful-400 to-playful-200 flex flex-col items-center justify-center text-playful-900 animate-fade-in overflow-hidden">
      {/* Shapes */}
      <div className="absolute w-72 h-72 bg-blue-400 rounded-full opacity-20 -top-20 left-20"></div>
      <div className="absolute w-56 h-56 bg-pink-400 rotate-12 opacity-20 bottom-12 right-12"></div>

      <h2 className="text-7xl font-extrabold font-sans mb-6 z-10">Thank You</h2>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlidePrimary({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const PlayfulPrimary = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  MainSlide5,
  MainSlide6,
  EndSlide,
};

export default PlayfulPrimary;
