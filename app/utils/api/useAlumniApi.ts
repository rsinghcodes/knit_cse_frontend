import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiAlumni {
    id: number;
    name: string;
    batch: string;
    company: string;
    designation: string;
    linkedin: string | null;
    photo: string | null;
    photo_url: string | null;
}

export function useAlumniApi() {
    const queryClient = useQueryClient();

    const { data: alumni = [], isLoading } = useQuery<ApiAlumni[]>({
        queryKey: ['alumni-api'],
        queryFn: async () => {
            const { data } = await api.get('/api/alumni/');
            return data;
        },
    });

    const addAlumni = useMutation({
        mutationFn: async (payload: FormData | Omit<ApiAlumni, 'id' | 'photo_url'>) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.post('/api/alumni/', payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumni-api'] }),
    });

    const updateAlumni = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiAlumni> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/alumni/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumni-api'] }),
    });

    const deleteAlumni = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/alumni/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['alumni-api'] }),
    });

    return { alumni, isLoading, addAlumni, updateAlumni, deleteAlumni };
}
