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
            className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-stretch relative group min-h-[140px] border border-gray-100 w-full overflow-hidden ${isEditMode ? 'ring-2 ring-blue-300' : ''}`}
        >
            {/* Delete button (edit mode) */}
            {isEditMode && (
                <button
                    onClick={() => setConfirmDelete(true)}
                    className="absolute top-2 right-2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                    title="Delete faculty"
                >
                    <Trash2 size={12} />
                </button>
            )}

            {/* Profile Photo - Flush Left Vertical Rectangle */}
            <div className={`w-[110px] sm:w-[130px] flex-shrink-0 relative shadow-[2px_0_8px_rgba(0,0,0,0.02)] border-r border-gray-100 bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden`}>
                <div className="absolute inset-0">
                    <EditableImage
                        src={faculty.photo_url || faculty.photo}
                        alt={faculty.name}
                        onSave={(file) => onUploadPhoto(faculty.id, file)}
                        className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        fallback={
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                                <User size={40} className="text-gray-300" />
                            </div>
                        }
                    />
                </div>
            </div>

            {/* Right Information Container */}
            <div className="flex flex-col justify-center flex-grow min-w-0 py-4 px-5 relative z-10 w-full">
                <EditableText
                    tag="h3"
                    value={faculty.name}
                    onSave={(v) => onUpdateField(faculty.id, 'name', v)}
                    className="text-[16px] sm:text-[18px] font-black text-gray-900 truncate tracking-tight leading-tight"
                />
                
                <EditableText
                    tag="p"
                    value={faculty.designation}
                    onSave={(v) => onUpdateField(faculty.id, 'designation', v)}
                    className="text-[12px] sm:text-[13px] font-bold text-[#153D6A] truncate mt-1"
                />

                {/* Course Department Badge */}
                <EditableText
                    tag="span"
                    value={faculty.department}
                    onSave={(v) => onUpdateField(faculty.id, 'department', v)}
                    className="text-[10px] font-bold text-gray-400 tracking-wider uppercase bg-gray-50 border border-gray-100 px-2 py-0.5 rounded inline-block mt-1 w-max"
                />

                {/* CV upload in edit mode */}
                {isEditMode && (
                    <div className="mt-3">
                        <EditableFile
                            label="CV / Resume"
                            currentFileUrl={faculty.cv_url || faculty.cv || undefined}
                            onSave={(file) => onUploadCv(faculty.id, file)}
                        />
                    </div>
                )}

                {/* Action Buttons (read mode) */}
                {!isEditMode && (
                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-3 border-t border-gray-50">
                        {(faculty.cv_url || faculty.cv) && (
                            <a
                                href={faculty.cv_url || faculty.cv || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 bg-blue-50 text-[#153D6A] text-[11px] font-bold py-1.5 px-3 rounded-md hover:bg-[#153D6A] hover:text-white transition-colors duration-200"
                            >
                                <FileText size={14} />
                                Resume
                            </a>
                        )}
                        {faculty.profile_link && (
                            <a
                                href={faculty.profile_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 bg-gray-50 text-gray-600 text-[11px] font-bold py-1.5 px-3 rounded-md hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200"
                            >
                                <User size={14} />
                                Profile
                            </a>
                        )}
                    </div>
                )}

                {isEditMode && (
                    <div className="mt-3">
                        <label className="block text-xs font-bold text-gray-500 mb-0.5 tracking-wider uppercase">Profile Link</label>
                        <EditableText
                            tag="span"
                            value={faculty.profile_link || ''}
                            onSave={(v) => onUpdateField(faculty.id, 'profile_link', v)}
                            className="text-xs text-blue-600 underline truncate block w-full"
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
