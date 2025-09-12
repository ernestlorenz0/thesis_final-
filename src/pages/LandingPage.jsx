import React from 'react';

// Modern landing page with Tailwind CSS and animation


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 flex flex-col items-center justify-center text-center">
      <div className="w-full flex flex-col justify-center items-center px-4 py-12 animate-fade-in">

        <div className="mb-8 animate-fade-in-slow">
          <img src="/images/hero-illustration.svg" alt="AI Presentation" className="max-w-xs mx-auto drop-shadow-xl rounded-xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-slide-up">
          Modern AI-Powered Slides
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-7 max-w-lg mx-auto animate-slide-up delay-100">
          Instantly convert your PDFs into beautiful, professional presentations. Trusted by students, teachers, and professionals.
        </p>
        <div className="flex gap-5 justify-center mb-8 animate-fade-in delay-200">
          <a href="/signup" className="min-w-[160px] px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-short">
            Get Started
          </a>
          <a href="#" className="min-w-[160px] px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-700 transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-white/60">
            Learn More
          </a>
        </div>
        <div className="flex gap-8 mt-4 justify-center animate-fade-in delay-300">
          <div className="text-center">
            <span className="font-bold text-white">Trust</span>
            <div className="text-base text-white/90">Secure & reliable</div>
          </div>
          <div className="text-center">
            <span className="font-bold text-white">Speed</span>
            <div className="text-base text-white/70">Slides in seconds</div>
          </div>
          <div className="text-center">
            <span className="font-bold text-white">Simplicity</span>
            <div className="text-base text-white/70">Just upload & go</div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8">
        {/* Optionally add testimonials, features, or a live demo preview here */}
      </div>
    </div>
  );
};

export default LandingPage;
