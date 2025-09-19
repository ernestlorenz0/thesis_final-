import React, { useEffect, useState } from 'react';

// Ultra-modern landing page with 3D elements, advanced animations, and contemporary design

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(147, 51, 234, 0.4); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34, 211, 238, 0.5); }
          50% { text-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(147, 51, 234, 0.6); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full blur-2xl animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Enhanced Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-400/50 rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-indigo-400/30 transform rotate-45 animate-spin" style={{ animationDuration: '12s', animationDelay: '0.5s' }} />
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-pink-400/50 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 right-10 w-8 h-1 bg-cyan-300/40 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-3/4 left-20 w-6 h-6 border-2 border-purple-400/30 rotate-45 animate-spin" style={{ animationDuration: '15s' }} />
        <div className="absolute top-10 right-1/4 w-3 h-8 bg-gradient-to-b from-blue-400/30 to-transparent animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Floating Icons */}
        <div className="absolute top-1/2 left-5 animate-float" style={{ animationDelay: '1s' }}>
          <svg className="w-6 h-6 text-cyan-300/40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: '4s' }}>
          <svg className="w-8 h-8 text-purple-300/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
        {/* Hero Section */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* 3D Logo/Icon */}
          <div className="mb-12 relative group">
            <div className="relative w-32 h-32 mx-auto mb-8 transform-gpu perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 animate-pulse" />
              <div className="absolute inset-2 bg-gradient-to-br from-white/90 to-white/70 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Heading with 3D Text Effect */}
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6 leading-tight animate-text-glow">
            <span className="inline-block transform hover:scale-105 transition-transform duration-300 drop-shadow-2xl">
              KENBILEARN
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-bold text-white/90 mb-8 leading-relaxed">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI-Powered Presentation Magic
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your PDFs into stunning, professional presentations with cutting-edge AI technology. 
            <span className="text-cyan-400 font-semibold"> Experience the future of content creation.</span>
          </p>

          {/* 3D Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a 
              href="/signup" 
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/25 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 animate-glow"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
            </a>
            
            <a 
              href="/demo" 
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30 hover:animate-glow"
            >
              <span className="relative z-10">Watch Demo</span>
              <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* 3D Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                icon: (
                  <svg className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ), 
                title: "Lightning Fast", 
                desc: "AI processes PDFs instantly", 
                color: "from-cyan-500 to-blue-600" 
              },
              { 
                icon: (
                  <svg className="w-12 h-12 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2M9 3h2a2 2 0 012 2v4l-2-2-2 2V5a2 2 0 012-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 003 3h1a2 2 0 002-2V7a2 2 0 00-2-2h-1a3 3 0 00-3 3v5z" />
                  </svg>
                ), 
                title: "Beautiful Design", 
                desc: "Professional slide templates", 
                color: "from-purple-500 to-pink-600" 
              },
              { 
                icon: (
                  <svg className="w-12 h-12 text-green-400 group-hover:text-green-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ), 
                title: "Secure & Private", 
                desc: "Your documents stay protected", 
                color: "from-green-500 to-teal-600" 
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl transform hover:scale-105 hover:rotate-1 transition-all duration-500 hover:bg-white/10 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 text-center">
                  <div className="mb-6 flex justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
      </div>
    </>
  );
};

export default LandingPage;
