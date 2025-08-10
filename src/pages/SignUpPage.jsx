import React from 'react';
import './AuthPages.css';

const SignUpPage = () => {
  return (
    <div className="auth-root">
  <div className="auth-side auth-side--illustration" style={{ background: 'var(--color-primary)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
    <img src="/images/signup-illustration.svg" alt="Sign Up Illustration" className="auth-illustration" style={{ maxWidth: 220, marginBottom: 32 }} />
    <h2 className="auth-brand" style={{ color: '#fff', fontWeight: 800, fontSize: '2.1rem', marginBottom: 12 }}>KENBILEARN</h2>
    <p className="auth-tagline" style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1.1rem', textAlign: 'center', margin: 0 }}>
      Sign up to convert PDF to presentation with AI-powered ease.
    </p>
  </div>
  <div className="auth-side auth-side--form" style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
    <form className="auth-form" style={{ width: '100%', maxWidth: 340, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(30,41,59,0.08)', padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="auth-title" style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '2rem', marginBottom: 12 }}>Sign Up</h2>
      <p className="auth-subtitle" style={{ color: 'var(--color-secondary)', fontSize: '1rem', marginBottom: 22 }}>Create your account</p>
      <label className="auth-label" style={{ width: '100%' }}>Username
        <input type="text" className="auth-input" placeholder="Enter your username" autoComplete="username" />
      </label>
      <label className="auth-label" style={{ width: '100%' }}>Email
        <input type="email" className="auth-input" placeholder="Enter your email" autoComplete="email" />
      </label>
      <label className="auth-label" style={{ width: '100%' }}>Password
        <input type="password" className="auth-input" placeholder="Create a password" autoComplete="new-password" />
      </label>
      <label className="auth-label" style={{ width: '100%' }}>Confirm Password
        <input type="password" className="auth-input" placeholder="Confirm your password" autoComplete="new-password" />
      </label>
      <button type="submit" className="auth-button" style={{ marginTop: 18 }} disabled>Sign Up</button>
      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
        <span>Already have an account?</span>
        <a href="/login" className="auth-link">Login</a>
      </div>
    </form>
  </div>
</div>
  );
};

export default SignUpPage;
