import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiCircular {
    id: number;
    title: string;
    date: string;
    file_size: string;
    language: string;
    file: string | null;
    file_url: string | null;
    link: string;
    order: number;
    is_active: boolean;
    created_at: string;
}

export function useCircularApi() {
    const queryClient = useQueryClient();

    const { data: circulars = [], isLoading } = useQuery<ApiCircular[]>({
        queryKey: ['circulars'],
        queryFn: async () => {
            const { data } = await api.get('/api/circulars/');
            return data;
        },
    });

    const addCircular = useMutation({
        mutationFn: async (payload: FormData | Partial<ApiCircular>) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.post('/api/circulars/', payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circulars'] }),
    });

    const updateCircular = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiCircular> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/circulars/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circulars'] }),
    });

    const deleteCircular = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/circulars/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['circulars'] }),
    });

    return { circulars, isLoading, addCircular, updateCircular, deleteCircular };
}
