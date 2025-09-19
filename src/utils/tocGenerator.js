// TOC Generation Utility
// Handles dynamic Table of Contents generation using Gemini API

const API_BASE_URL = 'http://localhost:5000';

/**
 * Generate Table of Contents from text content using Gemini AI
 * @param {string} textContent - The text content to analyze
 * @param {string} themeName - The presentation theme name
 * @returns {Promise<Object>} - Generated TOC data
 */
export async function generateTOCFromContent(textContent, themeName = 'Academic') {
  try {
    console.log('🔍 Generating TOC from content...', { textLength: textContent.length, themeName });
    
    const response = await fetch(`${API_BASE_URL}/generate-toc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: textContent,
        theme: themeName
      })
    });

    if (!response.ok) {
      throw new Error(`TOC generation failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'TOC generation failed');
    }

    console.log('✅ TOC generated successfully:', data);
    return data;
    
  } catch (error) {
    console.error('❌ TOC generation error:', error);
    
    // Return fallback TOC structure
    return {
      success: true,
      toc_items: [
        { title: "Introduction to the Topic", type: "main", order: 1 },
        { title: "Key Concepts and Definitions", type: "main", order: 2 },
        { title: "Historical Background", type: "main", order: 3 },
        { title: "Current Applications", type: "main", order: 4 },
        { title: "Case Studies and Examples", type: "main", order: 5 },
        { title: "Future Implications", type: "main", order: 6 },
        { title: "Conclusion and Q&A", type: "main", order: 7 }
      ],
      presentation_title: `${themeName} Presentation`,
      fallback: true
    };
  }
}

/**
 * Convert TOC items to slide components format
 * @param {Array} tocItems - Array of TOC items from Gemini API
 * @returns {Array} - Array of slide components
 */
export function convertTOCToSlideComponents(tocItems) {
  console.log('🔄 Converting TOC items to slide components:', tocItems);
  
  const components = [
    { id: 'toc-header', type: 'toc', content: 'Table of Contents' }
  ];

  tocItems.forEach((item, index) => {
    components.push({
      id: `toc-item-${index + 1}`,
      type: 'toc_item',
      content: item.title
    });
  });

  console.log('✅ Generated TOC components:', components);
  return components;
}

/**
 * Extract text content from uploaded files for TOC generation
 * @param {Array} uploadResults - Results from PDF upload processing
 * @returns {string} - Combined text content
 */
export function extractTextFromUploadResults(uploadResults) {
  if (!uploadResults || !Array.isArray(uploadResults)) {
    return '';
  }

  let combinedText = '';
  
  uploadResults.forEach(result => {
    if (result.terms && Array.isArray(result.terms)) {
      // Extract text from terms and definitions
      result.terms.forEach(term => {
        combinedText += `${term.term}: ${term.definition}\n\n`;
      });
    }
  });

  return combinedText.trim();
}

/**
 * Generate enhanced TOC with user-uploaded content
 * @param {Array} uploadResults - Results from PDF processing
 * @param {string} themeName - Selected theme name
 * @returns {Promise<Object>} - Generated TOC data
 */
export async function generateEnhancedTOC(uploadResults, themeName) {
  console.log('🚀 generateEnhancedTOC called with:', { uploadResults, themeName });
  
  const textContent = extractTextFromUploadResults(uploadResults);
  console.log('📄 Extracted text content length:', textContent.length);
  
  if (!textContent) {
    console.log('⚠️ No text content found, using fallback TOC');
    return {
      success: true,
      toc_items: [
        { title: "Introduction to the Topic", type: "main", order: 1 },
        { title: "Key Concepts and Definitions", type: "main", order: 2 },
        { title: "Historical Background", type: "main", order: 3 },
        { title: "Current Applications", type: "main", order: 4 },
        { title: "Case Studies and Examples", type: "main", order: 5 },
        { title: "Future Implications", type: "main", order: 6 },
        { title: "Conclusion and Q&A", type: "main", order: 7 }
      ],
      presentation_title: `${themeName} Presentation`,
      fallback: true
    };
  }

  console.log('📡 Calling generateTOCFromContent with text content...');
  const result = await generateTOCFromContent(textContent, themeName);
  console.log('✅ TOC generation result:', result);
  return result;
}
