import React from 'react';
import { Settings, HelpCircle, Upload, User, LogOut } from 'lucide-react';

const menuItemStyle = {
  padding: '10px 18px',
  background: 'none',
  border: 'none',
  color: 'var(--color-secondary)',
  fontWeight: 600,
  fontSize: 15,
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  transition: 'background 0.15s',
};

export default function MenuMobile({ menuOpen, setMenuOpen }) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        aria-label="Menu"
        style={{
          padding: 8,
          borderRadius: 8,
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 40,
            minWidth: 180,
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 16px rgba(30,41,59,0.15)',
            padding: '8px 0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
          }}
        >
          <button style={menuItemStyle}><Settings size={18} style={{marginRight:8}}/> Settings</button>
          <button style={menuItemStyle}><HelpCircle size={18} style={{marginRight:8}}/> Help</button>
          <button style={menuItemStyle}><Upload size={18} style={{marginRight:8}}/> How to Use</button>
          <button style={menuItemStyle}><User size={18} style={{marginRight:8}}/> History</button>
          <button style={{...menuItemStyle, color: 'var(--color-primary)'}}><LogOut size={18} style={{marginRight:8}}/> Logout</button>
        </div>
      )}
    </div>
  );
}
