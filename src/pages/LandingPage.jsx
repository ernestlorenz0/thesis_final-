import React, { useEffect, useState } from 'react';

// Modern STI College Dasmariñas themed landing page
// Color Palette: Primary Blue #003D7A, Accent Yellow #FFC72C, White/Off-White #FFFFFF/#F9F9F9, Dark Gray #2C2C2C, Light Gray #E5E5E5

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSticker, setHoveredSticker] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hover handlers for stickers
  const handleMouseEnter = (stickerId) => {
    setHoveredSticker(stickerId);
  };

  const handleMouseLeave = () => {
    setHoveredSticker(null);
  };

  return (
    <>
      {/* Modern CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 199, 44, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 199, 44, 0.6); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(-45deg, #003D7A, #FFC72C, #003D7A, #FFC72C);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .modern-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 61, 122, 0.1);
          box-shadow: 0 20px 40px rgba(0, 61, 122, 0.08);
        }
        .floating-element {
          animation: float 2.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(2deg); }
          50% { transform: translateY(-30px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-2deg); }
        }
        .rotate-slow {
          animation: rotate-fast 3s linear infinite;
        }
        @keyframes rotate-fast {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.05); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .pulse-scale {
          animation: pulse-scale-dynamic 1.8s ease-in-out infinite;
        }
        @keyframes pulse-scale-dynamic {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(5deg); }
          50% { transform: scale(1.4) rotate(0deg); }
          75% { transform: scale(1.2) rotate(-5deg); }
        }
        .swing {
          animation: swing-wild 2s ease-in-out infinite;
        }
        @keyframes swing-wild {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          15% { transform: rotate(12deg) translateY(-8px); }
          30% { transform: rotate(-8deg) translateY(-15px); }
          45% { transform: rotate(15deg) translateY(-5px); }
          60% { transform: rotate(-12deg) translateY(-20px); }
          75% { transform: rotate(8deg) translateY(-10px); }
        }
        .slide-horizontal {
          animation: slide-dynamic 2.2s ease-in-out infinite;
        }
        @keyframes slide-dynamic {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          20% { transform: translateX(15px) translateY(-10px) rotate(8deg); }
          40% { transform: translateX(30px) translateY(-5px) rotate(-5deg); }
          60% { transform: translateX(20px) translateY(-15px) rotate(10deg); }
          80% { transform: translateX(10px) translateY(-8px) rotate(-3deg); }
        }
        .bounce-crazy {
          animation: bounce-crazy 1.5s ease-in-out infinite;
        }
        @keyframes bounce-crazy {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          25% { transform: translateY(-25px) scale(1.1) rotate(10deg); }
          50% { transform: translateY(-40px) scale(1.2) rotate(0deg); }
          75% { transform: translateY(-20px) scale(1.1) rotate(-10deg); }
        }
        .glass-morphism {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
      
      {/* Modern Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(229, 229, 229, 0.3)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-xl" style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}>
                  <img src="/src/STI LOGOS/STI LOGO1.png" alt="STI College" className="h-10 w-auto" />
                </div>
                <div className="hidden lg:block">
                  <div className="text-2xl font-bold gradient-text">KenbiLearn</div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300" style={{ color: '#2C2C2C' }}>Features</a>
              <a href="#about" className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300" style={{ color: '#2C2C2C' }}>About</a>
              <a href="#contact" className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300" style={{ color: '#2C2C2C' }}>Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-sm font-semibold px-6 py-3 rounded-xl border hover:shadow-lg transition-all duration-300" style={{ color: '#003D7A', borderColor: '#E5E5E5', backgroundColor: 'white' }}>Login</a>
              <a href="/signup" className="px-6 py-3 text-sm font-bold text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#003D7A' }}>
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)' }}>
        {/* STI Animated Background with Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse top-10 -left-20" style={{ background: 'radial-gradient(circle, rgba(0, 61, 122, 0.1) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
          <div className="absolute w-80 h-80 rounded-full blur-2xl animate-bounce bottom-10 -right-20" style={{ background: 'radial-gradient(circle, rgba(255, 199, 44, 0.1) 0%, rgba(0, 61, 122, 0.05) 100%)' }} />
          
          {/* Small STI Decorative Boxes - Blue with Enhanced Movement */}
          <div className="absolute top-20 left-16 w-3 h-3 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.6, animationDuration: '8s' }} />
          <div className="absolute top-32 right-20 w-4 h-4 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-12 w-2 h-2 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/3 left-8 w-5 h-5 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.3, animationDelay: '3s' }} />
          <div className="absolute bottom-1/4 right-16 w-3 h-3 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDuration: '12s', animationDelay: '4s' }} />
          <div className="absolute top-2/3 left-20 w-4 h-4 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '5s' }} />
          <div className="absolute top-1/6 right-32 w-3 h-3 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.6, animationDuration: '9s', animationDelay: '6s' }} />
          <div className="absolute bottom-1/6 left-32 w-2 h-2 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '7s' }} />
          
          {/* Small STI Decorative Boxes - Yellow with Enhanced Movement */}
          <div className="absolute top-24 right-12 w-3 h-3 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.7, animationDuration: '9s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-32 right-8 w-2 h-2 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 right-24 w-4 h-4 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDuration: '11s', animationDelay: '2.5s' }} />
          <div className="absolute bottom-1/3 left-24 w-3 h-3 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.4, animationDelay: '3.5s' }} />
          <div className="absolute top-16 left-1/3 w-5 h-5 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDuration: '13s', animationDelay: '4.5s' }} />
          <div className="absolute bottom-16 right-1/3 w-2 h-2 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '5.5s' }} />
          <div className="absolute top-3/4 right-40 w-4 h-4 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.7, animationDuration: '10s', animationDelay: '6.5s' }} />
          <div className="absolute bottom-3/4 left-40 w-3 h-3 rotate-12 animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '7.5s' }} />
          
          {/* Circular Shapes - Blue with Floating Movement */}
          <div className="absolute top-40 left-6 w-4 h-4 rounded-full animate-bounce floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-3 h-3 rounded-full animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '2s' }} />
          <div className="absolute top-1/4 right-6 w-5 h-5 rounded-full animate-bounce floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.3, animationDelay: '3s' }} />
          <div className="absolute bottom-1/2 right-12 w-2 h-2 rounded-full animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.6, animationDelay: '4s' }} />
          <div className="absolute top-5/6 left-1/6 w-4 h-4 rounded-full animate-bounce floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '5s' }} />
          <div className="absolute bottom-5/6 right-1/6 w-3 h-3 rounded-full animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '6s' }} />
          
          {/* Circular Shapes - Yellow with Floating Movement */}
          <div className="absolute top-1/6 left-1/2 w-3 h-3 rounded-full animate-bounce floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/6 right-1/2 w-4 h-4 rounded-full animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '1.5s' }} />
          <div className="absolute top-3/4 left-10 w-2 h-2 rounded-full animate-bounce floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.4, animationDelay: '2.5s' }} />
          <div className="absolute bottom-1/5 left-1/3 w-5 h-5 rounded-full animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.7, animationDelay: '3.5s' }} />
          <div className="absolute top-1/8 right-1/8 w-3 h-3 rounded-full animate-bounce floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '4.5s' }} />
          <div className="absolute bottom-1/8 left-1/8 w-4 h-4 rounded-full animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '5.5s' }} />
          
          {/* Diamond Shapes - Blue with Enhanced Movement */}
          <div className="absolute top-1/5 right-1/4 w-3 h-3 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDuration: '15s' }} />
          <div className="absolute bottom-2/3 left-1/5 w-4 h-4 rotate-45 animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '2s' }} />
          <div className="absolute top-4/5 left-3/4 w-2 h-2 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.6, animationDuration: '16s', animationDelay: '3s' }} />
          <div className="absolute bottom-4/5 right-3/4 w-3 h-3 rotate-45 animate-pulse floating-element" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '4s' }} />
          
          {/* Diamond Shapes - Yellow with Enhanced Movement */}
          <div className="absolute top-5/6 right-1/5 w-2 h-2 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDuration: '14s', animationDelay: '1s' }} />
          <div className="absolute bottom-3/4 right-1/3 w-3 h-3 rotate-45 animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '3s' }} />
          <div className="absolute top-1/8 left-3/4 w-4 h-4 rotate-45 animate-spin floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.7, animationDuration: '17s', animationDelay: '5s' }} />
          <div className="absolute bottom-1/8 right-1/4 w-2 h-2 rotate-45 animate-pulse floating-element" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '7s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="gradient-text">Transform</span><br />
                <span style={{ color: '#003D7A' }}>Your PDFs into</span><br />
                <span style={{ color: '#2C2C2C' }}>Stunning Slides</span>
              </h1>
              <p className="text-xl mb-10 leading-relaxed" style={{ color: '#2C2C2C' }}>
                Experience the future of presentation creation with KenbiLearn's advanced AI technology. 
                Convert any PDF into professional, engaging presentations in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="/signup" className="px-10 py-5 text-lg font-bold text-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 floating-element" style={{ backgroundColor: '#003D7A', boxShadow: '0 20px 40px rgba(0, 61, 122, 0.3)' }}>
                  <span className="flex items-center justify-center space-x-2">
                    <span>Start Creating Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <a href="/demo" className="px-10 py-5 text-lg font-semibold rounded-2xl border-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300 modern-card" style={{ color: '#003D7A', borderColor: '#003D7A', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Watch Demo</span>
                  </span>
                </a>
              </div>
            </div>
            
            {/* Right Content - Animated STI Logos & Stickers */}
            <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'} relative`}>
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* STI LOGO1 - Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 floating-element" style={{ animationDelay: '0s' }}>
                  <img src="/src/STI LOGOS/STI LOGO1.png" alt="STI College Dasmariñas - KenbiLearn AI Platform" className="w-48 h-auto object-contain hover:scale-110 transition-transform duration-300" />
                </div>
                
                {/* Sticker 1 - Top Left Corner */}
                <div className="absolute top-4 left-4 rotate-slow" style={{ animationDelay: '0.2s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker1.png" 
                    alt="STI Innovation Badge" 
                    className="w-12 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 2 - Top Right Corner */}
                <div className="absolute top-8 right-4 pulse-scale" style={{ animationDelay: '0.4s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker2.png" 
                    alt="STI Excellence Seal" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 3 - Left Side */}
                <div className="absolute top-16 left-2 swing" style={{ animationDelay: '0.6s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker3.png" 
                    alt="STI Technology Symbol" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 4 - Right Side */}
                <div className="absolute top-20 right-2 slide-horizontal" style={{ animationDelay: '0.8s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker4.png" 
                    alt="STI Achievement Award" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 5 - Bottom Left */}
                <div className="absolute bottom-8 left-8 bounce-crazy" style={{ animationDelay: '1s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker5.png" 
                    alt="STI Leadership Emblem" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 6 - Bottom Right */}
                <div className="absolute bottom-4 right-8 floating-element" style={{ animationDelay: '1.2s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker6.png" 
                    alt="STI Quality Assurance" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 8 - Middle Left */}
                <div className="absolute top-32 left-6 bounce-crazy" style={{ animationDelay: '1.4s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker8.png" 
                    alt="STI Digital Learning" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 9 - Middle Right */}
                <div className="absolute top-36 right-6 pulse-scale" style={{ animationDelay: '1.6s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker9.png" 
                    alt="STI Future Ready" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 10 - Bottom Center Left */}
                <div className="absolute bottom-16 left-16 swing" style={{ animationDelay: '1.8s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker10.png" 
                    alt="STI PDF Processing" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />
                </div>
                
                {/* Sticker 11 - Top Center Right */}
                <div className="absolute top-12 right-16 rotate-slow" style={{ animationDelay: '2s' }}>
                  <img 
                    src="/src/STI LOGOS/sticker11.png" 
                    alt="STI AI Technology" 
                    className="w-11 h-auto object-contain opacity-100" 
                  />   
                </div>
     
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" className="py-24 relative" style={{ backgroundColor: '#F9F9F9' }}>
        {/* Background Tech Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Cloud Icon */}
          <div className="absolute top-16 left-12 animate-bounce opacity-30" style={{ animationDelay: '1s', animationDuration: '6s' }}>
            <svg className="w-10 h-10" fill="#FFC72C" viewBox="0 0 24 24">
              <path d="M19.35,10.04A7.49,7.49 0 0,0 12,4C9.11,4 6.6,5.64 5.35,8.04A5.994,5.994 0 0,0 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 19.35,10.04M19,18H6A4,4 0 0,1 6,10H6.71C7.37,7.69 9.48,6 12,6A5.5,5.5 0 0,1 17.5,11.5V12H19A3,3 0 0,1 19,18Z"/>
            </svg>
          </div>
          
          {/* Lightning/Speed Icon */}
          <div className="absolute top-20 right-16 animate-bounce opacity-25" style={{ animationDelay: '2s', animationDuration: '5s' }}>
            <svg className="w-8 h-8" fill="#003D7A" viewBox="0 0 24 24">
              <path d="M11,4H13V16L18.5,12L20,13.5L12,21.5L4,13.5L5.5,12L11,16V4Z"/>
            </svg>
          </div>
          
          {/* Network/Connection Icon */}
          <div className="absolute bottom-16 left-20 animate-bounce opacity-35" style={{ animationDelay: '3s', animationDuration: '4s' }}>
            <svg className="w-9 h-9" fill="#FFC72C" viewBox="0 0 24 24">
              <path d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V7H9V9A4,4 0 0,1 13,13V15L15,13V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V13A4,4 0 0,1 13,9V7H21M13,20A2,2 0 0,1 15,22A2,2 0 0,1 13,24A2,2 0 0,1 11,22A2,2 0 0,1 13,20Z"/>
            </svg>
          </div>
          
          {/* Robot/AI Icon */}
          <div className="absolute bottom-20 right-24 animate-bounce opacity-40" style={{ animationDelay: '4s', animationDuration: '7s' }}>
            <svg className="w-7 h-7" fill="#003D7A" viewBox="0 0 24 24">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
            </svg>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(0, 61, 122, 0.1)', border: '1px solid rgba(0, 61, 122, 0.2)' }}>
              <svg className="w-5 h-5 mr-2" fill="#FFC72C" viewBox="0 0 24 24">
                <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#003D7A' }}>AI-Powered Features</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-8 leading-tight" style={{ color: '#003D7A' }}>
              Why Choose <span className="gradient-text">KenbiLearn</span>?
            </h2>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#2C2C2C' }}>
              Experience the power of AI-driven presentation creation with features designed for modern educators and professionals.
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 rounded-full" style={{ backgroundColor: '#FFC72C' }}></div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast Processing",
                description: "Transform your PDFs into beautiful presentations in under 30 seconds with our advanced AI technology.",
                color: "#FFC72C",
                bgGradient: "linear-gradient(135deg, rgba(255, 199, 44, 0.1), rgba(255, 199, 44, 0.05))"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2M9 3h2a2 2 0 012 2v4l-2-2-2 2V5a2 2 0 012-2z" />
                  </svg>
                ),
                title: "Beautiful Templates",
                description: "Choose from 20+ professionally designed themes that adapt to your content automatically.",
                color: "#003D7A",
                bgGradient: "linear-gradient(135deg, rgba(0, 61, 122, 0.1), rgba(0, 61, 122, 0.05))"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Secure & Private",
                description: "Your documents are processed securely and never stored on our servers. Complete privacy guaranteed.",
                color: "#FFC72C",
                bgGradient: "linear-gradient(135deg, rgba(255, 199, 44, 0.1), rgba(255, 199, 44, 0.05))"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`group relative ${isVisible ? 'animate-fadeInUp' : 'opacity-0'} transition-all duration-700 hover:scale-105 floating-element`} 
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Background Card */}
                <div 
                  className="relative p-10 rounded-3xl shadow-2xl border border-opacity-20 overflow-hidden"
                  style={{ 
                    background: feature.bgGradient,
                    borderColor: feature.color,
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform rotate-12 translate-x-8 -translate-y-8">
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: feature.color }}></div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5 transform -rotate-12 -translate-x-4 translate-y-4">
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: feature.color }}></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon Container */}
                    <div className="mb-8 flex justify-center">
                      <div 
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                        style={{ backgroundColor: feature.color }}
                      >
                        <div style={{ color: feature.color === '#FFC72C' ? '#003D7A' : 'white' }}>
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300" style={{ color: '#003D7A' }}>
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg leading-relaxed mb-8" style={{ color: '#2C2C2C' }}>
                      {feature.description}
                    </p>
                    
                    {/* Bottom Accent */}
                    <div className="flex justify-center">
                      <div className="flex space-x-2">
                        <div className="w-8 h-1 rounded-full transition-all duration-300 group-hover:w-12" style={{ backgroundColor: feature.color }}></div>
                        <div className="w-2 h-1 rounded-full opacity-50" style={{ backgroundColor: feature.color }}></div>
                        <div className="w-2 h-1 rounded-full opacity-25" style={{ backgroundColor: feature.color }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ backgroundColor: feature.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-24 relative" style={{ backgroundColor: 'white' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8" style={{ color: '#003D7A' }}>
            About KenbiLearn
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed mb-12" style={{ color: '#2C2C2C' }}>
            KenbiLearn is an innovative AI-powered presentation generator designed specifically for educators and professionals at STI College Dasmariñas. Our platform transforms your PDF documents into stunning, interactive presentations in seconds, helping you create engaging content that captivates your audience.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC72C' }}>
                <svg className="w-8 h-8" fill="#003D7A" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#003D7A' }}>Excellence</h3>
              <p style={{ color: '#2C2C2C' }}>Committed to delivering the highest quality presentations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#003D7A' }}>
                <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#003D7A' }}>Innovation</h3>
              <p style={{ color: '#2C2C2C' }}>Leveraging cutting-edge AI technology for education</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC72C' }}>
                <svg className="w-8 h-8" fill="#003D7A" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2 1l-3 4v2h2l2.54-3.4L16.5 18H20z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#003D7A' }}>Support</h3>
              <p style={{ color: '#2C2C2C' }}>Dedicated to helping educators succeed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8" style={{ color: '#003D7A' }}>
            Get In Touch
          </h2>
          <p className="text-xl mb-12" style={{ color: '#2C2C2C' }}>
            Have questions about KenbiLearn? We're here to help you transform your presentations.
          </p>
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#003D7A' }}>
                <svg className="w-8 h-8" fill="white" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#003D7A' }}>Email Support</h3>
              <p className="text-lg" style={{ color: '#2C2C2C' }}>support@kenbilearn.com</p>
              <p style={{ color: '#2C2C2C' }}>We'll respond within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFC72C' }}>
                <svg className="w-8 h-8" fill="#003D7A" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#003D7A' }}>Visit Us</h3>
              <p className="text-lg" style={{ color: '#2C2C2C' }}>STI College Dasmariñas</p>
              <p style={{ color: '#2C2C2C' }}>Dasmariñas, Cavite, Philippines</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 50%, #F9F9F9 100%)' }}>
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-5 animate-pulse" style={{ background: 'linear-gradient(45deg, #003D7A, #FFC72C)' }}></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-5 animate-pulse" style={{ background: 'linear-gradient(45deg, #FFC72C, #003D7A)', animationDelay: '1s' }}></div>
          
          {/* Floating Tech Icons */}
          <div className="absolute top-20 right-20 animate-bounce opacity-20" style={{ animationDelay: '2s', animationDuration: '6s' }}>
            <svg className="w-12 h-12" fill="#FFC72C" viewBox="0 0 24 24">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
            </svg>
          </div>
          <div className="absolute bottom-32 left-16 animate-bounce opacity-15" style={{ animationDelay: '3s', animationDuration: '5s' }}>
            <svg className="w-10 h-10" fill="#003D7A" viewBox="0 0 24 24">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 2v1h8v-1l-2-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"/>
              <path d="M9 8l5 3-5 3z"/>
            </svg>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full mb-8" style={{ backgroundColor: 'rgba(0, 61, 122, 0.1)', border: '1px solid rgba(0, 61, 122, 0.2)' }}>
              <svg className="w-6 h-6 mr-3" fill="#FFC72C" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-lg font-bold" style={{ color: '#003D7A' }}>Ready to Get Started?</span>
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-black mb-8 leading-tight" style={{ color: '#003D7A' }}>
              Transform Your <span className="gradient-text">Presentations</span> Today
            </h2>
            
            <p className="text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed mb-4" style={{ color: '#2C2C2C' }}>
              Join thousands of educators and professionals creating stunning presentations
            </p>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#2C2C2C', opacity: 0.8 }}>
              Start your free trial today - no credit card required
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
            <a 
              href="/signup" 
              className="group relative px-16 py-6 text-2xl font-bold text-white rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 floating-element"
              style={{ backgroundColor: '#003D7A', boxShadow: '0 30px 60px rgba(0, 61, 122, 0.4)' }}
            >
              <span className="flex items-center justify-center space-x-4">
                <span>Start Creating Now - Free</span>
                <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: '#FFC72C' }}></div>
            </a>
            
            <a 
              href="/demo" 
              className="group relative px-16 py-6 text-2xl font-semibold rounded-3xl border-3 hover:shadow-2xl transform hover:scale-110 transition-all duration-500"
              style={{ 
                color: '#003D7A', 
                borderColor: '#003D7A', 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <span className="flex items-center justify-center space-x-4">
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>See It In Action</span>
              </span>
              {/* Hover background */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: '#FFC72C' }}></div>
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "5,000+", label: "PDFs Processed", icon: "📂" },
              { number: "20x", label: "Faster Than Manual Work", icon: "🚀" },
              { number: "97%", label: "Accuracy in Summaries", icon: "🎯" },
              { number: "30s", label: "Average Conversion Time", icon: "⏱️" }
            ].map((stat, index) => (
              <div key={index} className="text-center floating-element" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-black mb-2" style={{ color: '#003D7A' }}>{stat.number}</div>
                <div className="text-sm font-medium" style={{ color: '#2C2C2C' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STI Themed Footer */}
      <footer className="py-12" style={{ backgroundColor: '#003D7A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <img src="/src/STI LOGOS/STI LOGO1.png" alt="STI College" className="h-12 w-auto" />
              <div>
                <h3 className="text-white font-bold text-lg">STI College Dasmariñas</h3>
                <p className="text-gray-300 text-sm">Empowering Future Leaders</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-300">Features</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-600 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 KenbiLearn - STI College Dasmariñas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
