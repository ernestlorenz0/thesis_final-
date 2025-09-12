import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SwiperSlideshow from '../components/SwiperSlideshow';
import { themeComponents } from '../utils/themes';

export default function SharedSlideshowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slideshow, setSlideshow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSharedSlideshow(id);
  }, [id]);

  const loadSharedSlideshow = async (slideshowId) => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from localStorage first (for development/testing)
      const localData = localStorage.getItem(`shared_slideshow_${slideshowId}`);
      if (localData) {
        const parsedData = JSON.parse(localData);
        setSlideshow(parsedData);
        setLoading(false);
        return;
      }

      // In a real app, this would be an API call to your backend
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If no data found, show error
      setError('Slideshow not found');
      setLoading(false);
    } catch (err) {
      console.error('Error loading shared slideshow:', err);
      setError('Failed to load slideshow');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Slideshow...</h2>
          <p className="text-gray-500">Please wait while we fetch your presentation</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Slideshow Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (!slideshow) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header with slideshow info */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-all"
              title="Go to Homepage"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-white text-xl font-semibold">
                {slideshow.title || 'Shared Slideshow'}
              </h1>
              <p className="text-white/70 text-sm">
                {slideshow.slides?.length || 0} slides • {slideshow.selectedTemplate || 'Default'} theme
              </p>
            </div>
          </div>
          
          <div className="text-white/60 text-sm">
            Read-only preview
          </div>
        </div>
      </div>

      {/* Slideshow */}
      <SwiperSlideshow
        slides={slideshow.slides || []}
        selectedTemplate={slideshow.selectedTemplate || 'Classic Classroom'}
        Theme={themeComponents[slideshow.selectedTemplate] || themeComponents['Classic Classroom']}
        onClose={() => navigate('/')}
        open={true}
      />
    </div>
  );
}
