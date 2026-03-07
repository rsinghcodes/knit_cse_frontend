import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiQuickLink {
    id: number;
    title: string;
    href: string;
    icon: string | null;
    icon_url: string | null;
    order: number;
    is_active: boolean;
}

export const useQuickLinksApi = () => {
    const queryClient = useQueryClient();

    const { data: quicklinks = [], isLoading } = useQuery<ApiQuickLink[]>({
        queryKey: ['quicklinks'],
        queryFn: async () => {
            const res = await api.get('/api/quicklinks/');
            return res.data;
        },
    });

    const addQuickLink = useMutation({
        mutationFn: async (fd: FormData) => {
            const res = await api.post('/api/quicklinks/', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quicklinks'] }),
    });

    const updateQuickLink = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: Partial<ApiQuickLink> | FormData }) => {
            const isFormData = payload instanceof FormData;
            const res = await api.patch(`/api/quicklinks/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quicklinks'] }),
    });

    const deleteQuickLink = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/quicklinks/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['quicklinks'] }),
    });

    return { quicklinks, isLoading, addQuickLink, updateQuickLink, deleteQuickLink };
};
