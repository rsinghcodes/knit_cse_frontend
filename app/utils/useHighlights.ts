import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Highlight {
  id: string;
  title: string;
  link: string;
  createdAt: string;
}

export let highlightsData: Highlight[] = [
  {
    id: '1',
    title: 'Admissions Open 2025',
    link: 'https://knit.ac.in/admissions',
    createdAt: '2025-10-21',
  },
  {
    id: '2',
    title: 'Tech Fest Registration Live!',
    link: 'https://knit.ac.in/techfest',
    createdAt: '2025-10-20',
  },
];

export const useHighlights = () => {
  const queryClient = useQueryClient();

  const { data: highlights = [] } = useQuery({
    queryKey: ['highlights'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 300));
      return highlightsData;
    },
  });

  const addHighlight = useMutation({
    mutationFn: async (data: Omit<Highlight, 'id' | 'createdAt'>) => {
      const newItem = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      highlightsData.push(newItem);
    },
    onSuccess: () => queryClient.invalidateQueries(['highlights']),
  });

  const updateHighlight = useMutation({
    mutationFn: async (data: Highlight) => {
      highlightsData = highlightsData.map((h) => (h.id === data.id ? data : h));
    },
    onSuccess: () => queryClient.invalidateQueries(['highlights']),
  });

  const deleteHighlight = useMutation({
    mutationFn: async (id: string) => {
      highlightsData = highlightsData.filter((h) => h.id !== id);
    },
    onSuccess: () => queryClient.invalidateQueries(['highlights']),
  });

  return { highlights, addHighlight, updateHighlight, deleteHighlight };
};
