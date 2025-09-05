import React from 'react';
import { themeComponents } from '../utils/themes';

// Custom thumbnail renderer that recreates the first slide of each template
const renderThumbnail = (themeName) => {
  const thumbnails = {
    'Classic Classroom': (
      <div className="w-full h-full bg-[#0D3B36] flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Simplified swirl lines */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-white opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-white opacity-30"></div>
        <div className="relative z-10">
          <div className="text-xs font-bold mb-1">Classic Classroom</div>
          <div className="text-xs text-teal-300">Professional Design</div>
        </div>
      </div>
    ),
    'Orange Orbit': (
      <div className="w-full h-full bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-400 flex items-center justify-center text-center relative overflow-hidden">
        {/* Concentric circles */}
        <div className="absolute w-8 h-8 border border-white/20 rounded-full"></div>
        <div className="absolute w-6 h-6 border border-white/30 rounded-full"></div>
        <div className="absolute w-4 h-4 border border-white/40 rounded-full"></div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-white mb-1">Orange Orbit</div>
          <div className="text-xs text-orange-100">Dynamic Circles</div>
        </div>
      </div>
    ),
    'Academic Minimal': (
      <div className="w-full h-full bg-white flex items-center justify-center text-center border border-gray-200">
        <div className="flex w-[80%] h-[80%] items-center justify-between">
          <div className="w-[40%] h-[70%] bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Image</span>
          </div>
          <div className="w-[50%] flex flex-col justify-center pl-2">
            <div className="text-xs font-bold text-black mb-1">Academic Minimal</div>
            <div className="text-xs text-gray-600">Clean Design</div>
          </div>
        </div>
      </div>
    ),
    'STEM Modern': (
      <div className="w-full h-full bg-gradient-to-br from-[#0a192f] to-[#112d4e] flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Accent glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#00f6ff20,transparent)]"></div>
        <div className="relative z-10">
          <div className="text-xs font-mono font-bold mb-1">STEM Modern</div>
          <div className="text-xs font-mono opacity-90">Tech Gradient</div>
        </div>
      </div>
    ),
    'Playful Primary': (
      <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-pink-300 flex items-center justify-center text-center relative overflow-hidden">
        {/* Background playful shapes */}
        <div className="absolute w-8 h-8 bg-yellow-400 rounded-full opacity-30 -top-1 -left-1"></div>
        <div className="absolute w-6 h-6 bg-pink-400 rounded-full opacity-30 bottom-1 left-4"></div>
        <div className="absolute w-7 h-7 bg-blue-400 rotate-12 opacity-30 -bottom-2 right-1"></div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-gray-800 mb-1">Playful Primary</div>
          <div className="text-xs text-gray-700">Colorful Shapes</div>
        </div>
      </div>
    ),
    'Scholarly Elegant': (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-center relative">
        <div className="flex w-[80%] h-[80%] items-center justify-between">
          <div className="w-[40%] flex flex-col justify-center">
            <div className="text-xs font-serif font-bold text-gray-900 mb-1">Scholarly Elegant</div>
            <div className="text-xs font-serif italic text-gray-700">Academic Style</div>
          </div>
          <div className="w-[2px] h-8 bg-yellow-600"></div>
          <div className="w-[40%] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-yellow-600 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    ),
    'Digital Chalkboard': (
      <div className="w-full h-full bg-[#1b1b1b] flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Chalk smudge border */}
        <div className="absolute inset-1 border-2 border-green-400/60 rounded opacity-50"></div>
        {/* Chalk doodles */}
        <div className="absolute top-1 left-2 text-pink-400/70 text-xs">✏️</div>
        <div className="absolute bottom-1 right-2 text-yellow-300/70 text-xs">★</div>
        <div className="absolute top-1/3 left-1/4 text-cyan-300/60 text-sm">+</div>
        <div className="relative z-10">
          <div className="text-xs font-mono font-bold text-green-200 mb-1">Digital Chalkboard</div>
          <div className="text-xs font-mono text-gray-200">Chalk Style</div>
        </div>
      </div>
    ),
    'Science Spectrum': (
      <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Floating science icons */}
        <div className="absolute top-1 left-1 text-xs opacity-40">⚛️</div>
        <div className="absolute bottom-1 right-1 text-xs opacity-40">🧬</div>
        <div className="absolute top-1/3 right-1/4 text-sm opacity-30">🧪</div>
        <div className="relative z-10">
          <div className="text-xs font-bold mb-1">Science Spectrum</div>
          <div className="text-xs opacity-90">Colorful Science</div>
        </div>
      </div>
    ),
    'History Heritage': (
      <div className="w-full h-full bg-[#FFF8E1] flex items-center justify-center text-center relative">
        <div className="absolute top-1 left-1 w-6 h-0.5 bg-[#BCA678]"></div>
        <div className="text-xs font-bold text-[#BCA678]">History Heritage</div>
      </div>
    ),
    'Art Studio': (
      <div className="w-full h-full bg-[#F8BBD0] flex items-center justify-center text-center relative">
        <div className="absolute top-1 left-1 w-4 h-4 bg-[#6A1B9A] rounded-full"></div>
        <div className="text-xs font-bold text-[#6A1B9A]">Art Studio</div>
      </div>
    ),
    'Math Matrix': (
      <div className="w-full h-full bg-black flex items-center justify-center text-center text-green-400 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
        <div className="relative z-10">
          <div className="text-xs font-mono font-bold mb-1">Math Matrix</div>
          <div className="text-xs font-mono opacity-80">Digital Grid</div>
        </div>
      </div>
    ),
    'Language Lab': (
      <div className="w-full h-full bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Speech bubble icons */}
        <div className="absolute top-1 left-2 text-xs opacity-30">💬</div>
        <div className="absolute bottom-1 right-2 text-xs opacity-20">🌐</div>
        <div className="absolute top-1/2 left-1/4 text-xs opacity-30">📝</div>
        <div className="relative z-10">
          <div className="text-xs font-bold mb-1">Language Lab</div>
          <div className="text-xs opacity-90">Communication</div>
        </div>
      </div>
    ),
    'Tech Trends': (
      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center text-center text-white relative overflow-hidden">
        {/* Tech grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f_1px,transparent_1px),linear-gradient(to_bottom,#00f_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
        {/* Floating icons */}
        <div className="absolute top-1 left-2 text-xs text-blue-400 opacity-30">🤖</div>
        <div className="absolute bottom-1 right-2 text-xs text-purple-400 opacity-20">💻</div>
        <div className="relative z-10">
          <div className="text-xs font-bold mb-1">Tech Trends</div>
          <div className="text-xs opacity-80">Futuristic</div>
        </div>
      </div>
    ),
    'Research Ready': (
      <div className="w-full h-full bg-white flex items-center justify-center text-center relative">
        {/* Top accent bar */}
        <div className="absolute top-0 w-full h-1 bg-blue-900"></div>
        {/* Bottom bar */}
        <div className="absolute bottom-0 w-full h-1 bg-gray-200"></div>
        <div className="relative z-10">
          <div className="text-xs font-serif font-bold text-gray-900 mb-1">Research Ready</div>
          <div className="text-xs font-sans text-gray-700">Professional</div>
        </div>
      </div>
    ),
    'Creative Canvas': (
      <div className="w-full h-full bg-gradient-to-tr from-pink-200 via-yellow-200 to-cyan-200 flex items-center justify-center text-center relative overflow-hidden">
        {/* Diagonal color overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-300/50 to-transparent -skew-y-6"></div>
        {/* Floating title block */}
        <div className="relative z-10 bg-white/80 backdrop-blur-md px-2 py-1 rounded border border-pink-400 rotate-1">
          <div className="text-xs font-serif font-bold text-gray-900 mb-1">Creative Canvas</div>
          <div className="text-xs font-light italic text-gray-700">Artistic</div>
        </div>
      </div>
    ),
    'Youthful Yellow': (
      <div className="w-full h-full bg-gradient-to-tr from-yellow-300 via-orange-200 to-yellow-100 flex items-center justify-center text-center relative overflow-hidden">
        {/* Decorative rays */}
        <div className="absolute inset-0 flex justify-center items-center">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[30px] bg-yellow-500/40 origin-bottom"
              style={{ transform: `rotate(${i * 45}deg)` }}
            ></div>
          ))}
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-yellow-900 mb-1">Youthful Yellow</div>
          <div className="text-xs text-yellow-800 opacity-90">Energetic</div>
        </div>
      </div>
    ),
    'Calm Cyan': (
      <div className="w-full h-full bg-white flex items-center justify-center text-center relative overflow-hidden">
        {/* Big circle */}
        <div className="absolute right-0 bottom-0 w-16 h-16 bg-cyan-200 rounded-full opacity-60"></div>
        {/* Small navy circle */}
        <div className="absolute top-1 right-4 w-2 h-2 bg-cyan-600 rounded-full"></div>
        {/* Peach corner shape */}
        <div className="absolute bottom-0 left-0 w-8 h-8 bg-orange-200 rounded-sm"></div>
        <div className="relative z-10 ml-2">
          <div className="text-xs font-bold text-gray-800 mb-1">Calm Cyan</div>
          <div className="text-xs text-gray-600">Minimal</div>
        </div>
      </div>
    ),
    'Scholar Green': (
      <div className="w-full h-full bg-gradient-to-br from-green-900 to-emerald-700 flex items-center justify-center text-center text-green-100 relative">
        <div className="relative z-10">
          <div className="text-xs font-serif font-bold mb-1">Scholar Green</div>
          <div className="h-[1px] w-8 bg-green-400 rounded-full mb-1 mx-auto"></div>
          <div className="text-xs font-light italic text-green-200">Academic</div>
        </div>
      </div>
    ),
    'Vibrant Violet': (
      <div className="w-full h-full bg-gradient-to-tr from-purple-800 via-fuchsia-600 to-violet-500 flex items-center justify-center text-center relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-[-20px] left-[-30px] w-16 h-16 bg-fuchsia-400 rounded-full blur-xl opacity-40"></div>
        <div className="absolute bottom-[-20px] right-[-30px] w-20 h-20 bg-purple-300 rounded-full blur-xl opacity-40"></div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-white mb-1">Vibrant Violet</div>
          <div className="text-xs text-purple-100 italic">Dynamic</div>
        </div>
      </div>
    ),
    'Blue Horizon': (
      <div className="w-full h-full bg-[#2b6cb0] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-8 h-8 bg-[#f6ad55] rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#3182ce] rotate-45 translate-x-1/2 translate-y-1/2"></div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-white mb-1">Blue Horizon</div>
          <div className="text-xs text-white opacity-90">Serene</div>
        </div>
      </div>
    )
  };

  return thumbnails[themeName] || (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-center">
      <div className="text-xs text-gray-600">No Preview</div>
    </div>
  );
};

export default function TemplateThumbnail({ themeName, onClick }) {
  return (
    <button
      className="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#8C6BFA] transition-all duration-200 flex flex-col shadow-md hover:shadow-lg"
      onClick={onClick}
      style={{ 
        width: '220px', 
        height: '140px',
        marginTop: '2px',
        marginBottom: '2px',
        marginLeft: '2px',
        marginRight: '2px'
      }}
    >
      <div className="w-full h-full relative">
        {renderThumbnail(themeName)}
      </div>
    </button>
  );
}
