import React, { useRef, useState } from 'react';
import { Check, FileText, Upload, X } from 'lucide-react';
import { useEditMode } from '~/context/EditModeContext';

interface EditableFileProps {
    label?: string;
    currentFileUrl?: string | null;
    onSave: (file: File) => Promise<void>;
    accept?: string;
}

export default function EditableFile({
    label = 'CV / Resume',
    currentFileUrl,
    onSave,
    accept = '.pdf,.doc,.docx',
}: EditableFileProps) {
    const { isEditMode } = useEditMode();
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        if (!pendingFile) return;
        setSaving(true);
        try {
            await onSave(pendingFile);
            setPendingFile(null);
            if (fileRef.current) fileRef.current.value = '';
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setPendingFile(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    if (!isEditMode) {
        if (!currentFileUrl) return null;
        return (
            <a
                href={currentFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 underline"
            >
                <FileText size={13} /> {label}
            </a>
        );
    }

    return (
        <div className="mt-2 p-2 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
            <p className="text-xs font-semibold text-blue-700 mb-1.5">{label}</p>

            {currentFileUrl && !pendingFile && (
                <a
                    href={currentFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-gray-600 hover:underline mb-2"
                >
                    <FileText size={12} /> Current file
                </a>
            )}

            {pendingFile ? (
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs text-gray-700 truncate">📄 {pendingFile.name}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1.5 rounded-md transition-colors"
                        >
                            <Check size={12} /> {saving ? 'Uploading…' : 'Upload'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-500 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex items-center justify-center gap-1.5 bg-white border border-blue-300 hover:bg-blue-50 text-blue-600 text-xs font-medium py-2 rounded-md transition-colors"
                >
                    <Upload size={12} /> Choose File
                </button>
            )}

            <input
                ref={fileRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setPendingFile(f);
                }}
            />
        </div>
    );
}
