import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Download, FileText, FileImage, Presentation } from 'lucide-react';

export default function ExportNotification({ show, onClose, exportType, success, message, downloadUrl, filename }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000); // Auto-close after 6 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const getIcon = () => {
    if (!success) return <XCircle className="w-8 h-8 text-red-500" />;
    
    switch (exportType) {
      case 'PNG':
        return <FileImage className="w-8 h-8 text-green-500" />;
      case 'PDF':
        return <FileText className="w-8 h-8 text-green-500" />;
      case 'PPTX':
        return <Presentation className="w-8 h-8 text-green-500" />;
      default:
        return <CheckCircle className="w-8 h-8 text-green-500" />;
    }
  };

  const handleDownload = () => {
    if (downloadUrl && filename) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`bg-white rounded-lg shadow-2xl border-l-4 p-6 max-w-md min-w-[320px] ${
        success ? 'border-green-500' : 'border-red-500'
      }`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-semibold text-lg mb-1 ${
              success ? 'text-green-800' : 'text-red-800'
            }`}>
              {success ? `${exportType} Export Complete!` : 'Export Failed'}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4">
              {message}
            </p>

            {success && downloadUrl && (
              <div className="flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download {exportType}
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  Close
                </button>
              </div>
            )}

            {!success && (
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Close
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
