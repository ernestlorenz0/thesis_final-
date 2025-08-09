import React from 'react';
import './AuthPages.css';

const LandingPage = () => {
  return (
    <div className="landing-root">
      <div className="landing-left">
        <div className="landing-hero-graphic">
          {/* Replace with SVG or image */}
          <img src="/images/hero-illustration.svg" alt="AI Presentation" />
        </div>
        <h1 className="landing-title">Transform PDFs into Stunning Presentations</h1>
        <p className="landing-subtitle">AI-powered, fast, and hassle-free. Elevate your slides in seconds.</p>
        <div className="landing-cta-group">
          <a href="/signup" className="landing-btn primary">Get Started</a>
          <a href="#features" className="landing-btn secondary">Learn More</a>
        </div>
      </div>
      <div className="landing-right">
        {/* Optionally add testimonials or features here */}
      </div>
    </div>
  );
};

export default LandingPage;
