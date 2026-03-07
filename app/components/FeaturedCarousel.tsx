import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useRef, useState } from 'react';
import { useFeaturedApi, type ApiFeaturedItem } from '~/utils/api/useFeaturedApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableText from '~/components/admin/EditableText';
import EditableImage from '~/components/admin/EditableImage';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import { Trash2, Plus, X } from 'lucide-react';

const FeaturedCarousel: React.FC = () => {
  const { featured, isLoading, addFeatured, updateFeatured, deleteFeatured } = useFeaturedApi();
  const { isEditMode } = useEditMode();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    // Only pass the autoplay plugin if there's actually data, avoiding empty-state crash
    featured.length > 0 ? [Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })] : []
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Add form state
  const [newTitle, setNewTitle] = useState('');
  const [newSize, setNewSize] = useState('');
  const [newLang, setNewLang] = useState('English');
  const [newDate, setNewDate] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (emblaApi) {
      const autoplayPlugin = emblaApi.plugins()?.autoplay;
      if (autoplayPlugin) {
        emblaApi.on('pointerDown', autoplayPlugin.stop);
        emblaApi.on('pointerUp', autoplayPlugin.reset);
      }
    }
  }, [emblaApi]);

  // Stop autoplay when in edit mode
  useEffect(() => {
    if (emblaApi) {
      const autoplayPlugin = emblaApi.plugins()?.autoplay;
      if (autoplayPlugin) {
        if (isEditMode) {
          autoplayPlugin.stop();
        } else {
          autoplayPlugin.play();
        }
      }
    }
  }, [isEditMode, emblaApi]);

  const handleUpdateField = async (id: number, field: string, value: string) => {
    await updateFeatured.mutateAsync({ id, payload: { [field]: value } });
  };

  const handleUploadImage = async (id: number, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    await updateFeatured.mutateAsync({ id, payload: fd });
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const fd = new FormData();
      fd.append('title', newTitle);
      fd.append('file_size', newSize);
      fd.append('language', newLang);
      fd.append('date', newDate);
      if (newImage) fd.append('image', newImage);
      await addFeatured.mutateAsync(fd);
      setShowAddModal(false);
      setNewTitle('');
      setNewSize('');
      setNewDate('');
      setNewImage(null);
    } finally {
      setAdding(false);
    }
  };

  if (isLoading) {
    return <section className="bg-primary py-8 min-h-[300px] animate-pulse" />;
  }

  return (
    <section className={`bg-primary py-8 ${isEditMode ? 'ring-2 ring-inset ring-blue-300' : ''}`}>
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl text-white font-bold mb-4">Featured</h2>
            {isEditMode && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow mb-4">
                ✏️ Editing Featured
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {isEditMode && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white cursor-pointer px-3 py-1 rounded transition text-sm font-semibold"
              >
                <Plus size={16} /> Add New
              </button>
            )}
            <button className="border border-white text-white cursor-pointer px-4 py-1 rounded transition">
              View All
            </button>
          </div>
        </div>

        {/* Carousel */}
        {featured.length > 0 ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {featured.map((item) => (
                <div
                  key={item.id}
                  className={`min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] bg-white rounded-lg overflow-hidden shadow-md relative ${isEditMode ? 'ring-1 ring-blue-400' : ''}`}
                >
                  {isEditMode && (
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}

                  <div className="w-full h-48 relative bg-gray-100">
                    <EditableImage
                      src={item.image_url || item.image}
                      alt={item.title}
                      onSave={(file) => handleUploadImage(item.id, file)}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <EditableText
                      tag="h3"
                      value={item.title}
                      multiline
                      onSave={(v) => handleUpdateField(item.id, 'title', v)}
                      className="font-semibold text-[--secondary] line-clamp-2 min-h-[2.5rem]"
                    />
                    <div className="text-sm text-gray-600 mt-2 flex items-center gap-1 flex-wrap">
                      <span>File Size:</span>
                      <EditableText
                        tag="span"
                        value={item.file_size}
                        onSave={(v) => handleUpdateField(item.id, 'file_size', v)}
                        className="font-medium inline-block min-w-[30px]"
                      />
                      <span>| Language:</span>
                      <EditableText
                        tag="span"
                        value={item.language}
                        onSave={(v) => handleUpdateField(item.id, 'language', v)}
                        className="font-medium inline-block min-w-[30px]"
                      />
                    </div>
                    <div className="text-sm font-semibold mt-1 flex items-center gap-1">
                      <span>Date:</span>
                      <EditableText
                        tag="span"
                        value={item.date}
                        onSave={(v) => handleUpdateField(item.id, 'date', v)}
                        className="inline-block min-w-[60px]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          !isLoading && (
            <div className="text-white opacity-80 py-10 bg-white/10 rounded-lg text-center font-medium">
              No featured items found. Add some!
            </div>
          )
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Featured Item"
        message="Are you sure you want to remove this item from the carousel?"
        onConfirm={async () => {
          if (deleteId) await deleteFeatured.mutateAsync(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
        loading={deleteFeatured.isPending}
      />

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Add Featured Item</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <textarea required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                  <input value={newSize} onChange={e => setNewSize(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" placeholder="100 KB" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <input value={newLang} onChange={e => setNewLang(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full border rounded px-3 py-2 text-sm" placeholder="DD/MM/YYYY" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <input type="file" accept="image/*" onChange={e => setNewImage(e.target.files?.[0] || null)} className="w-full text-sm" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2 px-4 rounded bg-gray-100 font-medium">Cancel</button>
                <button type="submit" disabled={adding} className="flex-1 py-2 px-4 rounded bg-[#1a4a7f] text-white font-medium">{adding ? 'Saving...' : 'Add Item'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCarousel;
