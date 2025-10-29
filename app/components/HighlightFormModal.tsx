import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

export interface HighlightFormValues {
  title: string;
  link: string;
}

const highlightSchema = Yup.object({
  title: Yup.string().required('Title required'),
  link: Yup.string().url('Invalid URL').required('Link required'),
});

export const HighlightFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: HighlightFormValues) => void;
  initialData?: HighlightFormValues;
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {initialData ? 'Edit Highlight' : 'Add Highlight'}
        </DialogTitle>
      </DialogHeader>
      <Formik
        initialValues={initialData || { title: '', link: '' }}
        validationSchema={highlightSchema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Field name="title" className="w-full border rounded p-2" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Link</label>
              <Field name="link" className="w-full border rounded p-2" />
              <ErrorMessage
                name="link"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </DialogContent>
  </Dialog>
);
