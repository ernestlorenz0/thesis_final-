import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    createdAt: '',
  });
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  
  // Store original profile data to reset on cancel
  const [originalProfile, setOriginalProfile] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      const userProfile = {
        fullname: userData.displayName || userData.email.split('@')[0],
        email: userData.email || '',
        username: userData.email?.split('@')[0] || '',
        password: '',
        createdAt: userData.metadata?.creationTime || new Date().toISOString(),
      };
      setProfile(userProfile);
      setOriginalProfile({...userProfile});
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setPasswordError('');
    
    try {
      // Validate password if changed
      if (newPassword) {
        if (newPassword !== confirmPassword) {
          throw new Error('New passwords do not match');
        }
        if (newPassword.length < 6) {
          throw new Error('Password should be at least 6 characters');
        }
      }
      
      // Here you would typically make an API call to update the user's profile
      // For now, we'll just update the local state
      
      // Update the original profile with new values
      const updatedProfile = {
        ...profile,
        // Only update password if it was changed
        ...(newPassword && { password: newPassword })
      };
      
      // Update local storage (in a real app, this would be an API call)
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...userData,
        displayName: profile.fullname,
        email: profile.email,
        // In a real app, you would hash the password before saving
        ...(newPassword && { password: newPassword })
      }));
      
      // Update state
      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      setEditing(false);
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setPasswordError(error.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };
  
  const handleCancel = () => {
    // Reset to original profile data
    if (originalProfile) {
      setProfile({...originalProfile});
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setEditing(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="flex-1 flex items-start justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF] p-4 sm:p-4">
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-md p-4 w-full max-w-md flex flex-col items-center gap-2">
        <h2 className="text-lg font-bold text-[#8C6BFA] mb-0.5">Profile</h2>
        <div className="w-16 h-16 rounded-full bg-[#E3D9FA] flex items-center justify-center text-2xl font-bold text-[#8C6BFA] mb-2">
          {profile.fullname ? profile.fullname.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
        </div>
        <div className="w-full flex flex-col gap-1 mb-1.5">
          <label className="text-[11px] font-semibold text-[#8C6BFA] uppercase tracking-wider">Full Name</label>
          <input
            name="fullname"
            className="w-full px-3 py-1.5 text-sm rounded-md border border-[#E3D9FA] focus:ring-1 focus:ring-[#8C6BFA] text-gray-900 bg-white"
            value={profile.fullname}
            onChange={handleChange}
            disabled={!editing}
            style={{ color: '#111' }}
          />
        </div>
        <div className="w-full flex flex-col gap-1 mb-1.5">
          <label className="text-[11px] font-semibold text-[#8C6BFA] uppercase tracking-wider">Email</label>
          <input
            name="email"
            type="email"
            className="w-full px-3 py-1.5 text-sm rounded-md border border-[#E3D9FA] focus:ring-1 focus:ring-[#8C6BFA] text-gray-900 bg-white"
            value={profile.email}
            onChange={handleChange}
            disabled={!editing}
            style={{ color: '#111' }}
          />
        </div>
        <div className="w-full flex flex-col gap-1 mb-1.5">
          <label className="text-[11px] font-semibold text-[#8C6BFA] uppercase tracking-wider">Username</label>
          <input
            name="username"
            className="w-full px-3 py-1.5 text-sm rounded-md border border-[#E3D9FA] focus:ring-1 focus:ring-[#8C6BFA] text-gray-900 bg-white"
            value={profile.username}
            onChange={handleChange}
            disabled={!editing}
            style={{ color: '#111' }}
          />
        </div>
        {editing ? (
          <div className="w-full space-y-2 mb-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#8C6BFA] uppercase tracking-wider">Current Password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-[#E3D9FA] focus:ring-2 focus:ring-[#8C6BFA] text-gray-900 bg-white"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  style={{ color: '#111' }}
                />
                <button 
                  type="button" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C6BFA] hover:text-[#7B5BD9]" 
                  onClick={() => setShowCurrentPassword(v => !v)}
                >
                  {showCurrentPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#8C6BFA] uppercase tracking-wider">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-[#E3D9FA] focus:ring-2 focus:ring-[#8C6BFA] text-gray-900 bg-white"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  style={{ color: '#111' }}
                />
                <button 
                  type="button" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8C6BFA] hover:text-[#7B5BD9]" 
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            {newPassword && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#8C6BFA] uppercase tracking-wider">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 text-sm rounded-lg border border-[#E3D9FA] focus:ring-2 focus:ring-[#8C6BFA] text-gray-900 bg-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={{ color: '#111' }}
                />
              </div>
            )}
            {passwordError && (
              <div className="text-red-500 text-xs mt-1">{passwordError}</div>
            )}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-1.5 mb-2">
            <label className="text-xs font-semibold text-[#8C6BFA] uppercase tracking-wider">Password</label>
            <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 rounded-lg">
              ••••••••
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-1 mb-2">
          <label className="text-[11px] font-semibold text-[#8C6BFA] uppercase tracking-wider">Member Since</label>
          <input
            type="text"
            className="w-full px-3 py-1.5 text-sm rounded-md border border-[#E3D9FA] bg-gray-50 text-gray-600"
            value={formatDate(profile.createdAt)}
            disabled
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
          {editing ? (
            <>
              <button 
                type="submit" 
                disabled={isUpdating}
                className={`flex-1 flex items-center justify-center gap-1.5 bg-[#8C6BFA] text-white font-medium py-1.5 rounded-md hover:bg-[#7B61FF] transition-colors text-sm shadow-sm ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
                className="flex-1 border border-gray-300 text-gray-700 font-medium py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="w-full bg-[#8C6BFA] text-white font-medium py-1.5 rounded-md hover:bg-[#7B61FF] transition-colors text-sm shadow-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
