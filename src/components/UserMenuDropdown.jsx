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
      {/* STI User Button */}
      <button
        className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white border hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 group"
        style={{ 
          borderColor: '#E5E5E5',
          '--tw-ring-color': 'rgba(0, 61, 122, 0.3)'
        }}
        onClick={() => setUserMenuOpen((v) => !v)}
      >
        <span className="text-sm font-semibold" style={{ color: '#003D7A' }}>{username}</span>
        <div className="relative">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#003D7A' }}>
            {initial}
          </div>
          <div className="absolute inset-0 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: '#FFC72C', opacity: 0.3 }} />
        </div>
      </button>

      {/* STI Dropdown Menu */}
      {userMenuOpen && (
        <div className="absolute right-0 mt-3 w-64 z-50">
          {/* STI Container */}
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl blur-xl" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.2) 0%, rgba(255, 199, 44, 0.2) 100%)' }} />
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 overflow-hidden" style={{ border: '1px solid rgba(0, 61, 122, 0.1)' }}>
              
              {/* User Info Header */}
              <div className="px-4 py-4" style={{ borderBottom: '1px solid #E5E5E5' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg" style={{ backgroundColor: '#003D7A' }}>
                    {initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#003D7A' }}>{username}</p>
                    <p className="text-xs" style={{ color: '#666666' }}>{storedUser?.email || 'User Account'}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all duration-300 group"
                  onClick={() => { setUserMenuOpen(false); navigate('/dashboard'); }}
                >
                  <div className="p-2 rounded-lg group-hover:shadow-md transition-all duration-300" style={{ backgroundColor: '#F9F9F9', border: '1px solid #E5E5E5' }}>
                    <User size={16} style={{ color: '#003D7A' }} />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm" style={{ color: '#003D7A' }}>User Dashboard</p>
                    <p className="text-xs" style={{ color: '#666666' }}>Manage your account</p>
                  </div>
                </button>
                
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-all duration-300 group"
                  onClick={handleLogout}
                >
                  <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-all duration-300" style={{ border: '1px solid #FEE2E2' }}>
                    <LogOut size={16} className="text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-red-600">Logout</p>
                    <p className="text-xs text-red-400">Sign out of your account</p>
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

