import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { X, Play, Pause, SkipBack, SkipForward, Settings, Maximize } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

export default function SwiperSlideshow({ 
  slides, 
  selectedTemplate, 
  Theme, 
  onClose, 
  open 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [autoplayDelay, setAutoplayDelay] = useState(3000);
  const [showSettings, setShowSettings] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const swiperRef = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          swiperRef.current?.slidePrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          swiperRef.current?.slideNext();
          break;
        case ' ':
          e.preventDefault();
          toggleAutoplay();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'F11':
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        // Enter fullscreen
        const element = document.documentElement;
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          await element.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleAutoplayDelayChange = (newDelay) => {
    setAutoplayDelay(newDelay);
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
      swiperRef.current.params.autoplay.delay = newDelay;
      if (isPlaying) {
        swiperRef.current.autoplay.start();
      }
    }
  };

  // Render themed slide content
  const renderSlideContent = (slide, index) => {
    if (!slide || !Theme) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-gray-500">No content available</div>
        </div>
      );
    }

    // Title slide
    if (index === 0 && Theme.TitleSlide) {
      return (
        <Theme.TitleSlide
          title={slide.components.find(c => c.type === "title")?.content || "Sample Title"}
          subtitle={slide.components.find(c => c.type === "paragraph")?.content || "Subtitle placeholder"}
          imageUrl={slide.components.find(c => c.type === "image")?.content || ""}
        />
      );
    }

    // End slide
    if (slide.components.some(c => c.type === "end") && Theme.EndSlide) {
      return (
        <Theme.EndSlide
          message={slide.components.find(c => c.type === "end")?.content || "Thank You!"}
          subtitle={slide.components.find(c => c.type === "paragraph")?.content || ""}
        />
      );
    }

    // Content slides
    const title = slide.components.find(c => c.type === "title")?.content || "";
    const content = slide.components.find(c => c.type === "paragraph")?.content || "";
    const backgroundImageUrl = slide.components.find(c => c.type === "image" && !c.isDraggable)?.content || "";
    
    // Get all draggable images for overlay display
    const draggableImages = slide.components.filter(c => c.type === "image" && c.isDraggable) || [];

    // Use assigned layout or fallback
    if (slide.layout && Theme[slide.layout]) {
      const LayoutComp = Theme[slide.layout];
      return (
        <div className="relative w-full h-full">
          <LayoutComp title={title} content={content} imageUrl={backgroundImageUrl} />
          {/* Render draggable images as overlays */}
          {draggableImages.map((img, idx) => (
            <img
              key={idx}
              src={img.content}
              alt={`Overlay image ${idx + 1}`}
              className="absolute object-contain rounded-lg shadow-lg"
              style={{
                left: `${((img.x || 0) / 1920) * 100}%`,
                top: `${((img.y || 0) / 1080) * 100}%`,
                width: `${((img.w || 320) / 1920) * 100}%`,
                height: `${((img.h || 180) / 1080) * 100}%`,
                transform: `rotate(${img.rotation || 0}deg)`,
                zIndex: 10
              }}
            />
          ))}
        </div>
      );
    }

    // Fallback logic with draggable images
    if (backgroundImageUrl && Theme.ImageSlide) {
      return (
        <div className="relative w-full h-full">
          <Theme.ImageSlide title={title} imageUrl={backgroundImageUrl} />
          {draggableImages.map((img, idx) => (
            <img
              key={idx}
              src={img.content}
              alt={`Overlay image ${idx + 1}`}
              className="absolute object-contain rounded-lg shadow-lg"
              style={{
                left: `${((img.x || 0) / 1920) * 100}%`,
                top: `${((img.y || 0) / 1080) * 100}%`,
                width: `${((img.w || 320) / 1920) * 100}%`,
                height: `${((img.h || 180) / 1080) * 100}%`,
                transform: `rotate(${img.rotation || 0}deg)`,
                zIndex: 10
              }}
            />
          ))}
        </div>
      );
    }
    
    if (Theme.MainSlide) {
      return (
        <div className="relative w-full h-full">
          <Theme.MainSlide title={title} content={content} />
          {draggableImages.map((img, idx) => (
            <img
              key={idx}
              src={img.content}
              alt={`Overlay image ${idx + 1}`}
              className="absolute object-contain rounded-lg shadow-lg"
              style={{
                left: `${((img.x || 0) / 1920) * 100}%`,
                top: `${((img.y || 0) / 1080) * 100}%`,
                width: `${((img.w || 320) / 1920) * 100}%`,
                height: `${((img.h || 180) / 1080) * 100}%`,
                transform: `rotate(${img.rotation || 0}deg)`,
                zIndex: 10
              }}
            />
          ))}
        </div>
      );
    }
    if (Theme.ContentSlide) {
      return (
        <div className="relative w-full h-full">
          <Theme.ContentSlide title={title} content={content} />
          {draggableImages.map((img, idx) => (
            <img
              key={idx}
              src={img.content}
              alt={`Overlay image ${idx + 1}`}
              className="absolute object-contain rounded-lg shadow-lg"
              style={{
                left: `${((img.x || 0) / 1920) * 100}%`,
                top: `${((img.y || 0) / 1080) * 100}%`,
                width: `${((img.w || 320) / 1920) * 100}%`,
                height: `${((img.h || 180) / 1080) * 100}%`,
                transform: `rotate(${img.rotation || 0}deg)`,
                zIndex: 10
              }}
            />
          ))}
        </div>
      );
    }

    // Default fallback with all images
    const allImages = [...(backgroundImageUrl ? [{ content: backgroundImageUrl, isBackground: true }] : []), ...draggableImages];
    
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        {title && (
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center relative z-20">{title}</h1>
        )}
        {content && (
          <p className="text-xl text-gray-600 text-center max-w-4xl leading-relaxed relative z-20">{content}</p>
        )}
        
        {/* Background image */}
        {backgroundImageUrl && (
          <img 
            src={backgroundImageUrl} 
            alt="Slide background" 
            className="mt-6 max-w-md max-h-64 object-contain rounded-lg shadow-lg relative z-10"
          />
        )}
        
        {/* Draggable images as overlays */}
        {draggableImages.map((img, idx) => (
          <img
            key={idx}
            src={img.content}
            alt={`Overlay image ${idx + 1}`}
            className="absolute object-contain rounded-lg shadow-lg"
            style={{
              left: `${((img.x || 0) / 1200) * 100}%`,
              top: `${((img.y || 0) / 800) * 100}%`,
              width: `${((img.w || 320) / 1200) * 100}%`,
              height: `${((img.h || 180) / 800) * 100}%`,
              transform: `rotate(${img.rotation || 0}deg)`,
              zIndex: 15
            }}
          />
        ))}
      </div>
    );
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${isFullscreen ? 'bg-white' : 'bg-black'}`}>
      {/* Header Controls - Hide in fullscreen mode */}
      {!isFullscreen && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white text-xl font-semibold">
              Slideshow Preview - {selectedTemplate}
            </h2>
            <div className="text-white/70 text-sm">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Playback Controls */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Previous slide (←)"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={toggleAutoplay}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Play/Pause (Space)"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Next slide (→)"
            >
              <SkipForward size={20} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title={isFullscreen ? "Exit Fullscreen (F11)" : "Enter Fullscreen (F11)"}
            >
              <Maximize size={20} />
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              title="Settings"
            >
              <Settings size={20} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-red-500/50 rounded-lg transition-all ml-2"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mt-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center gap-4">
              <label className="text-white text-sm">Autoplay Delay:</label>
              <select
                value={autoplayDelay}
                onChange={(e) => handleAutoplayDelayChange(Number(e.target.value))}
                className="bg-white text-black rounded px-3 py-1 text-sm"
              >
                <option value={1000}>1 second</option>
                <option value={2000}>2 seconds</option>
                <option value={3000}>3 seconds</option>
                <option value={5000}>5 seconds</option>
                <option value={10000}>10 seconds</option>
              </select>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Swiper Slideshow */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        effect="slide"
        speed={600}
        loop={slides.length > 1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className="flex items-center justify-center">
            <div className={`w-full h-full flex items-center justify-center ${isFullscreen ? 'p-0' : 'max-w-7xl mx-auto p-4'}`}>
              <div className={`bg-white overflow-hidden ${isFullscreen ? 'w-full h-full' : 'w-[1920px] h-[1080px] max-w-full max-h-full rounded-lg shadow-2xl'}`} style={{ aspectRatio: '16/9' }}>
                {renderSlideContent(slide, index)}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons - Hide in fullscreen */}
      {!isFullscreen && (
        <>
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm">
            <SkipBack size={24} />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all backdrop-blur-sm">
            <SkipForward size={24} />
          </button>

          {/* Custom Pagination */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`swiper-pagination-bullet-custom w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'swiper-pagination-bullet-active-custom bg-white' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Instructions - Hide in fullscreen */}
      {!isFullscreen && (
        <div className="absolute bottom-4 right-4 text-white/60 text-xs">
          Use ← → keys to navigate • Space to play/pause • Esc to close
        </div>
      )}
    </div>
  );
}
