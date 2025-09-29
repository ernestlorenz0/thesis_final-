import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { PiTextTBold } from "react-icons/pi";
import { MdTranslate } from "react-icons/md";

/* Title Slide – Speech bubble theme */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Speech bubble icons */}
      <FaRegCommentDots className="absolute top-12 left-16 text-7xl opacity-30" />
      <MdTranslate className="absolute bottom-20 right-24 text-8xl opacity-20" />
      <PiTextTBold className="absolute top-1/2 left-1/4 text-6xl opacity-30" />

      <h1 className="relative z-10 text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
      <h2 className="relative z-10 text-2xl opacity-90">{subtitle}</h2>
    </section>
  );
}

export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-[#fdfbff] via-[#f5f2fc] to-[#ece8f9] text-gray-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-300/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-2xl"></div>

      {/* Floating characters */}
      <div className="absolute top-20 left-40 text-6xl font-bold text-indigo-500 opacity-40">
        あ
      </div>
      <div className="absolute bottom-28 right-48 text-6xl font-bold text-pink-500 opacity-40">
        A
      </div>
      <div className="absolute bottom-52 left-64 text-5xl font-bold text-blue-500 opacity-40">
        Ж
      </div>

      {/* Speech bubble icon */}
      <div className="absolute top-16 right-16 text-7xl text-purple-500/50">
        💬
      </div>

      {/* Title */}
      <h2 className="text-6xl font-bold font-sans text-indigo-900 mb-16 drop-shadow-lg">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              {/* Main section */}
              <div className="flex items-start gap-4 text-gray-800 hover:text-orange-600 transition-colors duration-200">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold flex-shrink-0 mt-1
                  ${sectionIndex % 4 === 0 ? "bg-orange-500" : sectionIndex % 4 === 1 ? "bg-red-500" : sectionIndex % 4 === 2 ? "bg-yellow-500" : "bg-green-500"}`}>
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
                      <div className="flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                          ${catIndex % 2 === 0 ? "bg-red-400" : "bg-yellow-400"}`}>
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
                    <div key={subIndex} className="flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors duration-200">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                        ${subIndex % 2 === 0 ? "bg-red-400" : "bg-yellow-400"}`}>
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
                {/* Main section */}
                <div className="flex items-start gap-4 text-gray-800 hover:text-orange-600 transition-colors duration-200">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white text-lg font-bold flex-shrink-0 mt-1
                    ${actualIndex % 4 === 0 ? "bg-orange-500" : actualIndex % 4 === 1 ? "bg-red-500" : actualIndex % 4 === 2 ? "bg-yellow-500" : "bg-green-500"}`}>
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
                        <div className="flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors duration-200">
                          <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                            ${catIndex % 2 === 0 ? "bg-red-400" : "bg-yellow-400"}`}>
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
                      <div key={subIndex} className="flex items-start gap-3 text-gray-700 hover:text-red-600 transition-colors duration-200">
                        <div className={`w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-semibold flex-shrink-0 mt-1
                          ${subIndex % 2 === 0 ? "bg-red-400" : "bg-yellow-400"}`}>
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

/* Main Slide 1 – Split layout with giant quotation mark */
export function MainSlide1({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-r from-yellow-100 to-pink-50 text-gray-900">
      {/* Big decorative quote mark */}
      <div className="absolute top-10 left-10 text-[200px] text-pink-300 opacity-80 font-serif">“</div>

      <div className="flex-1 p-20 flex flex-col justify-center ml-[100px]">
        <h2 className="text-7xl font-bold mb-6">{title}</h2>
        <p className="text-4xl leading-relaxed max-w-3xl">{content}</p>
      </div>

      <div className="absolute mt-[160px] bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src="src/svgs/discussion.svg" alt="math"/>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideLanguageLab({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const LanguageLab = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  MainSlide4,
  MainSlide5,
  MainSlide6,
  ImageSlide,
  EndSlide,
};

export default LanguageLab;

export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden">
      {/* Floating language-themed visuals */}
      <FaRegCommentDots className="absolute top-20 left-24 text-[160px] text-blue-400/30 animate-bounce-slow" />
      <PiTextTBold className="absolute bottom-28 left-1/3 text-[140px] text-purple-400/30 animate-pulse" />
      <MdTranslate className="absolute top-1/3 right-28 text-[150px] text-indigo-400/30 animate-spin-slow" />

      {/* Abstract bubbles */}
      <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full bg-blue-300/20 blur-2xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-purple-300/30 blur-3xl"></div>

      {/* Card area */}
      <div className="relative z-10 bg-white shadow-2xl rounded-3xl p-16 max-w-4xl border-8 border-indigo-200">
        <h2 className="text-7xl font-bold mb-8 text-blue-900 text-center">
          {title}
        </h2>
        <p className="text-4xl leading-relaxed text-gray-800 text-center">
          {content}
        </p>
      </div>
    </section>
  );
}

/* Main Slide 3 – Asymmetrical floating panels */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-bl from-pink-200 via-yellow-100 to-blue-200 flex p-16 overflow-hidden">
      {/* Floating panels */}
      <div className="absolute top-10 left-16 w-48 h-28 bg-white shadow-lg rounded-lg rotate-6 opacity-70"></div>
      <div className="absolute bottom-16 right-24 w-56 h-32 bg-white shadow-lg rounded-lg -rotate-6 opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center max-w-4xl">
        <h2 className="text-7xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>
      </div>

      <div className="absolute mt-[200px] bottom-30 right-0 w-[700px] h-[600px] mr-20">
        <img src="src/pngs/speech.png" alt="math"/>
      </div>
    </section>
  );
}

export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-900 overflow-hidden">
      {/* Floating decorative shapes */}
      <div className="absolute top-24 left-1/3 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-12 w-28 h-28 border-8 border-purple-300/40 rounded-full animate-spin-slow"></div>

      {/* Big faded icons */}
      <FaRegCommentDots className="absolute top-12 left-20 text-[140px] text-pink-400/20" />
      <MdTranslate className="absolute bottom-16 right-24 text-[160px] text-purple-400/20" />
      <PiTextTBold className="absolute top-1/4 right-1/3 text-[120px] text-blue-400/20" />

      {/* Left side – title area */}
      <div className="relative z-10 w-1/2 flex flex-col justify-center px-20">
        <h2 className="text-7xl font-bold mb-6 drop-shadow-sm">{title}</h2>
        <div className="h-2 w-40 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
      </div>

      {/* Right side – content inside speech bubble */}
      <div className="relative z-10 w-1/2 flex items-center justify-center">
        <div className="relative bg-white shadow-2xl rounded-3xl p-16 max-w-xl border-8 border-pink-200">
          <p className="text-4xl text-gray-800 leading-relaxed">{content}</p>

          {/* Speech bubble tail */}
          <div className="absolute -bottom-6 left-20 w-10 h-10 bg-white rotate-45 shadow-md border-l border-b border-pink-200"></div>
        </div>
      </div>
    </section>
  );
}

/* Main Slide 5 – Layered Bubble Stack */
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-tr from-yellow-200 via-pink-100 to-purple-200 flex items-center justify-center overflow-hidden">
      {/* Stacked background bubbles */}
      <div className="absolute w-96 h-96 bg-blue-300/30 rounded-full top-12 left-24"></div>
      <div className="absolute w-80 h-80 bg-pink-400/20 rounded-full bottom-20 right-32"></div>

      {/* Foreground content */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-16 max-w-4xl text-center">
        <h2 className="text-5xl font-bold mb-6 text-purple-900">{title}</h2>
        <p className="text-3xl text-gray-800 leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] flex items-center bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Decorative glowing blobs */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-pink-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-blue-300/25 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 right-1/4 w-[280px] h-[280px] bg-purple-300/30 rounded-full blur-2xl"></div>

      {/* Diagonal accent overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-transparent transform -skew-y-6"></div>

      {/* Floating faded icons */}
      <FaRegCommentDots className="absolute top-20 left-1/3 text-[140px] text-pink-400/20 animate-bounce-slow" />
      <MdTranslate className="absolute bottom-28 right-1/3 text-[150px] text-blue-500/20 animate-pulse" />
      <PiTextTBold className="absolute top-1/2 right-10 text-[120px] text-purple-500/20 animate-spin-slow" />

      {/* Left content */}
      <div className="relative z-10 flex flex-col justify-center px-32 max-w-4xl">
        <h2 className="text-7xl font-bold text-gray-900 mb-8 drop-shadow-sm">
          {title}
        </h2>
        <p className="text-4xl leading-relaxed text-gray-800 drop-shadow-sm">
          {content}
        </p>
      </div>

      {/* Right illustration */}
      <div className="relative z-10 w-[650px] h-[600px] mr-20 flex items-center justify-center">
        <img
          src="src/pngs/talking.png"
          alt="talking illustration"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
}

/* Image Slide – Dictionary style card */
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white flex flex-col items-center justify-center text-gray-900">
      {/* Border frame */}
      <div className="absolute inset-8 border-4 border-blue-700 rounded-lg"></div>

      {imageUrl ? (
        <img
          src={imageUrl}
          alt="language visual"
          className="relative z-10 max-h-[400px] object-contain mb-6 shadow-lg rounded-md border-4 border-pink-400"
        />
      ) : (
        <div className="relative z-10 w-[640px] h-[360px] flex items-center justify-center text-gray-400 border-4 border-blue-700">
          No Image
        </div>
      )}

      <h3 className="relative z-10 text-2xl font-bold mt-2">{title}</h3>
    </section>
  );
}

/* End Slide – Speech bubble close */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-r from-purple-700 to-pink-600 flex items-center justify-center text-white">
      {/* Giant bubble background */}
      <div className="absolute w-[800px] h-[400px] rounded-full bg-white/20 blur-3xl"></div>

      <div className="relative z-10 text-center">
        <h2 className="text-6xl font-bold mb-4">{message}</h2>
        <p className="text-2xl opacity-80">The End</p>
      </div>
    </section>
  );
}

// Keep old component for backward compatibility
export function TOCSlideLanguageLab({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}
