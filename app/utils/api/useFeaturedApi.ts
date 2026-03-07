import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiFeaturedItem {
    id: number;
    title: string;
    image: string;
    image_url: string;
    file_size: string;
    language: string;
    date: string;
    order: number;
    is_active: boolean;
}

export const useFeaturedApi = () => {
    const queryClient = useQueryClient();

    const { data: featured = [], isLoading } = useQuery<ApiFeaturedItem[]>({
        queryKey: ['featured'],
        queryFn: async () => {
            const res = await api.get('/api/featured/');
            return res.data;
        },
    });

    const addFeatured = useMutation({
        mutationFn: async (fd: FormData) => {
            const res = await api.post('/api/featured/', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured'] }),
    });

    const updateFeatured = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: Partial<ApiFeaturedItem> | FormData }) => {
            const isFormData = payload instanceof FormData;
            const res = await api.patch(`/api/featured/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured'] }),
    });

    const deleteFeatured = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/featured/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['featured'] }),
    });

    return { featured, isLoading, addFeatured, updateFeatured, deleteFeatured };
};
