import { useState } from 'react';
import { GalleryFormModal } from '~/components/GalleryFormModal';
import { GalleryGrid } from '~/components/GalleryGrid';
import { Button } from '~/components/ui/button';
import type { GalleryItem } from '~/utils/useGallery';
import { galleryData } from '~/utils/useGallery';

const GalleryPage = () => {
  // const { photos, addPhoto, updatePhoto, deletePhoto } = useGallery();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<GalleryItem | null>(null);

  const handleAdd = (data: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    console.log(data);
    // addPhoto.mutate(data);
  };
  const handleUpdate = (data: GalleryItem) => {
    // updatePhoto.mutate(data);
    console.log(data);
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this photo?'))
      // deletePhoto.mutate(id);
      console.log('Deleted photo with id:', id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#153D6A]">
          Photo Gallery Management
        </h1>
        <Button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Photo
        </Button>
      </div>

      <GalleryGrid
        photos={galleryData}
        onEdit={(p) => {
          setEditData(p);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <GalleryFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={editData || undefined}
        onSubmit={(values) => {
          editData
            ? handleUpdate({
                ...values,
                id: editData.id,
                createdAt: editData.createdAt,
              })
            : handleAdd(values);
        }}
      />
    </div>
  );
};

export default GalleryPage;
