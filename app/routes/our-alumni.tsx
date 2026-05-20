import React, { useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import AlumniCard from '~/components/AlumniCard';
import AddItemButton from '~/components/admin/AddItemButton';
import { useAlumniApi } from '~/utils/api/useAlumniApi';
import { useEditMode } from '~/context/EditModeContext';
import type { Route } from './+types/our-alumni';
import { X } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Our Alumni | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Meet our successful alumni from the Department of Computer Science & Engineering, KNIT Sultanpur, working at top companies worldwide.',
        },
    ];
}

const INITIAL_FORM = {
    name: '',
    batch: '',
    company: '',
    designation: '',
    linkedin: '',
};

export default function OurAlumni() {
    const { alumni, isLoading, addAlumni, updateAlumni, deleteAlumni } = useAlumniApi();
    const { isEditMode } = useEditMode();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const handleUpdateField = async (id: number, field: string, value: string) => {
        await updateAlumni.mutateAsync({ id, payload: { [field]: value } });
    };

    const handleUploadPhoto = async (id: number, file: File) => {
        const fd = new FormData();
        fd.append('photo', file);
        await updateAlumni.mutateAsync({ id, payload: fd });
    };

    const handleDelete = async (id: number) => {
        await deleteAlumni.mutateAsync(id);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => { if (v) fd.append(k, v); });
            if (photoFile) fd.append('photo', photoFile);
            await addAlumni.mutateAsync(fd);
            setShowModal(false);
            setForm(INITIAL_FORM);
            setPhotoFile(null);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Alumni</h1>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {alumni.map((a) => (
                            <AlumniCard
                                key={a.id}
                                alumni={a}
                                onUpdateField={handleUpdateField}
                                onUploadPhoto={handleUploadPhoto}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <AddItemButton label="Add Alumni" onClick={() => setShowModal(true)} />
            </div>
            <Footer />

            {/* Add Alumni Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[9990] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Add Alumni</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            {([
                                { key: 'name', label: 'Name', placeholder: 'John Doe', required: true },
                                { key: 'batch', label: 'Batch Year', placeholder: '2020', required: true },
                                { key: 'company', label: 'Company', placeholder: 'Google', required: true },
                                { key: 'designation', label: 'Designation', placeholder: 'Software Engineer', required: true },
                                { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...', required: false },
                            ] as const).map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.label} {field.required && '*'}
                                    </label>
                                    <input
                                        required={field.required}
                                        value={form[field.key]}
                                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder={field.placeholder}
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#153D6A] hover:bg-[#1a4a7f] text-white text-sm font-medium transition-colors"
                                >
                                    {saving ? 'Saving…' : 'Add Alumni'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
