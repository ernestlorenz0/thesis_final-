import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../firebaseAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await login(email, password, { remember });
      localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
      navigate('/home');
    } catch (err) {
      const msg = err?.message === 'Firebase: Error (auth/invalid-credential).' ? 'Invalid email or password. Please try again.' : err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotError('Please enter a valid email.');
      return;
    }
    try {
      await sendPasswordResetEmail(getAuth(), forgotEmail);
      setForgotSuccess('If an account exists, a reset link has been sent.');
      setForgotEmail('');
    } catch (err) {
      const code = err?.code || '';
      if (code === 'auth/user-not-found') {
        // Do not reveal if the email exists
        setForgotSuccess('If an account exists, a reset link has been sent.');
      } else if (code === 'auth/invalid-email') {
        setForgotError('Please enter a valid email address.');
      } else {
        setForgotError('Unable to send reset email right now. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse top-10 -left-20" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-2xl animate-bounce bottom-10 -right-20" />
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-pulse" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 text-center">
              KENBILEARN
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-white/90 mb-6 text-center">
              Welcome Back!
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-md leading-relaxed">
              Transform your PDFs into stunning presentations with 
              <span className="text-cyan-400 font-semibold"> AI-powered magic</span>
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          <div className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* 3D Form Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <form 
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Sign In</h3>
                  <p className="text-gray-300">Access your account</p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Email Address</label>
                  <div className="relative group">
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your email"
                      autoComplete="username"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Password</label>
                  <div className="relative group">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors duration-200"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center text-gray-300 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="mr-2 w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500/50 focus:ring-2"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                    <span className="group-hover:text-white transition-colors duration-200">Remember me</span>
                  </label>
                  <button 
                    type="button" 
                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {/* Login Button */}
                <button 
                  type="submit" 
                  className="w-full relative group py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={loading}
                >
                  <span className="relative z-10">
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing In...
                      </div>
                    ) : 'Sign In'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                </button>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <span className="text-gray-400">Don't have an account? </span>
                  <a 
                    href="/signup" 
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
                  >
                    Sign Up
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-[90vw] max-w-md">
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl font-bold focus:outline-none transition-colors duration-200" 
                onClick={() => { setShowForgot(false); setForgotEmail(''); setForgotError(''); setForgotSuccess(''); }}
              >
                ×
              </button>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Reset Password</h3>
                <p className="text-gray-300">Enter your email and we'll send you a reset link</p>
              </div>
              
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div className="relative group">
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm" 
                    placeholder="Enter your email" 
                    value={forgotEmail} 
                    onChange={e => setForgotEmail(e.target.value)} 
                    required 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                
                {forgotError && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                    {forgotError}
                  </div>
                )}
                
                {forgotSuccess && (
                  <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">
                    {forgotSuccess}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full relative group py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                >
                  <span className="relative z-10">Send Reset Link</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
