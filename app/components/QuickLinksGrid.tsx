import React, { useState } from 'react';
import { useQuickLinksApi } from '~/utils/api/useQuickLinksApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableText from '~/components/admin/EditableText';
import EditableImage from '~/components/admin/EditableImage';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import { Trash2, Plus, X } from 'lucide-react';

const QuickLinksGrid: React.FC = () => {
  const { quicklinks, isLoading, addQuickLink, updateQuickLink, deleteQuickLink } = useQuickLinksApi();
  const { isEditMode } = useEditMode();

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newHref, setNewHref] = useState('');
  const [newIcon, setNewIcon] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  const handleUpdateField = async (id: number, field: string, value: string) => {
    await updateQuickLink.mutateAsync({ id, payload: { [field]: value } });
  };

  const handleUploadIcon = async (id: number, file: File) => {
    const fd = new FormData();
    fd.append('icon', file);
    await updateQuickLink.mutateAsync({ id, payload: fd });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const fd = new FormData();
      fd.append('title', newTitle);
      fd.append('href', newHref);
      if (newIcon) fd.append('icon', newIcon);
      await addQuickLink.mutateAsync(fd);
      setShowAddModal(false);
      setNewTitle('');
      setNewHref('');
      setNewIcon(null);
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) {
    return <section className="bg-accent py-10 min-h-[200px] animate-pulse" />;
  }

  return (
    <section className={`bg-accent py-10 ${isEditMode ? 'ring-2 ring-inset ring-blue-300' : ''}`}>
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold">Quick Links</h2>
          {isEditMode && (
            <>
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow">
                ✏️ Editing Quick Links
              </span>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white cursor-pointer px-3 py-1 rounded transition text-xs font-semibold"
              >
                <Plus size={14} /> Add Link
              </button>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {quicklinks.map((link) => (
            <div
              key={link.id}
              className={`bg-white rounded-xl border shadow-md hover:shadow-lg p-4 text-center text-sm font-medium relative ${isEditMode ? 'border-blue-400 ring-1 ring-blue-300' : 'border-gray-200 cursor-pointer'
                }`}
            >
              {isEditMode && (
                <button
                  onClick={() => setDeleteId(link.id)}
                  className="absolute -top-2 -right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                >
                  <Trash2 size={12} />
                </button>
              )}

              <div className="w-12 h-12 mx-auto mb-2 relative">
                <EditableImage
                  src={link.icon_url || link.icon || '/assets/icons/default.png'}
                  alt={link.title}
                  onSave={(file) => handleUploadIcon(link.id, file)}
                  className="w-full h-full object-contain"
                />
              </div>

              {isEditMode ? (
                <div className="space-y-2 mt-2">
                  <EditableText
                    tag="p"
                    value={link.title}
                    onSave={(v) => handleUpdateField(link.id, 'title', v)}
                    className="font-bold text-gray-800"
                  />
                  <EditableText
                    tag="p"
                    value={link.href}
                    onSave={(v) => handleUpdateField(link.id, 'href', v)}
                    className="text-xs text-blue-500 break-all"
                  />
                </div>
              ) : (
                <a href={link.href} className="block w-full h-full text-gray-800 hover:text-blue-600">
                  {link.title}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Quick Link"
        message="Are you sure you want to remove this quick link?"
        onConfirm={async () => {
          if (deleteId) await deleteQuickLink.mutateAsync(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
        loading={deleteQuickLink.isPending}
      />

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Add Quick Link</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" placeholder="Admissions" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL *</label>
                <input required value={newHref} onChange={e => setNewHref(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" placeholder="/admissions" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon Image</label>
                <input type="file" accept="image/*" onChange={e => setNewIcon(e.target.files?.[0] || null)} className="w-full text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 px-4 rounded bg-gray-100 font-medium">Cancel</button>
                <button type="submit" disabled={adding} className="flex-1 py-2 px-4 rounded bg-[#1a4a7f] text-white font-medium">{adding ? 'Saving...' : 'Add Link'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default QuickLinksGrid;
