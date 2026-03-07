import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiHighlight {
    id: number;
    text: string;
    href: string;
    order: number;
    is_active: boolean;
}

export function useHighlightsApi() {
    const queryClient = useQueryClient();

    const { data: highlights = [], isLoading } = useQuery<ApiHighlight[]>({
        queryKey: ['highlights'],
        queryFn: async () => {
            const { data } = await api.get('/api/highlights/');
            return data;
        },
    });

    const addHighlight = useMutation({
        mutationFn: async (payload: { text: string; href?: string; order?: number }) => {
            const { data } = await api.post('/api/highlights/', payload);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['highlights'] }),
    });

    const updateHighlight = useMutation({
        mutationFn: async ({ id, ...payload }: Partial<ApiHighlight> & { id: number }) => {
            const { data } = await api.patch(`/api/highlights/${id}/`, payload);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['highlights'] }),
    });

    const deleteHighlight = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/highlights/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['highlights'] }),
    });

    return { highlights, isLoading, addHighlight, updateHighlight, deleteHighlight };
}
