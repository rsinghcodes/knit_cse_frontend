import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { GalleryItem } from '~/utils/useGallery';

interface Props {
  photos: GalleryItem[];
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
}

export const GalleryGrid = ({ photos, onEdit, onDelete }: Props) => {
  if (photos.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-10">
        No photos uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="bg-white shadow-sm rounded-lg overflow-hidden border relative group"
        >
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
          <div className="p-3">
            <h3 className="font-semibold text-sm">{photo.title}</h3>
            <p className="text-xs text-gray-500">{photo.category}</p>
          </div>
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <Button size="icon" variant="outline" onClick={() => onEdit(photo)}>
              <Pencil size={16} />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(photo.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
