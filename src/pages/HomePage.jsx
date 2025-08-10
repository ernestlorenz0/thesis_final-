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
  const [generateImage, setGenerateImage] = useState(true); // Checkbox state
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
      formData.append('generate_image', generateImage ? 'true' : 'false');
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
      // First slide: title/author, rest: content
      const slides = [];
      data.results.forEach((file, fileIdx) => {
        // Title slide
        slides.push({
          id: file.filename + '-title-' + Date.now(),
          components: [
            { id: 'title-' + file.filename, type: 'title', content: file.filename },
            { id: 'author-' + file.filename, type: 'author', content: 'Ernest Lorenzo' },
          ],
        });
        // Image slide (if present and valid)
        if (file.image_base64 && typeof file.image_base64 === 'string' && file.image_base64.length > 100) {
          slides.push({
            id: file.filename + '-image-' + Date.now(),
            components: [
              { id: 'img-' + file.filename, type: 'image', content: `data:image/png;base64,${file.image_base64}` },
            ],
          });
        }
        // Content slides
        (file.terms || []).forEach(term => {
          slides.push({
            id: term.term + '-slide-' + Math.random(),
            components: [
              { id: 'term-' + term.term, type: 'title', content: term.term },
              { id: 'def-' + term.term, type: 'paragraph', content: term.definition },
            ],
          });
        });
      });
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
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {/* Sidebar or Topbar */}
      {isMobile ? (
        <nav
          style={{
            width: '100%',
            background: 'var(--color-primary)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 1rem',
            gap: 0,
            position: 'relative',
            zIndex: 100,
          }}
        >
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: 1, color: '#fff', fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>KENBILEARN</h1>
          <MenuMobile />
        </nav>
      ) : (
        <aside
          style={{
            width: 64,
            background: 'var(--color-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 0',
            gap: 24,
          }}
        >
          <button style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: '#fff', marginBottom: 0 }}><Settings size={24} /></button>
          <button style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: '#fff', marginBottom: 0 }}><Upload size={24} /></button>
          <button style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: '#fff', marginTop: 'auto', marginBottom: 8 }}><HelpCircle size={24} /></button>
          <button style={{ padding: 8, borderRadius: 8, background: 'none', border: 'none', color: '#fff' }}><LogOut size={24} /></button>
        </aside>
      )}

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: '100vh',
          padding: isMobile ? '0 0.5rem' : '0 1rem',
        }}
      >
        {/* Top bar for desktop only */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2rem 2rem 1rem 2rem',
              boxSizing: 'border-box',
            }}
          >
            <div></div>
            <h1 style={{ fontSize: '2.3rem', fontWeight: 900, letterSpacing: 2, color: 'var(--color-primary)', fontFamily: 'Montserrat, Inter, Arial, sans-serif' }}>
              KENBILEARN
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: 'var(--color-secondary)' }}>nickname</div>
                <div style={{ fontSize: 12, color: 'var(--color-secondary)', opacity: 0.7 }}>email@kenbilearn@gmail.com</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff' }}>
                N
              </div>
            </div>
          </div>
        )}

      {/* Upload box and file list */}
      <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', marginTop: 60 }}>
        <label htmlFor="pdf-upload" style={{ border: '2px dashed var(--color-secondary)', borderRadius: 14, padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', cursor: 'pointer', marginTop: 32, width: '100%', boxSizing: 'border-box', transition: 'background 0.2s' }}>
          {loading ? (
            <Loader2 className="animate-spin mb-4" size={48} color="var(--color-secondary)" />
          ) : (
            <Upload size={48} className="mb-4" color="var(--color-secondary)" />
          )}
          <span style={{ color: 'var(--color-secondary)', fontWeight: 500 }}>{loading ? 'Processing PDF(s)...' : 'Upload PDF(s) (max 5MB each, multiple allowed)'}</span>
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={loading}
            multiple
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginBottom: 8, fontWeight: 500, color: 'var(--color-secondary)' }}>
          <input
            type="checkbox"
            checked={generateImage}
            onChange={e => setGenerateImage(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: 'var(--color-primary)', marginRight: 8 }}
          />
          Generate Image
        </label>
        {error && <div style={{ marginTop: 16, color: '#e11d48', fontSize: 14 }}>{error}</div>}
        {showEditor && results && selectedTemplate !== null && !error && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(30,41,59,0.85)' }}>
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
          <div style={{ marginTop: 24, width: '100%', maxWidth: 420 }}>
            <h2 style={{ color: 'var(--color-accent)', fontWeight: 600, marginBottom: 8 }}>PDFs to Process:</h2>
            <ul style={{ background: 'var(--color-bg)', borderRadius: 10, padding: 18, margin: 0, listStyle: 'none', boxShadow: '0 2px 8px rgba(30,41,59,0.05)' }}>
              {uploadedFiles.map((file, idx) => (
                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-text)', fontSize: 15, borderBottom: '1px solid #e5e7eb', paddingBottom: 4, marginBottom: 4 }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{file.name}</span>
                  <button
                    style={{ marginLeft: 16, color: '#e11d48', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => handleRemoveFile(idx)}
                    disabled={loading}
                  >Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
          <button
            className="auth-button"
            style={{ background: 'var(--color-primary)', color: '#fff', fontWeight: 700, padding: '12px 32px', borderRadius: 10, fontSize: '1.05rem', boxShadow: '0 2px 8px rgba(30,41,59,0.10)', border: 'none', cursor: 'pointer', opacity: loading || uploadedFiles.length === 0 ? 0.6 : 1 }}
            onClick={handleGenerate}
            disabled={loading || uploadedFiles.length === 0}
          >
            {loading ? 'Generating PowerPoint...' : 'Generate PowerPoint'}
          </button>
          <button
            className="auth-button"
            style={{ background: 'var(--color-bg)', color: 'var(--color-primary)', fontWeight: 600, padding: '12px 32px', borderRadius: 10, fontSize: '1.05rem', border: '2px solid var(--color-primary)', cursor: 'pointer', opacity: loading || uploadedFiles.length === 0 ? 0.6 : 1 }}
            onClick={() => setUploadedFiles([])}
            disabled={loading || uploadedFiles.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Template selection modal */}
      {showTemplates && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(30,41,59,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 32, maxWidth: 900, width: '100%' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: 16, textAlign: 'center' }}>Choose a PowerPoint Template</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
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
                  className="rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-400 focus:border-orange-500 transition flex flex-col items-center p-2 bg-neutral-800"
                  onClick={() => handleSelectTemplate(idx)}
                >
                  <div className={`w-32 h-20 rounded mb-1`} style={{background: `hsl(${idx*18}, 70%, 60%)`}}></div>
                  <span className="text-xs text-gray-200">{themeName}</span>
                </button>
              ))}
            </div>
              <button className="mt-6 block mx-auto px-6 py-2 rounded bg-gray-700 text-gray-300 hover:bg-gray-600" onClick={() => setShowTemplates(false)}>Cancel</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
