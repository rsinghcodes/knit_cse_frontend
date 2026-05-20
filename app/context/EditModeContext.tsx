import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

interface EditModeContextType {
    isEditMode: boolean;
    toggleEditMode: () => void;
    setEditMode: (val: boolean) => void;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function EditModeProvider({ children }: { children: React.ReactNode }) {
    const { isAdmin } = useAdminAuth();
    const [isEditMode, setIsEditMode] = useState(false);

    // If admin logs out, disable edit mode
    useEffect(() => {
        if (!isAdmin) setIsEditMode(false);
    }, [isAdmin]);

    const toggleEditMode = useCallback(() => {
        if (!isAdmin) return;
        setIsEditMode((prev) => !prev);
    }, [isAdmin]);

    const setEditMode = useCallback(
        (val: boolean) => {
            if (!isAdmin) return;
            setIsEditMode(val);
        },
        [isAdmin]
    );

    return (
        <EditModeContext.Provider value={{ isEditMode, toggleEditMode, setEditMode }}>
            {children}
        </EditModeContext.Provider>
    );
}

export function useEditMode() {
    const ctx = useContext(EditModeContext);
    if (!ctx) throw new Error('useEditMode must be used inside EditModeProvider');
    return ctx;
}
