import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { StudentFormValues } from '~/components/StudentFormModal';

const FAKE_DB: StudentFormValues[] = [];

export const useStudents = () => {
  const queryClient = useQueryClient();

  const { data: students = [] } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      await new Promise((res) => setTimeout(res, 300)); // mock delay
      return FAKE_DB;
    },
  });

  const addStudent = useMutation({
    mutationFn: async (student: StudentFormValues) => {
      await new Promise((res) => setTimeout(res, 300));
      FAKE_DB.push(student);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const updateStudent = useMutation({
    mutationFn: async (updated: StudentFormValues) => {
      await new Promise((res) => setTimeout(res, 300));
      const index = FAKE_DB.findIndex(
        (s) => s.rollNumber === updated.rollNumber
      );
      if (index !== -1) FAKE_DB[index] = updated;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  const deleteStudent = useMutation({
    mutationFn: async (rollNumber: string) => {
      await new Promise((res) => setTimeout(res, 300));
      const index = FAKE_DB.findIndex((s) => s.rollNumber === rollNumber);
      if (index !== -1) FAKE_DB.splice(index, 1);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['students'] }),
  });

  return { students, addStudent, updateStudent, deleteStudent };
};
