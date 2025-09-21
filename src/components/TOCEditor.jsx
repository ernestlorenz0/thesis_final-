import React, { useState, useEffect } from 'react';
import { Plus, Minus, Edit3, Save, X } from 'lucide-react';

/**
 * TOC Editor Component
 * Allows users to edit the generated table of contents
 */
export default function TOCEditor({ tocData, onSave, onCancel }) {
  const [editedTOC, setEditedTOC] = useState(tocData);
  const [editingSection, setEditingSection] = useState(null);
  const [editingSubsection, setEditingSubsection] = useState(null);

  useEffect(() => {
    setEditedTOC(tocData);
  }, [tocData]);

  const updateTitle = (newTitle) => {
    setEditedTOC(prev => ({
      ...prev,
      title: newTitle
    }));
  };

  const updateSectionTitle = (sectionIndex, newTitle) => {
    setEditedTOC(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex ? { ...section, title: newTitle } : section
      )
    }));
  };

  const addSection = () => {
    setEditedTOC(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "New Section",
          subsections: [],
          id: `section-${Date.now()}`
        }
      ]
    }));
  };

  const removeSection = (sectionIndex) => {
    setEditedTOC(prev => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex)
    }));
  };

  const addSubsection = (sectionIndex) => {
    setEditedTOC(prev => ({
      ...prev,
      sections: prev.sections.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              subsections: [...section.subsections, "New Subsection"]
            }
          : section
      )
    }));
  };

  const updateSubsection = (sectionIndex, subsectionIndex, newTitle) => {
    setEditedTOC(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              subsections: section.subsections.map((sub, subIndex) =>
                subIndex === subsectionIndex ? newTitle : sub
              )
            }
          : section
      )
    }));
  };

  const removeSubsection = (sectionIndex, subsectionIndex) => {
    setEditedTOC(prev => ({
      ...prev,
      sections: prev.sections.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              subsections: section.subsections.filter((_, subIndex) => subIndex !== subsectionIndex)
            }
          : section
      )
    }));
  };

  const handleSave = () => {
    onSave(editedTOC);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Edit Table of Contents</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TOC Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={editedTOC.title}
              onChange={(e) => updateTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Sections</h3>
              <button
                onClick={addSection}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>

            {editedTOC.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                {/* Section Title */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1">
                    {editingSection === sectionIndex ? (
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                        onBlur={() => setEditingSection(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setEditingSection(null);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {sectionIndex + 1}. {section.title}
                        </span>
                        <button
                          onClick={() => setEditingSection(sectionIndex)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit3 className="w-3 h-3 text-gray-500" />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeSection(sectionIndex)}
                    className="p-1 hover:bg-red-100 rounded text-red-500"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subsections */}
                <div className="ml-4 space-y-2">
                  {section.subsections.map((subsection, subsectionIndex) => (
                    <div key={subsectionIndex} className="flex items-center gap-2">
                      <div className="flex-1">
                        {editingSubsection === `${sectionIndex}-${subsectionIndex}` ? (
                          <input
                            type="text"
                            value={subsection}
                            onChange={(e) => updateSubsection(sectionIndex, subsectionIndex, e.target.value)}
                            onBlur={() => setEditingSubsection(null)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') setEditingSubsection(null);
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {sectionIndex + 1}.{subsectionIndex + 1} {subsection}
                            </span>
                            <button
                              onClick={() => setEditingSubsection(`${sectionIndex}-${subsectionIndex}`)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Edit3 className="w-3 h-3 text-gray-400" />
                            </button>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeSubsection(sectionIndex, subsectionIndex)}
                        className="p-1 hover:bg-red-100 rounded text-red-400"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addSubsection(sectionIndex)}
                    className="flex items-center gap-1 px-2 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add Subsection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
