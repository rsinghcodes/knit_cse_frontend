import React, { useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import FacultyCard from '~/components/FacultyCard';
import AddItemButton from '~/components/admin/AddItemButton';
import { useFacultyApi } from '~/utils/api/useFacultyApi';
import { useEditMode } from '~/context/EditModeContext';
import type { Route } from './+types/faculty';
import { X } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Faculty | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Meet our distinguished faculty members from the Computer Science & Engineering and MCA departments at KNIT Sultanpur.',
        },
    ];
}

const INITIAL_FORM = {
    name: '',
    designation: '',
    department: 'CSE' as 'CSE' | 'MCA',
    profile_link: '',
};

export default function Faculty() {
    const { faculty, isLoading, addFaculty, updateFaculty, deleteFaculty } = useFacultyApi();
    const { isEditMode } = useEditMode();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const cseFaculty = faculty.filter((f) => f.department === 'CSE');
    const mcaFaculty = faculty.filter((f) => f.department === 'MCA');

    const handleUpdateField = async (id: number, field: string, value: string) => {
        await updateFaculty.mutateAsync({ id, payload: { [field]: value } });
    };

    const handleUploadPhoto = async (id: number, file: File) => {
        const fd = new FormData();
        fd.append('photo', file);
        await updateFaculty.mutateAsync({ id, payload: fd });
    };

    const handleUploadCv = async (id: number, file: File) => {
        const fd = new FormData();
        fd.append('cv', file);
        await updateFaculty.mutateAsync({ id, payload: fd });
    };

    const handleDelete = async (id: number) => {
        await deleteFaculty.mutateAsync(id);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fd = new FormData();
            fd.append('name', form.name);
            fd.append('designation', form.designation);
            fd.append('department', form.department);
            if (form.profile_link) fd.append('profile_link', form.profile_link);
            if (photoFile) fd.append('photo', photoFile);
            if (cvFile) fd.append('cv', cvFile);
            await addFaculty.mutateAsync(fd);
            setShowModal(false);
            setForm(INITIAL_FORM);
            setPhotoFile(null);
            setCvFile(null);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Faculty Members</h1>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg h-72 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4">CSE Department</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                            {cseFaculty.map((f) => (
                                <FacultyCard
                                    key={f.id}
                                    faculty={f}
                                    onUpdateField={handleUpdateField}
                                    onUploadPhoto={handleUploadPhoto}
                                    onUploadCv={handleUploadCv}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>

                        <h2 className="text-2xl font-semibold text-blue-800 mb-4">MCA Department</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {mcaFaculty.map((f) => (
                                <FacultyCard
                                    key={f.id}
                                    faculty={f}
                                    onUpdateField={handleUpdateField}
                                    onUploadPhoto={handleUploadPhoto}
                                    onUploadCv={handleUploadCv}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                )}

                <AddItemButton label="Add Faculty Member" onClick={() => setShowModal(true)} />
            </div>
            <Footer />

            {/* Add Faculty Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[9990] flex items-center justify-center"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Add Faculty Member</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Dr. John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                                <input
                                    required
                                    value={form.designation}
                                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Associate Professor"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                                <select
                                    value={form.department}
                                    onChange={(e) => setForm({ ...form, department: e.target.value as 'CSE' | 'MCA' })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="CSE">CSE</option>
                                    <option value="MCA">MCA</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Link</label>
                                <input
                                    value={form.profile_link}
                                    onChange={(e) => setForm({ ...form, profile_link: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="https://knit.ac.in/faculty/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CV (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
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
                                    {saving ? 'Saving…' : 'Add Faculty'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
