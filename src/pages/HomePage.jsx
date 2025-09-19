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


  // Generate AI image if prompt exists
  const generateImageIfPromptExists = async () => {
    console.log('🎨 HomePage: generateImageIfPromptExists called with prompt:', imagePrompt);
    if (!imagePrompt.trim()) {
      console.log('🎨 HomePage: No image prompt provided, skipping image generation');
      return null; // No prompt, skip image generation
    }

    try {
      console.log('🎨 HomePage: Auto-generating AI image during PowerPoint creation:', imagePrompt.trim());
      
      const response = await fetch('http://127.0.0.1:5000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Image generation failed:', data.error);
        return null; // Don't fail the whole process if image generation fails
      }

      if (data.image_base64) {
        const imageData = `data:image/png;base64,${data.image_base64}`;
        const generatedImage = {
          url: imageData,
          name: `AI Generated: ${imagePrompt.trim()}`,
          prompt: imagePrompt.trim(),
          generatedAt: new Date().toISOString()
        };

        // Save to localStorage
        try {
          console.log('🎨 HomePage: Attempting to save image to localStorage...');
          const existingImages = JSON.parse(localStorage.getItem('kenbilearn_generated_images') || '[]');
          console.log('🎨 HomePage: Existing images in localStorage:', existingImages.length);
          const updatedImages = [generatedImage, ...existingImages];
          localStorage.setItem('kenbilearn_generated_images', JSON.stringify(updatedImages));
          console.log('🎨 HomePage: AI image saved to localStorage during PowerPoint generation. Total images now:', updatedImages.length);
          
          // Verify it was saved
          const verification = JSON.parse(localStorage.getItem('kenbilearn_generated_images') || '[]');
          console.log('🎨 HomePage: Verification - localStorage now contains:', verification.length, 'images');
          
          return generatedImage;
        } catch (storageError) {
          console.error('🎨 HomePage: Failed to save generated image to localStorage:', storageError);
          return null;
        }
      }
    } catch (err) {
      console.error('Auto image generation error:', err);
      return null; // Don't fail the whole process
    }
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
        
        // Map TOCSlide
        if (availableSlides.includes('TOCSlide')) {
          mapping['TOCSlide'] = 'TOCSlide';
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
        // Map MainSlide2
        if (availableSlides.includes('MainSlide')) {
          mapping['MainSlide'] = 'MainSlide';
        }
        
        // Map MainSlide1
        if (availableSlides.includes('MainSlide1')) {
          mapping['MainSlide1'] = 'MainSlide1';
        }

        // Map MainSlide2
        if (availableSlides.includes('MainSlide2')) {
          mapping['MainSlide2'] = 'MainSlide2';
        }
        
        // Map MainSlide3
        if (availableSlides.includes('MainSlide3')) {
          mapping['MainSlide3'] = 'MainSlide3';
        }
        
        // Map MainSlide4
        if (availableSlides.includes('MainSlide4')) {
          mapping['MainSlide4'] = 'MainSlide4';
        }
        
        // Map MainSlide5
        if (availableSlides.includes('MainSlide5')) {
          mapping['MainSlide5'] = 'MainSlide5';
        }
        
        // Map MainSlide6
        if (availableSlides.includes('MainSlide6')) {
          mapping['MainSlide6'] = 'MainSlide6';
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
      const previewSequence = ['TitleSlide', 'TOCSlide', 'ImageSlide','MainSlide', 'MainSlide1', 'MainSlide2', 'MainSlide3', 'MainSlide4', 'MainSlide5', 'MainSlide6', 'EndSlide'];

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
          } else if (layoutName === 'TOCSlide') {
            slide.components = [
              { id: 'toc', type: 'toc', content: 'Table of Contents' },
              { id: 'toc-item-1', type: 'toc_item', content: 'Introduction to the Topic' },
              { id: 'toc-item-2', type: 'toc_item', content: 'Key Concepts and Definitions' },
              { id: 'toc-item-3', type: 'toc_item', content: 'Historical Background' },
              { id: 'toc-item-4', type: 'toc_item', content: 'Current Applications' },
              { id: 'toc-item-5', type: 'toc_item', content: 'Case Studies and Examples' },
              { id: 'toc-item-6', type: 'toc_item', content: 'Future Implications' },
              { id: 'toc-item-7', type: 'toc_item', content: 'Conclusion and Q&A' }
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
      
      // Generate AI image if prompt exists (parallel with PDF processing)
      const imageGenerationPromise = generateImageIfPromptExists();
      
      const formData = new FormData();
      uploadedFiles.forEach(f => formData.append('file', f));
      
      const res = await fetch('http://127.0.0.1:5000/upload', {
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
      const standardSequence = ['TitleSlide', 'TOCSlide', 'ImageSlide', 'MainSlide1', 'MainSlide2', 'MainSlide3', 'MainSlide4', 'MainSlide5', 'MainSlide6', 'EndSlide'];
      
      // Map theme-specific slide names to our standard sequence
      const mapThemeSlidesToSequence = (themeModule) => {
        const availableSlides = Object.keys(themeModule).filter(k => typeof themeModule[k] === 'function');
        const mapping = {};
        
        // Map TitleSlide
        if (availableSlides.includes('TitleSlide')) {
          mapping['TitleSlide'] = 'TitleSlide';
        }
        
        // Map TOCSlide
        if (availableSlides.includes('TOCSlide')) {
          mapping['TOCSlide'] = 'TOCSlide';
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
        
        // Map MainSlide4
        if (availableSlides.includes('MainSlide4')) {
          mapping['MainSlide4'] = 'MainSlide4';
        }
        
        // Map MainSlide5
        if (availableSlides.includes('MainSlide5')) {
          mapping['MainSlide5'] = 'MainSlide5';
        }
        
        // Map MainSlide6
        if (availableSlides.includes('MainSlide6')) {
          mapping['MainSlide6'] = 'MainSlide6';
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
      
      const mainSlideLayouts = ['MainSlide1', 'MainSlide2', 'MainSlide3', 'MainSlide4', 'MainSlide5', 'MainSlide6'].filter(key => slideMapping[key]);
      
      // Debug logging
      console.log('Selected template:', selectedThemeName);
      console.log('Slide mapping:', slideMapping);
      console.log('Available main slide layouts:', mainSlideLayouts);
      
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
      
      // Add TOC slide
      if (slideMapping['TOCSlide']) {
        slides.push({
          id: `toc-${Date.now()}`,
          layout: slideMapping['TOCSlide'],
          components: [
            { id: 'toc', type: 'toc', content: 'Table of Contents' },
            { id: 'toc-item-1', type: 'toc_item', content: 'Introduction' },
            { id: 'toc-item-2', type: 'toc_item', content: 'Key Concepts' },
            { id: 'toc-item-3', type: 'toc_item', content: 'Analysis' },
            { id: 'toc-item-4', type: 'toc_item', content: 'Results' },
            { id: 'toc-item-5', type: 'toc_item', content: 'Conclusion' },
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
              content: `http://127.0.0.1:5000/${imgPath.replace(/\\/g, "/")}`,
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
      let currentLayoutIndex = 2; // Start after TitleSlide and TOCSlide
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
        
        if (currentLayoutIndex === 2 && slideMapping && slideMapping['ImageSlide']) {
          // Image slide
          layout = slideMapping['ImageSlide'];
          // console.log(`Content ${i}: Using ImageSlide layout: ${layout}`);
          currentLayoutIndex++;
        } else if (currentLayoutIndex >= 3 && currentLayoutIndex <= 8) {
          // Main slides 1, 2, 3, 4, 5, 6
          const mainSlideKey = ['MainSlide1', 'MainSlide2', 'MainSlide3', 'MainSlide4', 'MainSlide5', 'MainSlide6'][currentLayoutIndex - 3];
          if (slideMapping && slideMapping[mainSlideKey]) {
            layout = slideMapping[mainSlideKey];
            // console.log(`Content ${i}: Using ${mainSlideKey} layout: ${layout}`);
            currentLayoutIndex++;
            if (currentLayoutIndex > 8) {
              currentLayoutIndex = 3; // Reset to MainSlide1 for repetition
              mainSlideIndex++;
            }
          } else {
            // Skip this slide type if not available
            // console.log(`Content ${i}: Skipping ${mainSlideKey} - not available in mapping`);
            currentLayoutIndex++;
            if (currentLayoutIndex > 8) {
              currentLayoutIndex = 3;
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
      
      // Wait for image generation to complete and show result
      try {
        console.log('🎨 HomePage: Waiting for image generation to complete...');
        const generatedImage = await imageGenerationPromise;
        if (generatedImage) {
          console.log('🎨 HomePage: AI image generation completed successfully:', generatedImage);
          console.log('🎨 HomePage: Image saved to localStorage with key: kenbilearn_generated_images');
          setImagePrompt(''); // Clear the prompt since image was generated
          
          // Show success alert
          setTimeout(() => {
            alert('✅ AI image generated successfully! You can find it in the slide editor under "Assets > Images Generated"');
          }, 1000);
        } else {
          console.log('🎨 HomePage: No image was generated (likely no prompt provided)');
        }
      } catch (imageError) {
        console.error('🎨 HomePage: Image generation failed but continuing with presentation:', imageError);
        // Show error alert
        setTimeout(() => {
          alert('⚠️ AI image generation failed, but your presentation was created successfully. You can try generating images separately in the slide editor.');
        }, 1000);
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
    <>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.4); }
          50% { box-shadow: 0 0 40px rgba(34, 211, 238, 0.8), 0 0 60px rgba(147, 51, 234, 0.4); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.6), 0 0 40px rgba(147, 51, 234, 0.3); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse top-10 -left-20" />
          <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-2xl animate-bounce bottom-10 -right-20" />
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-indigo-400/30 transform rotate-45 animate-spin" style={{ animationDuration: '12s', animationDelay: '0.5s' }} />
        </div>

        {/* Enhanced Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/60 rotate-45 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-400/50 rotate-12 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-5 animate-float" style={{ animationDelay: '1s' }}>
            <svg className="w-6 h-6 text-cyan-300/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-1/3 animate-float" style={{ animationDelay: '4s' }}>
            <svg className="w-8 h-8 text-purple-300/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-4 z-40">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
              <div className="absolute inset-1 bg-gradient-to-br from-white/90 to-white/70 rounded-lg flex items-center justify-center transform -rotate-6 group-hover:-rotate-12 transition-transform duration-300">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="ml-3 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">KENBILEARN</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-300 shadow-lg"
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
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pt-20 pb-4">
          {/* Hero Section */}
          <div className="text-center mb-6 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 leading-tight">
              Transform PDFs into
              <br />
              <span className="text-white">Beautiful Presentations</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              Upload your PDF documents and let our AI generate stunning PowerPoint presentations with 
              <span className="text-cyan-400 font-semibold"> intelligent content extraction</span>
            </p>
          </div>

          {/* Upload Section */}
          <div className="w-full max-w-2xl flex-1 flex flex-col">
            {/* 3D Upload Container */}
            <div className="relative group flex-1 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 flex-1 flex flex-col">
                
                {/* Upload Area */}
                <label htmlFor="pdf-upload" className="block cursor-pointer flex-1">
                  <div className="border-2 border-dashed border-white/30 rounded-2xl py-8 px-6 text-center hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300 group h-full flex flex-col justify-center">
                    {loading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin mb-3 text-cyan-400" size={40} />
                        <span className="text-white font-semibold">
                          {imagePrompt.trim() 
                            ? "Processing PDFs and generating AI images..." 
                            : "Processing your PDFs..."
                          }
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="mb-4 p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300 animate-pulse-glow">
                          <Upload size={40} className="text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Upload PDF Documents</h3>
                        <p className="text-gray-300 mb-2">Drop your files here or click to browse</p>
                        <p className="text-sm text-gray-400">(Max 5MB each, multiple files allowed)</p>
                      </div>
                    )}
                  </div>
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

                {/* Image Generation Prompt */}
                <div className="mt-4">
                  <label className="block text-white font-semibold text-sm mb-2">
                    AI Image Generation Prompt (Optional)
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      value={imagePrompt}
                      onChange={e => setImagePrompt(e.target.value)}
                      placeholder="Describe images you'd like AI to generate (will be processed with PowerPoint generation)..."
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm text-sm"
                      disabled={loading}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center animate-pulse text-sm">
                    {error}
                  </div>
                )}

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-white font-semibold mb-2 text-sm">Files Ready for Processing:</h3>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-red-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            <span className="text-white truncate max-w-xs text-sm">{file.name}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveFile(idx)}
                            className="ml-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                            disabled={loading}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={() => {
                      setIsPreviewMode(false);
                      setShowTemplates(true);
                    }}
                    disabled={loading || uploadedFiles.length === 0}
                    className="flex-1 relative group py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-glow"
                  >
                    <span className="relative z-10">
                      {loading 
                        ? (imagePrompt.trim() ? "Generating Presentation & AI Images..." : "Generating Presentation...")
                        : (imagePrompt.trim() ? "Generate PowerPoint + AI Images" : "Generate PowerPoint")
                      }
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                  </button>
                  
                  <button
                    onClick={() => setUploadedFiles([])}
                    disabled={loading || uploadedFiles.length === 0}
                    className="sm:w-auto px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl shadow-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Editor Modal */}
        {showEditor && selectedTemplate !== null && !error && (
          <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm">
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

        {/* Template Selection Modal */}
        {showTemplates && (
          <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/60 backdrop-blur-sm p-4">
            <div className="relative group max-w-7xl w-full max-h-[90vh]">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-white/20">
                  <h2 className="text-2xl font-bold text-white">Choose a Template</h2>
                  <button 
                    className="text-gray-400 hover:text-red-400 text-2xl font-bold focus:outline-none transition-colors duration-200" 
                    onClick={() => setShowTemplates(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="px-8 pt-6 pb-8 overflow-y-auto" style={{maxHeight: 'calc(90vh - 120px)'}}>
                  <div className={`grid gap-4 ${
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
                  <div className="flex justify-center mt-8">
                    <button 
                      className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30" 
                      onClick={() => setShowTemplates(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
