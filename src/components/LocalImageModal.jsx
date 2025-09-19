import React from 'react';

export default function LocalImageModal({ open, images, onSelect, onClose }) {
  if (!open) return null;
  // Group images by folder
  const grouped = images.reduce((acc, img) => {
    const folder = img.folder || 'root';
    if (!acc[folder]) acc[folder] = [];
    acc[folder].push(img);
    return acc;
  }, {});
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-purple-700">Local Image Library</h2>
        <div className="max-h-96 overflow-y-auto space-y-6">
          {Object.keys(grouped).length === 0 && (
            <div className="text-gray-400 text-center">No images found.</div>
          )}
          {Object.entries(grouped).map(([folder, imgs]) => (
            <div key={folder}>
              <h3 className="text-md font-semibold text-purple-600 mb-2 capitalize">{folder === 'root' ? 'Root' : folder}</h3>
              <div className="grid grid-cols-4 gap-4">
                {imgs.map(img => (
                  <button key={img.url} className="flex flex-col items-center" onClick={() => onSelect(img)}>
                    <img src={img.url.startsWith('http') ? img.url : `http://127.0.0.1:5000${img.url}`} alt={img.name} className="w-24 h-24 object-contain border rounded mb-1 shadow" />
                    <span className="text-xs truncate w-24">{img.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

