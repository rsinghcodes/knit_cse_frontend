import React, { useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import StaffCard from '~/components/StaffCard';
import AddItemButton from '~/components/admin/AddItemButton';
import { useStaffApi } from '~/utils/api/useStaffApi';
import { useEditMode } from '~/context/EditModeContext';
import type { Route } from './+types/staff';
import { X } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Staff | KNIT CSE Department' },
        { name: 'description', content: 'Meet our dedicated staff members from the KNIT Computer Science & Engineering department.' },
    ];
}

const INITIAL_FORM = {
    name: '',
    designation: '',
    department: 'CSE',
    profile_link: '',
};

export default function Staff() {
    const { staff, isLoading, addStaff, updateStaff, deleteStaff } = useStaffApi();
    const { isEditMode } = useEditMode();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);

    const handleUpdateField = async (id: number, field: string, value: string) => {
        await updateStaff.mutateAsync({ id, payload: { [field]: value } });
    };

    const handleUploadPhoto = async (id: number, file: File) => {
        const fd = new FormData();
        fd.append('photo', file);
        await updateStaff.mutateAsync({ id, payload: fd });
    };

    const handleDelete = async (id: number) => {
        await deleteStaff.mutateAsync(id);
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
            await addStaff.mutateAsync(fd);
            setShowModal(false);
            setForm(INITIAL_FORM);
            setPhotoFile(null);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Department Staff</h1>
                    {isEditMode && (
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow">
                            ✏️ Editing Staff
                        </span>
                    )}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-lg h-72 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {staff.map((s) => (
                            <StaffCard
                                key={s.id}
                                staff={s}
                                onUpdateField={handleUpdateField}
                                onUploadPhoto={handleUploadPhoto}
                                onDelete={handleDelete}
                            />
                        ))}
                        {staff.length === 0 && !isEditMode && (
                            <p className="text-gray-500 col-span-full">No staff members listed currently.</p>
                        )}
                    </div>
                )}

                <AddItemButton label="Add Staff Member" onClick={() => setShowModal(true)} />
            </div>
            <Footer />

            {/* Add Staff Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Add Staff Member</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Mr. John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                                <input required value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Lab Assistant" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                <input value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="CSE" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Link</label>
                                <input value={form.profile_link} onChange={e => setForm({ ...form, profile_link: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                                <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-2.5 px-4 rounded-xl bg-[#153D6A] hover:bg-[#1a4a7f] text-white text-sm font-medium transition-colors">{saving ? 'Saving...' : 'Add Staff'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
