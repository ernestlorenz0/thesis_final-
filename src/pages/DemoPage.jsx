import React, { useState, useEffect } from 'react';

const DemoPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse top-10 -left-20" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-2xl animate-bounce bottom-10 -right-20" />
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-indigo-400/30 transform rotate-45 animate-spin" style={{ animationDuration: '12s', animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - Branding */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-white relative">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* 3D Logo */}
            <div className="mb-12 relative group">
              <div className="relative w-32 h-32 mx-auto transform-gpu perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 animate-pulse" />
                <div className="absolute inset-2 bg-gradient-to-br from-white/90 to-white/70 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 text-center">
              KENBILEARN
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-white/90 mb-6 text-center">
              See It In Action!
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-md leading-relaxed">
              Watch how our AI transforms PDFs into 
              <span className="text-cyan-400 font-semibold"> beautiful presentations</span> in seconds
            </p>
          </div>
        </div>

        {/* Right Side - Video Demo */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className={`w-full max-w-2xl transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* 3D Video Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Product Demo</h3>
                  <p className="text-gray-300">Experience the magic of AI-powered presentations</p>
                </div>

                {/* Video Placeholder */}
                <div className="relative aspect-video bg-black/20 rounded-2xl border border-white/10 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Video Placeholder Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="mb-6">
                      <svg className="w-20 h-20 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-2">Demo Video Coming Soon</h4>
                    <p className="text-gray-400 text-center max-w-md">
                      Upload your demo video here to showcase KENBILEARN's AI-powered PDF to presentation conversion
                    </p>
                    
                    {/* Play Button Placeholder */}
                    <div className="mt-6 w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Demo Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: "⚡", title: "Instant", desc: "PDF upload to slides" },
                    { icon: "🎨", title: "Beautiful", desc: "Professional templates" },
                    { icon: "🤖", title: "AI-Powered", desc: "Smart content extraction" }
                  ].map((feature, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h5 className="text-white font-semibold text-sm mb-1">{feature.title}</h5>
                      <p className="text-gray-400 text-xs">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a 
                    href="/signup" 
                    className="flex-1 relative group py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 text-center"
                  >
                    <span className="relative z-10">Get Started Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                  </a>
                  
                  <a 
                    href="/" 
                    className="flex-1 relative group py-3 px-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl shadow-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 text-center"
                  >
                    <span className="relative z-10">Back to Landing Page</span>
                    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
