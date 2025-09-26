import React, { useState, useEffect } from 'react';
import { signUp } from '../firebaseAuth';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredSticker, setHoveredSticker] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Username validation: no spaces, cannot start with special chars
  const validateUsername = (value) => {
    if (/^[^a-zA-Z0-9]/.test(value)) {
      return 'Username must not start with a special character.';
    }
    if (/\s/.test(value)) {
      return 'Username cannot contain spaces.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const unameError = validateUsername(username);
    setUsernameError(unameError);
    if (unameError) return;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, username);
      setSuccess('Signup successful! Please check your email for a verification link before logging in.');
      setUsername(''); setEmail(''); setPassword(''); setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(validateUsername(e.target.value));
  };

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
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        .rotate-slow {
          animation: rotate-slow 6s linear infinite;
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-scale {
          animation: pulse-scale 2.5s ease-in-out infinite;
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .swing {
          animation: swing 3s ease-in-out infinite;
        }
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        .slide-horizontal {
          animation: slide-horizontal 4s ease-in-out infinite;
        }
        @keyframes slide-horizontal {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(25px); }
        }
        .bounce-big {
          animation: bounce-big 3s ease-in-out infinite;
        }
        @keyframes bounce-big {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        .glass-morphism {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hoverable-sticker {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .sticker-hovered {
          transform: scale(3) !important;
          z-index: 1000 !important;
          opacity: 0.95 !important;
          filter: drop-shadow(0 20px 40px rgba(255, 199, 44, 0.4));
          animation: none !important;
        }
        .input-icon { color: #9CA3AF; }
        .input-wrapper:focus-within .input-icon { color: #003D7A; }
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
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-sm font-semibold px-6 py-3 rounded-xl border hover:shadow-lg transition-all duration-300" style={{ color: '#003D7A', borderColor: '#E5E5E5', backgroundColor: 'white' }}>Login</a>
              <a href="/" className="px-6 py-3 text-sm font-bold text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#003D7A' }}>
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section with Form */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)' }}>
        {/* Animated Background with STI Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse top-10 -left-20" style={{ background: 'radial-gradient(circle, rgba(0, 61, 122, 0.1) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
          <div className="absolute w-80 h-80 rounded-full blur-2xl animate-bounce bottom-10 -right-20" style={{ background: 'radial-gradient(circle, rgba(255, 199, 44, 0.1) 0%, rgba(0, 61, 122, 0.05) 100%)' }} />
          
          {/* Small STI Decorative Boxes - Blue */}
          <div className="absolute top-20 left-16 w-3 h-3 rotate-45 animate-spin" style={{ backgroundColor: '#003D7A', opacity: 0.6, animationDuration: '8s' }} />
          <div className="absolute top-32 right-20 w-4 h-4 rotate-12 animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-12 w-2 h-2 rotate-45 animate-spin" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-1/3 left-8 w-5 h-5 rotate-12 animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.3, animationDelay: '3s' }} />
          <div className="absolute bottom-1/4 right-16 w-3 h-3 rotate-45 animate-spin" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDuration: '12s', animationDelay: '4s' }} />
          <div className="absolute top-2/3 left-20 w-4 h-4 rotate-12 animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '5s' }} />
          
          {/* Small STI Decorative Boxes - Yellow */}
          <div className="absolute top-24 right-12 w-3 h-3 rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.7, animationDuration: '9s', animationDelay: '0.5s' }} />
          <div className="absolute bottom-32 right-8 w-2 h-2 rotate-12 animate-pulse" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 right-24 w-4 h-4 rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDuration: '11s', animationDelay: '2.5s' }} />
          <div className="absolute bottom-1/3 left-24 w-3 h-3 rotate-12 animate-pulse" style={{ backgroundColor: '#FFC72C', opacity: 0.4, animationDelay: '3.5s' }} />
          <div className="absolute top-16 left-1/3 w-5 h-5 rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDuration: '13s', animationDelay: '4.5s' }} />
          <div className="absolute bottom-16 right-1/3 w-2 h-2 rotate-12 animate-pulse" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '5.5s' }} />
          
          {/* Circular Shapes - Blue */}
          <div className="absolute top-40 left-6 w-4 h-4 rounded-full animate-bounce" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDelay: '2s' }} />
          <div className="absolute top-1/4 right-6 w-5 h-5 rounded-full animate-bounce" style={{ backgroundColor: '#003D7A', opacity: 0.3, animationDelay: '3s' }} />
          <div className="absolute bottom-1/2 right-12 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.6, animationDelay: '4s' }} />
          
          {/* Circular Shapes - Yellow */}
          <div className="absolute top-1/6 left-1/2 w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/6 right-1/2 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '1.5s' }} />
          <div className="absolute top-3/4 left-10 w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#FFC72C', opacity: 0.4, animationDelay: '2.5s' }} />
          <div className="absolute bottom-1/5 left-1/3 w-5 h-5 rounded-full animate-pulse" style={{ backgroundColor: '#FFC72C', opacity: 0.7, animationDelay: '3.5s' }} />
          
          {/* Diamond Shapes - Blue */}
          <div className="absolute top-1/5 right-1/4 w-3 h-3 rotate-45 animate-spin" style={{ backgroundColor: '#003D7A', opacity: 0.5, animationDuration: '15s' }} />
          <div className="absolute bottom-2/3 left-1/5 w-4 h-4 rotate-45 animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDelay: '2s' }} />
          
          {/* Diamond Shapes - Yellow */}
          <div className="absolute top-5/6 right-1/5 w-2 h-2 rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDuration: '14s', animationDelay: '1s' }} />
          <div className="absolute bottom-3/4 right-1/3 w-3 h-3 rotate-45 animate-pulse" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '3s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="text-center lg:text-left">
                <div className="mb-8 relative group">
                  <div className="relative w-40 h-40 mx-auto lg:mx-0">
                    {/* 3D Border Effect */}
                    <div className="absolute inset-0 rounded-2xl shadow-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" style={{ 
                      background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                      border: '3px solid #003D7A',
                      boxShadow: '8px 8px 16px rgba(0, 61, 122, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)'
                    }} />
                    <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 shadow-inner" style={{
                      border: '2px solid #FFC72C',
                      boxShadow: 'inset 4px 4px 8px rgba(0, 61, 122, 0.1), inset -4px -4px 8px rgba(255, 199, 44, 0.1)'
                    }}>
                      {/* Clean STI Logo */}
                      <div className="w-24 h-24 bg-yellow-400 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFC72C' }}>
                        <div className="text-center">
                          <div className="text-2xl font-black text-blue-900" style={{ color: '#003D7A', fontFamily: 'Arial, sans-serif' }}>STI</div>
                          <div className="text-xs font-semibold text-blue-900 -mt-1" style={{ color: '#003D7A' }}>COLLEGE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
                  <span className="gradient-text">Join</span><br />
                  <span style={{ color: '#003D7A' }}>KenbiLearn</span><br />
                  <span style={{ color: '#2C2C2C' }}>Today</span>
                </h1>
                <p className="text-xl mb-8 leading-relaxed" style={{ color: '#2C2C2C' }}>
                  Transform your PDFs into stunning presentations with 
                  <span className="font-semibold" style={{ color: '#003D7A' }}> AI-powered technology</span>
                </p>
                <div className="flex justify-center lg:justify-start">
                  <div className="w-24 h-1 rounded-full" style={{ backgroundColor: '#FFC72C' }}></div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Form */}
            <div className={`${isVisible ? 'animate-slideInRight' : 'opacity-0'} relative`}>
              <div className="relative group">
                <div className="absolute inset-0 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.2) 0%, rgba(255, 199, 44, 0.2) 100%)' }} />
                <form 
                  className="relative modern-card rounded-3xl p-8 space-y-6" 
                  style={{ border: '1px solid rgba(0, 61, 122, 0.1)' }}
                  onSubmit={handleSubmit}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold mb-2 gradient-text">Create Account</h3>
                    <p className="text-lg" style={{ color: '#2C2C2C' }}>Join our KenbiLearn community</p>
                  </div>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-sm" style={{ color: '#003D7A' }}>Username</label>
                    <div className="relative group input-wrapper">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 input-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </span>
                      <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          borderColor: '#E5E5E5',
                          color: '#2C2C2C',
                          '--tw-ring-color': 'rgba(255, 199, 44, 0.5)'
                        }}
                        placeholder="Choose a username"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsernameChange}
                        onFocus={e => e.target.style.borderColor = '#FFC72C'}
                        onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                    </div>
                    {usernameError && (
                      <div className="text-sm font-medium" style={{ color: '#FF4444' }}>{usernameError}</div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-sm" style={{ color: '#003D7A' }}>Email Address</label>
                    <div className="relative group input-wrapper">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 input-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                      </span>
                      <input 
                        type="email" 
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          borderColor: '#E5E5E5',
                          color: '#2C2C2C',
                          '--tw-ring-color': 'rgba(255, 199, 44, 0.5)'
                        }}
                        placeholder="Enter your email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#FFC72C'}
                        onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                        required
                      />
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-sm" style={{ color: '#003D7A' }}>Create Password</label>
                    <div className="relative group input-wrapper">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 input-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </span>
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-10 pr-12 py-3 bg-white rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          borderColor: '#E5E5E5',
                          color: '#2C2C2C',
                          '--tw-ring-color': 'rgba(255, 199, 44, 0.5)'
                        }}
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#FFC72C'}
                        onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none transition-colors duration-200"
                        style={{ color: '#2C2C2C' }}
                        onMouseEnter={e => e.target.style.color = '#003D7A'}
                        onMouseLeave={e => e.target.style.color = '#2C2C2C'}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 01.814-3.25m8.6-2.098A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-1.132 2.271M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-sm" style={{ color: '#003D7A' }}>Confirm Password</label>
                    <div className="relative group input-wrapper">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 input-icon">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </span>
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full pl-10 pr-12 py-3 bg-white rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent"
                        style={{ 
                          borderColor: '#E5E5E5',
                          color: '#2C2C2C',
                          '--tw-ring-color': 'rgba(255, 199, 44, 0.5)'
                        }}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#FFC72C'}
                        onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none transition-colors duration-200"
                        style={{ color: '#2C2C2C' }}
                        onMouseEnter={e => e.target.style.color = '#003D7A'}
                        onMouseLeave={e => e.target.style.color = '#2C2C2C'}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 01.814-3.25m8.6-2.098A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-1.132 2.271M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                    </div>
                  </div>

                  {/* Error Messages */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                      {success}
                    </div>
                  )}

                  {/* Sign Up Button */}
                  <button 
                    type="submit" 
                    className="w-full relative group py-4 px-6 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none floating-element"
                    style={{ 
                      backgroundColor: '#003D7A',
                      '--tw-ring-color': 'rgba(255, 199, 44, 0.5)'
                    }}
                    disabled={loading}
                  >
                    <span className="relative z-10">
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating Account...
                        </div>
                      ) : 'Create Account'}
                    </span>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: '#FFC72C' }} />
                  </button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <span style={{ color: '#2C2C2C' }}>Already have an account? </span>
                    <a 
                      href="/login" 
                      className="font-semibold transition-colors duration-200"
                      style={{ color: '#003D7A' }}
                      onMouseEnter={e => e.target.style.color = '#FFC72C'}
                      onMouseLeave={e => e.target.style.color = '#003D7A'}
                    >
                      Sign In
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
