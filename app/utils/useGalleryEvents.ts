import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { GalleryEvent, GalleryPhoto } from './data';
import { galleryEvents } from './data';

// Mutable reference to gallery events data
export let galleryEventsData: GalleryEvent[] = [...galleryEvents];

export const useGalleryEvents = () => {
    const queryClient = useQueryClient();

    const { data: events = [] } = useQuery({
        queryKey: ['galleryEvents'],
        queryFn: async () => {
            await new Promise((res) => setTimeout(res, 200));
            return galleryEventsData;
        },
    });

    const addEvent = useMutation({
        mutationFn: async (
            event: Omit<GalleryEvent, 'id' | 'photos'>
        ) => {
            const newEvent: GalleryEvent = {
                ...event,
                id: crypto.randomUUID(),
                photos: [],
            };
            galleryEventsData.push(newEvent);
            return newEvent;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryEvents'] }),
    });

    const updateEvent = useMutation({
        mutationFn: async (updated: GalleryEvent) => {
            galleryEventsData = galleryEventsData.map((e) =>
                e.id === updated.id ? updated : e
            );
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryEvents'] }),
    });

    const deleteEvent = useMutation({
        mutationFn: async (id: string) => {
            galleryEventsData = galleryEventsData.filter((e) => e.id !== id);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryEvents'] }),
    });

    const addPhotosToEvent = useMutation({
        mutationFn: async ({
            eventId,
            photos,
        }: {
            eventId: string;
            photos: GalleryPhoto[];
        }) => {
            galleryEventsData = galleryEventsData.map((e) => {
                if (e.id === eventId) {
                    return { ...e, photos: [...e.photos, ...photos] };
                }
                return e;
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryEvents'] }),
    });

    const removePhotoFromEvent = useMutation({
        mutationFn: async ({
            eventId,
            photoId,
        }: {
            eventId: string;
            photoId: string;
        }) => {
            galleryEventsData = galleryEventsData.map((e) => {
                if (e.id === eventId) {
                    return {
                        ...e,
                        photos: e.photos.filter((p) => p.id !== photoId),
                    };
                }
                return e;
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryEvents'] }),
    });

    const updatePhotoCaption = useMutation({
        mutationFn: async ({
            eventId,
            photoId,
            caption,
        }: {
            eventId: string;
            photoId: string;
            caption: string;
        }) => {
            galleryEventsData = galleryEventsData.map((e) => {
                if (e.id === eventId) {
                    return {
                        ...e,
                        photos: e.photos.map((p) =>
                            p.id === photoId ? { ...p, caption } : p
                        ),
                    };
                }
                return e;
            });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['galleryEvents'] }),
    });

    return {
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        addPhotosToEvent,
        removePhotoFromEvent,
        updatePhotoCaption,
    };
};
