import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserMenuDropdown({ userMenuOpen, setUserMenuOpen, userMenuRef }) {
  const navigate = useNavigate();
  const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
  const username = storedUser?.username || storedUser?.displayName || (storedUser?.email ? storedUser.email.split('@')[0] : 'User');
  const initial = (username && typeof username === 'string' ? username.charAt(0) : 'U').toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('user');
    // Optionally clear other session info
    navigate('/login');
  };

  return (
    <div className="relative" ref={userMenuRef}>
      {/* User Button */}
      <button
        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 group"
        onClick={() => setUserMenuOpen((v) => !v)}
      >
        <span className="hidden md:inline text-white font-semibold">{username}</span>
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
            {initial}
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </button>

      {/* Dropdown Menu */}
      {userMenuOpen && (
        <div className="absolute right-0 mt-3 w-56 z-50">
          {/* 3D Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl py-2 overflow-hidden">
              
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-white/20">
                <div>
                  <p className="text-white font-semibold text-sm">{username}</p>
                  <p className="text-gray-300 text-xs">{storedUser?.email || 'User Account'}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-all duration-300 group"
                  onClick={() => { setUserMenuOpen(false); navigate('/dashboard'); }}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                    <User size={16} className="text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">User Dashboard</p>
                    <p className="text-xs text-gray-300">Manage your account</p>
                  </div>
                </button>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-red-500/10 transition-all duration-300 group"
                  onClick={handleLogout}
                >
                  <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-all duration-300">
                    <LogOut size={16} className="text-red-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">Logout</p>
                    <p className="text-xs text-gray-300">Sign out of your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

