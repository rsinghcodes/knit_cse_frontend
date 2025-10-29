import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

export interface AlumniFormValues {
  name: string;
  batch: string;
  company: string;
  designation: string;
  linkedin: string;
}

const alumniSchema = Yup.object({
  name: Yup.string().required('Name required'),
  batch: Yup.string().required('Batch required'),
  company: Yup.string().required('Company required'),
  designation: Yup.string().required('Designation required'),
  linkedin: Yup.string().url('Invalid URL').required('LinkedIn required'),
});

export const AlumniFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: AlumniFormValues) => void;
  initialData?: AlumniFormValues;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Alumni' : 'Add Alumni'}
          </DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={
            initialData || {
              name: '',
              batch: '',
              company: '',
              designation: '',
              linkedin: '',
            }
          }
          validationSchema={alumniSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {['name', 'batch', 'company', 'designation', 'linkedin'].map(
                (f) => (
                  <div key={f}>
                    <label className="block text-sm font-medium capitalize">
                      {f}
                    </label>
                    <Field name={f} className="w-full border rounded p-2" />
                    <ErrorMessage
                      name={f}
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                )
              )}
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
