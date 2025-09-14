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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF] p-4 sm:p-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#8C6BFA] mb-4">History</h2>
        {error && <div className="w-full text-red-600 text-xs sm:text-sm mb-2">{error}</div>}
        {exportingItemId && (
          <div className="w-full bg-gray-100 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{exportStatus || 'Exporting...'}</span>
              <span className="text-sm font-medium text-gray-700">{exportProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#8C6BFA] h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${exportProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        {loading ? (
          <div className="text-gray-400 text-sm sm:text-base">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-gray-400 text-sm sm:text-base">No history yet.</div>
        ) : (
          <ul className="w-full divide-y divide-[#E3D9FA]">
            {items.map(item => (
              <li key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  {editingId === item.id ? (
                    <input
                      className="px-3 py-1.5 text-xs sm:text-sm rounded-md border border-[#E3D9FA] focus:ring-1 focus:ring-[#8C6BFA] text-gray-900 bg-white w-full sm:w-80"
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span className="text-[#8C6BFA] font-semibold truncate text-sm sm:text-base">{item.filename}</span>
                  )}
                  <span className="text-xs text-gray-400">{(() => {
                    const date = new Date(item.generatedAt);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    let hours = date.getHours();
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12; // 0 should be 12
                    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
                  })()}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  {editingId === item.id ? (
                    <>
                      <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#8C6BFA] text-white rounded" onClick={saveEdit}>Save</button>
                      <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-gray-700 rounded" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-[#8C6BFA] rounded" onClick={() => startEdit(item)}>Rename</button>
                      <button 
                        className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-gray-300 text-gray-700 rounded flex items-center gap-1" 
                        onClick={() => handleDownload(item)}
                        disabled={exportingItemId === item.id}
                      >
                        {exportingItemId === item.id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Downloading...
                          </>
                        ) : 'Download'}
                      </button>
                      <button className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-red-300 text-red-600 rounded" onClick={() => handleDeleteClick(item)}>Delete</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
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
