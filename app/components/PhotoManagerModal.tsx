'use client';

import { Trash2, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import type { GalleryEvent, GalleryPhoto } from '~/utils/data';

interface PhotoManagerModalProps {
    open: boolean;
    onClose: () => void;
    event: GalleryEvent | null;
    onAddPhotos: (photos: GalleryPhoto[]) => void;
    onRemovePhoto: (photoId: string) => void;
    onUpdateCaption: (photoId: string, caption: string) => void;
}

const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({
    open,
    onClose,
    event,
    onAddPhotos,
    onRemovePhoto,
    onUpdateCaption,
}) => {
    const [newPhotos, setNewPhotos] = useState<
        Array<{ file: File; preview: string; caption: string }>
    >([]);

    if (!event) return null;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const photoData = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            caption: '',
        }));
        setNewPhotos((prev) => [...prev, ...photoData]);
    };

    const handleRemoveNewPhoto = (index: number) => {
        setNewPhotos((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSavePhotos = () => {
        const photosToAdd: GalleryPhoto[] = newPhotos.map((photo, index) => ({
            id: crypto.randomUUID(),
            imageUrl: photo.preview,
            caption: photo.caption || `Photo ${event.photos.length + index + 1}`,
        }));

        onAddPhotos(photosToAdd);
        setNewPhotos([]);
        onClose();
    };

    const handleCancel = () => {
        setNewPhotos([]);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleCancel}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Manage Photos - {event.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Existing Photos */}
                    {event.photos.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-sm mb-3">
                                Current Photos ({event.photos.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {event.photos.map((photo) => (
                                    <div
                                        key={photo.id}
                                        className="relative group border rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={photo.imageUrl}
                                            alt={photo.caption || 'Event photo'}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                value={photo.caption || ''}
                                                onChange={(e) =>
                                                    onUpdateCaption(photo.id, e.target.value)
                                                }
                                                placeholder="Add caption..."
                                                className="w-full text-xs border rounded px-2 py-1"
                                            />
                                        </div>
                                        <button
                                            onClick={() => onRemovePhoto(photo.id)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            title="Remove photo"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add New Photos */}
                    <div>
                        <h3 className="font-semibold text-sm mb-3">Add New Photos</h3>

                        {/* File Upload */}
                        <div className="mb-4">
                            <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-[#153D6A] transition-colors">
                                <div className="text-center">
                                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                                    <p className="text-sm text-gray-600">
                                        Click to upload photos or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        PNG, JPG, JPEG up to 10MB each
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </div>

                        {/* New Photos Preview */}
                        {newPhotos.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {newPhotos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative group border rounded-lg overflow-hidden"
                                    >
                                        <img
                                            src={photo.preview}
                                            alt={`New photo ${index + 1}`}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className="p-2">
                                            <input
                                                type="text"
                                                value={photo.caption}
                                                onChange={(e) => {
                                                    setNewPhotos((prev) =>
                                                        prev.map((p, i) =>
                                                            i === index
                                                                ? { ...p, caption: e.target.value }
                                                                : p
                                                        )
                                                    );
                                                }}
                                                placeholder="Add caption..."
                                                className="w-full text-xs border rounded px-2 py-1"
                                            />
                                        </div>
                                        <button
                                            onClick={() => handleRemoveNewPhoto(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            title="Remove photo"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSavePhotos}
                            disabled={newPhotos.length === 0}
                            className="bg-[#153D6A] hover:bg-[#1a4a7f]"
                        >
                            Save {newPhotos.length > 0 && `(${newPhotos.length} new)`}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PhotoManagerModal;
