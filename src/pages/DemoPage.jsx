import React, { useState, useEffect } from 'react';

const DemoPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)' }}>
      {/* STI Themed Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse top-10 -left-20" style={{ background: 'radial-gradient(circle, rgba(0, 61, 122, 0.1) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
        <div className="absolute w-80 h-80 rounded-full blur-2xl animate-bounce bottom-10 -right-20" style={{ background: 'radial-gradient(circle, rgba(255, 199, 44, 0.1) 0%, rgba(0, 61, 122, 0.05) 100%)' }} />
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.5 }} />
        <div className="absolute top-1/3 right-1/3 w-5 h-5 transform rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.3, animationDuration: '12s', animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
        {/* STI Left Side - Branding */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 relative">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* STI 3D Logo */}
            <div className="mb-12 relative group">
              <div className="relative w-32 h-32 mx-auto transform-gpu perspective-1000">
                <div className="absolute inset-0 rounded-3xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" style={{ backgroundColor: '#003D7A' }} />
                <div className="absolute inset-2 bg-gradient-to-br from-white/90 to-white/70 rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500">
                  <img src="/src/STI LOGOS/STI LOGO1.png" alt="STI College" className="w-16 h-16 object-contain" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black mb-4 text-center" style={{ 
              background: 'linear-gradient(-45deg, #003D7A, #FFC72C, #003D7A, #FFC72C)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 3s ease infinite',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              KENBILEARN
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold mb-6 text-center" style={{ color: '#003D7A' }}>
              See It In Action!
            </h2>
            <p className="text-lg text-center max-w-md leading-relaxed" style={{ color: '#2C2C2C' }}>
              Watch how our AI transforms PDFs into 
              <span className="font-semibold" style={{ color: '#003D7A' }}> beautiful presentations</span> in seconds
            </p>
          </div>
        </div>

        {/* Right Side - Video Demo */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className={`w-full max-w-2xl transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* STI 3D Video Container */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.2) 0%, rgba(255, 199, 44, 0.2) 100%)' }} />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8" style={{ border: '1px solid rgba(0, 61, 122, 0.1)' }}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#003D7A' }}>Product Demo</h3>
                  <p style={{ color: '#2C2C2C' }}>Experience the magic of AI-powered presentations</p>
                </div>

                {/* STI Video Placeholder */}
                <div className="relative aspect-video rounded-2xl border overflow-hidden group" style={{ backgroundColor: '#F9F9F9', borderColor: '#E5E5E5' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                  
                  {/* STI Video Placeholder Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="mb-6">
                      <svg className="w-20 h-20 animate-pulse" fill="none" stroke="#003D7A" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold mb-2" style={{ color: '#003D7A' }}>Demo Video Coming Soon</h4>
                    <p className="text-center max-w-md" style={{ color: '#2C2C2C' }}>
                      Upload your demo video here to showcase KENBILEARN's AI-powered PDF to presentation conversion
                    </p>
                    
                    {/* STI Play Button Placeholder */}
                    <div className="mt-6 w-16 h-16 backdrop-blur-sm border rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 group" style={{ backgroundColor: '#003D7A', borderColor: '#E5E5E5' }}>
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* STI Demo Features */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: "⚡", title: "Instant", desc: "PDF upload to slides" },
                    { icon: "🎨", title: "Beautiful", desc: "Professional templates" },
                    { icon: "🤖", title: "AI-Powered", desc: "Smart content extraction" }
                  ].map((feature, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-xl border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E5E5E5' }}>
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h5 className="font-semibold text-sm mb-1" style={{ color: '#003D7A' }}>{feature.title}</h5>
                      <p className="text-xs" style={{ color: '#2C2C2C' }}>{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* STI Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a 
                    href="/signup" 
                    className="flex-1 relative group py-3 px-6 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 text-center"
                    style={{ 
                      backgroundColor: '#003D7A',
                      '--tw-ring-color': 'rgba(255, 199, 44, 0.5)'
                    }}
                  >
                    <span className="relative z-10">Get Started Now</span>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: '#FFC72C' }} />
                  </a>
                  
                  <a 
                    href="/" 
                    className="flex-1 relative group py-3 px-6 bg-white border font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 text-center"
                    style={{ 
                      color: '#003D7A',
                      borderColor: '#E5E5E5',
                      '--tw-ring-color': 'rgba(0, 61, 122, 0.3)'
                    }}
                  >
                    <span className="relative z-10">Back to Landing Page</span>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: 'rgba(0, 61, 122, 0.05)' }} />
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
