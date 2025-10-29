import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

interface StudentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: StudentFormValues) => void;
  initialData?: StudentFormValues;
}

export interface StudentFormValues {
  name: string;
  rollNumber: string;
  year: string;
  department: string;
  email: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  rollNumber: Yup.string().required('Roll number is required'),
  year: Yup.string().required('Select year'),
  department: Yup.string().required('Department required'),
  email: Yup.string().email('Invalid email').required('Email required'),
});

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Student' : 'Add Student'}
          </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={
            initialData || {
              name: '',
              rollNumber: '',
              year: '',
              department: '',
              email: '',
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field name="name" className="w-full border rounded p-2" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Roll Number</label>
                <Field
                  name="rollNumber"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="rollNumber"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Year</label>
                <Field
                  as="select"
                  name="year"
                  className="w-full border rounded p-2"
                >
                  <option value="">Select year</option>
                  <option value="B.Tech 1st">B.Tech 1st</option>
                  <option value="B.Tech 2nd">B.Tech 2nd</option>
                  <option value="B.Tech 3rd">B.Tech 3rd</option>
                  <option value="B.Tech 4th">B.Tech 4th</option>
                  <option value="MCA 1st">MCA 1st</option>
                  <option value="MCA 2nd">MCA 2nd</option>
                </Field>
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Department</label>
                <Field
                  name="department"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {initialData ? 'Update' : 'Add'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
