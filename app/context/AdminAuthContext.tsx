import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '~/lib/api';

interface AdminAuthContextType {
    isAdmin: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // On mount: if tokens exist, verify them by checking /api/token/refresh/
    useEffect(() => {
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');
        if (access && refresh) {
            setIsAdmin(true);
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (username: string, password: string) => {
        const { data } = await api.post('/api/token/', { username, password });
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setIsAdmin(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAdmin(false);
    }, []);

    return (
        <AdminAuthContext.Provider value={{ isAdmin, isLoading, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
    return ctx;
}
