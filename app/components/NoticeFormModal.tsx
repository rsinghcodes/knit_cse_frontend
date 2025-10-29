import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

export interface NoticeFormValues {
  title: string;
  description: string;
  date: string;
}

const noticeSchema = Yup.object({
  title: Yup.string().required('Title required'),
  description: Yup.string().required('Description required'),
  date: Yup.string().required('Date required'),
});

export const NoticeFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NoticeFormValues) => void;
  initialData?: NoticeFormValues;
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{initialData ? 'Edit Notice' : 'Add Notice'}</DialogTitle>
      </DialogHeader>
      <Formik
        initialValues={initialData || { title: '', description: '', date: '' }}
        validationSchema={noticeSchema}
        onSubmit={(values) => {
          onSubmit(values);
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {['title', 'description', 'date'].map((f) => (
              <div key={f}>
                <label className="block text-sm font-medium capitalize">
                  {f}
                </label>
                <Field
                  name={f}
                  as={f === 'description' ? 'textarea' : 'input'}
                  className="w-full border rounded p-2"
                />
                <ErrorMessage
                  name={f}
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
            ))}
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
