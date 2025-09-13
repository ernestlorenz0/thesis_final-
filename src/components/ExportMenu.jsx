import React, { useState } from 'react';
import { Download, FileImage, FileText, Presentation, X } from 'lucide-react';

export default function ExportMenu({ 
  isOpen, 
  onClose, 
  onExportPNG, 
  onExportPDF, 
  onExportPPTX,
  isExporting,
  exportProgress 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Download size={20} className="text-[#8C6BFA] sm:w-6 sm:h-6" />
            <span className="hidden sm:inline">Export Presentation</span>
            <span className="sm:hidden">Export</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isExporting}
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {isExporting && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 sm:gap-3 text-blue-700 mb-3">
              <div className="relative">
                <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <div className="absolute inset-0 animate-pulse w-4 h-4 sm:w-5 sm:h-5 border border-blue-300 rounded-full"></div>
              </div>
              <span className="font-semibold text-sm sm:text-base">Exporting presentation...</span>
            </div>
            <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${Math.round(exportProgress)}%` }}
              ></div>
            </div>
            <div className="text-xs sm:text-sm font-medium text-blue-700 mt-2 flex justify-between items-center">
              <span>{Math.round(exportProgress)}% complete</span>
              <span className="text-xs text-blue-500">Please wait...</span>
            </div>
          </div>
        )}

        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={onExportPNG}
            disabled={isExporting}
            className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-[#8C6BFA] hover:bg-[#F6F2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
              <FileImage size={20} className="text-green-600 sm:w-6 sm:h-6" />
            </div>
            <div className="text-left min-w-0">
              <div className="font-semibold text-gray-800 text-sm sm:text-base">Export as PNG</div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">High-quality image of current slide</div>
            </div>
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-[#8C6BFA] hover:bg-[#F6F2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-1.5 sm:p-2 bg-red-100 rounded-lg flex-shrink-0">
              <FileText size={20} className="text-red-600 sm:w-6 sm:h-6" />
            </div>
            <div className="text-left min-w-0">
              <div className="font-semibold text-gray-800 text-sm sm:text-base">Export as PDF</div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">All slides as PDF document</div>
            </div>
          </button>

          <button
            onClick={onExportPPTX}
            disabled={isExporting}
            className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-xl hover:border-[#8C6BFA] hover:bg-[#F6F2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <Presentation size={20} className="text-orange-600 sm:w-6 sm:h-6" />
            </div>
            <div className="text-left min-w-0">
              <div className="font-semibold text-gray-800 text-sm sm:text-base">Export as PPTX</div>
              <div className="text-xs sm:text-sm text-gray-500 truncate">PowerPoint presentation file</div>
            </div>
          </button>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="text-xs sm:text-sm text-gray-600">
            <strong>Note:</strong> Don't switch tabs or applications while exporting.
          </div>
        </div>
      </div>
    </div>
  );
}
