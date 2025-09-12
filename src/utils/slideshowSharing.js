// Utility functions for slideshow sharing

/**
 * Generate a unique ID for a slideshow
 * @returns {string} Unique slideshow ID
 */
export function generateSlideshowId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

/**
 * Save a slideshow for sharing
 * @param {Object} slideshowData - The slideshow data to save
 * @returns {string} The generated slideshow ID
 */
export function saveSharedSlideshow(slideshowData) {
  const id = generateSlideshowId();
  
  // Prepare the data to save
  const dataToSave = {
    id,
    title: slideshowData.title || 'Untitled Slideshow',
    slides: slideshowData.slides || [],
    selectedTemplate: slideshowData.selectedTemplate || 'Classic Classroom',
    createdAt: new Date().toISOString(),
    ...slideshowData
  };

  // Save to localStorage (in a real app, this would be an API call)
  localStorage.setItem(`shared_slideshow_${id}`, JSON.stringify(dataToSave));
  
  // Also save to a list of shared slideshows for management
  const existingShared = JSON.parse(localStorage.getItem('shared_slideshows') || '[]');
  existingShared.push({
    id,
    title: dataToSave.title,
    createdAt: dataToSave.createdAt,
    slideCount: dataToSave.slides.length
  });
  localStorage.setItem('shared_slideshows', JSON.stringify(existingShared));

  return id;
}

/**
 * Load a shared slideshow by ID
 * @param {string} id - The slideshow ID
 * @returns {Object|null} The slideshow data or null if not found
 */
export function loadSharedSlideshow(id) {
  try {
    const data = localStorage.getItem(`shared_slideshow_${id}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading shared slideshow:', error);
    return null;
  }
}

/**
 * Generate a shareable URL for a slideshow
 * @param {string} id - The slideshow ID
 * @returns {string} The shareable URL
 */
export function generateShareableUrl(id) {
  // Use the actual current origin for functional links
  const baseUrl = window.location.origin;
  return `${baseUrl}/slideshow/${id}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Get all shared slideshows for management
 * @returns {Array} List of shared slideshow metadata
 */
export function getSharedSlideshows() {
  try {
    return JSON.parse(localStorage.getItem('shared_slideshows') || '[]');
  } catch (error) {
    console.error('Error loading shared slideshows list:', error);
    return [];
  }
}
