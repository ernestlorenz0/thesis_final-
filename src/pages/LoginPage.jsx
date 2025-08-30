import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../firebaseAuth';


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await login(email, password);
      localStorage.setItem('user', JSON.stringify(userData)); // Persist user data
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotSuccess('');
    // Simulate async forgot password (replace with actual API call)
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotError('Please enter a valid email.');
      return;
    }
    setTimeout(() => {
      setForgotSuccess('If an account exists, a reset link has been sent.');
      setForgotEmail('');
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900">
      {/* Illustration Side */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-white">
        <img src="/images/login-illustration.svg" alt="Login Illustration" className="max-w-xs mb-8 drop-shadow-2xl rounded-xl" />
        <h2 className="font-extrabold text-3xl md:text-4xl mb-3 tracking-tight">KENBILEARN</h2>
        <p className="text-lg text-white/90 text-center max-w-md">
          Easily transform your PDFs into stunning PowerPoint presentations with AI.
        </p>
      </div>
      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center bg-white min-h-screen">
        <form className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center" onSubmit={handleSubmit}>
          <h2 className="text-blue-700 font-bold text-2xl mb-2">Welcome Back!</h2>
          <p className="text-indigo-600 text-base mb-5">Login to your account</p>
          <label className="w-full font-semibold mb-2">Email
            <input type="email" className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" placeholder="Enter your email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className="w-full font-semibold mb-2">Password
            <input type="password" className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          <div className="w-full flex justify-between items-center text-sm mb-2">
            <label className="flex items-center text-indigo-600 cursor-pointer">
              <input type="checkbox" className="mr-2 accent-blue-600" /> Remember me
            </label>
            <button type="button" className="text-blue-600 hover:underline font-semibold transition-all" onClick={() => setShowForgot(true)}>Forgot Password?</button>
          </div>
          {error && <div className="w-full text-red-600 font-medium mb-2">{error}</div>}
          <button type="submit" className="w-full mt-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-300" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          <div className="text-center mt-5">
            <span className="text-gray-600">Don't have an account?</span>
            <a href="/signup" className="ml-2 text-blue-600 hover:underline font-semibold">Register Now</a>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none" onClick={() => { setShowForgot(false); setForgotEmail(''); setForgotError(''); setForgotSuccess(''); }}>&times;</button>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Reset Password</h3>
            <p className="text-gray-600 mb-4">Enter your email and we'll send you a reset link.</p>
            <form onSubmit={handleForgotSubmit} className="flex flex-col gap-3">
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-900" placeholder="Enter your email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required />
              {forgotError && <div className="text-red-600 text-sm font-medium">{forgotError}</div>}
              {forgotSuccess && <div className="text-green-600 text-sm font-medium">{forgotSuccess}</div>}
              <button type="submit" className="mt-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300">Send Reset Link</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
