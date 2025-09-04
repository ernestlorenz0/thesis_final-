import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { fetchHistoryItems, renameHistoryItem, deleteHistoryItem } from '../firebaseAuth';

export default function HistoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchHistoryItems();
      setItems(data);
    } catch (e) {
      setError(e.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingName(item.filename);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    try {
      await renameHistoryItem(editingId, editingName || 'Untitled');
      setItems(items => items.map(it => it.id === editingId ? { ...it, filename: editingName || 'Untitled' } : it));
      setEditingId(null);
      setEditingName('');
    } catch (e) {
      setError(e.message || 'Failed to rename');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this presentation from history?')) return;
    try {
      await deleteHistoryItem(id);
      setItems(items => items.filter(it => it.id !== id));
    } catch (e) {
      setError(e.message || 'Failed to delete');
    }
  };

  const handleDownload = async (item) => {
    // Generate a simple PDF from stored slides content (titles/paragraphs). Images are skipped here.
    const slides = Array.isArray(item.slides) ? item.slides : [];
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [960, 540] });
    slides.forEach((slide, idx) => {
      if (idx !== 0) pdf.addPage([960, 540], 'landscape');
      let y = 60;
      // Title
      const titleComp = (slide.components || []).find(c => c.type === 'title');
      if (titleComp && titleComp.content) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(28);
        pdf.text(String(titleComp.content), 60, y, { maxWidth: 840 });
        y += 60;
      }
      // Paragraphs
      const paragraphs = (slide.components || []).filter(c => c.type === 'paragraph' && c.content);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(16);
      paragraphs.forEach(p => {
        const text = Array.isArray(p.content) ? p.content.join(' ') : String(p.content);
        const lines = pdf.splitTextToSize(text, 840);
        pdf.text(lines, 60, y);
        y += (lines.length * 22) + 18;
      });
    });
    pdf.save((item.filename || 'presentation') + '.pdf');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#F3EDFF] via-[#F7F4FF] to-[#F5F1FF] p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#8C6BFA] mb-4">History</h2>
        {error && <div className="w-full text-red-600 text-sm mb-2">{error}</div>}
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-gray-400">No history yet.</div>
        ) : (
          <ul className="w-full divide-y divide-[#E3D9FA]">
            {items.map(item => (
              <li key={item.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex-1 flex items-center gap-3">
                  {editingId === item.id ? (
                    <input
                      className="px-3 py-1.5 text-sm rounded-md border border-[#E3D9FA] focus:ring-1 focus:ring-[#8C6BFA] text-gray-900 bg-white w-full md:w-80"
                      value={editingName}
                      onChange={e => setEditingName(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <span className="text-[#8C6BFA] font-semibold truncate">{item.filename}</span>
                  )}
                  <span className="text-xs text-gray-400">Generated: {new Date(item.generatedAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  {editingId === item.id ? (
                    <>
                      <button className="px-3 py-1.5 text-sm bg-[#8C6BFA] text-white rounded" onClick={saveEdit}>Save</button>
                      <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="px-3 py-1.5 text-sm border border-gray-300 text-[#8C6BFA] rounded" onClick={() => startEdit(item)}>Change Name</button>
                      <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded" onClick={() => handleDownload(item)}>Download PDF</button>
                      <button className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded" onClick={() => handleDelete(item.id)}>Delete Presentation</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
