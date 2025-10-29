import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AlumniFormValues } from '~/components/AlumniFormModal';

const ALUMNI_DB: AlumniFormValues[] = [];

export const useAlumni = () => {
  const queryClient = useQueryClient();

  const { data: alumni = [] } = useQuery({
    queryKey: ['alumni'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 300));
      return ALUMNI_DB;
    },
  });

  const addAlumni = useMutation({
    mutationFn: async (al: AlumniFormValues) => {
      await new Promise((res) => setTimeout(res, 200));
      ALUMNI_DB.push(al);
    },
    onSuccess: () => queryClient.invalidateQueries(['alumni']),
  });

  const deleteAlumni = useMutation({
    mutationFn: async (name: string) => {
      const idx = ALUMNI_DB.findIndex((a) => a.name === name);
      if (idx !== -1) ALUMNI_DB.splice(idx, 1);
    },
    onSuccess: () => queryClient.invalidateQueries(['alumni']),
  });

  return { alumni, addAlumni, deleteAlumni };
};
