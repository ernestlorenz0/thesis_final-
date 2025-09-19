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
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(147, 51, 234, 0.4); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse top-10 -left-20" />
          <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-2xl animate-bounce bottom-10 -right-20" />
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-indigo-400/30 transform rotate-45 animate-spin" style={{ animationDuration: '12s', animationDelay: '0.5s' }} />
        </div>

        {/* Enhanced Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-400/50 rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-5 animate-float" style={{ animationDelay: '1s' }}>
            <svg className="w-6 h-6 text-cyan-300/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: '4s' }}>
            <svg className="w-8 h-8 text-purple-300/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
          <div className={`w-full max-w-6xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => window.location.href='/home'}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Home
              </button>
              
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
                  User Dashboard
                </h1>
                <p className="text-gray-300">Manage your profile, view history, and get help</p>
              </div>
              
              <div className="w-32"></div> {/* Spacer for centering */}
            </div>

            {/* 3D Dashboard Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Tab Navigation */}
                <div className="flex justify-center border-b border-white/20 p-6">
                  <div className="flex gap-2 bg-white/5 rounded-2xl p-2">
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
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg animate-glow'
                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
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
