import React, { useState, useMemo } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import FacultyCard from '~/components/FacultyCard';
import AddItemButton from '~/components/admin/AddItemButton';
import { useFacultyApi } from '~/utils/api/useFacultyApi';
import type { ApiFaculty } from '~/utils/api/useFacultyApi';
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
    department: '',
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

    // Dynamic Grouping of Faculty by Department
    const facultyByDept = useMemo(() => {
        return faculty.reduce((acc, f) => {
            const dept = f.department || 'Other';
            if (!acc[dept]) acc[dept] = [];
            acc[dept].push(f);
            return acc;
        }, {} as Record<string, ApiFaculty[]>);
    }, [faculty]);

    const existingDepartments = Object.keys(facultyByDept).sort();

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg h-40 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {existingDepartments.length === 0 && !isEditMode && (
                            <p className="text-gray-500 text-center py-10">No faculty members found.</p>
                        )}
                        
                        {existingDepartments.map(dept => (
                            <div key={dept} className="mb-12">
                                <h2 className="text-2xl font-semibold text-[#153D6A] mb-5 border-b pb-2">{dept} Department</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {facultyByDept[dept].map((f) => (
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
                            </div>
                        ))}
                    </>
                )}

                <AddItemButton label="Add Faculty Member" onClick={() => setShowModal(true)} />
            </div>
            <Footer />

            {/* Add Faculty Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-[9990] flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-800">Add Faculty Member</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153D6A]"
                                    placeholder="Dr. John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Designation *</label>
                                <input
                                    required
                                    value={form.designation}
                                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153D6A]"
                                    placeholder="Associate Professor"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Course / Department *</label>
                                <input
                                    required
                                    list="existing-departments"
                                    value={form.department}
                                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153D6A]"
                                    placeholder="Type a new course or select an existing one"
                                />
                                <datalist id="existing-departments">
                                    {existingDepartments.map(dept => (
                                        <option key={dept} value={dept} />
                                    ))}
                                </datalist>
                                <p className="text-xs text-gray-500 mt-1">If you enter a new name, a new grid section will be constructed automatically.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Profile Link</label>
                                <input
                                    value={form.profile_link}
                                    onChange={(e) => setForm({ ...form, profile_link: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#153D6A]"
                                    placeholder="https://knit.ac.in/faculty/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#153D6A] hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">CV (PDF)</label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#153D6A] hover:file:bg-blue-100 cursor-pointer"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 py-3 px-4 rounded-xl bg-[#153D6A] hover:bg-blue-800 text-white text-sm font-bold transition-colors disabled:opacity-70"
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
