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
  initialData?: StudentFormValues | null;
}

export interface StudentFormValues {
  name: string;
  rollNumber: string;
  year: string;
  course: string;
  department: string;
  email: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  rollNumber: Yup.string().required('Roll number is required'),
  year: Yup.string().required('Select year'),
  course: Yup.string().required('Course is required'),
  department: Yup.string().required('Department required'),
  email: Yup.string().email('Invalid email').required('Email required'),
});

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const initialValues: StudentFormValues = initialData || {
    name: '',
    rollNumber: '',
    year: '',
    course: '',
    department: '',
    email: '',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Student' : 'Add Student'}
          </DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Full name"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Roll Number */}
              <div>
                <label
                  htmlFor="rollNumber"
                  className="block text-sm font-medium"
                >
                  Roll Number
                </label>
                <Field
                  id="rollNumber"
                  name="rollNumber"
                  placeholder="e.g. 20BCS001"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="rollNumber"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium">
                  Year
                </label>
                <Field
                  as="select"
                  id="year"
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

              {/* Course */}
              <div>
                <label htmlFor="course" className="block text-sm font-medium">
                  Course
                </label>
                <Field
                  as="select"
                  id="course"
                  name="course"
                  className="w-full border rounded p-2"
                >
                  <option value="">Select course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="Diploma">Diploma</option>
                  <option value="B.Sc">B.Sc</option>
                </Field>
                <ErrorMessage
                  name="course"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Department */}
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium"
                >
                  Department
                </label>
                <Field
                  id="department"
                  name="department"
                  placeholder="e.g. Computer Science"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@example.edu"
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Actions */}
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
