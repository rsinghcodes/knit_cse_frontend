import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiGalleryPhoto {
    id: number;
    event: number;
    image: string | null;
    image_url: string | null;
    caption: string | null;
    order: number;
    uploaded_at: string;
}

export interface ApiGalleryEvent {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    cover_photo: string | null;
    cover_photo_url: string | null;
    photos: ApiGalleryPhoto[];
    created_at: string;
}

export function useGalleryApi() {
    const queryClient = useQueryClient();

    // Queries
    const { data: events = [], isLoading: isLoadingEvents } = useQuery<ApiGalleryEvent[]>({
        queryKey: ['gallery-events'],
        queryFn: async () => {
            const { data } = await api.get('/api/gallery/events/');
            return data;
        },
    });

    const useGalleryEvent = (id: string | undefined) => {
        return useQuery<ApiGalleryEvent>({
            queryKey: ['gallery-events', id],
            queryFn: async () => {
                if (!id) throw new Error('No event ID provided');
                const { data } = await api.get(`/api/gallery/events/${id}/`);
                return data;
            },
            enabled: !!id,
        });
    };

    // Event Mutations
    const addEvent = useMutation({
        mutationFn: async (payload: Partial<ApiGalleryEvent> | FormData) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.post('/api/gallery/events/', payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery-events'] }),
    });

    const updateEvent = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiGalleryEvent> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/gallery/events/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['gallery-events'] });
            queryClient.invalidateQueries({ queryKey: ['gallery-events', String(variables.id)] });
        },
    });

    const deleteEvent = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/gallery/events/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery-events'] }),
    });

    // Photo Mutations
    const addPhoto = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/api/gallery/photos/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery-events'] });
        },
    });

    const deletePhoto = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/gallery/photos/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery-events'] });
        },
    });

    return {
        events,
        isLoadingEvents,
        useGalleryEvent,
        addEvent,
        updateEvent,
        deleteEvent,
        addPhoto,
        deletePhoto,
    };
}
