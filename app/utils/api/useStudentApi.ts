import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiStudentListPdf {
    id: number;
    course: number;
    course_name?: string;
    session_year: string;
    year_of_study: string;
    file: string | null;
    file_url: string | null;
    created_at?: string;
}

export function useStudentApi(courseId?: number | null) {
    const queryClient = useQueryClient();

    const { data: studentLists = [], isLoading } = useQuery<ApiStudentListPdf[]>({
        queryKey: ['student-lists', courseId],
        queryFn: async () => {
            const url = courseId ? `/api/student-lists/?course=${courseId}` : '/api/student-lists/';
            const { data } = await api.get(url);
            return data;
        },
    });

    const addStudentList = useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await api.post('/api/student-lists/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student-lists'] }),
    });

    const updateStudentList = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: FormData | Partial<ApiStudentListPdf> }) => {
            const isFormData = payload instanceof FormData;
            const { data } = await api.patch(`/api/student-lists/${id}/`, payload, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student-lists'] }),
    });

    const deleteStudentList = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/student-lists/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student-lists'] }),
    });

    return { studentLists, isLoading, addStudentList, updateStudentList, deleteStudentList };
}
