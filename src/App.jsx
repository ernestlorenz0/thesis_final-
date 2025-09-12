import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import HelpPage from './pages/HelpPage';
import DashboardPage from './pages/DashboardPage';
import SharedSlideshowPage from './pages/SharedSlideshowPage';

function App() {
  // Hydrate user from localStorage
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage user={user} />} />
      <Route path="/history" element={<HistoryPage uploadedFiles={[]} />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/dashboard" element={<DashboardPage user={user} uploadedFiles={[]} />} />
      <Route path="/slideshow/:id" element={<SharedSlideshowPage />} />
      {/* Redirect unknown routes to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
