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
import type { GalleryEvent } from '~/utils/data';

const schema = Yup.object({
    name: Yup.string().required('Event name is required'),
    date: Yup.string().required('Event date is required'),
    description: Yup.string().required('Description is required'),
    thumbnail: Yup.string().required('Thumbnail is required'),
});

interface EventFormModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: Omit<GalleryEvent, 'id' | 'photos'>) => void;
    initialData?: GalleryEvent;
}

const EventFormModal: React.FC<EventFormModalProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [thumbnailPreview, setThumbnailPreview] = useState<string>(
        initialData?.thumbnail || ''
    );

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? 'Edit Event' : 'Add New Event'}
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={
                        initialData || {
                            name: '',
                            date: '',
                            description: '',
                            thumbnail: '',
                        }
                    }
                    validationSchema={schema}
                    onSubmit={(values) => {
                        onSubmit(values);
                        onClose();
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form className="space-y-4">
                            {/* Event Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Event Name *
                                </label>
                                <Field
                                    name="name"
                                    className="w-full border rounded-md p-2 text-sm"
                                    placeholder="e.g., TechFest 2024"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Event Date */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Event Date *
                                </label>
                                <Field
                                    name="date"
                                    className="w-full border rounded-md p-2 text-sm"
                                    placeholder="e.g., November 15-17, 2024"
                                />
                                <ErrorMessage
                                    name="date"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Description *
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    className="w-full border rounded-md p-2 text-sm resize-none"
                                    placeholder="Brief description of the event..."
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Thumbnail Upload */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Event Thumbnail *
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full border rounded-md p-2 text-sm"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (file) {
                                            const url = URL.createObjectURL(file);
                                            setThumbnailPreview(url);
                                            setFieldValue('thumbnail', url);
                                        }
                                    }}
                                />
                                <ErrorMessage
                                    name="thumbnail"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            {/* Thumbnail Preview */}
                            {thumbnailPreview && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Preview
                                    </label>
                                    <img
                                        src={thumbnailPreview}
                                        alt="Thumbnail preview"
                                        className="w-full h-48 object-cover rounded-md border"
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 pt-2">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-[#153D6A] hover:bg-[#1a4a7f]"
                                >
                                    {initialData ? 'Update Event' : 'Create Event'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default EventFormModal;
