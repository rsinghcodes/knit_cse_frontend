import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export interface Alumni {
  id: string;
  name: string;
  batch: string;
  company: string;
  designation: string;
  linkedin: string;
}

export let alumniData: Alumni[] = [
  {
    id: '1',
    name: 'Amit Kumar',
    batch: '2018-2022',
    company: 'Google',
    designation: 'Software Engineer',
    linkedin: 'https://linkedin.com/in/amitkumar',
  },
];

export const useAlumni = () => {
  const queryClient = useQueryClient();

  const { data: alumni = [] } = useQuery({
    queryKey: ['alumni'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 200));
      return alumniData;
    },
  });

  const addAlumni = useMutation({
    mutationFn: async (newAlumni: Omit<Alumni, 'id'>) => {
      const added = { ...newAlumni, id: crypto.randomUUID() };
      alumniData.push(added);
    },
    onSuccess: () => queryClient.invalidateQueries(['alumni']),
  });

  const updateAlumni = useMutation({
    mutationFn: async (updated: Alumni) => {
      alumniData = alumniData.map((a) => (a.id === updated.id ? updated : a));
    },
    onSuccess: () => queryClient.invalidateQueries(['alumni']),
  });

  const deleteAlumni = useMutation({
    mutationFn: async (id: string) => {
      alumniData = alumniData.filter((a) => a.id !== id);
    },
    onSuccess: () => queryClient.invalidateQueries(['alumni']),
  });

  return { alumni, addAlumni, updateAlumni, deleteAlumni };
};
