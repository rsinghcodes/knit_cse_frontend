import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import AddItemButton from '~/components/admin/AddItemButton';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import { useStudentApi, type ApiStudentListPdf } from '~/utils/api/useStudentApi';
import { useCoursesApi, type ApiCourse } from '~/utils/api/useCoursesApi';
import { useEditMode } from '~/context/EditModeContext';
import type { Route } from './+types/students';
import { X, FileText, Download, Trash2, Folder, ChevronDown } from 'lucide-react';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Student Lists | KNIT CSE Department' },
        { name: 'description', content: 'Download comprehensive student rosters categorized by academic year.' },
    ];
}

const INITIAL_FORM = {
    session_year: '',
    year_of_study: '1st Year',
};

export default function Students() {
    const [searchParams, setSearchParams] = useSearchParams();
    const courseParam = searchParams.get('course');
    const activeCourseId = courseParam ? parseInt(courseParam, 10) : null;

    const { courses, isLoading: coursesLoading } = useCoursesApi();
    const { studentLists, isLoading: listsLoading, addStudentList, deleteStudentList } = useStudentApi(activeCourseId);
    
    const { isEditMode } = useEditMode();
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(INITIAL_FORM);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [saving, setSaving] = useState(false);
    
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [openSessions, setOpenSessions] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (!activeCourseId && courses.length > 0) {
            setSearchParams({ course: courses[0].id.toString() }, { replace: true });
        }
    }, [courses, activeCourseId, setSearchParams]);

    // Initialize all accordions as open when data arrives
    useEffect(() => {
        if (studentLists.length > 0) {
            const sessions: Record<string, boolean> = {};
            studentLists.forEach(l => {
                sessions[l.session_year] = true;
            });
            setOpenSessions(sessions);
        }
    }, [studentLists]);

    const toggleSession = (session: string) => {
        setOpenSessions(prev => ({ ...prev, [session]: !prev[session] }));
    };

    const activeCourse = courses.find((c: ApiCourse) => c.id === activeCourseId);
    
    // Group lists by Session Year
    const groupedBySession = studentLists.reduce((acc, curr) => {
        if (!acc[curr.session_year]) acc[curr.session_year] = [];
        acc[curr.session_year].push(curr);
        return acc;
    }, {} as Record<string, ApiStudentListPdf[]>);

    const sortedSessions = Object.keys(groupedBySession).sort((a, b) => b.localeCompare(a));

    const handleDelete = async () => {
        if (!confirmDelete) return;
        setDeleting(true);
        try {
            await deleteStudentList.mutateAsync(confirmDelete);
        } finally {
            setDeleting(false);
            setConfirmDelete(null);
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const fd = new FormData();
            fd.append('course', activeCourseId!.toString());
            fd.append('session_year', form.session_year);
            fd.append('year_of_study', form.year_of_study);
            if (pdfFile) fd.append('file', pdfFile);
            await addStudentList.mutateAsync(fd);
            setShowModal(false);
            setForm(INITIAL_FORM);
            setPdfFile(null);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Student Directory Rosters</h1>
                    {isEditMode && (
                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow">
                            ✏️ Editing Structure
                        </span>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-8 mt-4">
                    {/* Course Sidebar selector */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-2">
                        <h3 className="font-semibold text-gray-700 uppercase tracking-wider text-xs mb-3">Filter by Course</h3>
                        {coursesLoading ? (
                            <div className="h-40 bg-gray-200 animate-pulse rounded-lg" />
                        ) : (
                            <div className="flex flex-col space-y-1">
                                {courses.map((course: ApiCourse) => (
                                    <button
                                        key={course.id}
                                        onClick={() => setSearchParams({ course: course.id.toString() })}
                                        className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors border ${activeCourseId === course.id ? 'bg-[#153D6A] text-white shadow-md border-[#153D6A]' : 'bg-white text-gray-700 hover:bg-blue-50 border-gray-200'}`}
                                    >
                                        {course.name} ({course.degree})
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Roster Area */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                            <div className="flex flex-col justify-between items-start mb-8 border-b pb-4">
                                <h2 className="text-2xl font-bold text-[#153D6A]">
                                    {activeCourse ? `${activeCourse.name} Student Lists` : 'Select a Course'}
                                </h2>
                                <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-relaxed">
                                    Browse the official PDF rosters of students categorized by their academic tenure and enrolled degree program.
                                </p>
                            </div>

                            {listsLoading ? (
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="bg-gray-100 rounded-xl h-24 animate-pulse" />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {sortedSessions.map((session) => (
                                        <div key={session} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                            <button 
                                              onClick={() => toggleSession(session)} 
                                              className="w-full bg-gray-50 flex items-center justify-between px-6 py-4 hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Folder className="text-[#153D6A]" size={22} fill="currentColor" fillOpacity={0.2} />
                                                    <h3 className="text-xl font-bold text-gray-800">Academic Year <span className="text-[#153D6A]">{session}</span></h3>
                                                </div>
                                                <ChevronDown 
                                                  className={`text-gray-500 transition-transform ${openSessions[session] ? 'rotate-180' : ''}`} 
                                                />
                                            </button>
                                            
                                            {openSessions[session] && (
                                                <div className="bg-white divide-y divide-gray-100">
                                                    {groupedBySession[session].map((list) => (
                                                        <div key={list.id} className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/50 transition-colors group">
                                                            <div className="flex flex-col">
                                                                <span className="font-semibold text-gray-700 text-base">{list.year_of_study}</span>
                                                                <span className="text-xs text-gray-400 mt-0.5">Uploaded {list.created_at ? new Date(list.created_at).toLocaleDateString() : 'recently'}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                {list.file_url && (
                                                                    <a 
                                                                        href={list.file_url} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                                                                    >
                                                                        <FileText size={16} /> View PDF
                                                                    </a>
                                                                )}
                                                                {isEditMode && (
                                                                    <button
                                                                        onClick={() => setConfirmDelete(list.id)}
                                                                        className="text-red-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                                                        title="Delete Roster"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {sortedSessions.length === 0 && (
                                        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <FileText size={48} className="mx-auto text-gray-300 mb-3" />
                                            <h3 className="text-gray-700 font-medium">No Rosters Available</h3>
                                            <p className="text-gray-400 text-sm mt-1">There are currently no student lists uploaded for this course.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            {activeCourseId && isEditMode && (
                                <div className="mt-8 border-t border-gray-100 pt-6">
                                    <AddItemButton label={`Upload PDF for ${activeCourse?.name || 'Class'}`} onClick={() => setShowModal(true)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <ConfirmDialog
                open={confirmDelete !== null}
                title="Delete Student Roster"
                message={`Are you sure you want to permanently delete this PDF upload?`}
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(null)}
                loading={deleting}
            />

            {/* Add Student List PDF Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-5 border-b pb-3">
                            <h2 className="text-lg font-bold text-gray-800">Upload Student Roster</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1.5 rounded-full">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Session / Enroll Year *</label>
                                <input 
                                  required 
                                  value={form.session_year} 
                                  onChange={e => setForm({ ...form, session_year: e.target.value })} 
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] focus:border-[#153D6A] focus:outline-none" 
                                  placeholder="e.g. 2024-2025 or 2025" 
                                />
                                <p className="text-xs text-gray-500 mt-1">This becomes the main group header.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Academic Progress *</label>
                                <select 
                                  value={form.year_of_study} 
                                  onChange={e => setForm({ ...form, year_of_study: e.target.value })} 
                                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] focus:outline-none"
                                >
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="All Years">All Years (Combined)</option>
                                </select>
                            </div>
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <FileText size={16} className="text-[#153D6A]" /> Roster File (PDF)
                                </label>
                                <input 
                                  type="file" 
                                  accept=".pdf" 
                                  onChange={e => setPdfFile(e.target.files?.[0] || null)} 
                                  className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-white file:border file:border-gray-200 file:text-[#153D6A] hover:file:bg-gray-50 cursor-pointer" 
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving || !pdfFile} className={`flex-1 flex justify-center py-2.5 px-4 rounded-xl text-white text-sm font-semibold transition-colors ${saving || !pdfFile ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#153D6A] hover:bg-[#1a4a7f]'}`}>
                                    {saving ? 'Uploading...' : 'Upload PDF Document'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
