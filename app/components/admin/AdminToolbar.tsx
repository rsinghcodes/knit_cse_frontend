import React, { useState } from 'react';
import { useAdminAuth } from '~/context/AdminAuthContext';
import { useEditMode } from '~/context/EditModeContext';
import { Eye, EyeOff, LogIn, LogOut, Settings2 } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AdminToolbar() {
    const { isAdmin, logout } = useAdminAuth();
    const { isEditMode, toggleEditMode } = useEditMode();
    const [isExpanded, setIsExpanded] = useState(true);
    const navigate = useNavigate();

    return (
        <div
            style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
            className="flex flex-col items-end gap-2"
        >
            {isExpanded && (
                <div
                    style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                    className="rounded-2xl p-4 flex flex-col gap-3 min-w-48 text-white"
                >
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                        <Settings2 size={16} className="text-blue-300" />
                        <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                            Admin Panel
                        </span>
                    </div>

                    {isAdmin ? (
                        <>
                            {/* Edit Mode Toggle */}
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-gray-300">Edit Mode</span>
                                <button
                                    onClick={toggleEditMode}
                                    style={{
                                        background: isEditMode
                                            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                            : 'rgba(255,255,255,0.1)',
                                        boxShadow: isEditMode ? '0 0 12px rgba(34,197,94,0.4)' : 'none',
                                    }}
                                    className="relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300"
                                >
                                    {isEditMode ? (
                                        <>
                                            <Eye size={13} /> ON
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff size={13} /> OFF
                                        </>
                                    )}
                                </button>
                            </div>

                            {isEditMode && (
                                <div
                                    className="text-xs text-green-300 text-center py-1 rounded-lg"
                                    style={{ background: 'rgba(34,197,94,0.1)' }}
                                >
                                    ✏️ Click any element to edit
                                </div>
                            )}

                            {/* Logout */}
                            <button
                                onClick={() => {
                                    logout();
                                    setIsExpanded(false);
                                }}
                                className="flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-medium py-2 px-3 rounded-lg transition-colors"
                            >
                                <LogOut size={13} /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <p className="text-xs text-gray-400 text-center">Admin access required</p>
                            <button
                                onClick={() => navigate('/admin-login')}
                                className="flex items-center justify-center gap-2 text-xs font-medium py-2 px-3 rounded-lg transition-all"
                                style={{
                                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                    boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
                                }}
                            >
                                <LogIn size={13} /> Admin Login
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Fab Toggle Button */}
            <button
                onClick={() => setIsExpanded((p) => !p)}
                style={{
                    background: 'linear-gradient(135deg, #153D6A, #1a4a7f)',
                    boxShadow: '0 4px 20px rgba(21,61,106,0.5)',
                    width: 48,
                    height: 48,
                }}
                className="rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                title="Admin Controls"
            >
                <Settings2 size={22} />
            </button>
        </div>
    );
}
