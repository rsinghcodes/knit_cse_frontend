'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import EventFormModal from '~/components/EventFormModal';
import EventManagementCard from '~/components/EventManagementCard';
import PhotoManagerModal from '~/components/PhotoManagerModal';
import { Button } from '~/components/ui/button';
import type { GalleryEvent, GalleryPhoto } from '~/utils/data';
import { useGalleryEvents } from '~/utils/useGalleryEvents';

const GalleryManagement = () => {
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    addPhotosToEvent,
    removePhotoFromEvent,
    updatePhotoCaption,
  } = useGalleryEvents();

  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [photoManagerOpen, setPhotoManagerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<GalleryEvent | null>(null);

  // Event handlers
  const handleAddEvent = () => {
    setEditingEvent(null);
    setEventFormOpen(true);
  };

  const handleEditEvent = (event: GalleryEvent) => {
    setEditingEvent(event);
    setEventFormOpen(true);
  };

  const handleManagePhotos = (event: GalleryEvent) => {
    setSelectedEvent(event);
    setPhotoManagerOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent.mutate(eventId);
  };

  const handleEventSubmit = (data: Omit<GalleryEvent, 'id' | 'photos'>) => {
    if (editingEvent) {
      updateEvent.mutate({
        ...editingEvent,
        ...data,
      });
    } else {
      addEvent.mutate(data);
    }
  };

  const handleAddPhotos = (photos: GalleryPhoto[]) => {
    if (selectedEvent) {
      addPhotosToEvent.mutate({
        eventId: selectedEvent.id,
        photos,
      });
    }
  };

  const handleRemovePhoto = (photoId: string) => {
    if (selectedEvent) {
      removePhotoFromEvent.mutate({
        eventId: selectedEvent.id,
        photoId,
      });
    }
  };

  const handleUpdateCaption = (photoId: string, caption: string) => {
    if (selectedEvent) {
      updatePhotoCaption.mutate({
        eventId: selectedEvent.id,
        photoId,
        caption,
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#153D6A]">
            Event Gallery Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage events and their photo collections
          </p>
        </div>
        <Button
          onClick={handleAddEvent}
          className="bg-[#153D6A] hover:bg-[#1a4a7f]"
        >
          <Plus size={18} className="mr-2" />
          Add Event
        </Button>
      </div>

      {/* Stats */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Events</p>
            <p className="text-2xl font-bold text-[#153D6A]">{events.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Photos</p>
            <p className="text-2xl font-bold text-[#153D6A]">
              {events.reduce((sum, event) => sum + event.photos.length, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {events.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-lg mb-4">No events created yet</p>
          <Button
            onClick={handleAddEvent}
            variant="outline"
            className="border-[#153D6A] text-[#153D6A] hover:bg-[#153D6A] hover:text-white"
          >
            <Plus size={18} className="mr-2" />
            Create Your First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventManagementCard
              key={event.id}
              event={event}
              onEdit={() => handleEditEvent(event)}
              onManagePhotos={() => handleManagePhotos(event)}
              onDelete={() => handleDeleteEvent(event.id)}
            />
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      <EventFormModal
        open={eventFormOpen}
        onClose={() => setEventFormOpen(false)}
        onSubmit={handleEventSubmit}
        initialData={editingEvent || undefined}
      />

      {/* Photo Manager Modal */}
      <PhotoManagerModal
        open={photoManagerOpen}
        onClose={() => setPhotoManagerOpen(false)}
        event={selectedEvent}
        onAddPhotos={handleAddPhotos}
        onRemovePhoto={handleRemovePhoto}
        onUpdateCaption={handleUpdateCaption}
      />
    </div>
  );
};

export default GalleryManagement;
