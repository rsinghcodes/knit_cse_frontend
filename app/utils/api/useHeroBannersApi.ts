import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export interface ApiHeroBanner {
  id: number;
  image: string | null;
  image_url: string | null;
  caption: string;
  order: number;
  is_active: boolean;
}

export function useHeroBannersApi() {
  const queryClient = useQueryClient();

  const { data: banners = [], isLoading } = useQuery<ApiHeroBanner[]>({
    queryKey: ['heroBanners'],
    queryFn: async () => {
      const { data } = await api.get('/api/hero-banners/');
      // Handle both paginated and non-paginated responses
      return Array.isArray(data) ? data : data.results || [];
    },
  });

  const addBanner = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/hero-banners/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['heroBanners'] }),
  });

  const updateBanner = useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: FormData | Partial<ApiHeroBanner>;
    }) => {
      const isFormData = payload instanceof FormData;
      const { data } = await api.patch(`/api/hero-banners/${id}/`, payload, {
        headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
      });
      return data;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['heroBanners'] }),
  });

  const deleteBanner = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/hero-banners/${id}/`);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['heroBanners'] }),
  });

  return { banners, isLoading, addBanner, updateBanner, deleteBanner };
}
