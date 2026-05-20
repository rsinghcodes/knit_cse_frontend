'use client';

import { Pause, Play, Plus, Trash2, Pencil, Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useHighlightsApi } from '~/utils/api/useHighlightsApi';
import { useEditMode } from '~/context/EditModeContext';
import ConfirmDialog from '~/components/admin/ConfirmDialog';

export default function HighlightsStrip() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const { isEditMode } = useEditMode();

  const { highlights, addHighlight, updateHighlight, deleteHighlight } = useHighlightsApi();

  // New highlight form
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [newHref, setNewHref] = useState('/');

  // Inline edit of existing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editHref, setEditHref] = useState('');

  // Delete confirm
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = isPaused ? 'paused' : 'running';
    }
  }, [isPaused]);

  const handleAdd = async () => {
    if (!newText.trim()) return;
    await addHighlight.mutateAsync({ text: newText.trim(), href: newHref || '/' });
    setAdding(false);
    setNewText('');
    setNewHref('/');
  };

  const handleStartEdit = (h: { id: number; text: string; href: string }) => {
    setEditingId(h.id);
    setEditText(h.text);
    setEditHref(h.href);
  };

  const handleSaveEdit = async () => {
    if (editingId === null) return;
    await updateHighlight.mutateAsync({ id: editingId, text: editText, href: editHref });
    setEditingId(null);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Edit controls strip (admin only) */}
      {isEditMode && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-yellow-700">✏️ Highlights editor:</span>
          <button
            onClick={() => setAdding((p) => !p)}
            className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={12} /> Add Highlight
          </button>
        </div>
      )}

      {/* Add form */}
      {isEditMode && adding && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Highlight text…"
            className="border border-gray-300 rounded px-2 py-1 text-xs flex-1 min-w-40"
          />
          <input
            type="text"
            value={newHref}
            onChange={(e) => setNewHref(e.target.value)}
            placeholder="Link URL (e.g. /)"
            className="border border-gray-300 rounded px-2 py-1 text-xs w-40"
          />
          <button
            onClick={handleAdd}
            className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700"
          >
            <Check size={12} /> Save
          </button>
          <button
            onClick={() => setAdding(false)}
            className="flex items-center gap-1 text-xs bg-gray-400 text-white px-3 py-1.5 rounded-lg hover:bg-gray-500"
          >
            <X size={12} /> Cancel
          </button>
        </div>
      )}

      {/* Marquee */}
      <div className="flex items-center w-full bg-gray-100 border-t border-b border-gray-300 text-sm">
        <div className="bg-[#A80D1E] text-white font-semibold px-3 py-2 md:px-5 relative after:absolute after:right-0 after:top-0 after:bottom-0 after:border-t-22 after:border-b-22 after:border-l-12 after:border-l-[#A80D1E] after:border-t-transparent after:border-b-transparent text-xs md:text-sm whitespace-nowrap z-10 shrink-0">
          HIGHLIGHTS
        </div>

        <div className={`relative overflow-hidden flex-1 py-2 ${isEditMode ? '' : ''}`}>
          <div
            ref={marqueeRef}
            className={`inline-flex whitespace-nowrap ${isEditMode ? '' : 'animate-marquee'}`}
          >
            {highlights.map((item) =>
              isEditMode && editingId === item.id ? (
                <span key={item.id} className="inline-flex items-center gap-1 mx-4">
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border border-blue-400 rounded px-2 py-0.5 text-xs w-48"
                  />
                  <input
                    value={editHref}
                    onChange={(e) => setEditHref(e.target.value)}
                    className="border border-blue-400 rounded px-2 py-0.5 text-xs w-32"
                    placeholder="URL"
                  />
                  <button onClick={handleSaveEdit} className="text-green-600 hover:text-green-800"><Check size={14} /></button>
                  <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700"><X size={14} /></button>
                </span>
              ) : (
                <span key={item.id} className="inline-flex items-center whitespace-nowrap">
                  <a
                    className="mx-4 md:mx-8 text-gray-800 font-medium hover:text-[#A80D1E] cursor-pointer transition-colors text-xs md:text-sm whitespace-nowrap"
                    href={item.href}
                  >
                    {item.text}
                  </a>
                  {isEditMode && (
                    <span className="inline-flex gap-1 ml-1">
                      <button
                        onClick={() => handleStartEdit({ id: item.id, text: item.text, href: item.href })}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </span>
                  )}
                  <span className="text-gray-400 mx-2">|</span>
                </span>
              )
            )}
          </div>
        </div>

        <div className="mx-2 z-10 bg-gray-100 pl-2 shrink-0">
          {isPaused ? (
            <button
              onClick={() => setIsPaused(false)}
              className="bg-[#A80D1E] text-white px-2 py-1 rounded hover:bg-primary transition"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsPaused(true)}
              className="bg-[#A80D1E] text-white px-2 py-1 rounded hover:bg-primary transition"
            >
              <Pause className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Highlight"
        message="This will permanently remove the highlight from the marquee."
        onConfirm={async () => {
          if (deleteId !== null) {
            await deleteHighlight.mutateAsync(deleteId);
            setDeleteId(null);
          }
        }}
        onCancel={() => setDeleteId(null)}
        loading={deleteHighlight.isPending}
      />
    </div>
  );
}
