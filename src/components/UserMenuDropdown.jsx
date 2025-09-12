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
      <button
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-blue-50 transition-all focus:outline-none"
        style={{ background: 'transparent' }}
        onClick={() => setUserMenuOpen((v) => !v)}
      >
        <span className="hidden md:inline text-base font-semibold" style={{ color: '#8C6BFA' }}>{username}</span>
        <span className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold shadow-md border-2 border-white" style={{ background: 'transparent', color: '#8C6BFA' }}>{initial}</span>
      </button>
      {userMenuOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 z-50 animate-fade-in">
          <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 text-base font-semibold transition-all" onClick={() => { setUserMenuOpen(false); navigate('/dashboard'); }}><User size={18} className="mr-2 text-[#7B61FF]"/> User Dashboard</button>
          
          <button className="w-full flex items-center px-4 py-2 text-[#FF4D4F] hover:bg-blue-50 text-base font-semibold transition-all" onClick={handleLogout}><LogOut size={18} className="mr-2 text-[#FF4D4F]"/> Logout</button>
        </div>
      )}
    </div>
  );
}

