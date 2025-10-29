import { ImageIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '~/components/ui/button';

export const GalleryUpload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    console.log('Uploading', images);
    // TODO: integrate with backend API
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Gallery Images
      </label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="hidden"
        id="gallery-upload"
      />
      <label htmlFor="gallery-upload">
        <Button variant="outline" className="flex items-center gap-2">
          <ImageIcon size={18} /> Select Images
        </Button>
      </label>

      <div className="grid grid-cols-3 gap-3">
        {preview.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={src}
              alt="preview"
              className="w-full h-32 object-cover rounded border"
            />
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {images.length > 0 && (
        <Button onClick={handleUpload} className="bg-[#153D6A] text-white">
          Upload ({images.length})
        </Button>
      )}
    </div>
  );
};
