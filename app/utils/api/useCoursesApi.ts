import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface CourseFile {
    id: number;
    year: string;
    file_url: string;
    created_at: string;
}

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
    brochure_url?: string;
    brochure?: string | null;
    timetables?: CourseFile[];
    syllabuses?: CourseFile[];
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

    const uploadFile = useMutation({
        mutationFn: async ({ type, courseId, year, file }: { type: 'timetable'|'syllabus', courseId: number, year: string, file: File }) => {
            const formData = new FormData();
            formData.append('course', courseId.toString());
            formData.append('year', year);
            formData.append('file', file);
            const endpoint = type === 'timetable' ? '/api/course-timetables/' : '/api/course-syllabuses/';
            const res = await api.post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    const deleteFile = useMutation({
        mutationFn: async ({ type, id }: { type: 'timetable'|'syllabus', id: number }) => {
            const endpoint = type === 'timetable' ? `/api/course-timetables/${id}/` : `/api/course-syllabuses/${id}/`;
            await api.delete(endpoint);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    const uploadBrochure = useMutation({
        mutationFn: async ({ id, file }: { id: number; file: File }) => {
            const formData = new FormData();
            formData.append('brochure', file);
            const res = await api.patch(`/api/courses/${id}/`, formData);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    const deleteBrochure = useMutation({
        mutationFn: async (id: number) => {
            const formData = new FormData();
            formData.append('brochure', '');
            const res = await api.patch(`/api/courses/${id}/`, formData);
            return res.data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
    });

    return { courses, isLoading, addCourse, updateCourse, deleteCourse, uploadFile, deleteFile, uploadBrochure, deleteBrochure };
};
