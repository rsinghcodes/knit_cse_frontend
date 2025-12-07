import { Calendar, Edit2, Image, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import type { GalleryEvent } from '~/utils/data';

interface EventManagementCardProps {
    event: GalleryEvent;
    onEdit: () => void;
    onManagePhotos: () => void;
    onDelete: () => void;
}

const EventManagementCard: React.FC<EventManagementCardProps> = ({
    event,
    onEdit,
    onManagePhotos,
    onDelete,
}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 3000);
        } else {
            onDelete();
            setConfirmDelete(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Event Thumbnail */}
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-gray-100">
                <img
                    src={event.thumbnail}
                    alt={event.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                            'https://placehold.co/600x400/153D6A/white?text=Event+Thumbnail';
                    }}
                />
                {/* Photo Count Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Image size={16} className="text-[#153D6A]" />
                    <span className="text-sm font-semibold text-gray-800">
                        {event.photos.length}
                    </span>
                </div>
            </div>

            {/* Event Info */}
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {event.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar size={14} className="text-[#153D6A]" />
                    <span>{event.date}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {event.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Button
                            onClick={onEdit}
                            variant="outline"
                            size="sm"
                            className="flex-1 text-xs"
                        >
                            <Edit2 size={14} className="mr-1" />
                            Edit Event
                        </Button>
                        <Button
                            onClick={onManagePhotos}
                            size="sm"
                            className="flex-1 bg-[#153D6A] hover:bg-[#1a4a7f] text-xs"
                        >
                            <Image size={14} className="mr-1" />
                            Manage Photos
                        </Button>
                    </div>

                    <Button
                        onClick={handleDelete}
                        variant="destructive"
                        size="sm"
                        className="w-full text-xs"
                    >
                        <Trash2 size={14} className="mr-1" />
                        {confirmDelete ? 'Click Again to Confirm' : 'Delete Event'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EventManagementCard;
