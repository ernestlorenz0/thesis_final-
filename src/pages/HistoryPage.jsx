import React, { useEffect, useState, useRef } from 'react';
import { fetchHistoryItems, renameHistoryItem, deleteHistoryItem } from '../firebaseAuth';
import ConfirmationModal from '../components/ConfirmationModal';
import { themeComponents } from '../utils/themes';
import { SlideExporter } from '../utils/exportUtils';
import html2canvas from 'html2canvas';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from 'react-konva';
import { renderToStaticMarkup } from 'react-dom/server';

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

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');
  const slideRefs = useRef({});
  const exporter = useRef(new SlideExporter());

  // Function to create a temporary slide container for export
  const createTempSlideContainer = (slideData) => {
    const container = document.createElement('div');
    container.style.width = '1920px';
    container.style.height = '1080px';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.overflow = 'hidden';
    
    // Replicate the logic from KonvaSlideCanvas's renderThemedSlide function
    const renderThemedSlideForExport = (slide, theme, index) => {
      if (!slide || !theme) return null;

      // Title slide
      if (index === 0 && theme.TitleSlide) {
        return (
          <theme.TitleSlide
            title={slide.components.find(c => c.type === "title")?.content || ""}
            subtitle={slide.components.find(c => c.type === "paragraph")?.content || ""}
            imageUrl={slide.components.find(c => c.type === "image")?.content || ""}
          />
        );
      }

      // End slide
      if (slide.components.some(c => c.type === "end") && theme.EndSlide) {
        return (
          <theme.EndSlide
            message={slide.components.find(c => c.type === "end")?.content || "Thank You!"}
            subtitle={slide.components.find(c => c.type === "paragraph")?.content || ""}
          />
        );
      }

      // Content slides
      const title = slide.components.find(c => c.type === "title")?.content || "";
      const content = slide.components.find(c => c.type === "paragraph")?.content || "";
      const imageUrl = slide.components.find(c => c.type === "image")?.content || "";

      if (slide.layout && theme[slide.layout]) {
        const LayoutComp = theme[slide.layout];
        return <LayoutComp title={title} content={content} imageUrl={imageUrl} />;
      }

      // Fallback to the most common content slide component
      if (theme.ContentSlide) {
        return <theme.ContentSlide title={title} content={content} />;
      }

      // Final fallback if no suitable component is found
      return <div style={{width: '100%', height: '100%', padding: '40px', backgroundColor: 'white'}}><h2>{title}</h2><p>{content}</p></div>;
    };

    const theme = themeComponents[slideData.theme] || themeComponents.default;
    const slideIndex = item.slides.findIndex(s => s.id === slideData.id);
    const slideMarkup = renderToStaticMarkup(renderThemedSlideForExport(slideData, theme, slideIndex));
    
    container.innerHTML = slideMarkup;
    document.body.appendChild(container);
    return container;
  };

  const handleDownload = async (item) => {
    if (!item || !item.slides || !Array.isArray(item.slides)) {
      setError('Invalid presentation data');
      return;
    }

    setIsExporting(true);
    setExportStatus('Preparing export...');
    setExportProgress(0);

    try {
      // Create a temporary container for each slide and capture it
      const slideContainers = [];
      const tempContainers = [];
      
      // First pass: Create all slide containers
      for (let i = 0; i < item.slides.length; i++) {
        const slide = item.slides[i];
        const container = createTempSlideContainer({
          ...slide,
          theme: slide.theme || 'default',
          components: slide.components || []
        });
        tempContainers.push(container);
        slideContainers.push({ current: container });
      }

      // Use the exporter to handle the export
      exporter.current.setProgressCallback((progress) => {
        setExportProgress(Math.round(progress));
      });

      // Export as PDF
      const result = await exporter.current.exportAllSlidesPDF(
        item.slides,
        (index) => slideContainers[index],
        `${item.filename || 'presentation'}.pdf`
      );

      if (result.success) {
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = result.downloadUrl;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up temporary containers
        tempContainers.forEach(container => {
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        });
      } else {
        setError(result.message || 'Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
      setError(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
      setExportStatus('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF] p-4 sm:p-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#8C6BFA] mb-4">History</h2>
        {error && <div className="w-full text-red-600 text-xs sm:text-sm mb-2">{error}</div>}
        {isExporting && (
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
                        disabled={isExporting}
                      >
                        {isExporting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Exporting...
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
