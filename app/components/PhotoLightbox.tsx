'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { GalleryPhoto } from '~/utils/data';

interface PhotoLightboxProps {
    photos: GalleryPhoto[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
    photos,
    initialIndex,
    isOpen,
    onClose,
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    };

    if (!isOpen) return null;

    const currentPhoto = photos[currentIndex];

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                aria-label="Close lightbox"
            >
                <X size={24} />
            </button>

            {/* Previous Button */}
            {photos.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                    }}
                    className="absolute left-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                    aria-label="Previous photo"
                >
                    <ChevronLeft size={28} />
                </button>
            )}

            {/* Next Button */}
            {photos.length > 1 && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                    }}
                    className="absolute right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                    aria-label="Next photo"
                >
                    <ChevronRight size={28} />
                </button>
            )}

            {/* Image Container */}
            <div
                className="relative max-w-7xl max-h-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={currentPhoto.imageUrl}
                    alt={currentPhoto.caption || `Photo ${currentIndex + 1}`}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/800x600/153D6A/white?text=Image+Not+Found';
                    }}
                />

                {/* Caption */}
                {currentPhoto.caption && (
                    <div className="mt-4 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg max-w-2xl text-center">
                        <p className="text-sm md:text-base">{currentPhoto.caption}</p>
                    </div>
                )}

                {/* Photo Counter */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {currentIndex + 1} / {photos.length}
                </div>
            </div>
        </div>
    );
};

export default PhotoLightbox;
