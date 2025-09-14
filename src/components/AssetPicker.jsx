import React, { useEffect, useState } from 'react';
import AIImageGenerator from './AIImageGenerator';

export default function AssetPicker({ open, onClose, onSelect, onAIImageGenerated }) {
  const [assets, setAssets] = useState({ icons: [] });
  const [search, setSearch] = useState('');
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  useEffect(() => {
    if (open) {
      loadStaticAssets();
    }
  }, [open]);

  const loadStaticAssets = async () => {
    try {
      const loadedAssets = { icons: [] };
      
      console.log('🔍 AssetPicker: Starting dynamic asset scan...');
      
      // Define the folders to scan and their mappings
      const folderMappings = {
        'icons': 'icons',
        'emoji': 'icons',
        'background': 'icons',
        'illustrations': 'icons'
      };
      
      // Since import.meta.glob doesn't work with public/, we'll use a dynamic approach
      // Try to fetch a directory listing or use known common file extensions
      const commonExtensions = ['svg'];
      const commonFileNames = [
        //random icons
        'facebook', 'instagram', 'twitter', 'linked', 'youtube', 'tiktok', 'snapchat', 'telegram', 'whatsapp',
        'home', 'userMan', 'userGirl', 'userHeadset', 'heart', 'graduation', 'addition', 'minus', 'edit', 'delete', 'save',
        'atomic', 'abacus', 'puzzle', 'painting', 'telescope', 'calculator', 'pencil', 'ruler','book','arithmetic','board','bag','notebook','mail','message1','email1','qr','heartRate','gradient','patterns', 'texture','geometric', 'nature', 
        'star', 'flower','shapes', 'circle', 'square','septagon','pentagon','triangle', 'diamond','tree','microscope','announcement','notebook2','paper1','chemical','bacteria','doctor','scientist','cell','doctor1','sick','sick1','fever','speedometer','soap','arithmetic1','learning1','line1','line2','line3','line4','trophy','award','formula','books','formula1','photoshop','powerpoint','excel','email','firefox','linux','android','playstore','paypal','folder','yeah','nope','yes','ok','monitor','alien','ar1',
        //emojis
        'smile', 'happy', 'sad', 'angry', 'love', 'laugh', 'cry', 'wink', 'surprise', 'cool','disgust','devil','zombie','meme1',
        //illustrations
        'sharelink','securityon','coding','standout','controller','photographer','videoGame','workout','learning','payment','deliveryLocation',
        'investment','respond','beach','focused','watching reels','photoViewer','chatInterface','data','blogging','otw',
        'thinking','vr','workingLate','photocopy','interview','date','trainer','sketching','bitcoin','team','reading','professor','programmer','security','agreement','solution','ar','map','todo',
        //illustrations1
        'baseball','ceo','tvPresenter','seo','question','fingerprint','engineer','boss','career','maintenance1','conversation','science','question1','customerService','running','ai1','city','ai','fitness1','fastfood','shopping','onlinePayment','recycling','coding1','css','productManager','marketing','search2','onlineClass','ai1','salesman','rank','money','science1','cleaningComputer','underConstructions','moneyTransfer','rea','clickhere','city','car','calling','calling1','facetime','facetime1','messagesent',
        //backgrounds
        'background1','background2','background3','background4','background5','background6','background7','background8','background9','background10','background11','background12','background13','background14','background15','background16','background17','background18','background19','background20','background21','background22','background23','background24','background25','background26','background27','background28','background29','background30','background31','background32','background33','background34','background35','background36','background','background5','background6','background7','background8',

      ];
      
      // Scan each folder
      for (const [folderName, categoryKey] of Object.entries(folderMappings)) {
        console.log(`🔍 Scanning folder: ${folderName}`);
        
        // Try different combinations of common names and extensions
        for (const baseName of commonFileNames) {
          for (const ext of commonExtensions) {
            const fileName = `${baseName}.${ext}`;
            const url = `/static/${folderName}/${fileName}`;
            
            try {
              const response = await fetch(url, { method: 'HEAD' });
              if (response.ok) {
                // Check if we already have this file (avoid duplicates)
                const exists = loadedAssets[categoryKey].some(asset => asset.name === fileName);
                if (!exists) {
                  loadedAssets[categoryKey].push({
                    name: fileName,
                    url: url
                  });
                  console.log(`✅ Found: ${fileName} in ${categoryKey}`);
                }
              }
            } catch (e) {
              // File doesn't exist, continue
            }
          }
        }
        
      }
      
      console.log('🎯 Final scanned assets:', loadedAssets);
      setAssets(loadedAssets);
    } catch (error) {
      console.error('Failed to load static assets:', error);
      setAssets({ icons: [] });
    }
  };

  const filtered = assets.icons.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  const handleAIImageGenerated = (generatedImage) => {
    console.log('🎨 AssetPicker: AI image generated:', generatedImage);
    
    // Add the generated image to the icons list
    setAssets(prev => ({
      ...prev,
      icons: [
        {
          name: generatedImage.name,
          url: generatedImage.url
        },
        ...prev.icons
      ]
    }));
    
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
              className="flex-1 border border-gray-300 rounded px-3 py-2 mr-3 text-black"
              placeholder="Search assets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="text-gray-500 hover:text-gray-800 ml-2" onClick={onClose}>✕</button>
          </div>
          
          <div className="flex gap-2 mb-4">
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
                className="border border-gray-200 rounded-lg p-2 hover:bg-purple-50 flex flex-col items-center justify-center h-28"
                onClick={() => onSelect(asset)}
              >
                <img src={asset.url} alt={asset.name} className="w-16 h-16 object-contain" />
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
