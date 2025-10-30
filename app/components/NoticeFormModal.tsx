import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import type { Notice } from '~/utils/useNotice';

const schema = Yup.object({
  title: Yup.string().required('Title required'),
  description: Yup.string().required('Description required'),
  date: Yup.string().required('Date required'),
  type: Yup.string().required('Type required'),
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Omit<Notice, 'id'> | Notice) => void;
  initialData?: Notice;
}

export const NoticeFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>{initialData ? 'Edit Notice' : 'Add Notice'}</DialogTitle>
      </DialogHeader>

      <Formik
        initialValues={
          initialData || {
            title: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            type: 'Notice',
            file: '',
          }
        }
        validationSchema={schema}
        onSubmit={(values) => {
          // onSubmit(values);
          onClose();
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Field
                name="title"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <Field
                as="textarea"
                name="description"
                rows={3}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium">Date</label>
                <Field
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Type</label>
                <Field
                  as="select"
                  name="type"
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="Notice">Notice</option>
                  <option value="Circular">Circular</option>
                </Field>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Attachment (optional)
              </label>
              <input
                type="file"
                accept=".pdf,image/*"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) setFieldValue('file', URL.createObjectURL(file));
                }}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={onClose}>
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
