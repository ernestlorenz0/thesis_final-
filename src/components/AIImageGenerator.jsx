import React, { useState } from 'react';

export default function AIImageGenerator({ open, onClose, onImageGenerated }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImage(null);

    try {
      
      const response = await fetch('http://127.0.0.1:5000/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      if (data.image_base64) {
        const imageData = `data:image/png;base64,${data.image_base64}`;
        setGeneratedImage({
          url: imageData,
          name: `AI Generated: ${prompt}`,
          prompt: prompt.trim()
        });
      } else {
        throw new Error('No image data received');
      }
    } catch (err) {
      setError(err.message || 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseImage = () => {
    if (generatedImage) {
      onImageGenerated(generatedImage);
      onClose();
      // Reset state
      setPrompt('');
      setGeneratedImage(null);
      setError('');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset state
    setPrompt('');
    setGeneratedImage(null);
    setError('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[600px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">AI Image Generator</h2>
          <button 
            className="text-gray-600 hover:text-gray-900 text-xl font-bold" 
            onClick={handleClose}
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Describe the image you want to generate:
          </label>
          <textarea
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 resize-none text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            rows="3"
            placeholder="e.g., A futuristic classroom with holographic displays and students using VR headsets"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded-lg font-medium">
            {error}
          </div>
        )}

        <div className="mb-4">
          <button
            className={`w-full py-2 px-4 rounded-lg font-medium ${
              isGenerating || !prompt.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>

        {generatedImage && (
          <div className="flex-1 overflow-y-auto">
            <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-bold text-gray-900 mb-2">Generated Image:</h3>
              <div className="flex flex-col items-center">
                <img 
                  src={generatedImage.url} 
                  alt={generatedImage.name}
                  className="w-full max-w-md h-auto rounded-lg shadow-md mb-3 border border-gray-200"
                />
                <p className="text-sm text-gray-800 text-center mb-3 font-medium">
                  <strong className="text-gray-900">Prompt:</strong> {generatedImage.prompt}
                </p>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors duration-200"
                  onClick={handleUseImage}
                >
                  Use This Image
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
