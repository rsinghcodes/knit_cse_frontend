import { useNavigate } from 'react-router';
import EventCard from '~/components/EventCard';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { galleryEvents } from '~/utils/data';
import type { Route } from './+types/photo-gallery';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Photo Gallery | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Browse through our collection of events and activities at the Department of Computer Science & Engineering, KNIT Sultanpur.',
        },
    ];
}

export default function PhotoGallery() {
    const navigate = useNavigate();

    const handleEventClick = (eventId: string) => {
        navigate(`/photo-gallery/${eventId}`);
    };

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Photo Gallery</h1>
                    <p className="text-lg md:text-xl text-blue-100">
                        Explore our events, activities, and memorable moments
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => handleEventClick(event.id)}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {galleryEvents.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            No events available at the moment.
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
