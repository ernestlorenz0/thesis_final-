import React, { useEffect, useState } from 'react';
import AIImageGenerator from './AIImageGenerator';

export default function AssetPicker({ open, onClose, onSelect, onAIImageGenerated }) {
  const [assets, setAssets] = useState({ icons: [], emojis: [], backgrounds: [], illustrations: [] });
  const [tab, setTab] = useState('icons');
  const [search, setSearch] = useState('');
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  useEffect(() => {
    if (open) {
      fetch('/assets')
        .then(res => res.json())
        .then(setAssets)
        .catch(() => setAssets({ icons: [], emojis: [], backgrounds: [], illustrations: [] }));
    }
  }, [open]);

  const filtered = assets[tab].filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  const handleAIImageGenerated = (generatedImage) => {
    console.log('🎨 AssetPicker: AI image generated:', generatedImage);
    
    // Add the generated image to the current tab (illustrations)
    setAssets(prev => ({
      ...prev,
      illustrations: [
        {
          name: generatedImage.name,
          url: generatedImage.url
        },
        ...prev.illustrations
      ]
    }));
    
    // Switch to illustrations tab to show the new image
    setTab('illustrations');
    
    // Call the main onAIImageGenerated function to add to slide
    if (onAIImageGenerated) {
      console.log('🎨 AssetPicker: Calling main onAIImageGenerated');
      onAIImageGenerated(generatedImage);
    }
    
    // Also select the generated image in the asset picker
    onSelect({
      name: generatedImage.name,
      url: generatedImage.url
    });
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-6 w-[540px] max-h-[80vh] flex flex-col">
          <div className="flex items-center mb-4">
            <input
              className="flex-1 border border-gray-300 rounded px-3 py-2 mr-3"
              placeholder={`Search ${tab}...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="text-gray-500 hover:text-gray-800 ml-2" onClick={onClose}>✕</button>
          </div>
          
          <div className="flex gap-2 mb-4">
            {['icons','emojis','backgrounds','illustrations'].map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded ${tab===cat ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTab(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
            <button
              className={`px-3 py-1 rounded ${showAIGenerator ? 'bg-green-600 text-white' : 'bg-green-200 text-green-700'}`}
              onClick={() => setShowAIGenerator(!showAIGenerator)}
            >
              🎨 AI Generate
            </button>
          </div>

          {showAIGenerator && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 mb-2">
                <strong>AI Image Generator:</strong> Create custom images from text descriptions
              </p>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                onClick={() => setShowAIGenerator(false)}
              >
                Start Generating
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto grid grid-cols-5 gap-3">
            {filtered.length === 0 && <div className="col-span-5 text-gray-400 text-center">No assets found.</div>}
            {filtered.map(asset => (
              <button
                key={asset.url}
                className="border border-gray-200 rounded-lg p-2 hover:bg-purple-50 flex flex-col items-center"
                onClick={() => onSelect(asset)}
              >
                <img src={asset.url} alt={asset.name} className="w-16 h-16 object-contain mb-1" />
                <span className="text-xs truncate w-16">{asset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AIImageGenerator
        open={showAIGenerator}
        onClose={() => setShowAIGenerator(false)}
        onImageGenerated={handleAIImageGenerated}
      />
    </>
  );
}
