import React, { useState } from 'react';
import { Calendar, Image, Trash2 } from 'lucide-react';
import type { ApiGalleryEvent } from '~/utils/api/useGalleryApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableImage from '~/components/admin/EditableImage';
import EditableText from '~/components/admin/EditableText';
import EditableDate from '~/components/admin/EditableDate';
import ConfirmDialog from '~/components/admin/ConfirmDialog';

interface EventCardProps {
    event: ApiGalleryEvent;
    onClick: () => void;
    onUpdateField?: (id: number, field: string, value: string) => Promise<void>;
    onUploadCover?: (id: number, file: File) => Promise<void>;
    onDelete?: (id: number) => Promise<void>;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick, onUpdateField, onUploadCover, onDelete }) => {
    const { isEditMode } = useEditMode();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setConfirmDelete(true);
    };

    const confirmDeletion = async () => {
        if (!onDelete) return;
        setDeleting(true);
        try {
            await onDelete(event.id);
        } finally {
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    const handleCardClick = (e: React.MouseEvent) => {
        // Only trigger click if we aren't clicking on an editable element or delete button
        const target = e.target as HTMLElement;
        if (target.closest('.editable-element') || target.closest('button')) return;
        onClick();
    };

    return (
        <div
            onClick={handleCardClick}
            className={`bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border group relative cursor-pointer ${
                isEditMode ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'
            }`}
        >
            {/* Delete button (edit mode) */}
            {isEditMode && onDelete && (
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                    title="Delete event"
                >
                    <Trash2 size={13} />
                </button>
            )}

            {/* Event Thumbnail */}
            <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-50 to-gray-100">
                <EditableImage
                    src={event.cover_photo_url || event.cover_photo}
                    alt={event.name}
                    onSave={async (file) => onUploadCover?.(event.id, file)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallback={
                        <div className="w-full h-full flex items-center justify-center bg-[#153D6A] text-white/50">
                            No Cover Photo
                        </div>
                    }
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Photo Count Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-0 pointer-events-none">
                    <Image size={16} className="text-[#153D6A]" />
                    <span className="text-sm font-semibold text-gray-800">
                        {event.photos?.length || 0}
                    </span>
                </div>
            </div>

            {/* Event Info */}
            <div className="p-5">
                <div className="editable-element mb-2">
                    <EditableText
                        tag="h3"
                        value={event.name}
                        onSave={async (v) => onUpdateField?.(event.id, 'name', v)}
                        className={`text-xl font-bold text-gray-800 transition-colors ${!isEditMode && 'line-clamp-1 group-hover:text-[#153D6A]'}`}
                    />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 editable-element">
                    <Calendar size={16} className="text-[#153D6A]" />
                    <EditableDate
                        value={event.date}
                        onSave={async (v) => onUpdateField?.(event.id, 'date', v)}
                    />
                </div>

                <div className="text-sm text-gray-600 leading-relaxed editable-element">
                    <EditableText
                        tag="p"
                        value={event.description}
                        onSave={async (v) => onUpdateField?.(event.id, 'description', v)}
                        className={!isEditMode ? "line-clamp-2" : ""}
                    />
                </div>

                {!isEditMode && (
                    <div className="mt-4 text-[#153D6A] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Photos
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                )}
            </div>

            {onDelete && (
                <ConfirmDialog
                    open={confirmDelete}
                    title="Delete Event"
                    message={`Are you sure you want to delete "${event.name}"? This will also remove all photos inside it.`}
                    onConfirm={confirmDeletion}
                    onCancel={() => setConfirmDelete(false)}
                    loading={deleting}
                />
            )}
        </div>
    );
};

export default EventCard;
