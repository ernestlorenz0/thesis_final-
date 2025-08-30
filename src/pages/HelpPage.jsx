import React from 'react';

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF] p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#8C6BFA] mb-4">How to Use KenbiLearn</h2>
        <ol className="list-decimal list-inside text-gray-700 text-left space-y-2">
          <li>Upload one or more PDF files using the upload box.</li>
          <li>Optionally, enter a prompt for image generation.</li>
          <li>Click "Generate PowerPoint" and select a template.</li>
          <li>Review and edit your slides in the editor.</li>
          <li>Export your presentation or save your work.</li>
        </ol>
        <div className="mt-6 text-sm text-gray-400">For more help, contact support or see the FAQ.</div>
      </div>
    </div>
  );
}
