import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiStaff {
    id: number;
    name: string;
    designation: string;
    department: string;
    photo: string | null;
    photo_url: string | null;
    profile_link: string | null;
    order: number;
}

export function useStaffApi() {
    const queryClient = useQueryClient();

    const { data: staff = [], isLoading } = useQuery<ApiStaff[]>({
        queryKey: ['staff'],
        queryFn: async () => {
            const { data } = await api.get('/api/staff/');
            return data;
        },
    });

    const addStaff = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/api/staff/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['staff'] }),
    });

    const updateStaff = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiStaff> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/staff/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['staff'] }),
    });

    const deleteStaff = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/staff/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['staff'] }),
    });

    return { staff, isLoading, addStaff, updateStaff, deleteStaff };
}
