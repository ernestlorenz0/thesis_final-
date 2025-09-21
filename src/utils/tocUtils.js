/**
 * Table of Contents Utilities
 * Universal data structure and helper functions for TOC management
 */

/**
 * Universal TOC Data Structure
 * 
 * @typedef {Object} TOCSection
 * @property {string} title - Section title
 * @property {string[]} subsections - Array of subsection titles
 * @property {number} [page] - Optional page number
 * @property {string} [id] - Optional unique identifier
 * 
 * @typedef {Object} TOCData
 * @property {string} title - TOC title (usually "Table of Contents")
 * @property {TOCSection[]} sections - Array of sections
 * @property {Object} [metadata] - Optional metadata
 */

/**
 * Create a default/empty TOC structure
 * @returns {TOCData} Default TOC structure
 */
export function createDefaultTOC() {
  return {
    title: "Table of Contents",
    sections: [
      {
        title: "Introduction and Problem Statement",
        categories: [
          { name: "Problem Statement and Background", terms: ["Research Context", "Problem Definition", "Literature Review", "Scope Analysis"] },
          { name: "Research Objectives and Methodology", terms: ["Primary Goals", "Research Questions", "Methodology Framework", "Study Design"] }
        ],
        id: "intro"
      },
      {
        title: "Theoretical Framework and Key Concepts",
        categories: [
          { name: "Theoretical Framework and Definitions", terms: ["Core Concepts", "Mathematical Models", "System Theory", "Technical Definitions"] },
          { name: "Fundamental Principles and Methods", terms: ["Algorithm Design", "Implementation Methods", "System Architecture", "Design Patterns"] }
        ],
        id: "concepts"
      },
      {
        title: "System Implementation and Analysis",
        categories: [
          { name: "Analysis Methods and Techniques", terms: ["Data Analysis", "Performance Metrics", "Statistical Methods", "Validation Techniques"] },
          { name: "Practical Applications and Implementation", terms: ["Real-world Examples", "System Implementation", "Use Case Studies", "Deployment Strategies"] }
        ],
        id: "applications"
      },
      {
        title: "Results and Future Research Directions",
        categories: [
          { name: "Research Findings and Results", terms: ["Experimental Results", "Performance Analysis", "Key Findings", "Statistical Outcomes"] },
          { name: "Future Work and Research Directions", terms: ["Research Extensions", "Future Studies", "Improvement Areas", "Technology Trends"] }
        ],
        id: "conclusion"
      }
    ],
    metadata: {
      generated: new Date().toISOString(),
      source: "default"
    }
  };
}

/**
 * Validate TOC data structure
 * @param {Object} tocData - TOC data to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function validateTOCData(tocData) {
  if (!tocData || typeof tocData !== 'object') return false;
  
  // Check required fields
  if (!tocData.title || typeof tocData.title !== 'string') return false;
  if (!Array.isArray(tocData.sections)) return false;
  
  // Validate each section
  for (const section of tocData.sections) {
    if (!section.title || typeof section.title !== 'string') return false;
    if (section.subsections && !Array.isArray(section.subsections)) return false;
  }
  
  return true;
}

/**
 * Sanitize and normalize TOC data
 * @param {Object} tocData - Raw TOC data
 * @returns {TOCData} Normalized TOC data
 */
export function normalizeTOCData(tocData) {
  if (!validateTOCData(tocData)) {
    console.warn('Invalid TOC data provided, using default structure');
    return createDefaultTOC();
  }
  
  return {
    title: tocData.title || "Table of Contents",
    sections: tocData.sections.map((section, index) => ({
      title: section.title || `Section ${index + 1}`,
      subsections: Array.isArray(section.subsections) ? section.subsections : [],
      id: section.id || `section-${index}`,
      page: section.page || null
    })),
    metadata: {
      ...tocData.metadata,
      normalized: new Date().toISOString()
    }
  };
}

/**
 * Generate TOC from backend API
 * @param {string} text - Document text to analyze
 * @returns {Promise<TOCData>} Generated TOC data
 */
export async function generateTOCFromText(text) {
  try {
    const response = await fetch('/generate-toc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.toc) {
      return normalizeTOCData(data.toc);
    } else {
      throw new Error(data.error || 'Failed to generate TOC');
    }
  } catch (error) {
    console.error('Error generating TOC:', error);
    return createDefaultTOC();
  }
}

/**
 * Convert TOC to different formats for theme compatibility
 */
export const TOCFormatters = {
  /**
   * Format for simple list themes
   * @param {TOCData} tocData 
   * @returns {string[]} Array of formatted strings
   */
  simpleList: (tocData) => {
    const items = [];
    tocData.sections.forEach(section => {
      items.push(section.title);
      section.subsections.forEach(sub => {
        items.push(`  ${sub}`);
      });
    });
    return items;
  },
  
  /**
   * Format for hierarchical themes
   * @param {TOCData} tocData 
   * @returns {Object[]} Array of hierarchical objects
   */
  hierarchical: (tocData) => {
    return tocData.sections.map(section => ({
      title: section.title,
      children: section.subsections.map(sub => ({ title: sub })),
      id: section.id
    }));
  },
  
  /**
   * Format for numbered themes
   * @param {TOCData} tocData 
   * @returns {Object[]} Array with numbering
   */
  numbered: (tocData) => {
    return tocData.sections.map((section, index) => ({
      number: index + 1,
      title: section.title,
      subsections: section.subsections.map((sub, subIndex) => ({
        number: `${index + 1}.${subIndex + 1}`,
        title: sub
      }))
    }));
  }
};

/**
 * Theme-specific TOC adapters
 */
export const TOCAdapters = {
  /**
   * Academic Minimal theme adapter
   */
  'Academic Minimal': (tocData) => ({
    title: tocData.title,
    items: TOCFormatters.simpleList(tocData)
  }),
  
  /**
   * STEM Modern theme adapter
   */
  'STEM Modern': (tocData) => ({
    title: tocData.title,
    sections: TOCFormatters.numbered(tocData)
  }),
  
  /**
   * Default adapter for themes without specific formatting
   */
  default: (tocData) => ({
    title: tocData.title,
    items: TOCFormatters.simpleList(tocData),
    sections: tocData.sections
  })
};

/**
 * Get formatted TOC data for a specific theme
 * @param {TOCData} tocData - Universal TOC data
 * @param {string} themeName - Name of the theme
 * @returns {Object} Formatted TOC data for the theme
 */
export function formatTOCForTheme(tocData, themeName) {
  const adapter = TOCAdapters[themeName] || TOCAdapters.default;
  return adapter(tocData);
}

/**
 * Estimate page numbers based on content length
 * @param {TOCData} tocData - TOC data
 * @param {number} totalPages - Total estimated pages
 * @returns {TOCData} TOC with estimated page numbers
 */
export function addPageNumbers(tocData, totalPages = 20) {
  const sectionsCount = tocData.sections.length;
  const pagesPerSection = Math.floor(totalPages / sectionsCount);
  
  let currentPage = 3; // Start after title and TOC slides
  
  return {
    ...tocData,
    sections: tocData.sections.map((section, index) => ({
      ...section,
      page: currentPage + (index * pagesPerSection)
    }))
  };
}
