import React from 'react';

export default function HistoryPage({ uploadedFiles = [] }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF] p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#8C6BFA] mb-4">Upload History</h2>
        {uploadedFiles.length === 0 ? (
          <div className="text-gray-400">No uploaded files yet.</div>
        ) : (
          <ul className="w-full divide-y divide-[#E3D9FA]">
            {uploadedFiles.map((file, idx) => (
              <li key={idx} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="text-[#8C6BFA] font-semibold">{file.name}</span>
                <span className="text-xs text-gray-400 mt-1 md:mt-0">Uploaded: {file.uploadedAt || 'recently'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
