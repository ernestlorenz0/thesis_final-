import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="auth-root">
      <div className="auth-side auth-side--illustration">
        <img src="/images/login-illustration.svg" alt="Login Illustration" className="auth-illustration" />
        <h2 className="auth-brand">KENBILEARN</h2>
        <p className="auth-tagline">Easily transform your PDFs into stunning PowerPoint presentations with AI.</p>
      </div>
      <div className="auth-side auth-side--form">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="auth-title">Welcome Back!</h2>
          <p className="auth-subtitle">Login to your account</p>
          <label className="auth-label">Email
            <input type="email" className="auth-input" placeholder="Enter your email" autoComplete="username" />
          </label>
          <label className="auth-label">Password
            <input type="password" className="auth-input" placeholder="Enter your password" autoComplete="current-password" />
          </label>
          <div className="auth-row auth-row--between">
            <label className="auth-checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="auth-link">Forgot Password?</a>
          </div>
          <button type="submit" className="auth-btn primary">Login</button>
          <div className="auth-row auth-row--center">
            <span>Don't have an account?</span>
            <a href="/signup" className="auth-link">Register Now</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
