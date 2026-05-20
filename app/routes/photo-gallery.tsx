import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, X } from 'lucide-react';
import EventCard from '~/components/EventCard';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { useGalleryApi } from '~/utils/api/useGalleryApi';
import { useEditMode } from '~/context/EditModeContext';
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
    const { isEditMode } = useEditMode();
    const { events, isLoadingEvents, addEvent, updateEvent, deleteEvent } = useGalleryApi();

    const [showAddModal, setShowAddModal] = useState(false);
    const [newEventName, setNewEventName] = useState('');
    const [newEventDesc, setNewEventDesc] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventCover, setNewEventCover] = useState<File | null>(null);
    const [addingEvent, setAddingEvent] = useState(false);

    const handleEventClick = (eventId: string | number) => {
        navigate(`/photo-gallery/${eventId}`);
    };

    const handleUpdateEvent = async (id: number, field: string, value: string) => {
        const formData = new FormData();
        formData.append(field, value);
        await updateEvent.mutateAsync({ id, payload: formData });
    };

    const handleUploadCover = async (id: number, file: File) => {
        const formData = new FormData();
        formData.append('cover_photo', file);
        await updateEvent.mutateAsync({ id, payload: formData });
    };

    const handleDeleteEvent = async (id: number) => {
        await deleteEvent.mutateAsync(id);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddingEvent(true);
        try {
            const formData = new FormData();
            formData.append('name', newEventName);
            formData.append('description', newEventDesc);
            formData.append('date', newEventDate); // Native date picker provides YYYY-MM-DD
            if (newEventCover) {
                formData.append('cover_photo', newEventCover);
            }

            await addEvent.mutateAsync(formData);
            
            // Re-initialize state
            setShowAddModal(false);
            setNewEventName('');
            setNewEventDesc('');
            setNewEventDate('');
            setNewEventCover(null);
        } finally {
            setAddingEvent(false);
        }
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
                    {/* Add New Event Button */}
                    {isEditMode && (
                        <div
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-2 border-dashed border-blue-300 cursor-pointer flex flex-col items-center justify-center min-h-[350px] group"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Plus size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-blue-700">Add New Event</h3>
                            <p className="text-sm text-blue-500 mt-2 text-center px-6">
                                Click to create a new gallery event
                            </p>
                        </div>
                    )}

                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => handleEventClick(event.id)}
                            onUpdateField={handleUpdateEvent}
                            onUploadCover={handleUploadCover}
                            onDelete={handleDeleteEvent}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {!isLoadingEvents && events.length === 0 && !isEditMode && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">
                            No events available at the moment.
                        </p>
                    </div>
                )}
                
                {isLoadingEvents && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Loading events...</p>
                    </div>
                )}
            </main>

            <Footer />

            {/* Add Event Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-800">Create New Gallery Event</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                                <input 
                                    required 
                                    value={newEventName} 
                                    onChange={e => setNewEventName(e.target.value)} 
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] focus:border-transparent outline-none" 
                                    placeholder="e.g., Annual Tech Fest 2026" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                <input 
                                    required 
                                    type="date"
                                    value={newEventDate} 
                                    onChange={e => setNewEventDate(e.target.value)} 
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] focus:border-transparent outline-none" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea 
                                    value={newEventDesc} 
                                    onChange={e => setNewEventDesc(e.target.value)} 
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] focus:border-transparent outline-none" 
                                    placeholder="Brief description of the event..."
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Photo / Thumbnail</label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={e => setNewEventCover(e.target.files?.[0] || null)} 
                                    className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#153D6A] hover:file:bg-blue-100" 
                                />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 px-4 rounded-lg bg-gray-100 font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={addingEvent} className="flex-1 py-2.5 px-4 rounded-lg bg-[#153D6A] text-white font-medium hover:bg-[#1a4a7f] transition-colors disabled:opacity-70">
                                    {addingEvent ? 'Creating...' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
