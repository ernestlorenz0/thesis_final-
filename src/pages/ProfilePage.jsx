import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount, updateAccount } from '../firebaseAuth';
import ConfirmationModal from '../components/ConfirmationModal';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  
  // Store original profile data to reset on cancel
  const [originalProfile, setOriginalProfile] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      const userProfile = {
        fullname: userData.displayName || userData.email?.split('@')[0] || '',
        email: userData.email || '',
        username: userData.username || userData.displayName || userData.email?.split('@')[0] || '',
        password: '',
        createdAt: userData.createdAt || userData.metadata?.creationTime || new Date().toISOString(),
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
    if (!editing) {
      return;
    }
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
      
      // Update via Firebase (username and/or password)
      await updateAccount({ username: profile.username, currentPassword, newPassword });
      
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
        username: profile.username,
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

  const handleDeleteAccountClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteAccountConfirm = async () => {
    setIsDeleting(true);
    setDeleteError('');
    setShowDeleteModal(false);
    try {
      await deleteAccount();
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete account. Please re-login and try again.');
      setIsDeleting(false);
    }
  };

  const handleDeleteAccountCancel = () => {
    setShowDeleteModal(false);
  };


  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-2xl">
              {profile.fullname ? profile.fullname.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 blur animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Profile Settings</h2>
          <p className="text-gray-300">Manage your account information</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">Full Name</label>
              <div className="relative group">
                <input
                  name="fullname"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm disabled:opacity-60"
                  value={profile.fullname}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Email (Non-editable) */}
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">Email Address</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-400 backdrop-blur-sm cursor-not-allowed opacity-60"
                  value={profile.email}
                  disabled={true}
                  placeholder="Email address"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-400">Email cannot be changed for security reasons</p>
            </div>

            {/* Username */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-white font-semibold text-sm">Username</label>
              <div className="relative group">
                <input
                  name="username"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm disabled:opacity-60"
                  value={profile.username}
                  onChange={handleChange}
                  disabled={!editing}
                  placeholder="Enter your username"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Password Section */}
          {editing ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Change Password</h3>
              
              {/* Current Password */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">Current Password</label>
                <div className="relative group">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm pr-12"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" 
                    onClick={() => setShowCurrentPassword(v => !v)}
                  >
                    {showCurrentPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 01.814-3.25m8.6-2.098A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-1.132 2.271M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="block text-white font-semibold text-sm">New Password</label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm pr-12"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-200" 
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 01.814-3.25m8.6-2.098A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-1.132 2.271M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Confirm Password */}
              {newPassword && (
                <div className="space-y-2">
                  <label className="block text-white font-semibold text-sm">Confirm New Password</label>
                  <div className="relative group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>
              )}

              {passwordError && (
                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                  {passwordError}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-white font-semibold text-sm">Password</label>
              <div className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-gray-400 backdrop-blur-sm">
                ••••••••••••
              </div>
            </div>
          )}

          {/* Error Messages */}
          {deleteError && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
              {deleteError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {editing ? (
              <>
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className="flex-1 relative group py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative z-10">
                    {isUpdating ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Saving Changes...
                      </div>
                    ) : 'Save Changes'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                </button>
                
                <button 
                  type="button"
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditing(true); }}
                className="w-full relative group py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
              >
                <span className="relative z-10">Edit Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
              </button>
            )}
          </div>

          {/* Delete Account Button */}
          <div className="pt-4 border-t border-white/20">
            <button
              type="button"
              onClick={handleDeleteAccountClick}
              disabled={isDeleting}
              className="w-full px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-400 font-semibold rounded-xl hover:bg-red-500/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? 'Deleting Account...' : 'Delete Account'}
            </button>
          </div>
        </form>
        
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={handleDeleteAccountCancel}
          onConfirm={handleDeleteAccountConfirm}
          title="Delete Account"
          message="This will permanently delete your account and all associated data. This action cannot be undone. Are you sure you want to continue?"
          confirmText="Delete Account"
          cancelText="Cancel"
          isDestructive={true}
        />
      </div>
    </div>
  );
}
