import React, { useState } from 'react';
import { Trash2, User } from 'lucide-react';
import type { ApiStaff } from '~/utils/api/useStaffApi';
import EditableText from '~/components/admin/EditableText';
import EditableImage from '~/components/admin/EditableImage';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import { useEditMode } from '~/context/EditModeContext';

interface StaffCardProps {
    staff: ApiStaff;
    onUpdateField: (id: number, field: string, value: string) => Promise<void>;
    onUploadPhoto: (id: number, file: File) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const StaffCard: React.FC<StaffCardProps> = ({
    staff,
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
            await onDelete(staff.id);
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
            {isEditMode && (
                <button
                    onClick={() => setConfirmDelete(true)}
                    className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                >
                    <Trash2 size={13} />
                </button>
            )}

            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 aspect-[4/5] sm:aspect-[3/4] xl:aspect-[4/5]">
                <EditableImage
                    src={staff.photo_url || staff.photo}
                    alt={staff.name}
                    onSave={(file) => onUploadPhoto(staff.id, file)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    fallback={
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
                            <User size={48} className="text-gray-300" />
                        </div>
                    }
                />
            </div>

            <div className="p-5">
                <EditableText
                    tag="h3"
                    value={staff.name}
                    onSave={(v) => onUpdateField(staff.id, 'name', v)}
                    className="text-lg font-bold text-gray-800 mb-1 line-clamp-2"
                />
                <EditableText
                    tag="p"
                    value={staff.designation}
                    onSave={(v) => onUpdateField(staff.id, 'designation', v)}
                    className="text-sm text-[#153D6A] font-medium mb-4"
                />

                {!isEditMode && staff.profile_link && (
                    <div className="mt-2">
                        <a
                            href={staff.profile_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-gray-100 text-[#153D6A] text-sm font-medium py-2 px-4 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                        >
                            <User size={16} />
                            Profile
                        </a>
                    </div>
                )}

                {isEditMode && (
                    <div className="mt-3">
                        <label className="block text-xs text-gray-500 mb-0.5">Profile Link</label>
                        <EditableText
                            tag="span"
                            value={staff.profile_link || ''}
                            onSave={(v) => onUpdateField(staff.id, 'profile_link', v)}
                            className="text-xs text-blue-600 underline"
                            placeholder="https://..."
                        />
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={confirmDelete}
                title="Delete Staff Member"
                message={`Are you sure you want to remove ${staff.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                loading={deleting}
            />
        </div>
    );
};

export default StaffCard;
