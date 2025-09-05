import React from "react";

export function TitleSlide({ title, subtitle, imageUrl }) {
  return (
    <section className="w-[1280px] h-[720px] flex items-center justify-center bg-white">
      <div className="flex w-[80%] h-[80%] items-center justify-between">

        <div className="w-[40%] h-[70%] bg-gray-300 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Presentation visual"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Image Placeholder</span>
          )}
        </div>

        <div className="w-[50%] flex flex-col justify-center pl-12">
          <h1 className="font-merriweather font-bold text-6xl text-black mb-4 leading-tight text-black">
            {title}
          </h1>
          <p className="font-lato font-light text-2xl text-gray-600">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
export function ImageSlide({ title, imageUrl }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex flex-col items-center justify-center p-24">
      <div className="w-full h-[70%] bg-gray-300 flex items-center justify-center mb-8">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Presentation visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">Image Placeholder</span>
        )}
      </div>
      {title && (
        <h2 className="font-merriweather font-bold text-3xl text-black text-center">
          {title}
        </h2>
      )}
    </section>
  );
}

export function ContentSlide({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-3xl leading-relaxed text-black">{content}</p>
    </section>
  );
}

export function ContentSlideText({ title, content }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-3xl leading-relaxed text-black">{content}</p>
    </section>
  );
}


export function ContentSlideTextLeftImageRight({ title, content, imageUrl }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex p-16 gap-12">
      {/* Text Section */}
      <div className="flex-1 flex flex-col justify-center max-w-[60%]">
        <h2 className="font-merriweather font-bold text-5xl mt-[-300px] text-black leading-snug">
          {title}
        </h2>
        <p className="font-lato font-light text-3xl leading-relaxed text-black break-words">
          {content}
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="content"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-xl flex items-center justify-center text-black">
            No Image
          </div>
        )}
      </div>
    </section>
  );
}


export function ContentSlideTextRightImageLeft({ title, content, imageUrl }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex p-24 gap-12">
      <div className="w-1/2 flex items-center justify-center bg-gray-300">
        {imageUrl && <img src={imageUrl} alt="content" className="w-full h-full object-cover" />}
      </div>
      <div className="w-1/2 flex flex-col">
        <h2 className="font-merriweather font-bold text-4xl mb-8 text-black">{title}</h2>
        <p className="font-lato font-light text-2xl leading-relaxed text-black">{content}</p>
      </div>
    </section>
  );
}

export function ContentSlideImagesRow({ title, content, images }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-6xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-2xl mb-12 text-black">{content}</p>
      <div className="flex justify-between">
        {images.map((img, index) => (
          <div key={index} className="w-[30%] h-[300px] bg-gray-300 flex items-center justify-center">
            {img && <img src={img} alt={`content-${index}`} className="w-full h-full object-cover" />}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ContentSlideImageFull({ title, content, imageUrl }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex flex-col p-24">
      <h2 className="font-merriweather font-bold text-5xl mb-8 text-black">{title}</h2>
      <p className="font-lato font-light text-2xl mb-12 text-black">{content}</p>
      <div className="w-full h-[500px] bg-gray-300 flex items-center justify-center">
        {imageUrl && <img src={imageUrl} alt="content" className="w-full h-full object-cover" />}
      </div>
    </section>
  );
}

export function EndSlide({ message = "Thank You!", subtitle }) {
  return (
    <section className="w-[1280px] h-[720px] bg-white flex flex-col items-center justify-center text-center">
      <h1 className="font-merriweather font-bold text-6xl text-black mb-6 text-black">
        {message}
      </h1>

      {subtitle && (
        <p className="font-lato font-light text-2xl text-gray-600 text-black">
          {subtitle}
        </p>
      )}
    </section>
  );
}

const AcademicMinimal = { TitleSlide, 
                          ContentSlide, 
                          ImageSlide, 
                          ContentSlideText, 
                          ContentSlideTextLeftImageRight, 
                          ContentSlideTextRightImageLeft, 
                          ContentSlideImagesRow, 
                          ContentSlideImageFull, 
                          EndSlide };
export default AcademicMinimal;
