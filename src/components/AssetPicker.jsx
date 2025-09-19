import React, { useEffect, useState } from 'react';
import AIImageGenerator from './AIImageGenerator';

export default function AssetPicker({ open, onClose, onSelect, onAIImageGenerated }) {
  const [assets, setAssets] = useState({ icons: [] });
  const [generatedImages, setGeneratedImages] = useState([]);
  const [search, setSearch] = useState('');
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState('predefined'); // 'predefined' or 'generated'

  useEffect(() => {
    if (open) {
      loadStaticAssets();
      loadGeneratedImages();
    }
  }, [open]);

  const loadGeneratedImages = () => {
    try {
      const saved = localStorage.getItem('kenbilearn_generated_images');
      if (saved) {
        setGeneratedImages(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load generated images:', error);
    }
  };

  const saveGeneratedImage = (image) => {
    try {
      const updated = [image, ...generatedImages];
      setGeneratedImages(updated);
      localStorage.setItem('kenbilearn_generated_images', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save generated image:', error);
    }
  };

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
        // Additional icons - Part 1
        'accordion', 'addition1', 'adhesiveStrip', 'agreement', 'ai', 'ai1', 'alien1', 'analysis', 'analysis1', 'angry', 'ar', 'audio', 'aunt', 'australia', 'austronout', 'award1', 'award2', 'award3', 'award4', 'award5', 'award6', 'baby', 'bag1', 'bag2', 'baseball', 'blue-pen', 'book1', 'bookshelf', 'boy-brother', 'bulb', 'bus', 'busy', 'calculator1', 'calendar', 'calendar1', 'card', 'cd', 'cello', 'certificate', 'certificate1', 'chart', 'chatting', 'clock', 'clock1', 'clock2', 'cloud', 'combination', 'combination1', 'compassRuler', 'cool', 'correctionTape', 'cosmic-planet-11', 'creditCard', 'cry', 'czech-republic', 'dad', 'data1', 'data2', 'detection', 'devil', 'disgust', 'done', 'download', 'drum', 'earphone', 'earth', 'electricGuitar', 'electronic', 'feedback', 'finished', 'fitness', 'flute', 'folder1', 'folder2', 'germany', 'girl', 'globe', 'grandfather', 'grandmother', 'graph', 'greatIdea', 'happy', 'harmonica', 'harmonica1', 'hate', 'horn', 'hot', 'html', 'id', 'idea', 'jupiter', 'keyboard', 'lab', 'lamp', 'laugh', 'location', 'lol', 'love', 'male', 'man', 'man2', 'mars', 'math1', 'mercury', 'message', 'messageReceive', 'microphone', 'moon', 'moon1', 'moonSleep', 'mouse', 'neptune', 'network', 'notebook1', 'notebook3', 'office', 'office1', 'officeChair', 'orderConfirmed', 'paper', 'party', 'pen-combination', 'planet-03', 'planet-08', 'planet-09', 'planet-10', 'planet-12', 'planet-13', 'planet-14', 'podcaster', 'printer', 'profile1', 'profile10', 'profile11', 'profile12', 'profile13', 'profile14', 'profile15', 'profile16', 'profile2', 'profile3', 'profile4', 'profile5', 'profile6', 'profile7', 'profile8', 'profile9', 'protection', 'radio', 'record', 'red-pen', 'ruler1', 'sample-icon', 'saturn', 'savings', 'saxophone', 'search', 'search1', 'security1', 'sharpener', 'skype', 'smile', 'snare-drum', 'socialMedia', 'socialMedia1', 'spaceship', 'spain', 'statistics', 'support-online', 'surprise', 'task', 'teamMeeting', 'teamPresentation1', 'teamWork', 'telephone', 'thanks', 'trophy1', 'trumpet', 'tvPresenter1', 'ufo', 'uranus', 'usa', 'venus', 'vision', 'wink', 'wooden-guitar', 'zombie',
        //emojis (removing duplicates already in random icons)
        'sad', 'laugh', 'meme1',
        //illustrations (removing duplicates already in random icons)
        'sharelink','securityon','coding','standout','controller','photographer','videoGame','workout','learning','payment','deliveryLocation',
        'investment','respond','beach','focused','watching reels','photoViewer','chatInterface','data','blogging','otw',
        'thinking','vr','workingLate','photocopy','interview','date','trainer','sketching','bitcoin','team','reading','professor','programmer','security','solution','map','todo',
        //illustrations1 (removing duplicates)
        'ceo','tvPresenter','seo','question','fingerprint','engineer','boss','career','maintenance1','conversation','science','question1','customerService','running','fitness1','fastfood','shopping','onlinePayment','recycling','coding1','css','productManager','marketing','search2','onlineClass','salesman','rank','money','science1','cleaningComputer','underConstructions','moneyTransfer','rea','clickhere','calling','calling1','facetime','facetime1','messagesent',
        // Additional missing icons - Part 2
        'maintenance', 'mom', 'lol', 'hate', 'orderConfirmed', 'party', 'podcaster', 'protection', 'record', 'savings', 'socialMedia', 'socialMedia1', 'task', 'teamMeeting', 'teamPresentation1', 'teamWork', 'thanks', 'vision',
        // New illustrations and complex images
        '401-1', '401-2', '401', 'Back to back', 'BalletDoodle', 'Blood test', 'Blood test1', 'Chat bot', 'Classroom', 'Coach', 'Code snippets', 'CoffeeDoddle', 'Cohort analysis', 'DJ', 'DancingDoodle', 'Discovery', 'Doggie', 'DumpingDoodle', 'Empty street', 'Fighting', 'Fighting1', 'Fighting2', 'Finance', 'Globalization', 'Happy announcement', 'Horseback', 'Imam', 'Insurance', 'Insurance1', 'Insurance2', 'Islamic new year', 'Landscape', 'Location review', 'LovingDoodle', 'Mathematics', 'Mathematics1', 'Medical care', 'MeditatingDoodle', 'MessyDoodle', 'Muslim graduation', 'Muslim graduation1', 'Online article', 'Online_resume', 'Open source', 'Operating system', 'Pop-up', 'Reading-comics', 'ReadingDoodle', 'Recording', 'RunningDoodle', 'SEO1', 'Select player', 'SelfieDoodle', 'Server', 'Server1', 'SittingDoodle', 'SprintingDoodle', 'Teacher', 'Teacher1', 'Teacher2', 'UI-UX', 'Unicorn',
        // Additional new icons
        'blind', 'brain', 'brand', 'computer', 'computer1', 'computer2', 'computer3', 'engineer1', 'family', 'family1', 'family2', 'family3', 'family4', 'fight', 'ghost', 'ghost1', 'ghost2', 'graduation-hats', 'graduation1', 'graduation2', 'graduation3', 'grammar correction', 'guidelines', 'high five', 'jazz-band', 'manipulation', 'manipulation1', 'newsstand', 'newsstand1', 'newsstand2', 'obligations', 'obligations1', 'oversight', 'park', 'pianist', 'rebranding', 'robot', 'robot1', 'roofer', 'security2', 'sitting-reading', 'social-media', 'trumpet1',
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

  // Filter based on active tab
  const getFilteredAssets = () => {
    if (activeTab === 'generated') {
      return generatedImages.filter(img => 
        img.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return assets.icons.filter(a => 
        a.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  const filteredAssets = getFilteredAssets();

  const handleAIImageGenerated = (generatedImage) => {
    console.log('🎨 AssetPicker: AI image generated:', generatedImage);
    
    // Add timestamp to the generated image
    const imageWithTimestamp = {
      ...generatedImage,
      generatedAt: new Date().toISOString()
    };
    
    // Save to generated images list
    saveGeneratedImage(imageWithTimestamp);
    
    // Add the generated image to the predefined assets list as well
    setAssets(prev => ({
      ...prev,
      icons: [
        {
          name: imageWithTimestamp.name,
          url: imageWithTimestamp.url
        },
        ...prev.icons
      ]
    }));
    
    // Switch to generated images tab to show the new image
    setActiveTab('generated');
    
    // Call the main onAIImageGenerated function to add to slide
    if (onAIImageGenerated) {
      console.log('🎨 AssetPicker: Calling main onAIImageGenerated');
      onAIImageGenerated(imageWithTimestamp);
    }
    
    // Also select the generated image in the asset picker
    onSelect({
      name: imageWithTimestamp.name,
      url: imageWithTimestamp.url
    });
  };

  if (!open) return null;

  return (
    <>
      {/* Compact Modern Modal */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        {/* Compact Modal Container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-2xl blur-lg transition-all duration-300" />
          <div className="relative bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl p-4 w-[520px] max-h-[70vh] flex flex-col overflow-hidden">
            
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Assets
              </h2>
              <button 
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" 
                onClick={onClose}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-lg">
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'predefined'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('predefined')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Predefined Assets
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'generated'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                onClick={() => setActiveTab('generated')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Images Generated
                {generatedImages.length > 0 && (
                  <span className="bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {generatedImages.length}
                  </span>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 text-sm"
                placeholder={activeTab === 'predefined' ? 'Search predefined assets...' : 'Search generated images...'}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* AI Generate Button - Only show on predefined tab */}
            {activeTab === 'predefined' && (
              <div className="mb-4">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all duration-200 text-sm focus:outline-none focus:ring-2 ${
                    showAIGenerator 
                      ? 'bg-emerald-500 text-white focus:ring-emerald-500/50' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400/50'
                  }`}
                  onClick={() => setShowAIGenerator(!showAIGenerator)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  AI Generate
                </button>

                {/* AI Generator Info */}
                {showAIGenerator && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-800 text-sm mb-2">
                      <strong>AI Image Generator:</strong> Create custom images from text descriptions
                    </p>
                    <button
                      className="px-3 py-1.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      onClick={() => setShowAIGenerator(false)}
                    >
                      Start Generating
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Assets Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-6 gap-2">
                {filteredAssets.length === 0 && (
                  <div className="col-span-6 text-gray-500 text-center py-6">
                    {activeTab === 'generated' ? (
                      <>
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">
                          {generatedImages.length === 0 
                            ? "No generated images yet. Use AI Generate to create your first image!" 
                            : "No generated images match your search."
                          }
                        </p>
                      </>
                    ) : (
                      <>
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-sm">No predefined assets found.</p>
                      </>
                    )}
                  </div>
                )}
                {filteredAssets.map((asset, index) => (
                  <button
                    key={asset.url || `${asset.name}-${index}`}
                    className="group relative border border-gray-200 rounded-lg p-2 hover:border-indigo-400 hover:shadow-md flex flex-col items-center justify-center h-20 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    onClick={() => onSelect(asset)}
                    title={asset.name}
                  >
                    <img 
                      src={asset.url} 
                      alt={asset.name} 
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200" 
                    />
                    {/* Show generation timestamp for generated images */}
                    {activeTab === 'generated' && asset.generatedAt && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" title="AI Generated" />
                    )}
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                ))}
              </div>
            </div>
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
