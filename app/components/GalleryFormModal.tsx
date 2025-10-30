import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import type { GalleryItem } from '~/utils/useGallery';

const schema = Yup.object({
  title: Yup.string().required('Title required'),
  category: Yup.string().required('Category required'),
  imageUrl: Yup.string().required('Image required'),
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<GalleryItem, 'id' | 'createdAt'> | GalleryItem) => void;
  initialData?: GalleryItem;
}

export const GalleryFormModal = ({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) => {
  const [preview, setPreview] = useState<string>(initialData?.imageUrl || '');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Photo' : 'Add Photo'}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={
            initialData || {
              title: '',
              category: '',
              imageUrl: '',
            }
          }
          validationSchema={schema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-3">
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
                <label className="block text-sm font-medium">Category</label>
                <Field
                  name="category"
                  className="w-full border rounded-md p-2"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border rounded-md p-2"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPreview(url);
                      setFieldValue('imageUrl', url);
                    }
                  }}
                />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
              )}

              <div className="flex justify-end gap-2 pt-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{initialData ? 'Update' : 'Add'}</Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
