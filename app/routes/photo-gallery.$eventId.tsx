'use client';

import { Calendar, ChevronLeft, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import PhotoLightbox from '~/components/PhotoLightbox';
import { galleryEvents } from '~/utils/data';
import type { Route } from './+types/photo-gallery.$eventId';

export function meta({ params }: Route.MetaArgs) {
    const event = galleryEvents.find((e) => e.id === params.eventId);

    if (!event) {
        return [{ title: 'Event Not Found | KNIT CSE' }];
    }

    return [
        { title: `${event.name} | Photo Gallery | KNIT CSE` },
        {
            name: 'description',
            content: event.description,
        },
    ];
}

export default function EventDetail() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    const event = galleryEvents.find((e) => e.id === eventId);

    // Handle event not found
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
        setSelectedPhotoIndex(index);
        setLightboxOpen(true);
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
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-blue-100">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span>KNIT Campus</span>
                        </div>
                    </div>
                    <p className="mt-4 text-lg text-blue-50 max-w-3xl">
                        {event.description}
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* Photo Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-800">
                            {event.photos.length}
                        </span>{' '}
                        {event.photos.length === 1 ? 'photo' : 'photos'}
                    </p>
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {event.photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            onClick={() => handlePhotoClick(index)}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gray-100"
                        >
                            <img
                                src={photo.imageUrl}
                                alt={photo.caption || `Photo ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://placehold.co/400x400/153D6A/white?text=Photo+${index + 1}`;
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {photo.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="line-clamp-2">{photo.caption}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <Footer />

            {/* Lightbox */}
            <PhotoLightbox
                photos={event.photos}
                initialIndex={selectedPhotoIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </div>
    );
}
