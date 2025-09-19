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

  useEffect(() => {
    setIsVisible(true);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 text-center">
              KENBILEARN
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-white/90 mb-6 text-center">
              Join the Future!
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-md leading-relaxed">
              Create stunning presentations from PDFs with 
              <span className="text-cyan-400 font-semibold"> cutting-edge AI technology</span>
            </p>
          </div>
        </div>

        {/* Right Side - Sign Up Form */}
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
                  <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
                  <p className="text-gray-300">Join our community today</p>
                </div>

                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Username</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Choose a username"
                      autoComplete="username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  {usernameError && (
                    <div className="text-red-300 text-sm font-medium">{usernameError}</div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Email Address</label>
                  <div className="relative group">
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your email"
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Create Password</label>
                  <div className="relative group">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Create a strong password"
                      autoComplete="new-password"
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Confirm Password</label>
                  <div className="relative group">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 focus:outline-none transition-colors duration-200"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Error Messages */}
                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-sm">
                    {success}
                  </div>
                )}

                {/* Sign Up Button */}
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
                        Creating Account...
                      </div>
                    ) : 'Create Account'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                </button>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <span className="text-gray-400">Already have an account? </span>
                  <a 
                    href="/login" 
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200"
                  >
                    Sign In
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
