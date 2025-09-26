import React from 'react';

export default function HelpPage() {
  const helpSteps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Upload PDF Files",
      description: "Upload one or more PDF files using the drag-and-drop upload box. Maximum file size is 5MB per file."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "AI Image Generation",
      description: "Optionally, enter a prompt for AI image generation to enhance your presentation with custom visuals."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      title: "Select Template",
      description: "Click 'Generate PowerPoint' and choose from our collection of professional presentation templates."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Edit & Customize",
      description: "Review and edit your slides in our powerful editor. Add text, images, and customize layouts to your liking."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Export & Share",
      description: "Export your presentation as PDF, PNG, or PPTX format. All exports are saved to your history for easy access."
    }
  ];

  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "Currently, we support PDF files for upload. You can export your presentations as PDF, PNG, or PPTX."
    },
    {
      question: "Is there a file size limit?",
      answer: "Yes, each PDF file must be under 5MB. You can upload multiple files at once."
    },
    {
      question: "How does AI image generation work?",
      answer: "Enter a descriptive prompt and our AI will generate relevant images to enhance your presentation content."
    },
    {
      question: "Can I edit slides after generation?",
      answer: "Absolutely! Our slide editor allows you to modify text, add images, change layouts, and customize your presentation."
    }
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* STI Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#003D7A' }}>How to Use KENBILEARN</h2>
        <p style={{ color: '#2C2C2C' }}>Follow these simple steps to create amazing presentations</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8">
          
          {/* STI Steps Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#003D7A' }}>
              <svg className="w-5 h-5" fill="none" stroke="#FFC72C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Getting Started
            </h3>
            
            <div className="space-y-4">
              {helpSteps.map((step, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                  <div className="relative p-4 bg-white rounded-xl border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E5E5E5' }}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#003D7A' }}>
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div style={{ color: '#FFC72C' }}>
                            {step.icon}
                          </div>
                          <h4 className="font-semibold" style={{ color: '#003D7A' }}>{step.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STI FAQ Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#003D7A' }}>
              <svg className="w-5 h-5" fill="none" stroke="#FFC72C" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.05) 0%, rgba(255, 199, 44, 0.05) 100%)' }} />
                  <div className="relative p-4 bg-white rounded-xl border hover:shadow-lg transition-all duration-300" style={{ borderColor: '#E5E5E5' }}>
                    <h4 className="font-semibold mb-2" style={{ color: '#003D7A' }}>{faq.question}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: '#2C2C2C' }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STI Contact Section */}
          <div className="p-6 rounded-xl border" style={{ background: 'linear-gradient(135deg, rgba(0, 61, 122, 0.1) 0%, rgba(255, 199, 44, 0.1) 100%)', borderColor: '#E5E5E5' }}>
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full" style={{ backgroundColor: '#F9F9F9', border: '2px solid #E5E5E5' }}>
                  <svg className="w-6 h-6" fill="none" stroke="#FFC72C" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold mb-2" style={{ color: '#003D7A' }}>Need More Help?</h4>
              <p className="text-sm mb-4" style={{ color: '#2C2C2C' }}>
                Can't find what you're looking for? Our support team is here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-4 py-2 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2" style={{ backgroundColor: '#003D7A', '--tw-ring-color': 'rgba(255, 199, 44, 0.5)' }}>
                  Contact Support
                </button>
                <button className="px-4 py-2 bg-white border font-semibold rounded-lg hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2" style={{ color: '#003D7A', borderColor: '#E5E5E5', '--tw-ring-color': 'rgba(0, 61, 122, 0.3)' }}>
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
