import React from 'react';
import './AuthPages.css';

const SignUpPage = () => {
  return (
    <div className="auth-root">
      <div className="auth-side auth-side--illustration">
        <img src="/images/signup-illustration.svg" alt="Sign Up Illustration" className="auth-illustration" />
        <h2 className="auth-brand">KENBILEARN</h2>
        <p className="auth-tagline">Sign up to convert PDF to presentation with AI-powered ease.</p>
      </div>
      <div className="auth-side auth-side--form">
        <form className="auth-form">
          <h2 className="auth-title">Sign Up</h2>
          <p className="auth-subtitle">Create your account</p>
          <label className="auth-label">Username
            <input type="text" className="auth-input" placeholder="Enter your username" autoComplete="username" />
          </label>
          <label className="auth-label">Email
            <input type="email" className="auth-input" placeholder="Enter your email" autoComplete="email" />
          </label>
          <label className="auth-label">Password
            <input type="password" className="auth-input" placeholder="Create a password" autoComplete="new-password" />
          </label>
          <label className="auth-label">Confirm Password
            <input type="password" className="auth-input" placeholder="Confirm your password" autoComplete="new-password" />
          </label>
          <button type="submit" className="auth-btn primary" disabled>Sign Up</button>
          <div className="auth-row auth-row--center">
            <span>Already have an account?</span>
            <a href="/login" className="auth-link">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
