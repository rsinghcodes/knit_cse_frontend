import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Notice {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Notice' | 'Circular';
  file?: string;
}

export let noticeData: Notice[] = [
  {
    id: '1',
    title: 'Semester Exam Schedule',
    description: 'B.Tech 3rd Year End Semester Exams will begin from Nov 15.',
    date: '2025-10-22',
    type: 'Notice',
  },
];

export const useNotice = () => {
  const queryClient = useQueryClient();

  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 200));
      return noticeData;
    },
  });

  const addNotice = useMutation({
    mutationFn: async (newNotice: Omit<Notice, 'id'>) => {
      const added = { ...newNotice, id: crypto.randomUUID() };
      noticeData.push(added);
    },
    onSuccess: () => queryClient.invalidateQueries(['notices']),
  });

  const updateNotice = useMutation({
    mutationFn: async (updated: Notice) => {
      noticeData = noticeData.map((n) => (n.id === updated.id ? updated : n));
    },
    onSuccess: () => queryClient.invalidateQueries(['notices']),
  });

  const deleteNotice = useMutation({
    mutationFn: async (id: string) => {
      noticeData = noticeData.filter((n) => n.id !== id);
    },
    onSuccess: () => queryClient.invalidateQueries(['notices']),
  });

  return { notices, addNotice, updateNotice, deleteNotice };
};
