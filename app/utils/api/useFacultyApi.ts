import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiFaculty {
    id: number;
    name: string;
    designation: string;
    department: 'CSE' | 'MCA';
    photo: string | null;
    photo_url: string | null;
    cv: string | null;
    cv_url: string | null;
    profile_link: string | null;
    order: number;
}

export function useFacultyApi() {
    const queryClient = useQueryClient();

    const { data: faculty = [], isLoading } = useQuery<ApiFaculty[]>({
        queryKey: ['faculty'],
        queryFn: async () => {
            const { data } = await api.get('/api/faculty/');
            return data;
        },
    });

    const addFaculty = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/api/faculty/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faculty'] }),
    });

    const updateFaculty = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiFaculty> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/faculty/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faculty'] }),
    });

    const deleteFaculty = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/faculty/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['faculty'] }),
    });

    return { faculty, isLoading, addFaculty, updateFaculty, deleteFaculty };
}
