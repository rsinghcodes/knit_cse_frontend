import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiAboutDepartment {
    id: number;
    intro_text_1: string;
    intro_text_2: string;
    objective: string;
    vision: string;
    mission: string;
}

export interface ApiAboutSidebarLink {
    id: number;
    title: string;
    href: string;
    order: number;
}

export function useAboutApi() {
    const queryClient = useQueryClient();

    const { data: about, isLoading: isLoadingAbout } = useQuery<ApiAboutDepartment>({
        queryKey: ['about'],
        queryFn: async () => {
            const { data } = await api.get('/api/about/');
            return data;
        },
    });

    const { data: links = [], isLoading: isLoadingLinks } = useQuery<ApiAboutSidebarLink[]>({
        queryKey: ['about-links'],
        queryFn: async () => {
            const { data } = await api.get('/api/about-links/');
            return data;
        },
    });

    const updateAbout = useMutation({
        mutationFn: async (payload: Partial<ApiAboutDepartment>) => {
            const { data } = await api.put('/api/about/', payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about'] });
        },
    });

    const addLink = useMutation({
        mutationFn: async (payload: Pick<ApiAboutSidebarLink, 'title' | 'href'>) => {
            const { data } = await api.post('/api/about-links/', payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-links'] });
        },
    });

    const updateLink = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: Partial<ApiAboutSidebarLink> }) => {
            const { data } = await api.patch(`/api/about-links/${id}/`, payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-links'] });
        },
    });

    const deleteLink = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/about-links/${id}/`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['about-links'] });
        },
    });

    return {
        about,
        links,
        isLoading: isLoadingAbout || isLoadingLinks,
        updateAbout,
        addLink,
        updateLink,
        deleteLink,
    };
}
