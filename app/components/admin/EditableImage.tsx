import React, { useRef, useState } from 'react';
import { Camera, Check, X } from 'lucide-react';
import { useEditMode } from '~/context/EditModeContext';

interface EditableImageProps {
    src?: string | null;
    alt: string;
    onSave: (file: File) => Promise<void>;
    className?: string;
    fallback?: React.ReactNode;
}

export default function EditableImage({
    src,
    alt,
    onSave,
    className = '',
    fallback,
}: EditableImageProps) {
    const { isEditMode } = useEditMode();
    const [preview, setPreview] = useState<string | null>(null);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPendingFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!pendingFile) return;
        setSaving(true);
        try {
            await onSave(pendingFile);
            setPreview(null);
            setPendingFile(null);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setPreview(null);
        setPendingFile(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    const displaySrc = preview || src;

    return (
        <div className="relative w-full h-full">
            {displaySrc ? (
                <img src={displaySrc} alt={alt} className={className} />
            ) : (
                fallback || <div className={`bg-gray-200 flex items-center justify-center ${className}`}><span className="text-gray-400 text-sm">No image</span></div>
            )}

            {isEditMode && (
                <>
                    {/* Camera overlay button */}
                    {!pendingFile && (
                        <button
                            onClick={() => fileRef.current?.click()}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/55 transition-colors rounded group"
                            title="Change image"
                        >
                            <span className="bg-white/90 text-gray-800 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={14} /> Change
                            </span>
                        </button>
                    )}

                    {/* Preview with save/cancel */}
                    {pendingFile && (
                        <div className="absolute bottom-0 left-0 right-0 flex gap-2 p-2 bg-black/60 rounded-b">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1.5 rounded-md transition-colors"
                            >
                                <Check size={12} /> {saving ? 'Saving…' : 'Save'}
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center justify-center gap-1 bg-gray-500 hover:bg-gray-600 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </>
            )}
        </div>
    );
}
