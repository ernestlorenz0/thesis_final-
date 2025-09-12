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

// Main Slide 1
export function MainSlide({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden">
      {/* Top Orange Shape */}
      <img
        src="src/svgs/header-front.svg"
        alt="top shape"
        className="absolute top-0 w-full"
      />

      {/* Bottom Paint */}
      <img
        src="src/svgs/paint-background2.svg"
        alt="paint background"
        className="absolute bottom-0 w-full"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-8 text-center">
        {/* Title near the orange section */}
        <h1 className="font-[BebasNeue] text-6xl mt-20">{title}</h1>

        {/* Spacer pushes content lower */}
        <div className="flex-1" />

        {/* Content stays lower in black area */}
        <p className="font-[Poppins] text-3xl translate-y-0 max-w-xl mx-auto leading-relaxed mb-60">
          {content}
        </p>
      </div>
    </section>
  );
}

// Main Slide 2
export function MainSlide2({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Left Blob */}
      <img
        src="src/svgs/blob-shape4.svg"
        alt="left blob"
        className="absolute left-0 top-0 h-[400px]"
      />

      {/* Bottom Paint */}
      <img
        src="src/svgs/paint-background2.svg"
        alt="paint background"
        className="absolute bottom-0 w-full"
      />

      {/* Text (centered) */}
      <div className="relative z-10 text-center max-w-2xl px-8">
        <h2 className="font-[BebasNeue] text-6xl mb-10">{title}</h2>
        <p className="font-[Poppins] text-3xl leading-relaxed">{content}</p>
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
      <div className="relative z-10 px-12 pt-12 max-w-xl text-left">
        <h2 className="font-[BebasNeue] text-6xl mb-6">{title}</h2>
        <p className="font-[Poppins] text-3xl leading-relaxed">{content}</p>
      </div>
    </section>
  );
}

// Main Slide 4
export function MainSlide4({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex">
      {/* Half Orange Shape */}
      <img
        src="src/svgs/rectangle-half.svg"
        alt="half orange"
        className="absolute right-0 top-0 h-full"
      />

      {/* Title on the left (black background) */}
      <div className="relative z-10 w-1/2 flex items-center justify-center px-12">
        <h2 className="font-[BebasNeue] text-5xl text-white-400  translate-y-[-200px] translate-x-[-150px]">{title}</h2>
      </div>

      {/* Content inside half orange */}
      <div className="relative z-20 w-1/2 flex items-center px-16">
        <p className="font-[Poppins] text-3xl leading-relaxed text-white drop-shadow-lg translate-y-[-100px] translate-x-[-70px]">
          {content}
        </p>
      </div>
    </section>
  );
}



// Main Slide 5
export function MainSlide5({ title, content }) {
  return (
    <section className="relative w-[1920px] h-[1080px] bg-black text-white overflow-hidden flex items-center">
      {/* Top Purple + Orange Blob */}
      <img src="src/svgs/ellipse-top.svg" alt="top accent" className="absolute top-0 w-[500px]" />

      {/* Bottom Paint */}
      <img src="src/svgs/paint-background2.svg" alt="paint background" className="absolute bottom-0 w-full" />

      {/* Text */}
      <div className="relative z-10 w-1/2 flex items-center justify-center px-12">
        <h2 className="font-[BebasNeue] text-5xl text-white-400  translate-y-[-200px] translate-x-[-150px]">{title}</h2>
      </div>

      {/* Content inside half orange */}
      <div className="relative z-20 w-1/2 flex items-center px-16">
        <p className="font-[Poppins] text-3xl leading-relaxed text-white drop-shadow-lg translate-y-[-100px] translate-x-[-70px]">
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

const ArtStudio = { TitleSlide, 
                   MainSlide, 
                   MainSlide2, 
                   MainSlide3, 
                   MainSlide4, 
                   MainSlide5, 
                   EndSlide };
export default ArtStudio;
