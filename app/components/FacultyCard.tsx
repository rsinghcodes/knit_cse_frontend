import React, { useState } from 'react';
import { FileText, Trash2, User } from 'lucide-react';
import type { ApiFaculty } from '~/utils/api/useFacultyApi';
import EditableText from '~/components/admin/EditableText';
import EditableImage from '~/components/admin/EditableImage';
import EditableFile from '~/components/admin/EditableFile';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import { useEditMode } from '~/context/EditModeContext';

interface FacultyCardProps {
    faculty: ApiFaculty;
    onUpdateField: (id: number, field: string, value: string) => Promise<void>;
    onUploadPhoto: (id: number, file: File) => Promise<void>;
    onUploadCv: (id: number, file: File) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const FacultyCard: React.FC<FacultyCardProps> = ({
    faculty,
    onUpdateField,
    onUploadPhoto,
    onUploadCv,
    onDelete,
}) => {
    const { isEditMode } = useEditMode();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await onDelete(faculty.id);
        } finally {
            setDeleting(false);
            setConfirmDelete(false);
        }
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border group relative ${isEditMode ? 'border-blue-300 ring-1 ring-blue-200' : 'border-gray-200'
                }`}
        >
            {/* Delete button (edit mode) */}
            {isEditMode && (
                <button
                    onClick={() => setConfirmDelete(true)}
                    className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                    title="Delete faculty"
                >
                    <Trash2 size={13} />
                </button>
            )}

            {/* Faculty Photo */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 aspect-[4/5] sm:aspect-[3/4] xl:aspect-[4/5]">
                <EditableImage
                    src={faculty.photo_url || faculty.photo}
                    alt={faculty.name}
                    onSave={(file) => onUploadPhoto(faculty.id, file)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    fallback={
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                            <User size={48} className="text-gray-300" />
                        </div>
                    }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Faculty Info */}
            <div className="p-5">
                <EditableText
                    tag="h3"
                    value={faculty.name}
                    onSave={(v) => onUpdateField(faculty.id, 'name', v)}
                    className="text-lg font-bold text-gray-800 mb-1 line-clamp-2"
                />
                <EditableText
                    tag="p"
                    value={faculty.designation}
                    onSave={(v) => onUpdateField(faculty.id, 'designation', v)}
                    className="text-sm text-[#153D6A] font-medium mb-4"
                />

                {/* CV upload in edit mode */}
                <EditableFile
                    label="CV / Resume"
                    currentFileUrl={faculty.cv_url || faculty.cv || undefined}
                    onSave={(file) => onUploadCv(faculty.id, file)}
                />

                {/* Action Buttons (read mode) */}
                {!isEditMode && (
                    <div className="flex gap-3 mt-2">
                        {(faculty.cv_url || faculty.cv) && (
                            <a
                                href={faculty.cv_url || faculty.cv || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-[#153D6A] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#1a4a7f] transition-colors duration-200 shadow-sm"
                            >
                                <FileText size={16} />
                                Resume
                            </a>
                        )}
                        {faculty.profile_link && (
                            <a
                                href={faculty.profile_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-[#153D6A] text-sm font-medium py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                            >
                                <User size={16} />
                                Profile
                            </a>
                        )}
                    </div>
                )}

                {isEditMode && (
                    <div className="mt-3">
                        <label className="block text-xs text-gray-500 mb-0.5">Profile Link</label>
                        <EditableText
                            tag="span"
                            value={faculty.profile_link || ''}
                            onSave={(v) => onUpdateField(faculty.id, 'profile_link', v)}
                            className="text-xs text-blue-600 underline"
                            placeholder="https://..."
                        />
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={confirmDelete}
                title="Delete Faculty Member"
                message={`Are you sure you want to remove ${faculty.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                loading={deleting}
            />
        </div>
    );
};

export default FacultyCard;
