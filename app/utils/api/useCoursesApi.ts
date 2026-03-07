import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiCourse {
    id: number;
    name: string;
    degree: string;
    duration: string;
    intake: string;
    curriculum: string;
    fees: string;
    eligibility: string[];
    highlights: string[];
    career_prospects: string[];
    order: number;
    is_active: boolean;
}

export const useCoursesApi = () => {
    const queryClient = useQueryClient();

    const { data: courses = [], isLoading } = useQuery<ApiCourse[]>({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await api.get('/api/courses/');
            return res.data;
        },
    });

    const addCourse = useMutation({
        mutationFn: async (payload: Partial<ApiCourse>) => {
            const res = await api.post('/api/courses/', payload);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    const updateCourse = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: Partial<ApiCourse> }) => {
            const res = await api.patch(`/api/courses/${id}/`, payload);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    const deleteCourse = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/courses/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    return { courses, isLoading, addCourse, updateCourse, deleteCourse };
};
