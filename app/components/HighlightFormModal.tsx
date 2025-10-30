import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import type { Highlight } from '~/utils/useHighlights';

const schema = Yup.object({
  title: Yup.string().required('Title is required'),
  link: Yup.string().url('Enter valid URL').required('Link is required'),
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Highlight, 'id' | 'createdAt'> | Highlight) => void;
  initialData?: Highlight;
}

export const HighlightFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>
          {initialData ? 'Edit Highlight' : 'Add Highlight'}
        </DialogTitle>
      </DialogHeader>

      <Formik
        initialValues={initialData || { title: '', link: '' }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        <Form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Field name="title" className="w-full border rounded-md p-2" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Link</label>
            <Field name="link" className="w-full border rounded-md p-2" />
            <ErrorMessage
              name="link"
              component="div"
              className="text-red-500 text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{initialData ? 'Update' : 'Add'}</Button>
          </div>
        </Form>
      </Formik>
    </DialogContent>
  </Dialog>
);
