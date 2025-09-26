import React, { useState, useEffect } from 'react';
import { User, HelpCircle, Upload, ArrowLeft } from 'lucide-react';
import ProfilePage from './ProfilePage';
import HistoryPage from './HistoryPage';
import HelpPage from './HelpPage';

export default function DashboardPage({ user, uploadedFiles }) {
  const [tab, setTab] = useState('profile');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* STI Modern Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 199, 44, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 199, 44, 0.6); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(-45deg, #003D7A, #FFC72C, #003D7A, #FFC72C);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .modern-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 61, 122, 0.1);
          box-shadow: 0 20px 40px rgba(0, 61, 122, 0.08);
        }
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)' }}>
        {/* STI Themed Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse top-10 -left-20" style={{ background: 'radial-gradient(circle, rgba(0, 61, 122, 0.1) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
          <div className="absolute w-80 h-80 rounded-full blur-2xl animate-bounce bottom-10 -right-20" style={{ background: 'radial-gradient(circle, rgba(255, 199, 44, 0.1) 0%, rgba(0, 61, 122, 0.05) 100%)' }} />
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.6, animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.5 }} />
          <div className="absolute top-1/3 right-1/5 w-5 h-5 transform rotate-45 animate-spin" style={{ backgroundColor: '#FFC72C', opacity: 0.3, animationDuration: '12s', animationDelay: '0.5s' }} />
        </div>

        {/* STI Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 rotate-45 animate-spin" style={{ backgroundColor: '#003D7A', opacity: 0.4, animationDuration: '8s' }} />
          <div className="absolute top-40 right-20 w-6 h-6 rounded-full animate-bounce" style={{ backgroundColor: '#FFC72C', opacity: 0.5, animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 rotate-12 animate-pulse" style={{ backgroundColor: '#003D7A', opacity: 0.3, animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-5 floating-element" style={{ animationDelay: '1s' }}>
            <svg className="w-6 h-6" fill="#FFC72C" style={{ opacity: 0.4 }} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-1/3 floating-element" style={{ animationDelay: '4s' }}>
            <svg className="w-8 h-8" fill="#003D7A" style={{ opacity: 0.3 }} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
          <div className={`w-full max-w-6xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* STI Header */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => window.location.href='/home'}
                className="flex items-center gap-2 px-4 py-2 bg-white border font-semibold rounded-xl hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 group"
                style={{ 
                  color: '#003D7A',
                  borderColor: '#E5E5E5',
                  '--tw-ring-color': 'rgba(0, 61, 122, 0.3)'
                }}
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </button>
              
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-black mb-2 gradient-text">
                  User Dashboard
                </h1>
                <p style={{ color: '#2C2C2C' }}>Manage your profile, view history, and get help</p>
              </div>
              
              <div className="w-32"></div> {/* Spacer for centering */}
            </div>

            {/* STI Dashboard Container */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.2) 0%, rgba(255, 199, 44, 0.2) 100%)' }} />
              <div className="relative modern-card rounded-3xl shadow-2xl overflow-hidden" style={{ border: '1px solid rgba(0, 61, 122, 0.1)' }}>
                
                {/* STI Tab Navigation */}
                <div className="flex justify-center p-6" style={{ borderBottom: '1px solid #E5E5E5' }}>
                  <div className="flex gap-2 rounded-2xl p-2" style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}>
                    {[
                      { id: 'profile', label: 'Profile', icon: User },
                      { id: 'history', label: 'History', icon: Upload },
                      { id: 'help', label: 'Help', icon: HelpCircle }
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          tab === id
                            ? 'text-white shadow-lg animate-pulse-glow'
                            : 'hover:shadow-md'
                        }`}
                        style={tab === id ? { backgroundColor: '#003D7A' } : { color: '#003D7A', backgroundColor: 'white' }}
                      >
                        <Icon size={18} />
                        <span className="hidden sm:inline">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <div className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {tab === 'profile' && <ProfilePage user={user} />}
                    {tab === 'history' && <HistoryPage uploadedFiles={uploadedFiles} />}
                    {tab === 'help' && <HelpPage />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
