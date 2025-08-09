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
      const res = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Unknown error');
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

  if (showEditor && results && selectedTemplate !== null) {
    return <SlideEditor initialSlides={results} selectedTemplate={selectedTemplate} onBack={() => { setShowEditor(false); setResults(null); setSelectedTemplate(null); }} />;
  }

  return (
    <div className="flex min-h-screen bg-neutral-900">
      {/* Sidebar */}
      <aside className="w-16 bg-orange-500 flex flex-col items-center py-4 space-y-6">
        <button className="p-2 rounded hover:bg-orange-400"><Settings size={24} /></button>
        <button className="p-2 rounded hover:bg-orange-400"><Upload size={24} /></button>
        <button className="p-2 rounded hover:bg-orange-400 mt-auto mb-2"><HelpCircle size={24} /></button>
        <button className="p-2 rounded hover:bg-orange-400"><LogOut size={24} /></button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {/* Top bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-6">
          <div></div>
          <h1 className="text-4xl font-extrabold tracking-widest text-white" style={{fontFamily: 'monospace'}}>KENBILERN</h1>
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-xs text-gray-300">nickname</div>
              <div className="text-xs text-gray-400">email@kenbilearn@gmail.com</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">N</div>
          </div>
        </div>
        {/* Upload box and file list */}
        <div className="flex flex-col items-center justify-center h-full">
          <label htmlFor="pdf-upload" className="border-2 border-dashed border-gray-400 rounded-lg p-12 flex flex-col items-center bg-neutral-800/70 mt-32 cursor-pointer hover:bg-neutral-700 transition">
            {loading ? (
              <Loader2 className="animate-spin mb-4 text-gray-300" size={48} />
            ) : (
              <Upload size={48} className="mb-4 text-gray-300" />
            )}
            <span className="text-gray-300">{loading ? 'Processing PDF(s)...' : 'Upload PDF(s) (max 5MB each, multiple allowed)'}</span>
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
          {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}
          {uploadedFiles.length > 0 && (
            <div className="mt-6 w-full max-w-xl">
              <h2 className="text-orange-400 font-semibold mb-2">PDFs to Process:</h2>
              <ul className="bg-neutral-800 rounded-lg p-4 space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center text-white text-sm border-b border-neutral-700 last:border-b-0 pb-1">
                    <span className="truncate max-w-xs">{file.name}</span>
                    <button
                      className="ml-4 text-red-400 hover:text-red-600"
                      onClick={() => handleRemoveFile(idx)}
                      disabled={loading}
                    >Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex space-x-4 mt-8">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow disabled:opacity-60"
              onClick={handleGenerate}
              disabled={loading || uploadedFiles.length === 0}
            >
              {loading ? 'Generating PowerPoint...' : 'Generate PowerPoint'}
            </button>
            <button
              className="bg-neutral-700 hover:bg-neutral-600 text-orange-400 font-semibold px-6 py-2 rounded shadow border border-orange-400"
              onClick={() => setUploadedFiles([])}
              disabled={loading || uploadedFiles.length === 0}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Template selection modal */}
        {showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-neutral-900 rounded-lg p-8 max-w-4xl w-full">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 text-center">Choose a PowerPoint Template</h2>
              <div className="grid grid-cols-4 gap-4">
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
