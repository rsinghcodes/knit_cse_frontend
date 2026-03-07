import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface HeroContent {
    id: number;
    welcome_text: string;
    dept_name: string;
    institute_name: string;
    tagline: string;
    logo: string | null;
}

export function useHero() {
    const queryClient = useQueryClient();

    const { data: hero, isLoading } = useQuery<HeroContent>({
        queryKey: ['hero'],
        queryFn: async () => {
            const { data } = await api.get('/api/hero/');
            return data;
        },
    });

    const updateHero = useMutation({
        mutationFn: async (updates: Partial<HeroContent> | FormData) => {
            const isFormData = updates instanceof FormData;
            const { data } = await api.patch('/api/hero/', updates, {
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
            });
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['hero'] }),
    });

    /**
     * Helper: update a text field
     */
    const updateField = async (field: keyof HeroContent, value: string) => {
        await updateHero.mutateAsync({ [field]: value } as Partial<HeroContent>);
    };

    /**
     * Helper: upload a new logo image
     */
    const uploadLogo = async (file: File) => {
        const fd = new FormData();
        fd.append('logo', file);
        await updateHero.mutateAsync(fd);
    };

    return { hero, isLoading, updateField, uploadLogo };
}
