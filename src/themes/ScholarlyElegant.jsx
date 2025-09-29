import React from "react";
import { BookOpen, Scroll, PenTool, GraduationCap } from "lucide-react";

/* Title Slide – Split with vertical divider */
export function TitleSlide({ title, subtitle }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center px-24">
      <div className="flex-1 pr-12">
        <h1 className="text-6xl font-serif font-bold text-gray-900 mb-6">{title}</h1>
        <h2 className="text-2xl font-serif italic text-gray-700">{subtitle}</h2>
      </div>
      <div className="w-[3px] h-64 bg-yellow-600"></div>
      <div className="flex-1 pl-12 flex items-center justify-center">
        <div className="w-64 h-64 border-4 border-yellow-600 rounded-full opacity-20"></div>
      </div>
    </section>
  );
}

/* Table of Contents Slide – Scholarly Elegant */
export function TOCSlide({ tocData }) {
  // Handle both old format (items array) and new format (tocData object)
  const title = tocData?.title || "Table of Contents";
  const sections = tocData?.sections || [];
  
  return (
    <section className="relative w-[1920px] h-[1080px] bg-[#0e1a2a] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Elegant border frame */}
      <div className="absolute inset-16 border-4 border-yellow-600/70 rounded-lg"></div>

      {/* Title */}
      <h2 className="text-5xl font-serif font-bold text-yellow-400 mb-20 tracking-wide">
        {title}
      </h2>

      {/* Two-Column Layout for TOC */}
      <div className="grid grid-cols-2 gap-12 z-10 max-w-7xl w-full">
        {/* Left Column */}
        <div className="space-y-6">
          {sections.slice(0, Math.ceil(sections.length / 2)).map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              {/* Main section */}
              <div className="flex items-start gap-4 text-gray-200 hover:text-yellow-300 transition-colors duration-200">
                <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-yellow-600 text-yellow-400 font-bold flex-shrink-0 mt-1">
                  {sectionIndex + 1}
                </span>
                <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
              </div>
              
              {/* Categories and Terms */}
              {(section.categories || section.subsections) && (
                <div className="ml-14 space-y-3">
                  {/* Handle new categories format */}
                  {section.categories && section.categories.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-2">
                      {/* Category name */}
                      <div className="flex items-start gap-3 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full border border-yellow-600/60 text-yellow-400 text-xs font-semibold flex-shrink-0 mt-1">
                          {sectionIndex + 1}.{catIndex + 1}
                        </span>
                        <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                      </div>
                      
                      {/* Terms under category */}
                      {category.terms && category.terms.length > 0 && (
                        <div className="ml-9 space-y-1">
                          {category.terms.map((term, termIndex) => (
                            <div key={termIndex} className="flex items-center gap-2 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                              <span className="text-yellow-400 text-sm">-</span>
                              <span className="text-lg text-left leading-tight">{term}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Handle old subsections format for backward compatibility */}
                  {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                    <div key={subIndex} className="flex items-start gap-3 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full border border-yellow-600/60 text-yellow-400 text-xs font-semibold flex-shrink-0 mt-1">
                        {sectionIndex + 1}.{subIndex + 1}
                      </span>
                      <span className="text-lg text-left leading-tight flex-1 opacity-90">{subsection}</span>
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
              <div key={actualIndex} className="space-y-4">
                {/* Main section */}
                <div className="flex items-start gap-4 text-gray-200 hover:text-yellow-300 transition-colors duration-200">
                  <span className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-yellow-600 text-yellow-400 font-bold flex-shrink-0 mt-1">
                    {actualIndex + 1}
                  </span>
                  <span className="text-3xl font-bold text-left leading-tight flex-1">{section.title}</span>
                </div>
                
                {/* Categories and Terms */}
                {(section.categories || section.subsections) && (
                  <div className="ml-14 space-y-3">
                    {/* Handle new categories format */}
                    {section.categories && section.categories.map((category, catIndex) => (
                      <div key={catIndex} className="space-y-2">
                        {/* Category name */}
                        <div className="flex items-start gap-3 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-yellow-600/60 text-yellow-400 text-xs font-semibold flex-shrink-0 mt-1">
                            {actualIndex + 1}.{catIndex + 1}
                          </span>
                          <span className="text-xl font-bold text-left leading-tight flex-1">{category.name}</span>
                        </div>
                        
                        {/* Terms under category */}
                        {category.terms && category.terms.length > 0 && (
                          <div className="ml-9 space-y-1">
                            {category.terms.map((term, termIndex) => (
                              <div key={termIndex} className="flex items-center gap-2 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                                <span className="text-yellow-400 text-sm">-</span>
                                <span className="text-lg text-left leading-tight">{term}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Handle old subsections format for backward compatibility */}
                    {!section.categories && section.subsections && section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex} className="flex items-start gap-3 text-gray-300 hover:text-yellow-200 transition-colors duration-200">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full border border-yellow-600/60 text-yellow-400 text-xs font-semibold flex-shrink-0 mt-1">
                          {actualIndex + 1}.{subIndex + 1}
                        </span>
                        <span className="text-lg text-left leading-tight flex-1 opacity-90">{subsection}</span>
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


/* Main Slide 1 – Title on top, underline, content below */
export function MainSlide1({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-white text-gray-900 px-24 py-16 flex flex-col">

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]" />

      {/* Scholarly faded icons */}
      <Scroll className="absolute bottom-32 right-24 w-28 h-28 text-[#6e5a3d]/20" />
      <PenTool className="absolute top-1/3 right-1/4 w-24 h-24 text-[#4a3826]/20 rotate-[-15deg]" />
      <GraduationCap className="absolute bottom-20 left-1/4 w-28 h-28 text-[#5c4933]/20" />

      {/* Decorative border frame */}
      <div className="absolute inset-12 border-4 border-[#b9a07f] rounded-2xl opacity-40" />

      <h2 className="text-8xl font-serif font-bold mb-2">{title}</h2>
      <div className="h-[3px] w-40 bg-yellow-600 mb-8"></div>
      <div className="text-4xl font-serif leading-relaxed">{content}</div>
    </section>
  );
}

/* Main Slide 2 – Two columns, left for title+content, right decorative */
export function MainSlide2({ title, content }) {
  return (
    <section className="w-[1920px] h-[1080px] bg-gray-50 text-gray-900 px-20 py-16 flex">

      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]" />

      {/* Scholarly faded icons */}
      <Scroll className="absolute bottom-32 right-24 w-28 h-28 text-[#6e5a3d]/20" />
      <PenTool className="absolute top-1/3 right-1/4 w-24 h-24 text-[#4a3826]/20 rotate-[-15deg]" />
      <GraduationCap className="absolute bottom-20 left-1/4 w-28 h-28 text-[#5c4933]/20" />

      {/* Decorative border frame */}
      <div className="absolute inset-12 border-4 border-[#b9a07f] rounded-2xl opacity-40" />

      <div className="flex-1 pr-12">
        <h2 className="text-7xl font-serif font-bold mb-6">{title}</h2>
        <div className="text-4xl font-serif leading-relaxed">{content}</div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img src="src/pngs/abroad.png" alt="abroad" className="w-[700px]"/>
      </div>
    </section>
  );
}

/* Main Slide 3 – Full border frame with content centered */
export function MainSlide3({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-100 to-white text-gray-900 px-24 py-16 flex flex-col items-center justify-center">
      <div className="absolute inset-8 border-4 border-yellow-600 rounded-xl opacity-40"></div>
      <h2 className="text-7xl font-serif font-bold mb-[150px] z-10 mt-[-250px] ">{title}</h2>
      <div className="text-4xl font-serif leading-relaxed max-w-5xl text-center z-10">{content}</div>
    </section>
  );
}

/* End Slide – Framed closing */
export function EndSlide({ message }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gradient-to-br from-gray-200 to-gray-100 flex flex-col items-center justify-center text-gray-900 overflow-hidden">

      <div className="absolute inset-16 border-8 border-[#b9a07f] rounded-xl opacity-50" />

      {/* Scholarly faded icons */}
      <BookOpen className="absolute top-24 left-24 w-28 h-28 text-[#5a4632]/20" />
      <Scroll className="absolute bottom-28 right-24 w-32 h-32 text-[#6e5a3d]/20" />
      <PenTool className="absolute top-1/2 right-1/4 w-24 h-24 text-[#4a3826]/20 rotate-12" />

      <div className="absolute inset-6 border-4 border-yellow-600 rounded-xl"></div>
      <h2 className="text-5xl font-serif font-bold mb-6">{message}</h2>
      <p className="text-8xl font-serif italic text-gray-700">Thank you</p>
    </section>
  );
}

/* Main Slide 4 – Horizontal split (title/content left, content right) */
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-white text-gray-900 flex overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>

      {/* Left */}
      <div className="flex-1 px-24 py-20 z-10 flex flex-col justify-center">
        <h2 className="text-7xl font-serif font-bold mb-8">{title}</h2>
        <p className="text-4xl font-serif leading-relaxed">{content}</p>
      </div>

      {/* Divider */}
      <div className="w-[3px] bg-yellow-600 opacity-70 my-24"></div>

      {/* Right */}
      <div className="flex-1 px-24 py-20 z-10 flex items-center">
        <img src="src/pngs/studying1.png" alt="studying1" className="w-[700px]"/>
      </div>
    </section>
  );
}

/* Main Slide 6 – Diagonal/offset orientation */
export function MainSlide6({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-gray-100 text-gray-900 flex items-center justify-center overflow-hidden">
      {/* Diagonal accent */}
      <div className="absolute -skew-y-6 top-0 left-0 w-full h-full bg-gradient-to-tr from-yellow-100/40 to-transparent"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-500/20 rounded-lg rotate-12 blur-2xl"></div>

      <div className="relative z-10 max-w-4xl text-left">
        <h2 className="text-7xl font-serif font-bold mb-8">{title}</h2>
        <p className="text-4xl font-serif leading-relaxed">{content}</p>
      </div>
    </section>
  );
}


// Keep old component for backward compatibility
export function TOCSlideScholarly({ title = "Table of Contents", items = [] }) {
  const tocData = {
    title,
    sections: items.map(item => ({ title: item, subsections: [] }))
  };
  return <TOCSlide tocData={tocData} />;
}

const ScholarlyElegant = {
  TitleSlide,
  TOCSlide,
  MainSlide1,
  MainSlide2,
  MainSlide3,
  EndSlide,
};

export default ScholarlyElegant;
