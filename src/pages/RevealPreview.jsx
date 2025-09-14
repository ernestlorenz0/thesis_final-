import React, { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import * as ClassicClassroom from '../themes/ClassicClassroom';
import * as STEMModern from '../themes/STEMModern';
import * as PlayfulPrimary from '../themes/PlayfulPrimary';
import * as AcademicMinimal from '../themes/AcademicMinimal';
import * as ScholarlyElegant from '../themes/ScholarlyElegant';
import * as DigitalChalkboard from '../themes/DigitalChalkboard';
import * as ScienceSpectrum from '../themes/ScienceSpectrum';
import * as HistoryHeritage from '../themes/HistoryHeritage';
import * as ArtStudio from '../themes/ArtStudio';
import * as MathMatrix from '../themes/MathMatrix';
import * as LanguageLab from '../themes/LanguageLab';
import * as TechTrends from '../themes/TechTrends';
import * as ResearchReady from '../themes/ResearchReady';
import * as CreativeCanvas from '../themes/CreativeCanvas';
import * as YouthfulYellow from '../themes/YouthfulYellow';
import * as CalmCyan from '../themes/CalmCyan';
import * as ScholarGreen from '../themes/ScholarGreen';
import * as VibrantViolet from '../themes/VibrantViolet';
import * as OrangeOrbit from '../themes/OrangeOrbit';
import * as BlueHorizon from '../themes/BlueHorizon';

const themeComponents = {
  'Classic Classroom': ClassicClassroom,
  'STEM Modern': STEMModern,
  'Playful Primary': PlayfulPrimary,
  'Academic Minimal': AcademicMinimal,
  'Scholarly Elegant': ScholarlyElegant,
  'Digital Chalkboard': DigitalChalkboard,
  'Science Spectrum': ScienceSpectrum,
  'History Heritage': HistoryHeritage,
  'Art Studio': ArtStudio,
  'Math Matrix': MathMatrix,
  'Language Lab': LanguageLab,
  'Tech Trends': TechTrends,
  'Research Ready': ResearchReady,
  'Creative Canvas': CreativeCanvas,
  'Youthful Yellow': YouthfulYellow,
  'Calm Cyan': CalmCyan,
  'Scholar Green': ScholarGreen,
  'Vibrant Violet': VibrantViolet,
  'Orange Orbit': OrangeOrbit,
  'Blue Horizon': BlueHorizon,
};

export default function RevealPreview({ slides, selectedTemplate = 'ClassicClassroom', onClose }) {
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

  // Convert slides data to Reveal.js HTML using selected theme
  const Theme = themeComponents[selectedTemplate] || ClassicClassroom;
  const renderSlides = () => (
    <div className="reveal">
      <div className="slides">
        {slides.map((slide, idx) => (
          <section key={slide.id} data-transition="fade" data-auto-animate>
            {slide.components.length === 1 ? (
              (() => {
                const comp = slide.components[0];
                if (comp.type === 'title') return <Theme.TitleSlide title={comp.content} subtitle={''} />;
                if (comp.type === 'image') return <Theme.ImageSlide title={''} imageUrl={comp.content} />;
                if (comp.type === 'paragraph') return <Theme.ContentSlide title={''} content={comp.content} />;
                if (comp.type === 'toc') {
                  const tocItems = slide.components.filter(c => c.type === 'toc_item').map(c => c.content);
                  return <Theme.TOCSlide title={comp.content} items={tocItems} />;
                }
                return null;
              })()
            ) : (
              <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                {slide.components.map((comp, cidx) => {
                  if (comp.type === 'title') return <Theme.TitleSlide key={cidx} title={comp.content} subtitle={''} />;
                  if (comp.type === 'image') return <Theme.ImageSlide key={cidx} title={''} imageUrl={comp.content} />;
                  if (comp.type === 'paragraph') return <Theme.ContentSlide key={cidx} title={''} content={comp.content} />;
                  if (comp.type === 'toc') {
                    const tocItems = slide.components.filter(c => c.type === 'toc_item').map(c => c.content);
                    return <Theme.TOCSlide key={cidx} title={comp.content} items={tocItems} />;
                  }
                  return null;
                })}
              </div>
            )}
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
