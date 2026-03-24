import React, { useState } from 'react';
import { Linkedin, Trash2 } from 'lucide-react';
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

// Vibrant theme palettes inspired by the colorful 2nd upload
const colorThemes = [
    'from-amber-400 to-orange-500',
    'from-rose-500 to-red-600',
    'from-cyan-400 to-blue-500',
    'from-emerald-400 to-green-500',
    'from-fuchsia-500 to-purple-600'
];

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni, onUpdateField, onUploadPhoto, onDelete }) => {
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

    const theme = colorThemes[alumni.id % colorThemes.length];

    return (
        <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex relative group h-32 border border-gray-100 w-full overflow-hidden ${isEditMode ? 'ring-2 ring-blue-300' : ''}`}>

            {isEditMode && (
                <button
                    onClick={() => setConfirmDelete(true)}
                    className="absolute top-2 right-2 z-30 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors"
                    title="Delete Alumni"
                >
                    <Trash2 size={12} />
                </button>
            )}

            {/* Profile Photo - Compact Vertical Rectangle */}
            <div className={`w-[90px] h-full overflow-hidden relative shadow-[2px_0_8px_rgba(0,0,0,0.02)] border-r border-gray-100 flex-shrink-0 bg-gray-50`}>
                {alumni.photo_url || alumni.photo ? (
                    <EditableImage
                        src={alumni.photo_url || alumni.photo}
                        alt={alumni.name}
                        onSave={f => onUploadPhoto(alumni.id, f)}
                        className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-300">
                            {alumni.name ? alumni.name.charAt(0).toUpperCase() : '?'}
                        </span>
                    </div>
                )}
                {isEditMode && (
                    <div className="absolute inset-0">
                        <EditableImage src={null} alt={alumni.name} onSave={f => onUploadPhoto(alumni.id, f)} className="w-full h-full opacity-0 hover:opacity-100 transition-opacity bg-black/40" />
                    </div>
                )}
            </div>

            {/* Right Information Container */}
            <div className="flex flex-col justify-center flex-grow min-w-0 py-3 px-4 relative z-10">
                <EditableText
                    tag="h3"
                    value={alumni.name}
                    onSave={v => onUpdateField(alumni.id, 'name', v)}
                    className="text-[15px] sm:text-[16px] font-black text-gray-900 truncate tracking-tight leading-tight"
                />

                <EditableText
                    tag="p"
                    value={alumni.designation}
                    onSave={v => onUpdateField(alumni.id, 'designation', v)}
                    className="text-[11.5px] font-bold text-gray-700 truncate mt-0.5"
                />

                <EditableText
                    tag="p"
                    value={alumni.company}
                    onSave={v => onUpdateField(alumni.id, 'company', v)}
                    className="text-[11px] font-medium text-[#153D6A] truncate mt-0.5"
                />

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-auto pt-2">
                    {/* Class Batch Tag */}
                    <div className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                        Class of <EditableText tag="span" value={alumni.batch} onSave={v => onUpdateField(alumni.id, 'batch', v)} className="text-gray-700" />
                    </div>

                    {/* LinkedIn Logic */}
                    {!isEditMode && alumni.linkedin ? (
                        <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-[#0A66C2] hover:scale-110 transition-transform bg-[#0A66C2]/10 p-1.5 rounded-full"
                            title="LinkedIn Profile"
                        >
                            <Linkedin size={12} fill="currentColor" />
                        </a>
                    ) : isEditMode ? (
                        <div className="ml-auto min-w-0">
                            <EditableText
                                tag="span"
                                value={alumni.linkedin || ''}
                                onSave={v => onUpdateField(alumni.id, 'linkedin', v)}
                                className="text-[9px] text-blue-500 underline truncate max-w-[80px] block"
                                placeholder="Edit LinkedIn URL"
                            />
                        </div>
                    ) : null}
                </div>
            </div>

            <ConfirmDialog
                open={confirmDelete}
                title="Delete Alumni"
                message={`Permanently remove ${alumni.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                loading={deleting}
            />
        </div>
    );
};

export default AlumniCard;
