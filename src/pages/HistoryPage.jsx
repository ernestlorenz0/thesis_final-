import React, { useEffect, useState, useRef } from 'react';
import { fetchHistoryItems, renameHistoryItem, deleteHistoryItem } from '../firebaseAuth';
import ConfirmationModal from '../components/ConfirmationModal';
import { themeComponents } from '../utils/themes';
import { SlideExporter } from '../utils/exportUtils';
import html2canvas from 'html2canvas';
import { createRoot } from 'react-dom/client';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchHistoryItems();
      setItems(data);
    } catch (e) {
      setError(e.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingName(item.filename);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await renameHistoryItem(editingId, editingName || 'Untitled');
      setItems(items => items.map(it => it.id === editingId ? { ...it, filename: editingName || 'Untitled' } : it));
      setEditingId(null);
      setEditingName('');
    } catch (e) {
      setError(e.message || 'Failed to rename');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      await deleteHistoryItem(itemToDelete.id);
      setItems(items => items.filter(it => it.id !== itemToDelete.id));
      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (e) {
      setError(e.message || 'Failed to delete');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const [exportingItemId, setExportingItemId] = useState(null);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');
  const exporter = useRef(new SlideExporter());

  // Function to create a temporary slide renderer that properly renders theme components
  const createTempSlideRenderer = async (slide, templateName, slideIndex) => {
    return new Promise((resolve) => {
      // Create a temporary container
      const container = document.createElement('div');
      container.style.width = '1920px';
      container.style.height = '1080px';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.overflow = 'hidden';
      container.style.backgroundColor = '#ffffff';
      document.body.appendChild(container);

      // Get the theme component
      const Theme = themeComponents[templateName] || themeComponents['Classic Classroom'];
      
      // Render the themed slide properly
      const renderThemedSlide = (slide, theme, index) => {
        if (!slide || !theme) return null;

        // Title slide
        if (index === 0 && theme.TitleSlide) {
          return React.createElement(theme.TitleSlide, {
            title: slide.components.find(c => c.type === "title")?.content || "",
            subtitle: slide.components.find(c => c.type === "paragraph")?.content || "",
            imageUrl: slide.components.find(c => c.type === "image")?.content || ""
          });
        }

        // End slide
        if (slide.components.some(c => c.type === "end") && theme.EndSlide) {
          return React.createElement(theme.EndSlide, {
            message: slide.components.find(c => c.type === "end")?.content || "Thank You!",
            subtitle: slide.components.find(c => c.type === "paragraph")?.content || ""
          });
        }

        // Content slides
        const title = slide.components.find(c => c.type === "title")?.content || "";
        const content = slide.components.find(c => c.type === "paragraph")?.content || "";
        const imageUrl = slide.components.find(c => c.type === "image")?.content || "";

        if (slide.layout && theme[slide.layout]) {
          const LayoutComp = theme[slide.layout];
          return React.createElement(LayoutComp, { title, content, imageUrl });
        }

        // Fallback to the most common content slide component
        if (theme.ContentSlide) {
          return React.createElement(theme.ContentSlide, { title, content });
        }

        // Final fallback
        return React.createElement('div', {
          style: { width: '100%', height: '100%', padding: '40px', backgroundColor: 'white' }
        }, [
          React.createElement('h2', { key: 'title' }, title),
          React.createElement('p', { key: 'content' }, content)
        ]);
      };

      // Create React root and render the slide
      const root = createRoot(container);
      const slideElement = renderThemedSlide(slide, Theme, slideIndex);
      
      // Create a wrapper div to contain both theme and draggable components
      const slideWrapper = React.createElement('div', {
        style: { position: 'relative', width: '100%', height: '100%' }
      }, [
        slideElement,
        // Render draggable image components
        ...slide.components
          .filter(comp => comp.type === 'image' && comp.isDraggable && comp.content)
          .map((comp, idx) => 
            React.createElement('img', {
              key: `draggable-img-${idx}`,
              src: comp.content,
              style: {
                position: 'absolute',
                left: `${comp.x || 0}px`,
                top: `${comp.y || 0}px`,
                width: `${comp.w || 320}px`,
                height: `${comp.h || 180}px`,
                objectFit: 'cover',
                transform: comp.rotation ? `rotate(${comp.rotation}deg)` : 'none',
                zIndex: 10
              },
              crossOrigin: 'anonymous',
              onError: (e) => {
                console.warn('Failed to load draggable image:', comp.content);
                e.target.style.display = 'none';
              }
            })
          ),
        // Render draggable text components
        ...slide.components
          .filter(comp => (comp.type === 'text' || comp.type === 'title') && comp.isDraggable && comp.content)
          .map((comp, idx) => 
            React.createElement('div', {
              key: `draggable-text-${idx}`,
              style: {
                position: 'absolute',
                left: `${comp.x || 0}px`,
                top: `${comp.y || 0}px`,
                width: `${comp.w || 200}px`,
                height: `${comp.h || 50}px`,
                fontSize: `${comp.fontSize || 16}px`,
                fontFamily: comp.fontFamily || 'Arial',
                fontWeight: comp.fontWeight || 'normal',
                fontStyle: comp.fontStyle || 'normal',
                textDecoration: comp.textDecoration || 'none',
                color: comp.color || '#000',
                transform: comp.rotation ? `rotate(${comp.rotation}deg)` : 'none',
                zIndex: 10,
                overflow: 'hidden',
                wordWrap: 'break-word'
              }
            }, comp.content)
          )
      ]);
      
      root.render(slideWrapper);
      
      // Wait for rendering to complete (longer timeout for images to load)
      setTimeout(() => {
        resolve({ current: container, cleanup: () => {
          root.unmount();
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        }});
      }, 1000);
    });
  };

  const handleDownload = async (item) => {
    if (!item || !item.slides || !Array.isArray(item.slides)) {
      setError('Invalid presentation data');
      return;
    }

    const exportFormat = item.exportFormat || 'PDF'; // Default to PDF for legacy items
    setExportingItemId(item.id);
    setExportStatus('Downloading');
    setExportProgress(0);

    try {
      // Set up progress callback
      exporter.current.setProgressCallback((progress) => {
        setExportProgress(Math.round(progress));
      });

      // Create a function to get slide container for each slide
      const getSlideContainerForSlide = async (slideIndex) => {
        const slide = item.slides[slideIndex];
        const templateName = item.templateName || 'Classic Classroom';
        
        setExportStatus('Downloading');
        
        // Create temporary renderer for this slide
        const slideRenderer = await createTempSlideRenderer(slide, templateName, slideIndex);
        
        // Store cleanup function for later
        slideRenderer.slideIndex = slideIndex;
        
        return slideRenderer;
      };

      let result;
      const baseFilename = item.filename || 'presentation';

      // Export based on the original format
      switch (exportFormat) {
        case 'PNG':
          // For PNG, we'll export the first slide only (or current slide)
          const slideRenderer = await getSlideContainerForSlide(0);
          result = await exporter.current.exportCurrentSlidePNG(
            slideRenderer,
            `${baseFilename}.png`
          );
          // Clean up the renderer
          if (slideRenderer.cleanup) slideRenderer.cleanup();
          break;
          
        case 'PPTX':
          result = await exporter.current.exportAllSlidesPPTX(
            item.slides,
            getSlideContainerForSlide,
            `${baseFilename}.pptx`
          );
          break;
          
        case 'PDF':
        default:
          result = await exporter.current.exportAllSlidesPDF(
            item.slides,
            getSlideContainerForSlide,
            `${baseFilename}.pdf`
          );
          break;
      }

      if (result.success) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = result.downloadUrl;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        setTimeout(() => {
          URL.revokeObjectURL(result.downloadUrl);
        }, 1000);
      } else {
        setError(result.message || 'Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      setError(`Export failed: ${error.message}`);
    } finally {
      setExportingItemId(null);
      setExportStatus('');
      setExportProgress(0);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Presentation History</h2>
        <p className="text-gray-300">View and manage your exported presentations</p>
      </div>

      {/* Export Progress */}
      {exportingItemId && (
        <div className="mb-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">{exportStatus || 'Exporting...'}</span>
            <span className="text-cyan-400 font-bold">{exportProgress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-3 text-white">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading history...
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="mb-4 p-6 bg-white/10 rounded-full">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No presentations yet</h3>
            <p className="text-gray-300">Your exported presentations will appear here</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      
                      {/* File Info */}
                      <div className="flex-1 flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          {editingId === item.id ? (
                            <input
                              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                              value={editingName}
                              onChange={e => setEditingName(e.target.value)}
                              autoFocus
                              placeholder="Enter presentation name"
                            />
                          ) : (
                            <>
                              <h3 className="text-white font-semibold truncate">{item.filename}</h3>
                              <p className="text-gray-400 text-sm">
                                {(() => {
                                  const date = new Date(item.generatedAt);
                                  const year = date.getFullYear();
                                  const month = String(date.getMonth() + 1).padStart(2, '0');
                                  const day = String(date.getDate()).padStart(2, '0');
                                  let hours = date.getHours();
                                  const minutes = String(date.getMinutes()).padStart(2, '0');
                                  const ampm = hours >= 12 ? 'PM' : 'AM';
                                  hours = hours % 12;
                                  hours = hours ? hours : 12;
                                  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
                                })()}
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {editingId === item.id ? (
                          <>
                            <button 
                              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                              onClick={saveEdit}
                            >
                              Save
                            </button>
                            <button 
                              className="px-4 py-2 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="p-2 bg-white/10 border border-white/20 text-gray-300 rounded-lg hover:bg-white/20 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                              onClick={() => startEdit(item)}
                              title="Rename"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            
                            <button 
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                              onClick={() => handleDownload(item)}
                              disabled={exportingItemId === item.id}
                            >
                              {exportingItemId === item.id ? (
                                <>
                                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                  </svg>
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Download
                                </>
                              )}
                            </button>
                            
                            <button 
                              className="p-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                              onClick={() => handleDeleteClick(item)}
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Presentation"
        message={`Are you sure you want to delete "${itemToDelete?.filename}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
