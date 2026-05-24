import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import EditableText from '~/components/admin/EditableText';
import { useEditMode } from '~/context/EditModeContext';
import { useHeroBannersApi } from '~/utils/api/useHeroBannersApi';

const Hero: React.FC = () => {
  const { banners, isLoading, addBanner, updateBanner, deleteBanner } =
    useHeroBannersApi();
  const { isEditMode } = useEditMode();

  const [plugins] = useState(() => [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    plugins
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Mark component as client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Stop autoplay in edit mode
  useEffect(() => {
    if (emblaApi) {
      const autoplayPlugin = emblaApi.plugins()?.autoplay;
      if (
        autoplayPlugin &&
        typeof autoplayPlugin.stop === 'function' &&
        typeof autoplayPlugin.play === 'function'
      ) {
        if (isEditMode) {
          autoplayPlugin.stop();
        } else {
          try {
            if (emblaApi.scrollSnapList().length > 0) {
              autoplayPlugin.play();
            }
          } catch {
            /* silently handle */
          }
        }
      }
    }
  }, [isEditMode, emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reinitialize carousel when banners change
  useEffect(() => {
    if (emblaApi && banners.length > 0) {
      try {
        emblaApi.reInit();
      } catch {
        /* silently handle */
      }
    }
  }, [banners, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage) return;
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('image', newImage);
      if (newCaption) fd.append('caption', newCaption);
      await addBanner.mutateAsync(fd);
      setShowAddModal(false);
      setNewCaption('');
      setNewImage(null);
      setNewImagePreview(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (deleteTarget == null) return;
    setDeleting(true);
    try {
      await deleteBanner.mutateAsync(deleteTarget);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdateCaption = async (id: number, caption: string) => {
    await updateBanner.mutateAsync({ id, payload: { caption } });
  };

  const handleImageChange = (file: File) => {
    setNewImage(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const handleReplaceBannerImage = async (id: number, file: File) => {
    const fd = new FormData();
    fd.append('image', file);
    await updateBanner.mutateAsync({ id, payload: fd });
  };

  if (isLoading) {
    return (
      <section className="w-full h-[280px] md:h-[420px] lg:h-[500px] bg-gray-200 animate-pulse" />
    );
  }

  if (banners.length === 0) {
    return (
      <>
        <section className="w-full h-[280px] md:h-[420px] lg:h-[500px] bg-gradient-to-br from-[#0f2b4a] to-[#1a4a7f] flex items-center justify-center relative">
          <div className="text-center text-white/60">
            <ImagePlus size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium">No banners yet</p>
            {isEditMode && (
              <p className="text-sm mt-1 opacity-70">
                Click "Add Banner" below to get started
              </p>
            )}
          </div>
          {isEditMode && (
            <button
              onClick={() => setShowAddModal(true)}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-150"
              style={{
                background: 'linear-gradient(135deg, #153D6A, #1a4a7f)',
                boxShadow: '0 4px 16px rgba(21,61,106,0.5)',
              }}
            >
              <Plus size={18} /> Add Banner
            </button>
          )}
        </section>

        {/* Add Banner Modal */}
        {(() => {
          return isClient && showAddModal
            ? createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-gray-800">
                        Add Banner Image
                      </h2>
                      <button
                        onClick={() => {
                          setShowAddModal(false);
                          setNewImage(null);
                          setNewImagePreview(null);
                          setNewCaption('');
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <form onSubmit={handleAddSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Banner Image *
                        </label>
                        {newImagePreview ? (
                          <div className="relative rounded-xl overflow-hidden mb-2">
                            <img
                              src={newImagePreview}
                              alt="Preview"
                              className="w-full h-40 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setNewImage(null);
                                setNewImagePreview(null);
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <ImagePlus
                              size={32}
                              className="text-gray-400 mb-2"
                            />
                            <span className="text-sm text-gray-500 font-medium">
                              Click to select image
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              Recommended: 1400×500 px
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageChange(file);
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Caption (optional)
                        </label>
                        <input
                          value={newCaption}
                          onChange={(e) => setNewCaption(e.target.value)}
                          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                          placeholder="e.g. KNIT Campus View"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddModal(false);
                            setNewImage(null);
                            setNewImagePreview(null);
                            setNewCaption('');
                          }}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving || !newImage}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#153D6A] hover:bg-[#1a4a7f] text-white text-sm font-medium transition-colors disabled:opacity-50"
                        >
                          {saving ? 'Uploading...' : 'Add Banner'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>,
                document.body
              )
            : null;
        })()}
      </>
    );
  }

  return (
    <>
      <section className="w-full relative group/hero overflow-hidden">
        {/* Edit mode indicator */}
        {isEditMode && (
          <div className="absolute top-4 left-4 z-30 inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            ✏️ Hero Banners — editing
          </div>
        )}

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {banners.map((banner, index) => (
              <div key={banner.id} className="min-w-0 flex-[0_0_100%] relative">
                <div className="w-full h-[280px] md:h-[420px] lg:h-[500px] relative">
                  <img
                    src={banner.image_url || ''}
                    alt={banner.caption || `Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Caption */}
                  {(banner.caption || isEditMode) && (
                    <div className="absolute bottom-16 md:bottom-20 left-0 right-0 px-6 md:px-16">
                      <EditableText
                        value={banner.caption}
                        onSave={(v) => handleUpdateCaption(banner.id, v)}
                        tag="h2"
                        className="text-white text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] max-w-3xl"
                        placeholder="Add caption..."
                      />
                    </div>
                  )}

                  {/* Admin: Replace image & delete buttons */}
                  {isEditMode && (
                    <div className="absolute top-4 right-4 z-30 flex gap-2">
                      <label
                        className="flex items-center gap-1.5 bg-white/90 backdrop-blur text-gray-800 text-xs font-medium px-3 py-1.5 rounded-lg shadow cursor-pointer hover:bg-white transition-colors"
                        title="Replace image"
                      >
                        <ImagePlus size={14} /> Replace
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleReplaceBannerImage(banner.id, file);
                          }}
                        />
                      </label>
                      <button
                        onClick={() => setDeleteTarget(banner.id)}
                        className="flex items-center gap-1 bg-red-500/90 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow hover:bg-red-600 transition-colors"
                        title="Delete banner"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full transition-all opacity-0 group-hover/hero:opacity-100 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full transition-all opacity-0 group-hover/hero:opacity-100 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {banners.length > 1 && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2.5 rounded-full transition-all duration-300 shadow ${
                  index === selectedIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 w-2.5 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Admin: Add banner button */}
        {isEditMode && (
          <button
            onClick={() => setShowAddModal(true)}
            className="absolute bottom-5 right-6 z-30 flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-150"
            style={{
              background: 'linear-gradient(135deg, #153D6A, #1a4a7f)',
              boxShadow: '0 4px 16px rgba(21,61,106,0.5)',
            }}
          >
            <Plus size={16} /> Add Banner
          </button>
        )}
      </section>

      {/* Add Banner Modal */}
      {(() => {
        return isClient && showAddModal
          ? createPortal(
              <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-800">
                      Add Banner Image
                    </h2>
                    <button
                      onClick={() => {
                        setShowAddModal(false);
                        setNewImage(null);
                        setNewImagePreview(null);
                        setNewCaption('');
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <form onSubmit={handleAddSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Banner Image *
                      </label>
                      {newImagePreview ? (
                        <div className="relative rounded-xl overflow-hidden mb-2">
                          <img
                            src={newImagePreview}
                            alt="Preview"
                            className="w-full h-40 object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setNewImage(null);
                              setNewImagePreview(null);
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <ImagePlus size={32} className="text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500 font-medium">
                            Click to select image
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            Recommended: 1400×500 px
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageChange(file);
                            }}
                          />
                        </label>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Caption (optional)
                      </label>
                      <input
                        value={newCaption}
                        onChange={(e) => setNewCaption(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        placeholder="e.g. KNIT Campus View"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddModal(false);
                          setNewImage(null);
                          setNewImagePreview(null);
                          setNewCaption('');
                        }}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving || !newImage}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#153D6A] hover:bg-[#1a4a7f] text-white text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {saving ? 'Uploading...' : 'Add Banner'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>,
              document.body
            )
          : null;
      })()}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteTarget != null}
        title="Delete Banner"
        message="Are you sure you want to remove this banner image?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </>
  );
};

export default Hero;
