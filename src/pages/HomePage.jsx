import React, { useRef, useState } from 'react';
import { User, Upload, Settings, HelpCircle, LogOut, Loader2 } from 'lucide-react';
import Reveal from 'reveal.js'; // For future integration, placeholder for now
import SlideEditor from './SlideEditor';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array of File
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [results, setResults] = useState(null); // Gemini results
  const [showEditor, setShowEditor] = useState(false);
  const [imagePrompt, setImagePrompt] = useState(''); // User prompt for image generation
  const fileInputRef = useRef();

  // Handle adding files to the upload list
  const handleFileChange = (e) => {
    setError('');
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (files.some(f => f.type !== 'application/pdf')) {
      setError('Please upload PDF files only.');
      return;
    }
    if (files.some(f => f.size > 5 * 1024 * 1024)) {
      setError('Each file must be max 5MB.');
      return;
    }
    setUploadedFiles(prev => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Remove a file from the upload list
  const handleRemoveFile = (idx) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  // Show template modal on Generate PowerPoint
  const handleGenerate = () => {
    setShowTemplates(true);
  };

  // When a template is selected, process PDFs and show SlideEditor
  const themeNames = [
    'Classic Classroom',
    'STEM Modern',
    'Playful Primary',
    'Academic Minimal',
    'Scholarly Elegant',
    'Digital Chalkboard',
    'Science Spectrum',
    'History Heritage',
    'Art Studio',
    'Math Matrix',
    'Language Lab',
    'Tech Trends',
    'Research Ready',
    'Creative Canvas',
    'Youthful Yellow',
    'Calm Cyan',
    'Scholar Green',
    'Vibrant Violet',
    'Orange Orbit',
    'Blue Horizon',
  ];

  const handleSelectTemplate = async (templateIdx) => {
    const selectedThemeName = themeNames[templateIdx];
    setSelectedTemplate(selectedThemeName);
    setShowTemplates(false);
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      uploadedFiles.forEach(f => formData.append('file', f));
      // Removed: formData.append('generate_image', generateImage ? 'true' : 'false');
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');
      // Check for file-level errors
      const errorFiles = data.results.filter(file => file.error);
      if (errorFiles.length > 0) {
        setError('Some files failed to process: ' + errorFiles.map(f => `${f.filename}: ${f.error}`).join('; '));
        setLoading(false);
        return;
      }
      // Transform Gemini results into slide data for editor
      const slides = [];
      const globalSeenTerms = new Set();
      for (const file of data.results) {
        // Title slide
        slides.push({
          id: file.filename + '-title-' + Date.now(),
          components: [
            { id: 'title-' + file.filename, type: 'title', content: file.filename },
            { id: 'author-' + file.filename, type: 'author', content: 'Ernest Lorenzo' },
          ],
        });
        // PDF extracted images as slides
        if (file.extracted_images && Array.isArray(file.extracted_images) && file.extracted_images.length > 0) {
          file.extracted_images.forEach((imgPath, idx) => {
            slides.push({
              id: file.filename + '-extracted-img-' + idx + '-' + Date.now(),
              components: [
                { id: 'extracted-img-' + idx, type: 'image', content: `http://localhost:5000/${imgPath.replace(/\\/g, "/")}` }
              ]
            });
          });
        }
        // Content slides (deduplicate globally by term)
        (file.terms || []).forEach(term => {
          if (!globalSeenTerms.has(term.term)) {
            slides.push({
              id: term.term + '-slide-' + Math.random(),
              components: [
                { id: 'term-' + term.term, type: 'title', content: term.term },
                { id: 'def-' + term.term, type: 'paragraph', content: term.definition },
              ],
            });
            globalSeenTerms.add(term.term);
          }
        });
        // If generateImage is checked, generate image using Gemini summary or first term as prompt, and add as the last slide
        if (imagePrompt && imagePrompt.trim().length > 0) {
          try {
            const imgRes = await fetch('http://localhost:5000/generate-image', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ topic: imagePrompt }),
            });
            const imgData = await imgRes.json();
            if (imgData.image_url) {
              slides.push({
                id: file.filename + '-image-' + Date.now(),
                components: [
                  { id: 'img-' + file.filename, type: 'image', content: imgData.image_url },
                ],
              });
            }
          } catch (e) {
            // Optionally: setError('Image generation failed for ' + file.filename)
          }
        }
        // Removed redundant code block that was adding terms and images a second time
      }
      setResults(slides);
      setUploadedFiles([]);
      setShowEditor(true);
    } catch (err) {
      setError('Processing failed.');
    } finally {
      setLoading(false);
    }
  };

  // Responsive logic
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Mobile menu component
  function MenuMobile() {
    return (
      <div style={{ position: 'relative' }}>
        <button
          aria-label="Menu"
          style={{
            padding: 8,
            borderRadius: 8,
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 40,
              minWidth: 180,
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(30,41,59,0.15)',
              padding: '8px 0',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
            }}
          >
            <button style={menuItemStyle}><Settings size={18} style={{marginRight:8}}/> Settings</button>
            <button style={menuItemStyle}><HelpCircle size={18} style={{marginRight:8}}/> Help</button>
            <button style={menuItemStyle}><Upload size={18} style={{marginRight:8}}/> How to Use</button>
            <button style={menuItemStyle}><User size={18} style={{marginRight:8}}/> History</button>
            <button style={{...menuItemStyle, color: 'var(--color-primary)'}}><LogOut size={18} style={{marginRight:8}}/> Logout</button>
          </div>
        )}
      </div>
    );
  }

  // Menu item style
  const menuItemStyle = {
    padding: '10px 18px',
    background: 'none',
    border: 'none',
    color: 'var(--color-secondary)',
    fontWeight: 600,
    fontSize: 15,
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    cursor: 'pointer',
    transition: 'background 0.15s',
  };

  return (
    <div className={`min-h-screen flex ${isMobile ? 'flex-col' : 'flex-row'} bg-gradient-to-br from-blue-700 via-indigo-800 to-blue-900 animate-fade-in`}>
      {/* Sidebar or Topbar */}
      {isMobile ? (
        <nav className="w-full bg-blue-800 flex flex-row items-center justify-between px-4 py-2 relative z-10 animate-slide-up">
          <h1 className="text-xl font-extrabold tracking-wide text-[#FFD700] font-montserrat">KENBILEARN</h1>
          <MenuMobile />
        </nav>
      ) : (
        <aside className="w-16 bg-blue-800 flex flex-col items-center py-4 gap-6 animate-slide-up">
          <button className="p-2 rounded-lg text-[#FFD700] hover:bg-blue-700 transition-all"><Settings size={24} /></button>
          <button className="p-2 rounded-lg text-[#FFD700] hover:bg-blue-700 transition-all"><Upload size={24} /></button>
          <button className="p-2 rounded-lg text-[#FFD700] mt-auto mb-2 hover:bg-blue-700 transition-all"><HelpCircle size={24} /></button>
          <button className="p-2 rounded-lg text-[#FFD700] hover:bg-red-500 transition-all"><LogOut size={24} /></button>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center relative min-h-screen px-2 md:px-8">
        {/* Top bar for desktop only */}
        {!isMobile && (
          <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 pt-8 pb-4 animate-fade-in">
            <div></div>
            <h1 className="text-3xl font-extrabold tracking-widest text-[#FFD700] font-montserrat">KENBILEARN</h1>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs text-[#FFD700] font-semibold">nickname</div>
                <div className="text-xs text-[#FFD700] opacity-70 font-semibold">email@kenbilearn@gmail.com</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center font-bold text-[#FFD700]">N</div>
            </div>
          </div>
        )}

        {/* Upload box and file list */}
        <div className="w-full max-w-xl flex flex-col items-center justify-center min-h-[70vh] mt-16 animate-fade-in">
          <label htmlFor="pdf-upload" className="w-full border-2 border-dashed border-blue-400 rounded-xl p-12 flex flex-col items-center bg-white cursor-pointer mt-8 transition hover:bg-blue-50 animate-slide-up">
            {loading ? (
              <Loader2 className="animate-spin mb-4 text-[#FFD700]" size={48} />
            ) : (
              <Upload size={48} className="mb-4 text-[#FFD700]" />
            )}
            <span className="text-[#FFD700] font-semibold">{loading ? 'Processing PDF(s)...' : 'Upload PDF(s) (max 5MB each, multiple allowed)'}</span>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={loading}
              multiple
            />
          </label>
          <label className="flex flex-col items-start gap-1 mt-4 mb-2 font-semibold text-[#FFD700] w-full animate-fade-in">
            <span className="mb-1 text-[#FFD700]">Image Generation Prompt (optional):</span>
            <input
              type="text"
              value={imagePrompt}
              onChange={e => setImagePrompt(e.target.value)}
              placeholder="Type a prompt for image generation, or leave blank for no image"
              className="w-full px-3 py-2 rounded-md border border-blue-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-blue-50 text-[#FFD700] placeholder-[#FFD700]"
              disabled={loading}
            />
          </label>
          {error && <div className="mt-4 text-[#FFD700] text-base font-bold animate-fade-in animate-bounce-short">{error}</div>}
          {showEditor && results && selectedTemplate !== null && !error && (
            <div className="fixed inset-0 z-[9999] bg-blue-950/85 animate-fade-in">
              <SlideEditor
                initialSlides={results}
                selectedTemplate={selectedTemplate}
                onBack={() => {
                  setShowEditor(false);
                  setResults(null);
                  setSelectedTemplate(null);
                }}
              />
            </div>
          )}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 w-full max-w-md animate-fade-in">
              <h2 className="text-[#FFD700] font-bold mb-2">PDFs to Process:</h2>
              <ul className="bg-blue-50 rounded-lg p-4 m-0 list-none shadow-md">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center text-[#FFD700] text-base border-b border-blue-200 pb-1 mb-1 animate-slide-up">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <button
                      className="ml-4 text-[#FFD700] font-bold hover:text-[#FFD700] transition disabled:opacity-60"
                      onClick={() => handleRemoveFile(idx)}
                      disabled={loading}
                    >Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-4 mt-8 flex-wrap animate-fade-in">
            <button
              className={`px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 bg-blue-600 text-[#FFD700] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 animate-bounce-short ${loading || uploadedFiles.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={handleGenerate}
              disabled={loading || uploadedFiles.length === 0}
            >
              {loading ? 'Generating PowerPoint...' : 'Generate PowerPoint'}
            </button>
            <button
              className={`px-8 py-3 rounded-xl font-semibold text-lg border-2 border-blue-600 text-[#FFD700] bg-white hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 ${loading || uploadedFiles.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => setUploadedFiles([])}
              disabled={loading || uploadedFiles.length === 0}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Template selection modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-blue-950/80 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-3xl w-full animate-slide-up shadow-2xl">
              <h2 className="text-2xl font-extrabold text-[#FFD700] mb-4 text-center">Choose a PowerPoint Template</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in">
                {[
                  'Classic Classroom',
                  'STEM Modern',
                  'Playful Primary',
                  'Academic Minimal',
                  'Scholarly Elegant',
                  'Digital Chalkboard',
                  'Science Spectrum',
                  'History Heritage',
                  'Art Studio',
                  'Math Matrix',
                  'Language Lab',
                  'Tech Trends',
                  'Research Ready',
                  'Creative Canvas',
                  'Youthful Yellow',
                  'Calm Cyan',
                  'Scholar Green',
                  'Vibrant Violet',
                  'Orange Orbit',
                  'Blue Horizon',
                ].map((themeName, idx) => (
                  <button
                    key={idx}
                    className="rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-400 focus:border-orange-500 transition flex flex-col items-center p-2 bg-blue-100 hover:bg-orange-50 animate-slide-up"
                    onClick={() => handleSelectTemplate(idx)}
                  >
                    <div className="w-32 h-20 rounded mb-1" style={{background: `hsl(${idx*18}, 70%, 60%)`}}></div>
                    <span className="text-xs text-[#FFD700] font-semibold">{themeName}</span>
                  </button>
                ))}
              </div>
              <button className="mt-8 block mx-auto px-8 py-2 rounded-xl bg-blue-700 text-[#FFD700] hover:bg-blue-800 font-bold shadow-lg transition-all animate-bounce-short" onClick={() => setShowTemplates(false)}>Cancel</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
