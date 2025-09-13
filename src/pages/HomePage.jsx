// =========================
// Imports
// =========================
import React, { useRef, useState, useEffect } from 'react';
import { User, Upload, Settings, HelpCircle, LogOut, Loader2 } from 'lucide-react';
import Reveal from 'reveal.js'; // For future integration, placeholder for now
import { themeComponents as themeRegistry, themeNames } from '../utils/themes';
import { saveHistoryItem } from '../firebaseAuth';
import SlideEditor from './SlideEditor';
import UserMenuDropdown from '../components/UserMenuDropdown';
import TemplateThumbnail from '../components/TemplateThumbnail';
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

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleSelectTemplate = async (templateIdx) => {
    const selectedThemeName = themeNames[templateIdx];
    console.log('Template selected:', selectedThemeName, 'at index:', templateIdx);
    setSelectedTemplate(selectedThemeName);
    setShowTemplates(false);

    // If in preview mode, create preview slides
    if (isPreviewMode) {
      const themeModule = themeRegistry[selectedThemeName];
      if (!themeModule) {
        setShowEditor(true);
        return;
      }

      const previewSlides = [];

      // Use the same mapping logic as the main generation
      const mapThemeSlidesToSequence = (themeModule) => {
        const availableSlides = Object.keys(themeModule).filter(k => typeof themeModule[k] === 'function');
        const mapping = {};
        
        // Map TitleSlide
        if (availableSlides.includes('TitleSlide')) {
          mapping['TitleSlide'] = 'TitleSlide';
        }
        
        // Map ImageSlide (or similar)
        const imageSlideNames = ['ImageSlide', 'MainSlide4', 'SectionSlide'];
        for (const name of imageSlideNames) {
          if (availableSlides.includes(name)) {
            mapping['ImageSlide'] = name;
            break;
          }
        }
        
        // Map MainSlide1 (or MainSlide)
        if (availableSlides.includes('MainSlide1')) {
          mapping['MainSlide1'] = 'MainSlide1';
        } else if (availableSlides.includes('MainSlide')) {
          mapping['MainSlide1'] = 'MainSlide';
        }
        
        // Map MainSlide2
        if (availableSlides.includes('MainSlide2')) {
          mapping['MainSlide2'] = 'MainSlide2';
        }
        
        // Map MainSlide3
        if (availableSlides.includes('MainSlide3')) {
          mapping['MainSlide3'] = 'MainSlide3';
        }
        
        // Map EndSlide
        if (availableSlides.includes('EndSlide')) {
          mapping['EndSlide'] = 'EndSlide';
        }
        
        return mapping;
      };

      const slideMapping = mapThemeSlidesToSequence(themeModule);
      if (!slideMapping || Object.keys(slideMapping).length === 0) {
        console.error('No valid slide mappings found for preview');
        setError('No valid slide layouts found for the selected template');
        return;
      }

      // Define the proper slide sequence for preview
      const previewSequence = ['TitleSlide', 'ImageSlide', 'MainSlide1', 'MainSlide2', 'MainSlide3', 'EndSlide'];

      previewSequence.forEach((layoutName, idx) => {
        if (slideMapping && slideMapping[layoutName]) {
          const slide = {
            id: `preview-${layoutName}-${idx}-${Date.now()}`,
            layout: slideMapping[layoutName],
            components: []
          };

          if (layoutName === 'TitleSlide') {
            slide.components = [
              { id: 'title', type: 'title', content: selectedThemeName + ' — Title' },
              { id: 'subtitle', type: 'paragraph', content: 'Subtitle placeholder' }
            ];
          } else if (layoutName === 'ImageSlide') {
            slide.components = [
              { id: 'img-title', type: 'title', content: 'Image Slide' },
              { id: 'img-placeholder', type: 'image', content: '' }
            ];
          } else if (layoutName.startsWith('MainSlide')) {
            slide.components = [
              { id: `title-${idx}`, type: 'title', content: layoutName },
              { id: `para-${idx}`, type: 'paragraph', content: 'This is a placeholder paragraph to check alignment and layout.' }
            ];
          } else if (layoutName === 'EndSlide') {
            slide.components = [
              { id: 'end', type: 'title', content: 'Thank You!' },
              { id: 'closing', type: 'paragraph', content: 'Closing remarks here.' }
            ];
          }

          previewSlides.push(slide);
        }
      });

      setResults(previewSlides);
      setShowEditor(true);
      setIsPreviewMode(false); // Reset preview mode
      return;
    }

    // Existing API flow
    setLoading(true);
    setError('');
    try {
      console.log('Starting API call to process files:', uploadedFiles.map(f => f.name));
      const formData = new FormData();
      uploadedFiles.forEach(f => formData.append('file', f));
      
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
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
      let slideIndex = 0;
      
      // Define the slide layout sequence - we'll map theme-specific names to our standard sequence
      const standardSequence = ['TitleSlide', 'ImageSlide', 'MainSlide1', 'MainSlide2', 'MainSlide3', 'EndSlide'];
      
      // Map theme-specific slide names to our standard sequence
      const mapThemeSlidesToSequence = (themeModule) => {
        const availableSlides = Object.keys(themeModule).filter(k => typeof themeModule[k] === 'function');
        const mapping = {};
        
        // Map TitleSlide
        if (availableSlides.includes('TitleSlide')) {
          mapping['TitleSlide'] = 'TitleSlide';
        }
        
        // Map ImageSlide (or similar)
        const imageSlideNames = ['ImageSlide', 'MainSlide4', 'SectionSlide'];
        for (const name of imageSlideNames) {
          if (availableSlides.includes(name)) {
            mapping['ImageSlide'] = name;
            break;
          }
        }
        
        // Map MainSlide1 (or MainSlide)
        if (availableSlides.includes('MainSlide1')) {
          mapping['MainSlide1'] = 'MainSlide1';
        } else if (availableSlides.includes('MainSlide')) {
          mapping['MainSlide1'] = 'MainSlide';
        }
        
        // Map MainSlide2
        if (availableSlides.includes('MainSlide2')) {
          mapping['MainSlide2'] = 'MainSlide2';
        }
        
        // Map MainSlide3
        if (availableSlides.includes('MainSlide3')) {
          mapping['MainSlide3'] = 'MainSlide3';
        }
        
        // Map EndSlide
        if (availableSlides.includes('EndSlide')) {
          mapping['EndSlide'] = 'EndSlide';
        }
        
        return mapping;
      };
      
      const themeModule = themeRegistry[selectedThemeName];
      if (!themeModule) {
        throw new Error(`Theme module not found for template: ${selectedThemeName}`);
      }
      
      const slideMapping = mapThemeSlidesToSequence(themeModule);
      if (!slideMapping || Object.keys(slideMapping).length === 0) {
        throw new Error(`No valid slide mappings found for template: ${selectedThemeName}`);
      }
      
      const mainSlideLayouts = ['MainSlide1', 'MainSlide2', 'MainSlide3'].filter(key => slideMapping[key]);
      
      // Debug logging
      console.log('Selected template:', selectedThemeName);
      console.log('Slide mapping:', slideMapping);
      
      // Add title slide
      if (slideMapping['TitleSlide']) {
        const firstFileName = data.results && data.results.length > 0 ? data.results[0].filename.replace(/\.pdf$/i, '') : 'Generated Presentation';
        slides.push({
          id: `title-${firstFileName}-${Date.now()}`,
          layout: slideMapping['TitleSlide'],
          components: [
            { id: 'title', type: 'title', content: firstFileName.replace(/\.pdf$/i, '').trim() },
            { id: 'subtitle', type: 'paragraph', content: 'Created from uploaded PDFs' },
          ],
        });
      }
      
      // Collect all content for distribution
      const allContent = [];
      
      for (const file of data.results) {
        // Skip adding file title as content since we already have it in the title slide
        
        // Add extracted images
        if (file.extracted_images && Array.isArray(file.extracted_images)) {
          file.extracted_images.forEach((imgPath, idx) => {
            allContent.push({
              type: 'image',
              content: `http://localhost:5000/${imgPath.replace(/\\/g, "/")}`,
              source: 'extracted_image'
            });
          });
        }
        
        // Add terms with their definitions together
        (file.terms || []).forEach(term => {
          if (!globalSeenTerms.has(term.term)) {
            allContent.push({
              type: 'term_definition',
              title: term.term,
              content: term.definition,
              source: 'term_with_definition'
            });
            globalSeenTerms.add(term.term);
          }
        });
      }
      
      // Distribute content across slides following the sequence
      let currentLayoutIndex = 1; // Start after TitleSlide
      let mainSlideIndex = 0;
      
      // Debug logging
      console.log('All content to distribute:', allContent.length, 'items');
      console.log('Content types:', allContent.map(c => c.type));
      
      for (let i = 0; i < allContent.length; i++) {
        const content = allContent[i];
        if (!content) {
          console.log(`Content ${i} is null or undefined, skipping`);
          continue;
        }
        
        let layout;
        
        if (currentLayoutIndex === 1 && slideMapping && slideMapping['ImageSlide']) {
          // Image slide
          layout = slideMapping['ImageSlide'];
          // console.log(`Content ${i}: Using ImageSlide layout: ${layout}`);
          currentLayoutIndex++;
        } else if (currentLayoutIndex >= 2 && currentLayoutIndex <= 4) {
          // Main slides 1, 2, 3
          const mainSlideKey = ['MainSlide1', 'MainSlide2', 'MainSlide3'][currentLayoutIndex - 2];
          if (slideMapping && slideMapping[mainSlideKey]) {
            layout = slideMapping[mainSlideKey];
            // console.log(`Content ${i}: Using ${mainSlideKey} layout: ${layout}`);
            currentLayoutIndex++;
            if (currentLayoutIndex > 4) {
              currentLayoutIndex = 2; // Reset to MainSlide1 for repetition
              mainSlideIndex++;
            }
          } else {
            // Skip this slide type if not available
            // console.log(`Content ${i}: Skipping ${mainSlideKey} - not available in mapping`);
            currentLayoutIndex++;
            if (currentLayoutIndex > 4) {
              currentLayoutIndex = 2;
            }
            continue;
          }
        } else {
          // Skip if no valid layout
          // console.log(`Content ${i}: No valid layout found, skipping`);
          continue;
        }
        
        // Create slide with appropriate layout
        const slide = {
          id: `slide-${i}-${Date.now()}`,
          layout: layout,
          components: []
        };
        
        // Helper function to clean content
        const cleanContent = (text) => {
          if (!text) return '';
          return String(text)
            .trim()
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/^\d+\)\s*/, '') // Remove leading numbers like "1) " or "1970s) "
            .replace(/^[:\-]\s*/, '') // Remove leading colons or dashes
            .replace(/^\([^)]*\)\s*/, '') // Remove leading parentheses like "(1970s) "
            .replace(/^[A-Za-z]+\s*\)\s*/, '') // Remove text followed by closing parenthesis like "1970s) "
            .trim();
        };

        // Add content based on type
        if (content.type === 'title') {
          slide.components.push({
            id: `title-${i}`,
            type: 'title',
            content: cleanContent(content.content)
          });
        } else if (content.type === 'paragraph') {
          slide.components.push({
            id: `paragraph-${i}`,
            type: 'paragraph',
            content: cleanContent(content.content)
          });
        } else if (content.type === 'image') {
          slide.components.push({
            id: `image-${i}`,
            type: 'image',
            content: content.content
          });
        } else if (content.type === 'term_definition') {
          // Add both title and paragraph for term definitions
          slide.components.push({
            id: `term-title-${i}`,
            type: 'title',
            content: cleanContent(content.title)
          });
          slide.components.push({
            id: `term-definition-${i}`,
            type: 'paragraph',
            content: cleanContent(content.content)
          });
        }
        
        slides.push(slide);
      }
      
      // Always add End slide at the end
      if (slideMapping && slideMapping['EndSlide']) {
        slides.push({
          id: 'end-' + Date.now(),
          layout: slideMapping['EndSlide'],
          components: [
            { id: 'end-message', type: 'title', content: 'Thank You!' },
            { id: 'end-note', type: 'paragraph', content: 'THANK YOU' },
          ],
        });
      }
      setResults(slides);
      setUploadedFiles([]);
      setShowEditor(true);
    } catch (err) {
      console.error('Presentation generation error:', err);
      setError(`Processing failed: ${err.message || err.toString()}`);
    } finally {
      setLoading(false);
    }
  };

    // =========================
  // Responsive logic
  // =========================
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      {/* Mobile navigation */}
      {isMobile && (
        <nav className="w-full bg-white border-b border-[#E3D9FA] flex flex-row items-center justify-between px-4 py-3 relative z-10 animate-slide-up shadow-sm">
          <h1 className="text-lg font-extrabold tracking-wide text-[#8C6BFA] font-montserrat">KENBILEARN</h1>
          <MenuMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </nav>
      )}

      {/* Main content */}
      <main className="w-full flex flex-col items-center justify-center relative min-h-screen px-4 sm:px-6 md:px-8">
  {/* Header title and subtitle */}
  <div className="w-full flex flex-col items-center justify-center mt-8 sm:mt-12 mb-6 sm:mb-8">
    <h1 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[2.8rem] font-extrabold text-[#8C6BFA] mb-2 leading-tight text-center drop-shadow-sm px-2">Transform PDFs into PowerPoints</h1>
    <p className="text-sm sm:text-base md:text-lg text-[#888] font-medium text-center max-w-xl mb-2 px-4">Upload your PDF documents and let our AI generate beautiful PowerPoint presentations with optional custom imagery.</p>
  </div>
        {/* Top bar for desktop and tablet */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-4 animate-fade-in z-40">
          <button
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base bg-[#8C6BFA] text-white hover:bg-[#7B61FF] focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] transition-all duration-200 shadow-lg"
            onClick={() => {
              setIsPreviewMode(true);
              setShowTemplates(true);
            }}
          >
            <span className="hidden sm:inline">Preview Themes</span>
            <span className="sm:hidden">Themes</span>
          </button>
          <UserMenuDropdown userMenuOpen={userMenuOpen} setUserMenuOpen={setUserMenuOpen} userMenuRef={userMenuRef} />
        </div>

        {/* Upload box and file list */}
        <div className="w-full max-w-2xl flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] mt-8 sm:mt-16 animate-fade-in">
  <label htmlFor="pdf-upload" className="w-full border border-dashed border-[#E3D9FA] rounded-xl sm:rounded-2xl py-12 sm:py-20 px-8 sm:px-16 flex flex-col items-center bg-white cursor-pointer shadow-[0_2px_18px_0_rgba(120,90,200,0.06)] transition hover:bg-[#F6F2FF] animate-slide-up">
  {loading ? (
    <Loader2 className="animate-spin mb-3 sm:mb-4 text-[#BFA8FF]" size={isMobile ? 36 : 48} />
  ) : (
    <Upload size={isMobile ? 36 : 48} className="mb-3 sm:mb-4 text-[#BFA8FF]" />
  )}
  <span className="text-[#222] font-semibold text-base sm:text-lg">Upload PDF(s)</span>
  <span className="text-xs sm:text-sm text-[#888] mt-1 text-center px-2">Drop your files here or click to browse<br/>(max 5MB each, multiple allowed)</span>
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
  <div className="w-full mt-6 sm:mt-8 mb-2">
  <div className="bg-white rounded-xl shadow-sm px-4 sm:px-8 py-4 sm:py-6 flex flex-col gap-2 border border-[#E3D9FA]">
    <label className="text-xs sm:text-sm font-semibold text-[#444] mb-2">Image Generation Prompt (optional):</label>
    <input
      type="text"
      value={imagePrompt}
      onChange={e => setImagePrompt(e.target.value)}
      placeholder="Type a prompt for image generation, or leave blank for no image"
      className="w-full px-4 sm:px-8 py-3 sm:py-5 rounded-lg border border-[#E3D9FA] text-sm sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] transition bg-transparent text-[#444] placeholder-[#BFA8FF]"
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
            <div className="mt-4 sm:mt-6 w-full max-w-md animate-fade-in">
              <h2 className="text-[#8C6BFA] font-bold mb-2 text-sm sm:text-base">PDFs to Process:</h2>
              <ul className="bg-blue-50 rounded-lg p-3 sm:p-4 m-0 list-none shadow-md">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center text-[#8C6BFA] text-sm sm:text-base border-b border-blue-200 pb-1 mb-1 animate-slide-up">
                    <span className="truncate max-w-[150px] sm:max-w-[200px]">{file.name}</span>
                    <button
                      className="ml-2 sm:ml-4 text-[#8C6BFA] font-bold hover:text-[#8C6BFA] transition disabled:opacity-60 text-xs sm:text-sm px-2 py-1 rounded"
                      onClick={() => handleRemoveFile(idx)}
                      disabled={loading}
                    >Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6 sm:mt-8 animate-fade-in w-full justify-center items-center">
          <button
            className={`w-full sm:w-[340px] py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow transition-all duration-200 
              bg-[#E5D8FF] text-[#8C6BFA] hover:bg-[#E7E0FF] focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] 
              ${loading || uploadedFiles.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={() => {
              setIsPreviewMode(false);
              setShowTemplates(true);
            }}
            disabled={loading || uploadedFiles.length === 0}
          >
            {loading ? "Generating PowerPoint..." : "Generate PowerPoint"}
          </button>
  <button
    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm sm:text-base border border-[#E3D9FA] text-[#8C6BFA] bg-white hover:bg-[#F6F2FF] focus:outline-none focus:ring-2 focus:ring-[#BFA8FF] transition-all duration-200 ${loading || uploadedFiles.length === 0 ? 'opacity-60 cursor-not-allowed' : ''}`}
    onClick={() => setUploadedFiles([])}
    disabled={loading || uploadedFiles.length === 0}
  >
    Clear All
  </button>
</div>
        </div>

        {/* Template selection modal */}
        {showTemplates && (
  <div className="fixed inset-0 flex items-center justify-center z-[9999] animate-fade-in p-4" style={{background: 'radial-gradient(ellipse at top left, #F3EDFF 0%, #F7F4FF 60%, #F5F1FF 100%)'}}>
    <div className="rounded-xl sm:rounded-2xl px-0 pt-0 pb-4 sm:pb-8 max-w-7xl w-full max-h-[90vh] animate-slide-up shadow-2xl border border-[#E3D9FA] relative overflow-hidden bg-white">
      <div className="w-full flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-7 pb-3 sm:pb-4 border-b border-[#E3D9FA]">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#8C6BFA] tracking-tight">Choose a Template</h2>
        <button className="text-gray-400 hover:text-[#8C6BFA] text-xl sm:text-2xl px-2 py-1 rounded-full transition" onClick={() => setShowTemplates(false)}>&times;</button>
      </div>
      <div className="w-full px-4 sm:px-8 pt-4 sm:pt-6 overflow-y-auto" style={{maxHeight: 'calc(90vh - 120px)'}}>
        <div className={`grid gap-2 sm:gap-1 no-scrollbar ${
          isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-3' : 'grid-cols-5'
        }`}>
          {themeNames.map((themeName, idx) => (
            <TemplateThumbnail
              key={idx}
              themeName={themeName}
              onClick={() => handleSelectTemplate(idx)}
            />
          ))}
        </div>
        <button className="mt-4 sm:mt-8 block mx-auto px-6 sm:px-8 py-2 rounded-xl bg-[#23202B] text-[#8C6BFA] hover:bg-[#2a2740] font-bold shadow-lg transition-all text-sm sm:text-base" onClick={() => setShowTemplates(false)}>Cancel</button>
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}
