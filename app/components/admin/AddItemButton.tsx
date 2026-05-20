import React from 'react';
import { Plus } from 'lucide-react';
import { useEditMode } from '~/context/EditModeContext';

interface AddItemButtonProps {
    label?: string;
    onClick: () => void;
}

export default function AddItemButton({ label = 'Add Item', onClick }: AddItemButtonProps) {
    const { isEditMode } = useEditMode();

    if (!isEditMode) return null;

    return (
        <button
            onClick={onClick}
            style={{
                background: 'linear-gradient(135deg, #153D6A, #1a4a7f)',
                boxShadow: '0 4px 16px rgba(21,61,106,0.35)',
            }}
            className="flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-transform duration-150 mt-4"
        >
            <Plus size={18} />
            {label}
        </button>
    );
}
