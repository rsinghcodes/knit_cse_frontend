import React, { useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import CourseCard from '~/components/CourseCard';
import AddItemButton from '~/components/admin/AddItemButton';
import { useCoursesApi } from '~/utils/api/useCoursesApi';
import { useEditMode } from '~/context/EditModeContext';
import type { Route } from './+types/courses';
import { X, Check } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Courses Offered | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Explore academic programs offered by the Department of Computer Science & Engineering, KNIT Sultanpur. B.Tech CSE and MCA programs with excellent placement records.',
        },
    ];
}

const INITIAL_FORM = {
    name: '',
    degree: '',
    duration: '',
    intake: '',
    curriculum: '',
};

export default function Courses() {
    const { courses, isLoading, addCourse, updateCourse, deleteCourse } = useCoursesApi();
    const { isEditMode } = useEditMode();

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [saving, setSaving] = useState(false);

    const handleUpdateField = async (id: number, field: string, value: any) => {
        await updateCourse.mutateAsync({ id, payload: { [field]: value } });
    };

    const handleDelete = async (id: number) => {
        await deleteCourse.mutateAsync(id);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await addCourse.mutateAsync({
                ...form,
                eligibility: ['Passed 10+2 or equivalent'], // some defaults
                highlights: ['AICTE approved'],
                career_prospects: ['Software Engineer'],
            });
            setShowModal(false);
            setForm(INITIAL_FORM);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Courses Offered</h1>
                    {isEditMode && (
                        <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                            ✏️ Edit Mode Active
                        </span>
                    )}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onUpdateField={handleUpdateField}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <AddItemButton label="Add Course" onClick={() => setShowModal(true)} />
            </div>
            <Footer />

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Add New Course</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course Full Name *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Bachelor of Technology in Computer Science & Engineering" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Degree Abbreviation *</label>
                                    <input required value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. B.Tech CSE" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration *</label>
                                    <input required value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 4 Years (8 Semesters)" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Intake Output *</label>
                                <input required value={form.intake} onChange={e => setForm({ ...form, intake: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 120 Seats" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Curriculum Overview</label>
                                <textarea rows={4} value={form.curriculum} onChange={e => setForm({ ...form, curriculum: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-y" placeholder="Brief overview of the curriculum..." />
                            </div>

                            <div className="bg-blue-50 text-blue-800 text-sm p-4 rounded-xl flex items-start gap-3 border border-blue-100 mt-2">
                                <Check size={20} className="shrink-0 mt-0.5 text-blue-600" />
                                <p><strong>Note:</strong> Lists (Eligibility, Highlights, Careers) can be edited inline on the course card after creation.</p>
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving} className="flex-1 py-3 px-4 rounded-xl bg-[#153D6A] hover:bg-[#1a4a7f] shadow-md text-white font-semibold transition-all">
                                    {saving ? 'Creating Course...' : 'Create Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
