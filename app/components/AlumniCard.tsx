import React, { useState } from 'react';
import { Briefcase, GraduationCap, Linkedin, Trash2 } from 'lucide-react';
import type { ApiAlumni } from '~/utils/api/useAlumniApi';
import EditableText from '~/components/admin/EditableText';
import EditableImage from '~/components/admin/EditableImage';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import { useEditMode } from '~/context/EditModeContext';

interface AlumniCardProps {
    alumni: ApiAlumni;
    onUpdateField: (id: number, field: string, value: string) => Promise<void>;
    onUploadPhoto: (id: number, file: File) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const AlumniCard: React.FC<AlumniCardProps> = ({
    alumni,
    onUpdateField,
    onUploadPhoto,
    onDelete,
}) => {
    const { isEditMode } = useEditMode();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await onDelete(alumni.id);
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
                    title="Delete alumni"
                >
                    <Trash2 size={13} />
                </button>
            )}

            {/* Header */}
            <div className="bg-gradient-to-br from-[#153D6A] to-[#1a4a7f] h-24 flex items-center justify-center relative overflow-hidden">
                {alumni.photo_url || alumni.photo ? (
                    <EditableImage
                        src={alumni.photo_url || alumni.photo}
                        alt={alumni.name}
                        onSave={(file) => onUploadPhoto(alumni.id, file)}
                        className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white"
                    />
                ) : (
                    <div className="relative">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-2xl font-bold text-[#153D6A]">
                                {alumni.company.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        {isEditMode && (
                            <EditableImage
                                src={null}
                                alt={alumni.name}
                                onSave={(file) => onUploadPhoto(alumni.id, file)}
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-5">
                {/* Name */}
                <div className="text-center mb-1">
                    <EditableText
                        tag="h3"
                        value={alumni.name}
                        onSave={(v) => onUpdateField(alumni.id, 'name', v)}
                        className="text-lg font-bold text-gray-800"
                    />
                </div>

                {/* Batch */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                    <GraduationCap size={16} className="text-[#153D6A]" />
                    <span>Batch: </span>
                    <EditableText
                        tag="span"
                        value={alumni.batch}
                        onSave={(v) => onUpdateField(alumni.id, 'batch', v)}
                        className="font-medium"
                    />
                </div>

                <div className="border-t border-gray-200 my-4" />

                {/* Company & Designation */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                        <Briefcase size={16} className="text-[#153D6A] mt-0.5 flex-shrink-0" />
                        <div>
                            <EditableText
                                tag="p"
                                value={alumni.company}
                                onSave={(v) => onUpdateField(alumni.id, 'company', v)}
                                className="text-sm font-semibold text-gray-800"
                            />
                            <EditableText
                                tag="p"
                                value={alumni.designation}
                                onSave={(v) => onUpdateField(alumni.id, 'designation', v)}
                                className="text-xs text-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {/* LinkedIn */}
                {!isEditMode && alumni.linkedin && (
                    <a
                        href={alumni.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#0077B5] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#006399] transition-colors duration-200 shadow-sm"
                    >
                        <Linkedin size={16} />
                        View LinkedIn Profile
                    </a>
                )}

                {isEditMode && (
                    <div className="mt-2">
                        <label className="block text-xs text-gray-500 mb-0.5">LinkedIn URL</label>
                        <EditableText
                            tag="span"
                            value={alumni.linkedin || ''}
                            onSave={(v) => onUpdateField(alumni.id, 'linkedin', v)}
                            className="text-xs text-blue-600 underline"
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={confirmDelete}
                title="Delete Alumni"
                message={`Are you sure you want to remove ${alumni.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                loading={deleting}
            />
        </div>
    );
};

export default AlumniCard;
