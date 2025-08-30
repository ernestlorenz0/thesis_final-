import React, { useState } from 'react';
import { User, HelpCircle, Upload } from 'lucide-react';
import ProfilePage from './ProfilePage';
import HistoryPage from './HistoryPage';
import HelpPage from './HelpPage';

export default function DashboardPage({ user, uploadedFiles }) {
  const [tab, setTab] = useState('profile');

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#8C6BFA] via-[#A3A1FF] to-[#C3B6FF] flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-screen-xl bg-white rounded-2xl shadow-xl p-2 md:p-4 flex flex-col items-center overflow-visible">
        <div className="w-full flex items-center mb-2">
          <button onClick={() => window.location.href='/home'} className="border border-[#8C6BFA] text-[#8C6BFA] px-4 py-1 rounded-lg font-semibold hover:bg-[#F3EDFF] transition mr-auto">&larr; Back</button>
        </div>
        <h2 className="text-2xl font-bold text-[#8C6BFA] mb-2">User Dashboard</h2>
        <p className="text-gray-500 mb-6">Manage your profile, view history, and get help</p>
        <div className="flex w-full justify-center gap-8 mb-8 border-b border-[#E3D9FA]">
          <button onClick={() => setTab('profile')} className={`px-6 py-2 font-semibold rounded-t-lg border-b-2 ${tab==='profile' ? 'border-[#8C6BFA] text-[#8C6BFA] bg-[#F3EDFF]' : 'border-transparent text-gray-500 bg-transparent'} transition`}> <User size={18} className="inline mr-2"/> Profile</button>
          <button onClick={() => setTab('history')} className={`px-6 py-2 font-semibold rounded-t-lg border-b-2 ${tab==='history' ? 'border-[#8C6BFA] text-[#8C6BFA] bg-[#F3EDFF]' : 'border-transparent text-gray-500 bg-transparent'} transition`}> <Upload size={18} className="inline mr-2"/> History</button>
          <button onClick={() => setTab('help')} className={`px-6 py-2 font-semibold rounded-t-lg border-b-2 ${tab==='help' ? 'border-[#8C6BFA] text-[#8C6BFA] bg-[#F3EDFF]' : 'border-transparent text-gray-500 bg-transparent'} transition`}> <HelpCircle size={18} className="inline mr-2"/> Help</button>
        </div>
        <div className="w-full">
          {tab === 'profile' && <ProfilePage user={user} />}
          {tab === 'history' && <HistoryPage uploadedFiles={uploadedFiles} />}
          {tab === 'help' && <HelpPage />}
        </div>
      </div>
    </div>
  );
}
