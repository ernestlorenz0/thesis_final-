import React, { useState } from 'react';
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 animate-fade-in">
      {/* Illustration Side */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-white animate-slide-up">
        <img src="/images/signup-illustration.svg" alt="Sign Up Illustration" className="max-w-xs mb-8 drop-shadow-2xl rounded-xl animate-fade-in-slow" />
        <h2 className="font-extrabold text-3xl md:text-4xl mb-3 tracking-tight animate-slide-up">KENBILEARN</h2>
        <p className="text-lg text-white/90 text-center max-w-md animate-fade-in delay-300">
          Sign up to convert PDF to presentation with AI-powered ease.
        </p>
      </div>
      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen animate-fade-in delay-200">
        <form className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-slide-up delay-300" onSubmit={handleSubmit}>
          <h2 className="text-blue-700 font-bold text-2xl mb-2 animate-fade-in">Sign Up</h2>
          <p className="text-indigo-600 text-base mb-5 animate-fade-in delay-100">Create your account</p>
          <label className="w-full font-semibold mb-2 animate-fade-in delay-200">Username
            <input type="text" className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-gray-50 text-gray-900" placeholder="Enter your username" autoComplete="username" value={username} onChange={handleUsernameChange} required />
          </label>
          {usernameError && <div className="w-full text-red-600 font-medium mb-2 animate-fade-in delay-200">{usernameError}</div>}
          <label className="w-full font-semibold mb-2 animate-fade-in delay-200">Email
            <input type="email" className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-gray-50 text-gray-900" placeholder="Enter your email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className="w-full font-semibold mb-2 animate-fade-in delay-200">Password
            <div className="relative">
              <input type={showPassword ? "text" : "password"} className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-gray-50 text-gray-900 pr-12" placeholder="Create a password" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-.34 0-.675-.017-1.006-.05M9.172 9.172a4 4 0 015.656 5.656" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9-2a9.956 9.956 0 00-1.125-4.575M4.222 4.222A9.956 9.956 0 002 9c0 5.523 4.477 10 10 10 1.657 0 3.22-.402 4.575-1.125M21 21l-6-6" /></svg>
                )}
              </button>
            </div>
          </label>
          <label className="w-full font-semibold mb-2 animate-fade-in delay-200">Confirm Password
            <div className="relative">
              <input type={showConfirmPassword ? "text" : "password"} className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 bg-gray-50 text-gray-900 pr-12" placeholder="Confirm your password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              <button type="button" tabIndex={-1} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => setShowConfirmPassword(v => !v)}>
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.402-3.22 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-.34 0-.675-.017-1.006-.05M9.172 9.172a4 4 0 015.656 5.656" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9-2a9.956 9.956 0 00-1.125-4.575M4.222 4.222A9.956 9.956 0 002 9c0 5.523 4.477 10 10 10 1.657 0 3.22-.402 4.575-1.125M21 21l-6-6" /></svg>
                )}
              </button>
            </div>
          </label>
          {error && <div className="w-full text-red-600 font-medium mb-2 animate-fade-in delay-200">{error}</div>}
          {success && <div className="w-full text-green-600 font-medium mb-2 animate-fade-in delay-200">{success}</div>}
          <button type="submit" className="w-full mt-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-short" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          <div className="text-center mt-5 animate-fade-in delay-300">
            <span className="text-gray-600">Already have an account?</span>
            <a href="/login" className="ml-2 text-blue-600 hover:underline font-semibold">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
