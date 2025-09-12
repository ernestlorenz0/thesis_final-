import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import html2canvas from 'html2canvas';

// Export utilities for Konva-based slide export
export class SlideExporter {
  constructor() {
    this.exportProgress = 0;
    this.onProgressUpdate = null;
  }

  setProgressCallback(callback) {
    this.onProgressUpdate = callback;
  }

  updateProgress(progress) {
    this.exportProgress = progress;
    if (this.onProgressUpdate) {
      this.onProgressUpdate(progress);
    }
  }

  // Export current slide as PNG
  async exportCurrentSlidePNG(slideContainerRef, filename = 'slide.png') {
    try {
      this.updateProgress(10);
      
      if (!slideContainerRef.current) {
        throw new Error('Slide container reference not available');
      }

      this.updateProgress(30);

      // Use html2canvas to capture the entire slide including theme background
      const canvas = await html2canvas(slideContainerRef.current, {
        backgroundColor: '#ffffff',
        scale: 1, // Prevent scaling issues
        useCORS: true,
        allowTaint: true,
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1920,
        windowHeight: 1080
      });

      this.updateProgress(70);

      // Convert canvas to data URL
      const dataURL = canvas.toDataURL('image/png', 1.0);

      this.updateProgress(80);

      this.updateProgress(100);
      return { 
        success: true, 
        message: 'PNG exported successfully!', 
        downloadUrl: dataURL,
        filename: filename,
        exportType: 'PNG'
      };
    } catch (error) {
      console.error('PNG export error:', error);
      return { success: false, message: `PNG export failed: ${error.message}` };
    }
  }

  // Export all slides as PDF
  async exportAllSlidesPDF(slides, getSlideContainerForSlide, filename = 'presentation.pdf') {
    try {
      this.updateProgress(5);

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080]
      });

      const totalSlides = slides.length;
      let processedSlides = 0;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        
        // Get the slide container for this specific slide
        const slideContainerRef = await getSlideContainerForSlide(i);
        
        if (slideContainerRef && slideContainerRef.current) {
          // Capture slide as image using html2canvas
          const canvas = await html2canvas(slideContainerRef.current, {
            backgroundColor: '#ffffff',
            scale: 1,
            useCORS: true,
            allowTaint: true,
            x: 0,
            y: 0,
            width: 1920,
            height: 1080,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 1920,
            windowHeight: 1080
          });

          const dataURL = canvas.toDataURL('image/jpeg', 0.9);

          // Add new page for slides after the first
          if (i > 0) {
            pdf.addPage();
          }

          // Add image to PDF (fit to page)
          pdf.addImage(dataURL, 'JPEG', 0, 0, 1920, 1080);
        }

        processedSlides++;
        this.updateProgress(10 + (processedSlides / totalSlides) * 80);
      }

      this.updateProgress(95);

      // Generate PDF blob instead of auto-downloading
      const pdfBlob = pdf.output('blob');
      const downloadUrl = URL.createObjectURL(pdfBlob);

      this.updateProgress(100);
      return { 
        success: true, 
        message: `PDF with ${totalSlides} slides exported successfully!`,
        downloadUrl: downloadUrl,
        filename: filename,
        exportType: 'PDF'
      };
    } catch (error) {
      console.error('PDF export error:', error);
      return { success: false, message: `PDF export failed: ${error.message}` };
    }
  }

  // Export all slides as PPTX
  async exportAllSlidesPPTX(slides, getSlideContainerForSlide, filename = 'presentation.pptx') {
    try {
      this.updateProgress(5);

      const pptx = new pptxgen();
      
      // Set presentation properties
      pptx.layout = 'LAYOUT_16x9';
      pptx.author = 'Slide Editor';
      pptx.company = 'KENBILERN';
      pptx.title = 'Exported Presentation';

      const totalSlides = slides.length;
      let processedSlides = 0;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        
        // Get the slide container for this specific slide
        const slideContainerRef = await getSlideContainerForSlide(i);
        
        if (slideContainerRef && slideContainerRef.current) {
          // Create new slide
          const pptxSlide = pptx.addSlide();

          // Capture slide as image using html2canvas
          const canvas = await html2canvas(slideContainerRef.current, {
            backgroundColor: '#ffffff',
            scale: 1,
            useCORS: true,
            allowTaint: true,
            x: 0,
            y: 0,
            width: 1920,
            height: 1080,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 1920,
            windowHeight: 1080
          });

          const dataURL = canvas.toDataURL('image/png', 1.0);

          // Add image to slide (full slide dimensions)
          pptxSlide.addImage({
            data: dataURL,
            x: 0,
            y: 0,
            w: '100%',
            h: '100%'
          });
        }

        processedSlides++;
        this.updateProgress(10 + (processedSlides / totalSlides) * 80);
      }

      this.updateProgress(95);

      // Generate PPTX blob instead of auto-downloading
      const pptxBlob = await pptx.write({ outputType: 'blob' });
      const downloadUrl = URL.createObjectURL(pptxBlob);

      this.updateProgress(100);
      return { 
        success: true, 
        message: `PPTX with ${totalSlides} slides exported successfully!`,
        downloadUrl: downloadUrl,
        filename: filename,
        exportType: 'PPTX'
      };
    } catch (error) {
      console.error('PPTX export error:', error);
      return { success: false, message: `PPTX export failed: ${error.message}` };
    }
  }

  // Helper method to create a temporary stage for a specific slide
  async createTemporaryStage(slide, themeComponent, stageWidth = 1280, stageHeight = 720) {
    return new Promise((resolve) => {
      // This would need to be implemented to create a temporary Konva stage
      // for slides that aren't currently visible
      // For now, we'll return null and handle in the calling code
      resolve(null);
    });
  }
}

// Utility function to download file from data URL
export function downloadFile(dataURL, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Utility function to get current timestamp for filenames
export function getTimestampedFilename(baseName, extension) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${baseName}_${timestamp}.${extension}`;
}
