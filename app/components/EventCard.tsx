import { Calendar, Image } from 'lucide-react';
import type { GalleryEvent } from '~/utils/data';

interface EventCardProps {
    event: GalleryEvent;
    onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer group"
        >
            {/* Event Thumbnail */}
            <div className="relative overflow-hidden h-56 bg-gradient-to-br from-blue-50 to-gray-100">
                <img
                    src={event.thumbnail}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400/153D6A/white?text=Event+Photo';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Photo Count Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Image size={16} className="text-[#153D6A]" />
                    <span className="text-sm font-semibold text-gray-800">
                        {event.photos.length}
                    </span>
                </div>
            </div>

            {/* Event Info */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-[#153D6A] transition-colors">
                    {event.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar size={16} className="text-[#153D6A]" />
                    <span>{event.date}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {event.description}
                </p>

                <div className="mt-4 text-[#153D6A] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Photos
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
