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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Download size={24} className="text-[#8C6BFA]" />
            Export Presentation
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
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-3 text-blue-700 mb-3">
              <div className="relative">
                <div className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <div className="absolute inset-0 animate-pulse w-5 h-5 border border-blue-300 rounded-full"></div>
              </div>
              <span className="font-semibold">Exporting presentation...</span>
            </div>
            <div className="w-full bg-gradient-to-r from-blue-200 to-purple-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${Math.round(exportProgress)}%` }}
              ></div>
            </div>
            <div className="text-sm font-medium text-blue-700 mt-2 flex justify-between items-center">
              <span>{Math.round(exportProgress)}% complete</span>
              <span className="text-xs text-blue-500">Please wait...</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={onExportPNG}
            disabled={isExporting}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8C6BFA] hover:bg-[#F6F2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <FileImage size={24} className="text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Export as PNG</div>
              <div className="text-sm text-gray-500">High-quality image of current slide</div>
            </div>
          </button>

          <button
            onClick={onExportPDF}
            disabled={isExporting}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8C6BFA] hover:bg-[#F6F2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-red-100 rounded-lg">
              <FileText size={24} className="text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Export as PDF</div>
              <div className="text-sm text-gray-500">All slides as PDF document</div>
            </div>
          </button>

          <button
            onClick={onExportPPTX}
            disabled={isExporting}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-[#8C6BFA] hover:bg-[#F6F2FF] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-orange-100 rounded-lg">
              <Presentation size={24} className="text-orange-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-800">Export as PPTX</div>
              <div className="text-sm text-gray-500">PowerPoint presentation file</div>
            </div>
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Note:</strong> Don’t switch tabs or applications while exporting.
          </div>
        </div>
      </div>
    </div>
  );
}
