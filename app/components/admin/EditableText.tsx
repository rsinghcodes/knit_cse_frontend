import React, { useEffect, useRef, useState } from 'react';
import { Check, Pencil, X } from 'lucide-react';
import { useEditMode } from '~/context/EditModeContext';

interface EditableTextProps {
    value: string;
    onSave: (newValue: string) => Promise<void> | void;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    className?: string;
    multiline?: boolean;
    placeholder?: string;
}

export default function EditableText({
    value,
    onSave,
    tag: Tag = 'span',
    className = '',
    multiline = false,
    placeholder = 'Click to edit...',
}: EditableTextProps) {
    const { isEditMode } = useEditMode();
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const [saving, setSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        setDraft(value);
    }, [value]);

    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(draft);
            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setDraft(value);
        setEditing(false);
    };

    if (!isEditMode) {
        return <Tag className={className}>{value}</Tag>;
    }

    if (editing) {
        return (
            <span className="inline-block w-full">
                {multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={placeholder}
                        rows={3}
                        className="w-full border-2 border-blue-400 rounded-lg px-3 py-2 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={placeholder}
                        className="w-full border-2 border-blue-400 rounded-lg px-3 py-1.5 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                )}
                <span className="flex gap-2 mt-1.5">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-md transition-colors"
                    >
                        <Check size={12} /> {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button
                        onClick={handleCancel}
                        className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium px-3 py-1 rounded-md transition-colors"
                    >
                        <X size={12} /> Cancel
                    </button>
                </span>
            </span>
        );
    }

    return (
        <Tag
            className={`${className} group relative cursor-pointer`}
            onClick={() => setEditing(true)}
            title="Click to edit"
        >
            {value || <span className="text-gray-400 italic">{placeholder}</span>}
            <span
                className="inline-flex items-center gap-1 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ verticalAlign: 'middle' }}
            >
                <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow">
                    <Pencil size={10} /> Edit
                </span>
            </span>
        </Tag>
    );
}
