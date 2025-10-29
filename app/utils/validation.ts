import * as Yup from 'yup';

export const studentSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  rollNo: Yup.string().required('Roll No is required'),
  year: Yup.string().required('Select year'),
  department: Yup.string().required('Select department'),
});
