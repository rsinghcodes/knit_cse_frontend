'use client';

import { Calendar, ChevronLeft, MapPin, Plus, Trash2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import PhotoLightbox from '~/components/PhotoLightbox';
import { useGalleryApi } from '~/utils/api/useGalleryApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableText from '~/components/admin/EditableText';
import EditableDate from '~/components/admin/EditableDate';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import type { Route } from './+types/photo-gallery.$eventId';

export function meta({ params }: Route.MetaArgs) {
    if (!params.eventId) {
        return [{ title: 'Event Not Found | KNIT CSE' }];
    }
    return [
        { title: `Photo Gallery | KNIT CSE` },
        { name: 'description', content: 'KNIT CSE Photo Gallery Event' },
    ];
}

export default function EventDetail() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const { isEditMode } = useEditMode();
    const { useGalleryEvent, updateEvent, addPhoto, deletePhoto } = useGalleryApi();
    
    const { data: event, isLoading } = useGalleryEvent(eventId);
    
    // Deletion states
    const [photoToDelete, setPhotoToDelete] = useState<number | null>(null);
    const [deletingPhoto, setDeletingPhoto] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle event not found
    if (isLoading) {
        return (
            <div className="font-sans bg-white min-h-screen">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <p className="text-gray-600 text-lg">Loading event details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="font-sans bg-white min-h-screen">
                <Header />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Event Not Found
                    </h1>
                    <p className="text-gray-600 mb-8">
                        The event you're looking for doesn't exist or has been removed.
                    </p>
                    <button
                        onClick={() => navigate('/photo-gallery')}
                        className="bg-[#153D6A] text-white px-6 py-3 rounded-lg hover:bg-[#1a4a7f] transition-colors"
                    >
                        Back to Gallery
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    const handlePhotoClick = (index: number) => {
        // Prevent lightbox if clicking delete button
        setSelectedPhotoIndex(index);
        setLightboxOpen(true);
    };

    const handleUpdateEvent = async (field: string, value: string) => {
        if (!event) return;
        const formData = new FormData();
        formData.append(field, value);
        await updateEvent.mutateAsync({ id: event.id, payload: formData });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!event || !e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('event', String(event.id));
        formData.append('image', file);
        try {
            await addPhoto.mutateAsync(formData);
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const confirmDeletePhoto = async () => {
        if (!photoToDelete) return;
        setDeletingPhoto(true);
        try {
            await deletePhoto.mutateAsync(photoToDelete);
        } finally {
            setDeletingPhoto(false);
            setPhotoToDelete(null);
        }
    };

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />

            {/* Breadcrumb Navigation */}
            <div className="bg-gray-50 border-b">
                <div className="container mx-auto px-4 py-3">
                    <button
                        onClick={() => navigate('/photo-gallery')}
                        className="flex items-center gap-2 text-[#153D6A] hover:text-[#1a4a7f] transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="font-medium">Back to Gallery</span>
                    </button>
                </div>
            </div>

            {/* Event Header */}
            <div className="bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-4">
                        <EditableText
                            tag="h1"
                            value={event.name}
                            onSave={async (v) => handleUpdateEvent('name', v)}
                            className="text-3xl md:text-4xl font-bold text-white transition-colors"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-blue-100 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <EditableDate
                                value={event.date}
                                onSave={async (v) => handleUpdateEvent('date', v)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <EditableText
                                tag="span"
                                value={event.location || 'KNIT Campus'}
                                onSave={async (v) => handleUpdateEvent('location', v)}
                            />
                        </div>
                    </div>
                    <div className="mt-4 text-lg text-blue-50 max-w-3xl">
                        <EditableText
                            tag="p"
                            value={event.description}
                            onSave={async (v) => handleUpdateEvent('description', v)}
                        />
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* Photo Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-800">
                            {event.photos?.length || 0}
                        </span>{' '}
                        {event.photos?.length === 1 ? 'photo' : 'photos'}
                    </p>
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Add Photo Tile */}
                    {isEditMode && (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="relative aspect-square overflow-hidden rounded-lg bg-blue-50 border-2 border-dashed border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
                        >
                            <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Plus size={24} />
                            </div>
                            <span className="text-sm font-semibold text-blue-700">Add Photo</span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>
                    )}

                    {event.photos?.map((photo, index) => (
                        <div
                            key={photo.id}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group bg-gray-100"
                        >
                            <img
                                src={photo.image_url || ''}
                                alt={photo.caption || `Photo ${index + 1}`}
                                className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
                                onClick={() => handlePhotoClick(index)}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://placehold.co/400x400/153D6A/white?text=Photo+${index + 1}`;
                                }}
                            />
                            
                            {/* Delete specific photo button */}
                            {isEditMode && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPhotoToDelete(photo.id);
                                    }}
                                    className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition-colors opacity-0 group-hover:opacity-100"
                                    title="Delete photo"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
                            {photo.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <p className="line-clamp-2">{photo.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <Footer />

            {/* Lightbox */}
            {event.photos && event.photos.length > 0 && (
                <PhotoLightbox
                    photos={event.photos.map(p => ({
                        id: String(p.id),
                        imageUrl: p.image_url || '',
                        caption: p.caption || undefined
                    }))}
                    initialIndex={selectedPhotoIndex}
                    isOpen={lightboxOpen}
                    onClose={() => setLightboxOpen(false)}
                />
            )}

            {/* Photo Deletion Confirmation */}
            <ConfirmDialog
                open={photoToDelete !== null}
                title="Delete Photo"
                message="Are you sure you want to delete this photo?"
                onConfirm={confirmDeletePhoto}
                onCancel={() => setPhotoToDelete(null)}
                loading={deletingPhoto}
            />
        </div>
    );
}
