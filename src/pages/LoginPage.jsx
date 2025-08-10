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
  <div className="auth-side auth-side--illustration" style={{ background: 'var(--color-primary)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
    <img src="/images/login-illustration.svg" alt="Login Illustration" className="auth-illustration" style={{ maxWidth: 220, marginBottom: 32 }} />
    <h2 className="auth-brand" style={{ color: '#fff', fontWeight: 800, fontSize: '2.1rem', marginBottom: 12 }}>KENBILEARN</h2>
    <p className="auth-tagline" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1.1rem', textAlign: 'center', margin: 0 }}>
      Easily transform your PDFs into stunning PowerPoint presentations with AI.
    </p>
  </div>
  <div className="auth-side auth-side--form" style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <form className="auth-form" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 340, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,41,59,0.08)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="auth-title" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '2rem', marginBottom: 12 }}>Welcome Back!</h2>
      <p className="auth-subtitle" style={{ color: 'var(--color-secondary)', fontSize: '1rem', marginBottom: 22 }}>Login to your account</p>
      <label className="auth-label" style={{ width: '100%' }}>Email
        <input type="email" className="auth-input" placeholder="Enter your email" autoComplete="username" />
      </label>
      <label className="auth-label" style={{ width: '100%' }}>Password
        <input type="password" className="auth-input" placeholder="Enter your password" autoComplete="current-password" />
      </label>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.97rem', marginBottom: 6 }}>
        <label className="auth-checkbox" style={{ color: 'var(--color-secondary)' }}>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#" className="auth-link">Forgot Password?</a>
      </div>
      <button type="submit" className="auth-button" style={{ marginTop: 18 }}>Login</button>
      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
        <span>Don't have an account?</span>
        <a href="/signup" className="auth-link">Register Now</a>
      </div>
    </form>
  </div>
</div>
  );
};

export default LoginPage;
