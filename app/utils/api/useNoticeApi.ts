import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiNotice {
    id: number;
    title: string;
    description: string;
    date: string;
    file: string | null;
    file_url: string | null;
    link: string;
    order: number;
    is_active: boolean;
    created_at: string;
}

export function useNoticeApi() {
    const queryClient = useQueryClient();

    const { data: notices = [], isLoading } = useQuery<ApiNotice[]>({
        queryKey: ['notices'],
        queryFn: async () => {
            const { data } = await api.get('/api/notices/');
            return data;
        },
    });

    const addNotice = useMutation({
        mutationFn: async (payload: FormData | Partial<ApiNotice>) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.post('/api/notices/', payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notices'] }),
    });

    const updateNotice = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiNotice> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/notices/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notices'] }),
    });

    const deleteNotice = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/notices/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notices'] }),
    });

    return { notices, isLoading, addNotice, updateNotice, deleteNotice };
}
