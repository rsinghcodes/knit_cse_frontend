import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

// ── ContactInfo (singleton) ──────────────────────────────────────────────

export interface ApiContactInfo {
    id: number;
    page_title: string;
    page_subtitle: string;
    address_line_1: string;
    address_line_2: string;
    address_line_3: string;
    phone: string;
    email: string;
    map_embed_url: string;
}

export function useContactInfoApi() {
    const queryClient = useQueryClient();

    const { data: contactInfo, isLoading } = useQuery<ApiContactInfo>({
        queryKey: ['contactInfo'],
        queryFn: async () => {
            const { data } = await api.get('/api/contact-info/');
            return data;
        },
    });

    const updateContactInfo = useMutation({
        mutationFn: async (updates: Partial<ApiContactInfo>) => {
            const { data } = await api.patch('/api/contact-info/', updates);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['contactInfo'] }),
    });

    const updateField = async (field: keyof ApiContactInfo, value: string) => {
        await updateContactInfo.mutateAsync({ [field]: value } as Partial<ApiContactInfo>);
    };

    return { contactInfo, isLoading, updateField };
}

// ── DirectoryEntry (CRUD) ────────────────────────────────────────────────

export interface ApiDirectoryEntry {
    id: number;
    designation: string;
    name: string;
    mobile: string;
    email: string;
    order: number;
}

export function useDirectoryApi() {
    const queryClient = useQueryClient();

    const { data: entries = [], isLoading } = useQuery<ApiDirectoryEntry[]>({
        queryKey: ['directory'],
        queryFn: async () => {
            const { data } = await api.get('/api/directory/');
            return data;
        },
    });

    const addEntry = useMutation({
        mutationFn: async (payload: Partial<ApiDirectoryEntry>) => {
            const { data } = await api.post('/api/directory/', payload);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['directory'] }),
    });

    const updateEntry = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: Partial<ApiDirectoryEntry> }) => {
            const { data } = await api.patch(`/api/directory/${id}/`, payload);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['directory'] }),
    });

    const deleteEntry = useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/api/directory/${id}/`);
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['directory'] }),
    });

    return { entries, isLoading, addEntry, updateEntry, deleteEntry };
}
