import React from 'react';
import './AuthPages.css';

const LandingPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        className="landing-hero"
        style={{
          width: '100%',
          background: 'none',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem 2rem',
        }}
      >
        <div className="landing-hero-graphic">
          <img src="/images/hero-illustration.svg" alt="AI Presentation" style={{ maxWidth: 340, marginBottom: 32 }} />
        </div>
        <h1 className="landing-title" style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, textAlign: 'center', color: '#fff' }}>
          Modern AI-Powered Slides
        </h1>
        <p className="landing-subtitle" style={{ fontSize: '1.25rem', color: '#fff', margin: '18px 0 28px 0', textAlign: 'center', maxWidth: 450 }}>
          Instantly convert your PDFs into beautiful, professional presentations. Trusted by students, teachers, and professionals.
        </p>
        <div className="landing-cta-group" style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 32 }}>
          <a href="/signup" className="landing-btn primary" style={{ minWidth: 160, background: 'var(--color-primary)', color: '#fff' }}>Get Started</a>
          <a href="#" className="landing-btn secondary" style={{ minWidth: 160, borderColor: '#fff', color: '#fff' }}>Learn More</a>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 12 }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: '#fff' }}>Trust</span>
            <div style={{ fontSize: '0.97rem', color: '#fff' }}>Secure & reliable</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>Speed</span>
            <div style={{ fontSize: '0.97rem', color: '#fff9' }}>Slides in seconds</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>Simplicity</span>
            <div style={{ fontSize: '0.97rem', color: '#fff9' }}>Just upload & go</div>
          </div>
        </div>
      </div>
      <div className="landing-right" style={{ background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Optionally add testimonials, features, or a live demo preview here */}
      </div>
    </div>
  );
};

export default LandingPage;
