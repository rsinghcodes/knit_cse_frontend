import React, { useState } from 'react';
import { useAdminAuth } from '~/context/AdminAuthContext';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, ShieldCheck, User } from 'lucide-react';

export function meta() {
    return [
        { title: 'Admin Login | KNIT CSE' },
        { name: 'robots', content: 'noindex' },
    ];
}

export default function AdminLogin() {
    const { login, isAdmin } = useAdminAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Already logged in? Go home
    if (isAdmin) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(username, password);
            navigate('/');
        } catch {
            setError('Invalid username or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #153D6A 50%, #1a4a7f 100%)',
            }}
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #60a5fa, transparent)' }}
                />
                <div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
                />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div
                    className="rounded-3xl p-8 shadow-2xl"
                    style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    {/* Logo + Title */}
                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                boxShadow: '0 8px 24px rgba(59,130,246,0.4)',
                            }}
                        >
                            <ShieldCheck size={32} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1">Admin Access</h1>
                        <p className="text-blue-200 text-sm">KNIT CSE Website Editor</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-1.5">Username</label>
                            <div className="relative">
                                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="admin"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-blue-200 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(255,255,255,0.15)',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((p) => !p)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mt-2"
                            style={{
                                background: loading
                                    ? 'rgba(59,130,246,0.4)'
                                    : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
                            }}
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        Restricted access — authorised personnel only
                    </p>
                </div>
            </div>
        </div>
    );
}
