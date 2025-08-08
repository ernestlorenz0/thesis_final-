import React, { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';

export default function RevealPreview({ slides, onClose }) {
  const deckRef = useRef();

  useEffect(() => {
    if (deckRef.current) {
      // Clean up any previous deck
      if (window.Reveal && window.Reveal.isReady()) {
        window.Reveal.destroy();
      }
      // Initialize Reveal.js
      window.Reveal = Reveal;
      Reveal.initialize({
        embedded: true,
        controls: true,
        progress: true,
        center: true,
        width: 960,
        height: 700,
        slideNumber: true,
        hash: false,
      });
    }
    // Clean up on unmount
    return () => {
      if (window.Reveal && window.Reveal.isReady()) {
        window.Reveal.destroy();
      }
    };
  }, [slides]);

  // Convert slides data to Reveal.js HTML
  const renderSlides = () => (
    <div className="reveal">
      <div className="slides">
        {slides.map((slide, idx) => (
          <section key={slide.id}>
            {slide.components.map((comp, cidx) => {
              if (comp.type === 'title') return <h2 key={cidx} style={{color:'#6D28D9'}}>{comp.content}</h2>;
              if (comp.type === 'paragraph') return <p key={cidx} style={{fontSize:'1.3em'}}>{comp.content}</p>;
              if (comp.type === 'image' && comp.content) return <img key={cidx} src={comp.content} alt="slide" style={{maxHeight:300, margin:'20px 0'}}/>;
              return null;
            })}
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl w-full h-[90vh] overflow-auto relative">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Preview</h2>
        <button className="absolute top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        <div ref={deckRef} className="h-full">
          {renderSlides()}
        </div>
      </div>
    </div>
  );
}
