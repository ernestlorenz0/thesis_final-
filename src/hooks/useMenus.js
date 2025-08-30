import { useState, useRef, useEffect } from 'react';

export function useUserMenuDropdown() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  return { userMenuOpen, setUserMenuOpen, userMenuRef };
}

export function useMenuMobile() {
  const [menuOpen, setMenuOpen] = useState(false);
  return { menuOpen, setMenuOpen };
}
