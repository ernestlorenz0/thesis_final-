// =========================
// Imports
// =========================
import React, { useRef, useState } from 'react';
import { User, Upload, Settings, HelpCircle, LogOut, Loader2 } from 'lucide-react';
import Reveal from 'reveal.js'; // For future integration, placeholder for now
import { themeComponents as themeRegistry } from '../utils/themes';
import { saveHistoryItem } from '../firebaseAuth';
import SlideEditor from './SlideEditor';
import UserMenuDropdown from '../components/UserMenuDropdown';
import MenuMobile from '../components/MenuMobile';
import { useUserMenuDropdown, useMenuMobile } from '../hooks/useMenus';
import { getPlaceholderSlides } from "../components/placeholderSlides";

// =========================
// HomePage Component
// =========================
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

  const [previewMode, setPreviewMode] = useState(false);  

    // =========================
  // Handlers
  // =========================
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

    if (previewMode) {
      // In preview mode, create slides for each layout in the chosen theme
      const themeModule = themeRegistry[selectedThemeName];
      if (!themeModule) {
        setShowEditor(true);
        return;
      }

      const allExports = Object.keys(themeModule).filter(k => typeof themeModule[k] === 'function');
      const hasTitle = allExports.includes('TitleSlide');
      const hasEnd = allExports.includes('EndSlide');

      const layoutNames = allExports.filter(name => !['TitleSlide', 'EndSlide'].includes(name));

      const previewSlides = [];

      if (hasTitle) {
        previewSlides.push({
          id: 'preview-title-' + Date.now(),
          components: [
            { id: 'title', type: 'title', content: selectedThemeName + ' — Title' },
            { id: 'subtitle', type: 'paragraph', content: 'Subtitle placeholder' },
            { id: 'image', type: 'image', content: '' }
          ]
        });
      }

      layoutNames.forEach((layout, idx) => {
        previewSlides.push({
          id: `preview-${layout}-${idx}-${Date.now()}`,
          layout,
          components: [
            { id: `title-${idx}`, type: 'title', content: layout },
            { id: `para-${idx}`, type: 'paragraph', content: 'This is a placeholder paragraph to check alignment.' },
            { id: `img-${idx}`, type: 'image', content: '' }
          ]
        });
      });

      if (hasEnd) {
        previewSlides.push({
          id: 'preview-end-' + Date.now(),
          components: [
            { id: 'end', type: 'end', content: 'Thank You!' },
            { id: 'closing', type: 'paragraph', content: 'Closing remarks here.' }
          ]
        });
      }

      setResults(previewSlides);
      setShowEditor(true);
      return;
    }

    // Existing API flow
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      uploadedFiles.forEach(f => formData.append('file', f));
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');
      const errorFiles = data.results.filter(file => file.error);
      if (errorFiles.length > 0) {
        setError('Some files failed to process: ' + errorFiles.map(f => `${f.filename}: ${f.error}`).join('; '));
        setLoading(false);
        return;
      }
      const slides = [];
      const globalSeenTerms = new Set();
      for (const file of data.results) {
        slides.push({
          id: file.filename + '-title-' + Date.now(),
          components: [
            { id: 'title-' + file.filename, type: 'title', content: file.filename },
            { id: 'author-' + file.filename, type: 'author', content: 'Ernest Lorenzo' },
          ],
        });
        if (file.extracted_images && Array.isArray(file.extracted_images)) {
          file.extracted_images.forEach((imgPath, idx) => {
            slides.push({
              id: file.filename + '-extracted-img-' + idx + '-' + Date.now(),
              components: [
                { id: 'extracted-img-' + idx, type: 'image', content: `http://localhost:5000/${imgPath.replace(/\\/g, "/")}` }
              ]
            });
          });
        }
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

    // =========================
  // Responsive logic
  // =========================
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  // =========================
  // Dropdown state and Effect Hooks (via custom hooks)
  // =========================
  const { userMenuOpen, setUserMenuOpen, userMenuRef } = useUserMenuDropdown();
  const { menuOpen, setMenuOpen } = useMenuMobile();

  // =========================
  // Render
  // =========================
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF]`}>
      {/* Sidebar or Topbar */}
      {isMobile ? (
  <nav className="w-full bg-blue-800 flex flex-row items-center justify-between px-4 py-2 relative z-10 animate-slide-up">
    <h1 className="text-xl font-extrabold tracking-wide text-[#8C6BFA] font-montserrat">KENBILEARN</h1>
    <MenuMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
  </nav>
) : null}

      {/* Main content */}
      <main className="w-full flex flex-col items-center justify-center relative min-h-screen px-2 md:px-8">
  {/* Header title and subtitle */}
  <div className="w-full flex flex-col items-center justify-center mt-12 mb-8">
    <h1 className="text-[2.5rem] md:text-[2.8rem] font-extrabold text-[#8C6BFA] mb-2 leading-tight text-center drop-shadow-sm">Transform PDFs into PowerPoints</h1>
    <p className="text-base md:text-lg text-[#888] font-medium text-center max-w-xl mb-2">Upload your PDF documents and let our AI generate beautiful PowerPoint presentations with optional custom imagery.</p>
  </div>
        {/* Top bar for desktop only */}
        {!isMobile && (
  <div className="absolute top-0 left-0 w-full flex justify-end items-center px-12 pt-8 pb-4 animate-fade-in">
    <UserMenuDropdown userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} userMenuRef={userMenuRef} previewMode={previewMode} setPreviewMode={setPreviewMode} />
  </div>
)}

        {/* Upload box and file list */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center min-h-[70vh] mt-16 animate-fade-in">
  <label htmlFor="pdf-upload" className="w-full border border-dashed border-[#E3D9FA] rounded-2xl py-20 px-16 flex flex-col items-center bg-white cursor-pointer shadow-[0_2px_18px_0_rgba(120,90,200,0.06)] transition hover:bg-[#F6F2FF] animate-slide-up">
  {loading ? (
    <Loader2 className="animate-spin mb-4 text-[#BFA8FF]" size={48} />
  ) : (
    <Upload size={48} className="mb-4 text-[#BFA8FF]" />
  )}
  <span className="text-[#222] font-semibold text-lg">Upload PDF(s)</span>
  <span className="text-xs text-[#888] mt-1">Drop your files here or click to browse<br/>(max 5MB each, multiple allowed)</span>
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
  <div className="w-full mt-8 mb-2">
  <div className="bg-white rounded-xl shadow-sm px-8 py-6 flex flex-col gap-2 border border-[#E3D9FA]">
    <label className="text-sm font-semibold text-[#444] mb-2">Image Generation Prompt (optional):</label>
    <input
      type="text"
      value={imagePrompt}
      onChange={e => setImagePrompt(e.target.value)}
      placeholder="Type a prompt for image generation, or leave blank for no image"
      className="w-full px-8 py-5 rounded-lg border border-[#E3D9FA] text-lg focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] transition bg-transparent text-[#444] placeholder-[#BFA8FF]"
      disabled={loading}
    />
  </div>
</div>
          {error && <div className="mt-4 text-[#8C6BFA] text-base font-bold animate-fade-in animate-bounce-short">{error}</div>}
          {showEditor && selectedTemplate !== null && !error && (
            <div className="fixed inset-0 z-[9999] bg-blue-950/85 animate-fade-in">
              <SlideEditor
                initialSlides={results || []}
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
              <h2 className="text-[#8C6BFA] font-bold mb-2">PDFs to Process:</h2>
              <ul className="bg-blue-50 rounded-lg p-4 m-0 list-none shadow-md">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center text-[#8C6BFA] text-base border-b border-blue-200 pb-1 mb-1 animate-slide-up">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <button
                      className="ml-4 text-[#8C6BFA] font-bold hover:text-[#8C6BFA] transition disabled:opacity-60"
                      onClick={() => handleRemoveFile(idx)}
                      disabled={loading}
                    >Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex gap-8 mt-8 flex-wrap animate-fade-in w-full justify-center">
  <div className="flex gap-8 mt-8 flex-wrap animate-fade-in w-full justify-center">
          <button
            className={`w-[340px] py-4 rounded-xl font-bold text-lg shadow transition-all duration-200 
              bg-[#E5D8FF] text-[#8C6BFA] hover:bg-[#E7E0FF] focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] 
              ${loading || (!previewMode && uploadedFiles.length === 0) ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={() => setShowTemplates(true)}
            disabled={loading || (!previewMode && uploadedFiles.length === 0)}
          >
            {loading && !previewMode ? "Generating PowerPoint..." : previewMode ? "Preview Themes" : "Generate PowerPoint"}
          </button>
        </div>
  <button
    className={`px-6 py-3 rounded-xl font-semibold text-base border border-[#E3D9FA] text-[#8C6BFA] bg-white hover:bg-[#F6F2FF] focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] transition-all duration-200 ${loading || uploadedFiles.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
    onClick={() => setUploadedFiles([])}
    disabled={loading || uploadedFiles.length === 0}
  >
    Clear All
  </button>
</div>
        </div>

        {/* Template selection modal */}
        {showTemplates && (
  <div className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in" style={{background: 'radial-gradient(ellipse at top left, #F3EDFF 0%, #F7F4FF 60%, #F5F1FF 100%)'}}>
    <div className="rounded-2xl px-0 pt-0 pb-8 max-w-5xl w-full animate-slide-up shadow-2xl border border-[#E3D9FA] relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF]" style={{height: '540px'}}>
      <div className="w-full flex items-center justify-between px-8 pt-7 pb-4 border-b border-[#E3D9FA]">
        <h2 className="text-xl md:text-2xl font-bold text-[#8C6BFA] tracking-tight">Choose a Template</h2>
        <button className="text-gray-400 hover:text-[#8C6BFA] text-2xl px-2 py-1 rounded-full transition" onClick={() => setShowTemplates(false)}>&times;</button>
      </div>
      <div className="w-full px-8 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-4 gap-6 no-scrollbar" style={{height: '320px', overflow: 'hidden'}}>
          {themeNames.map((themeName, idx) => (
            <button
              key={idx}
              className="rounded-lg overflow-hidden border border-[#23202B] hover:border-[#8C6BFA] transition flex flex-col items-center p-4 bg-[#23202B] hover:bg-[#1e1b26] focus:border-[#8C6BFA] shadow-md"
              onClick={() => handleSelectTemplate(idx)}
            >
              <div className="w-36 h-24 rounded mb-2 bg-[#23202B] flex items-center justify-center" style={{background: `linear-gradient(135deg, hsl(${idx*18}, 70%, 40%) 60%, #23202B 100%)`}}></div>
              <span className="text-sm text-white font-semibold text-center leading-tight" style={{wordBreak:'break-word'}}>{themeName}</span>
            </button>
          ))}
        </div>
        <button className="mt-8 block mx-auto px-8 py-2 rounded-xl bg-[#23202B] text-[#8C6BFA] hover:bg-[#2a2740] font-bold shadow-lg transition-all" onClick={() => setShowTemplates(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}
