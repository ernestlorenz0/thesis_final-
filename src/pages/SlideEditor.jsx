import React, { useState, useRef, useCallback, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import { v4 as uuidv4 } from 'uuid';
import { useHotkeys } from 'react-hotkeys-hook';
import RevealPreview from './RevealPreview';
import { themeComponents, pptxThemeStyles } from '../utils/themes';
import SlideSidebar from '../components/SlideSidebar';
import TopBar from '../components/TopBar';
import KonvaSlideCanvas from '../components/KonvaSlideCanvas';
import AssetPicker from '../components/AssetPicker';
import LocalImageModal from '../components/LocalImageModal';
import SwiperSlideshow from '../components/SwiperSlideshow';
import { saveHistoryItem } from '../firebaseAuth';
import { saveSharedSlideshow, generateShareableUrl, copyToClipboard } from '../utils/slideshowSharing';
import ShareNotification from '../components/ShareNotification';
import ExportMenu from '../components/ExportMenu';
import ExportNotification from '../components/ExportNotification';
import { SlideExporter, getTimestampedFilename } from '../utils/exportUtils';

export default function SlideEditor({ initialSlides, selectedTemplate, onBack, previewMode }) {
  const [slides, setSlides] = useState(initialSlides || []);
  const [current, setCurrent] = useState(0);
  const [author, setAuthor] = useState('');
  const [showReveal, setShowReveal] = useState(false);
  const [showSwiperSlideshow, setShowSwiperSlideshow] = useState(false);
  const [showLocalImageModal, setShowLocalImageModal] = useState(false);
  const [localImages, setLocalImages] = useState([]);
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [shareNotification, setShareNotification] = useState({
    show: false,
    success: false,
    shareUrl: ''
  });
  const [exportNotification, setExportNotification] = useState({
    show: false,
    success: false,
    message: '',
    downloadUrl: '',
    filename: '',
    exportType: ''
  });
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
  
  // Export functionality state
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [currentSlideContainerRef, setCurrentSlideContainerRef] = useState(null);
  const [slideExporter] = useState(() => new SlideExporter());

  useEffect(() => {
    slideExporter.setProgressCallback(setExportProgress);
  }, [slideExporter]);

  const handleSlideContainerReady = useCallback((slideContainerRef) => {
    console.log('🎯 SlideEditor: Slide container ready callback received:', slideContainerRef);
    setCurrentSlideContainerRef(slideContainerRef);
  }, []);

  const handleExportPNG = async () => {
    if (!currentSlideContainerRef) {
      alert('Slide container not ready for export');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    const filename = getTimestampedFilename('slide', 'png');
    const result = await slideExporter.exportCurrentSlidePNG(currentSlideContainerRef, filename);

    setIsExporting(false);
    setExportProgress(0);
    
    setShowExportMenu(false);
    setExportNotification({
      show: true,
      success: result.success,
      message: result.message,
      downloadUrl: result.downloadUrl || '',
      filename: result.filename || '',
      exportType: result.exportType || 'PNG'
    });
  };

  const handleExportPDF = async () => {
    if (!slides.length) {
      alert('No slides to export');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    // Create a function to get slide container for each slide
    const getSlideContainerForSlide = async (slideIndex) => {
      // If it's the current slide, use the existing container
      if (slideIndex === current) {
        return currentSlideContainerRef;
      }
      
      // For other slides, temporarily switch to that slide
      const originalSlide = current;
      setCurrent(slideIndex);
      
      // Wait for the slide to render
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return the container reference (it should be updated by now)
      const slideContainer = currentSlideContainerRef;
      
      // Switch back to original slide
      setCurrent(originalSlide);
      
      return slideContainer;
    };

    const filename = getTimestampedFilename('presentation', 'pdf');
    const result = await slideExporter.exportAllSlidesPDF(slides, getSlideContainerForSlide, filename);

    setIsExporting(false);
    setExportProgress(0);
    
    setShowExportMenu(false);
    setExportNotification({
      show: true,
      success: result.success,
      message: result.message,
      downloadUrl: result.downloadUrl || '',
      filename: result.filename || '',
      exportType: result.exportType || 'PDF'
    });
  };

  const handleExportPPTX = async () => {
    if (!slides.length) {
      alert('No slides to export');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    // Create a function to get slide container for each slide
    const getSlideContainerForSlide = async (slideIndex) => {
      // If it's the current slide, use the existing container
      if (slideIndex === current) {
        return currentSlideContainerRef;
      }
      
      // For other slides, temporarily switch to that slide
      const originalSlide = current;
      setCurrent(slideIndex);
      
      // Wait for the slide to render
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return the container reference (it should be updated by now)
      const slideContainer = currentSlideContainerRef;
      
      // Switch back to original slide
      setCurrent(originalSlide);
      
      return slideContainer;
    };

    const filename = getTimestampedFilename('presentation', 'pptx');
    const result = await slideExporter.exportAllSlidesPPTX(slides, getSlideContainerForSlide, filename);

    setIsExporting(false);
    setExportProgress(0);
    
    setShowExportMenu(false);
    setExportNotification({
      show: true,
      success: result.success,
      message: result.message,
      downloadUrl: result.downloadUrl || '',
      filename: result.filename || '',
      exportType: result.exportType || 'PPTX'
    });
  };

  const fileInputRef = useRef();

  // --- Editing state ---
  const [editingIdx, setEditingIdx] = useState(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [editorValue, setEditorValue] = useState('');
  const [selectedText, setSelectedText] = useState({ start: 0, end: 0 });
  const [inlineEditing, setInlineEditing] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [toolbarState, setToolbarState] = useState({
    fontFamily: 'Arial',
    fontSize: 32,
    color: '#222',
    fontWeight: 'bold',
    fontStyle: 'normal',
    textDecoration: 'none',
  });

  // === Toolbar actions ===
  const handleTextDoubleClick = (idx, comp) => {
    setEditingIdx(idx);
    setShowToolbar(true);
    setInlineEditing(true);
    setEditorValue(comp.content);
    setToolbarState({
      fontFamily: comp.fontFamily || 'Arial',
      fontSize: comp.fontSize || 32,
      color: comp.color || '#222',
      fontWeight: comp.fontWeight || 'bold',
      fontStyle: comp.fontStyle || 'normal',
      textDecoration: comp.textDecoration || 'none',
    });
  };

  const applyToolbarToBlock = (key, value) => {
    setToolbarState(state => ({ ...state, [key]: value }));
    if (inlineEditing && selectedText.start !== selectedText.end) {
      // Apply formatting to selected text only
      applyFormattingToSelection(editingIdx, key, value, selectedText.start, selectedText.end);
    } else {
      // Apply to entire block
      handleFontChange(editingIdx, key, value);
    }
  };

  const applyFormattingToSelection = (compIdx, key, value, start, end) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => {
        if (i !== compIdx) return c;
        
        // Create rich text formatting structure
        if (!c.richText) {
          c.richText = [{ text: c.content, ...toolbarState }];
        }
        
        // Apply formatting to selection
        const newRichText = [];
        let currentPos = 0;
        
        c.richText.forEach(segment => {
          const segmentEnd = currentPos + segment.text.length;
          
          if (segmentEnd <= start || currentPos >= end) {
            // Segment is outside selection
            newRichText.push(segment);
          } else if (currentPos >= start && segmentEnd <= end) {
            // Segment is fully within selection
            newRichText.push({ ...segment, [key]: value });
          } else {
            // Segment is partially within selection - split it
            if (currentPos < start) {
              newRichText.push({ ...segment, text: segment.text.substring(0, start - currentPos) });
            }
            const selectionStart = Math.max(0, start - currentPos);
            const selectionEnd = Math.min(segment.text.length, end - currentPos);
            newRichText.push({ 
              ...segment, 
              text: segment.text.substring(selectionStart, selectionEnd),
              [key]: value 
            });
            if (segmentEnd > end) {
              newRichText.push({ ...segment, text: segment.text.substring(end - currentPos) });
            }
          }
          currentPos = segmentEnd;
        });
        
        return { ...c, richText: newRichText };
      })
    } : slide));
  };

  const saveEdit = () => {
    handleTextChange(editingIdx, editorValue);
    setEditingIdx(null);
    setShowToolbar(false);
    setInlineEditing(false);
    setSelectedText({ start: 0, end: 0 });
  };

  const cancelEdit = () => {
    setEditingIdx(null);
    setShowToolbar(false);
    setInlineEditing(false);
    setSelectedText({ start: 0, end: 0 });
  };

  const deleteEditingBlock = () => {
    removeComponent(editingIdx);
    setEditingIdx(null);
    setShowToolbar(false);
    setInlineEditing(false);
    setSelectedText({ start: 0, end: 0 });
  };

  // === Export functions ===
  const exportPdf = async () => {
    try {
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [960, 540] });
      
      // Generate PDF content from slide data
      slides.forEach((slide, idx) => {
        if (idx !== 0) pdf.addPage([960, 540], 'landscape');
        
        // Set background color based on theme
        pdf.setFillColor(246, 245, 239); // #F6F5EF
        pdf.rect(0, 0, 960, 540, 'F');
        
        let y = 80;
        
        // Title
        const titleComp = slide.components.find(c => c.type === 'title');
        if (titleComp && titleComp.content) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(36);
          pdf.setTextColor(34, 34, 34); // #222
          const titleLines = pdf.splitTextToSize(String(titleComp.content), 840);
          pdf.text(titleLines, 60, y);
          y += (titleLines.length * 45) + 30;
        }
        
        // Paragraphs
        const paragraphs = slide.components.filter(c => c.type === 'paragraph' && c.content);
        if (paragraphs.length > 0) {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(20);
          pdf.setTextColor(68, 68, 68); // #444
          paragraphs.forEach(p => {
            const text = String(p.content);
            const lines = pdf.splitTextToSize(text, 840);
            pdf.text(lines, 60, y);
            y += (lines.length * 25) + 20;
          });
        }
        
        // Images (if any)
        const imageComp = slide.components.find(c => c.type === 'image' && c.content);
        if (imageComp && imageComp.content) {
          try {
            // For base64 images, we can add them directly
            if (imageComp.content.startsWith('data:image/')) {
              pdf.addImage(imageComp.content, 'PNG', 60, y, 300, 200);
            }
          } catch (imgError) {
            console.warn('Could not add image to PDF:', imgError);
            // Add a placeholder for the image
            pdf.setFont('helvetica', 'italic');
            pdf.setFontSize(16);
            pdf.setTextColor(150, 150, 150);
            pdf.text('[Image]', 60, y + 100);
          }
        }
      });
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `presentation_${timestamp}`;
      
      // Save to history
      await saveHistoryItem({
        filename: filename,
        slides: slides,
        templateName: selectedTemplate
      });
      
      // Download the PDF
      pdf.save(`${filename}.pdf`);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const exportSlidesAsImagesPPTX = async () => {
    const pptx = new pptxgen();
    const originalCurrent = current;
    for (let i = 0; i < slides.length; i++) {
      setCurrent(i);
      await new Promise(resolve => setTimeout(resolve, 300));
      const canvasEl = document.querySelector('.bg-\\[\\#F6F5EF\\]');
      if (!canvasEl) continue;
      const canvas = await html2canvas(canvasEl, { backgroundColor: null, useCORS: true, scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const slide = pptx.addSlide();
      slide.addImage({ data: imgData, x: 0, y: 0, w: 10, h: 5.625 });
    }
    setCurrent(originalCurrent);
    pptx.writeFile('slides-as-images.pptx');
  };


  // === Slide manipulation ===
  const addSlide = () => setSlides([...slides, { id: uuidv4(), components: [] }]);
  const duplicateSlide = () => {
    const newSlide = { ...slides[current], id: uuidv4() };
    const newSlides = [...slides];
    newSlides.splice(current + 1, 0, newSlide);
    setSlides(newSlides);
    setCurrent(current + 1);
  };
  const deleteSlide = () => {
    if (slides.length === 1) return;
    const newSlides = slides.filter((_, idx) => idx !== current);
    setSlides(newSlides);
    setCurrent(Math.max(0, current - 1));
  };

  const moveSlide = (fromIndex, toIndex) => {
    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);
    setSlides(newSlides);
    setCurrent(toIndex);
  };

  const insertSlideAt = (index) => {
    const newSlide = { id: uuidv4(), components: [] };
    const newSlides = [...slides];
    newSlides.splice(index, 0, newSlide);
    setSlides(newSlides);
    setCurrent(index);
  };

  const handleTextChange = (compIdx, value) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? { ...c, content: value } : c)
    } : slide));
  };

  const handleFontChange = (compIdx, key, value) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? { ...c, [key]: value } : c)
    } : slide));
  };

  const updateComponent = (compIdx, updatedComponent) => {
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map((c, i) => i === compIdx ? updatedComponent : c)
    } : slide));
  };

  const addComponent = type => {
    setSlides(slides => slides.map((slide, idx) => {
      if (idx !== current) return slide;
      return {
        ...slide,
        components: [
          ...slide.components,
          {
            id: uuidv4(),
            type,
            content: type === 'text' ? 'New text' : type === 'title' ? 'New title' : '',
            x: 100 + Math.random() * 200,
            y: 100 + Math.random() * 200,
            w: type === 'image' ? 320 : 200,
            h: type === 'image' ? 180 : 50,
            fontSize: type === 'title' ? 24 : 16,
            fontFamily: 'Arial',
            fontWeight: type === 'title' ? 'bold' : 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            color: type === 'title' ? '#222' : '#444',
            isDraggable: true // Mark text components as draggable
          }
        ]
      };
    }));
  };

  const removeComponent = idx => {
    console.log('🗑️ SlideEditor removeComponent called with idx:', idx);
    console.log('Current slide components:', slides[current]?.components);
    setSlides(slides => slides.map((slide, sidx) => sidx === current ? {
      ...slide,
      components: slide.components.filter((_, i) => {
        console.log(`Filtering component ${i}, keeping: ${i !== idx}`);
        return i !== idx;
      })
    } : slide));
  };

  const handleBlockDragEnd = (id, event) => {
    console.log('🎯 SlideEditor handleBlockDragEnd:', { id, event });
    if (!event.delta) {
      console.log('❌ No delta in event:', event);
      return;
    }
    console.log('✅ Updating position with delta:', event.delta);
    setSlides(slides => slides.map((slide, idx) => idx === current ? {
      ...slide,
      components: slide.components.map(comp => comp.id === id ? {
        ...comp,
        x: (comp.x || 0) + event.delta.x,
        y: (comp.y || 0) + event.delta.y
      } : comp)
    } : slide));
  };

  const handleImageUpload = (compIdx, file) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (compIdx !== undefined && compIdx !== null) {
        // Update existing image component
        setSlides(slides => slides.map((slide, idx) => idx === current ? {
          ...slide,
          components: slide.components.map((c, i) => i === compIdx ? { ...c, content: e.target.result } : c)
        } : slide));
      } else {
        // Create new image component
        const newComponent = {
          id: uuidv4(),
          type: 'image',
          content: e.target.result,
          x: 200,
          y: 200,
          w: 320,
          h: 180,
          isDraggable: true // Mark as draggable overlay
        };
        setSlides(slides => slides.map((slide, idx) => idx === current ? {
          ...slide,
          components: [...slide.components, newComponent]
        } : slide));
      }
    };
    reader.readAsDataURL(file);
  };

  // Enhanced image handling
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 160; // Adjust for positioning
      const y = e.clientY - rect.top - 90;
      
      imageFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newComponent = {
            id: uuidv4(),
            type: 'image',
            content: event.target.result,
            x: Math.max(0, x + (index * 20)),
            y: Math.max(0, y + (index * 20)),
            w: 320,
            h: 180,
          };
        };
          
        reader.onloadend = () => {
          setSlides(slides => slides.map((slide, idx) => idx === current ? {
            ...slide,
            components: [...slide.components, newComponent]
          } : slide));
        };
        reader.readAsDataURL(file);
      });
    }
  }, [current]);

  const handleTextSelection = useCallback((start, end) => {
    setSelectedText({ start, end });
  }, []);

  // Share functionality
  // History management
  const saveToHistory = useCallback((newSlides) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newSlides)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      setSlides(previousState);
      setHistoryIndex(historyIndex - 1);
      console.log('↶ Undo performed');
    }
  }, [history, historyIndex]);

  const deleteSelectedComponent = useCallback(() => {
    if (selectedComponentId) {
      const newSlides = slides.map((slide, idx) => idx === current ? {
        ...slide,
        components: slide.components.filter(c => c.id !== selectedComponentId)
      } : slide);
      
      saveToHistory(slides);
      setSlides(newSlides);
      setSelectedComponentId(null);
      console.log('🗑️ Component deleted:', selectedComponentId);
    }
  }, [selectedComponentId, slides, current, saveToHistory]);

  const saveSlideshow = useCallback(() => {
    try {
      const slideshowData = {
        slides: slides,
        selectedTemplate: selectedTemplate,
        author: author,
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('slideshow_autosave', JSON.stringify(slideshowData));
      console.log('💾 Slideshow saved');
      
      // Show brief save confirmation
      const originalTitle = document.title;
      document.title = '✓ Saved - ' + originalTitle;
      setTimeout(() => {
        document.title = originalTitle;
      }, 2000);
    } catch (error) {
      console.error('❌ Save failed:', error);
    }
  }, [slides, selectedTemplate, author]);

  // Keyboard shortcuts
  useHotkeys('ctrl+z', (e) => {
    e.preventDefault();
    undo();
  }, { enableOnFormTags: true });

  useHotkeys('delete', (e) => {
    e.preventDefault();
    deleteSelectedComponent();
  }, { enableOnFormTags: false });

  useHotkeys('ctrl+s', (e) => {
    e.preventDefault();
    saveSlideshow();
  }, { enableOnFormTags: true });

  const handleShare = useCallback(async () => {
    try {
      // Prepare slideshow data
      const slideshowData = {
        title: slides[0]?.components.find(c => c.type === 'title')?.content || 'Untitled Slideshow',
        slides: slides,
        selectedTemplate: selectedTemplate,
        author: author,
        createdAt: new Date().toISOString()
      };

      // Save slideshow and get ID
      const slideshowId = saveSharedSlideshow(slideshowData);
      
      // Generate shareable URL
      const shareableUrl = generateShareableUrl(slideshowId);
      
      // Copy to clipboard
      const success = await copyToClipboard(shareableUrl);
      
      // Show notification
      setShareNotification({
        show: true,
        success: success,
        shareUrl: shareableUrl
      });
      
      console.log('📤 Slideshow shared:', { slideshowId, shareableUrl });
    } catch (error) {
      console.error('❌ Error sharing slideshow:', error);
      setShareNotification({
        show: true,
        success: false,
        shareUrl: ''
      });
    }
  }, [slides, selectedTemplate, author]);

  // === Render ===
  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100">
      <SlideSidebar
        slides={slides}
        current={current}
        setCurrent={setCurrent}
        addSlide={addSlide}
        moveSlide={moveSlide}
        duplicateSlide={duplicateSlide}
        deleteSlide={deleteSlide}
        renderThumb={(slide, index) => {
          const title = slide.components.find(c => c.type === "title")?.content;
          return (
            <div className="flex-1 px-2 py-1 text-xs text-gray-700 truncate group">
              <div className="font-medium">{title || "Untitled"}</div>
              <div className="text-xs text-gray-500 mt-1">
                {slide.components.length} component{slide.components.length !== 1 ? 's' : ''}
              </div>
            </div>
          );
        }}
      />
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <TopBar 
          showSlideshow={showSwiperSlideshow}
          setShowSlideshow={setShowSwiperSlideshow}
          onShare={handleShare}
          onBack={onBack}
          onExport={() => setShowExportMenu(true)}
        />
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
          <KonvaSlideCanvas
            slides={slides}
            current={current}
            author={author}
            showToolbar={showToolbar}
            toolbarState={toolbarState}
            editingIdx={editingIdx}
            editorValue={editorValue}
            setEditorValue={setEditorValue}
            selectedText={selectedText}
            inlineEditing={inlineEditing}
            Theme={themeComponents[selectedTemplate] || themeComponents['Classic Classroom']}
            currentSlide={slides[current] || { components: [] }}
            handleBlockDragEnd={handleBlockDragEnd}
            handleTextDoubleClick={handleTextDoubleClick}
            handleTextChange={handleTextChange}
            handleFontChange={handleFontChange}
            removeComponent={removeComponent}
            applyToolbarToBlock={applyToolbarToBlock}
            deleteEditingBlock={deleteEditingBlock}
            cancelEdit={cancelEdit}
            saveEdit={saveEdit}
            addComponent={addComponent}
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            handleTextSelection={handleTextSelection}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            updateComponent={updateComponent}
            onSlideContainerReady={handleSlideContainerReady}
          />
        </div>

        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow transition-colors" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            Add Image
          </button>
          <button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition-colors"
            onClick={() => setShowAssetPicker(true)}
          >
            Predefined Assets
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition-colors" onClick={duplicateSlide}>
            Duplicate Slide
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition-colors" onClick={deleteSlide} disabled={slides.length <= 1}>
            Delete Slide
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-colors" onClick={() => insertSlideAt(current + 1)}>
            Insert Slide After
          </button>
        </div>

        {/* Hidden file input for main Add Image button */}
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={e => {
            const file = e.target.files[0];
            if (file) {
              handleImageUpload(null, file);
            }
            e.target.value = '';
          }} 
        />

        {showReveal && (
          <RevealPreview slides={slides} selectedTemplate={selectedTemplate} onClose={() => setShowReveal(false)} />
        )}

        {showSwiperSlideshow && (
          <SwiperSlideshow
            slides={slides}
            selectedTemplate={selectedTemplate}
            Theme={themeComponents[selectedTemplate] || themeComponents['Classic Classroom']}
            onClose={() => setShowSwiperSlideshow(false)}
            open={showSwiperSlideshow}
          />
        )}

        <AssetPicker
          open={showAssetPicker}
          onClose={() => setShowAssetPicker(false)}
          onSelect={asset => {
            console.log('🎯 SlideEditor: Asset selected:', asset);
            setShowAssetPicker(false);
            setSlides(slides => slides.map((slide, idx) => idx === current ? {
              ...slide,
              components: [
                ...slide.components,
                { 
                  id: uuidv4(), 
                  type: 'image', 
                  content: asset.url, 
                  x: 200, 
                  y: 200, 
                  w: 320, 
                  h: 180,
                  isDraggable: true // Mark as draggable overlay
                }
              ]
            } : slide));
          }}
        />

      <LocalImageModal
        open={showLocalImageModal}
        images={localImages}
        onSelect={img => {
          setShowLocalImageModal(false);
          setSlides(slides => slides.map((slide, idx) => idx === current ? {
            ...slide,
            components: [
              ...slide.components,
              { 
                id: uuidv4(), 
                type: 'image', 
                content: img.url, 
                x: 200, 
                y: 200, 
                w: 320, 
                h: 180,
                isDraggable: true // Mark as draggable overlay
              }
            ]
          } : slide));
        }}
        onClose={() => setShowLocalImageModal(false)}
      />

      {shareNotification.show && (
        <ShareNotification
          show={shareNotification.show}
          success={shareNotification.success}
          shareUrl={shareNotification.shareUrl}
          onClose={() => setShareNotification({ show: false, success: false, shareUrl: '' })}
        />
      )}

      {/* Export Menu */}
      <ExportMenu
        isOpen={showExportMenu}
        onClose={() => setShowExportMenu(false)}
        onExportPNG={handleExportPNG}
        onExportPDF={handleExportPDF}
        onExportPPTX={handleExportPPTX}
        isExporting={isExporting}
        exportProgress={exportProgress}
      />

      {/* Export Notification */}
      <ExportNotification
        show={exportNotification.show}
        onClose={() => setExportNotification({ show: false, success: false, message: '', downloadUrl: '', filename: '', exportType: '' })}
        exportType={exportNotification.exportType}
        success={exportNotification.success}
        message={exportNotification.message}
        downloadUrl={exportNotification.downloadUrl}
        filename={exportNotification.filename}
      />
    </main>
  </div>
  );
}
