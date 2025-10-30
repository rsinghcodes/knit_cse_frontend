import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: string;
}

export let galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Annual Fest 2024',
    category: 'Event',
    imageUrl: 'https://placehold.co/300x200',
    createdAt: '2025-10-22',
  },
];

export const useGallery = () => {
  const queryClient = useQueryClient();

  const { data: photos = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 200));
      return galleryData;
    },
  });

  const addPhoto = useMutation({
    mutationFn: async (photo: Omit<GalleryItem, 'id' | 'createdAt'>) => {
      const newItem = {
        ...photo,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      galleryData.push(newItem);
    },
    onSuccess: () => queryClient.invalidateQueries(['gallery']),
  });

  const updatePhoto = useMutation({
    mutationFn: async (updated: GalleryItem) => {
      galleryData = galleryData.map((p) => (p.id === updated.id ? updated : p));
    },
    onSuccess: () => queryClient.invalidateQueries(['gallery']),
  });

  const deletePhoto = useMutation({
    mutationFn: async (id: string) => {
      galleryData = galleryData.filter((p) => p.id !== id);
    },
    onSuccess: () => queryClient.invalidateQueries(['gallery']),
  });

  return { photos, addPhoto, updatePhoto, deletePhoto };
};
