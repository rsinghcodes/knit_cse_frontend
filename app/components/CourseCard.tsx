'use client';

import {
    Award, BookOpen, Briefcase, ChevronDown, ChevronUp, Clock, GraduationCap, Users, Plus, Trash2, X, Check, CalendarDays, Calendar, FileText, Upload
} from 'lucide-react';
import { useRef } from 'react';
import { useCoursesApi } from '~/utils/api/useCoursesApi';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import type { ApiCourse } from '~/utils/api/useCoursesApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableText from '~/components/admin/EditableText';
import ConfirmDialog from '~/components/admin/ConfirmDialog';

interface CourseCardProps {
    course: ApiCourse;
    onUpdateField: (id: number, field: string, value: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

type TabType = 'highlights' | 'schedules' | 'curriculum' | 'career';

const CourseCard: React.FC<CourseCardProps> = ({ course, onUpdateField, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('highlights');
    const { isEditMode } = useEditMode();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // UI state for adding new items to JSON arrays

    const [newItemText, setNewItemText] = useState('');
    const [showAddItem, setShowAddItem] = useState<TabType | null>(null);

    const { uploadFile, deleteFile, uploadBrochure, deleteBrochure } = useCoursesApi();
    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const handleFileUpload = async (type: 'timetable' | 'syllabus', year: string, file: File) => {
        await uploadFile.mutateAsync({ type, courseId: course.id, year, file });
    };

    const handleDeleteFile = async (type: 'timetable' | 'syllabus', id: number) => {
        await deleteFile.mutateAsync({ type, id });
    };


    const handleUpdateArray = async (field: 'highlights' | 'eligibility' | 'career_prospects', newArray: string[]) => {
        await onUpdateField(course.id, field, newArray);
    };

    const handleAddItemToArray = async (field: 'highlights' | 'eligibility' | 'career_prospects') => {
        if (!newItemText.trim()) return;
        const currentArr = Array.isArray(course[field]) ? course[field] : [];
        await handleUpdateArray(field, [...currentArr, newItemText.trim()]);
        setNewItemText('');
        setShowAddItem(null);
    };

    const handleRemoveItemFromArray = async (field: 'highlights' | 'eligibility' | 'career_prospects', index: number) => {
        const currentArr = Array.isArray(course[field]) ? course[field] : [];
        const newArr = currentArr.filter((_, i) => i !== index);
        await handleUpdateArray(field, newArr);
    };

    const handleEditItemInArray = async (field: 'highlights' | 'eligibility' | 'career_prospects', index: number, newValue: string) => {
        const currentArr = Array.isArray(course[field]) ? course[field] : [];
        const newArr = [...currentArr];
        newArr[index] = newValue;
        await handleUpdateArray(field, newArr);
    };

    return (
        <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border overflow-hidden relative ${isEditMode ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'
            }`}>
            {isEditMode && (
                <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            )}

            {/* Card Header */}
            <div className={`bg-gradient-to-r ${isEditMode ? 'from-blue-700 to-blue-900 border-b border-blue-400' : 'from-[#153D6A] to-[#1a4a7f]'} p-6 py-8 text-white pr-16`}>
                <div className="flex-1">
                    <EditableText
                        tag="h3"
                        value={course.name}
                        onSave={(v) => onUpdateField(course.id, 'name', v)}
                        className="text-2xl font-bold mb-3"
                        multiline
                    />
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium">
                        <EditableText
                            tag="span"
                            value={course.degree}
                            onSave={(v) => onUpdateField(course.id, 'degree', v)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-6 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-200" />
                        <span className="text-sm font-medium">Duration:</span>
                        <EditableText
                            tag="span"
                            value={course.duration}
                            onSave={(v) => onUpdateField(course.id, 'duration', v)}
                            className="text-sm border-b border-white/30 hover:border-white transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-blue-200" />
                        <span className="text-sm font-medium">Intake:</span>
                        <EditableText
                            tag="span"
                            value={course.intake}
                            onSave={(v) => onUpdateField(course.id, 'intake', v)}
                            className="text-sm border-b border-white/30 hover:border-white transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Expand/Collapse Button */}
            <div className="p-4 bg-gray-50 border-b">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between text-[#153D6A] font-bold hover:text-[#1a4a7f] transition-colors"
                >
                    <span>{isExpanded ? 'Hide Full Details' : 'View Full Details & Curriculum'}</span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="border-t bg-white">
                    {/* Tabs */}
                    <div className="flex border-b overflow-x-auto bg-gray-50/50">
                        {[
                            { key: 'highlights', label: 'Highlights', icon: Award },
                            { key: 'schedules', label: 'Schedules', icon: CalendarDays },
                            { key: 'curriculum', label: 'Curriculum', icon: BookOpen },
                            { key: 'career', label: 'Career Paths', icon: Briefcase },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key as TabType)}
                                className={`flex-1 min-w-fit px-4 py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2 border-b-2 ${activeTab === key
                                    ? 'border-[#153D6A] text-[#153D6A] bg-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={16} className={activeTab === key ? 'text-[#153D6A]' : 'text-gray-400'} />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'highlights' && (
                            <div className="space-y-4">
                                <ul className="space-y-3">
                                    {(course.highlights || []).map((highlight, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-700 group">
                                            <span className="text-[#153D6A] mt-1 shrink-0 bg-blue-50 p-1 rounded-full"><Award size={14} /></span>
                                            <div className="flex-1">
                                                <EditableText
                                                    tag="p"
                                                    value={highlight}
                                                    onSave={(v) => handleEditItemInArray('highlights', index, v)}
                                                    className="text-sm font-medium"
                                                />
                                            </div>
                                            {isEditMode && (
                                                <button onClick={() => handleRemoveItemFromArray('highlights', index)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {isEditMode && (
                                    <div className="pt-2">
                                        {showAddItem === 'highlights' ? (
                                            <div className="flex gap-2 items-center bg-blue-50 p-2 rounded-md border border-blue-200">
                                                <input
                                                    autoFocus
                                                    value={newItemText}
                                                    onChange={e => setNewItemText(e.target.value)}
                                                    className="flex-1 border rounded px-2 py-1.5 text-sm"
                                                    placeholder="New highlight..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleAddItemToArray('highlights');
                                                        if (e.key === 'Escape') { setShowAddItem(null); setNewItemText(''); }
                                                    }}
                                                />
                                                <button onClick={() => handleAddItemToArray('highlights')} className="bg-green-600 text-white p-1.5 rounded"><Check size={16} /></button>
                                                <button onClick={() => { setShowAddItem(null); setNewItemText(''); }} className="bg-gray-400 text-white p-1.5 rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setShowAddItem('highlights')} className="text-[#153D6A] text-sm font-semibold flex items-center gap-1 hover:text-blue-800">
                                                <Plus size={14} /> Add Highlight
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'schedules' && (
                            <div className="space-y-6">
                                {(() => {
                                    const durationMatch = course.duration.match(/\d+/);
                                    const yearsCount = durationMatch ? parseInt(durationMatch[0], 10) : 4;
                                    return Array.from({ length: yearsCount }, (_, i) => i + 1);
                                })().map(yearNum => {
                                    const yearStr = `Year ${yearNum}`;
                                    const timetable = course.timetables?.find(t => t.year === yearStr);
                                    const syllabus = course.syllabuses?.find(s => s.year === yearStr);
                                    
                                    return (
                                        <div key={yearNum} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h4 className="font-bold text-[#153D6A] mb-3 text-lg">{yearStr}</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Timetable Section */}
                                                <div className="flex flex-col gap-2 p-3 bg-white rounded border border-gray-100 shadow-sm">
                                                    <span className="text-sm font-semibold flex items-center gap-2"><Calendar size={16} className="text-blue-500" /> Timetable</span>
                                                    {timetable ? (
                                                        <div className="flex items-center justify-between">
                                                            <a href={timetable.file_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                                                <FileText size={14} /> View File
                                                            </a>
                                                            {isEditMode && (
                                                                <button onClick={() => handleDeleteFile('timetable', timetable.id)} className="text-red-500 hover:text-red-700 p-1">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-gray-400 italic">Not uploaded</div>
                                                    )}
                                                    {isEditMode && !timetable && (
                                                        <div className="mt-2">
                                                            <input 
                                                                type="file" 
                                                                accept="application/pdf"
                                                                className="hidden" 
                                                                ref={el => { fileInputRefs.current[`tt_${yearStr}`] = el; }}
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) handleFileUpload('timetable', yearStr, file);
                                                                    e.target.value = '';
                                                                }}
                                                            />
                                                            <Button variant="outline" size="sm" onClick={() => fileInputRefs.current[`tt_${yearStr}`]?.click()} className="w-full text-xs h-8">
                                                                <Upload size={14} className="mr-1" /> Upload
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Syllabus Section */}
                                                <div className="flex flex-col gap-2 p-3 bg-white rounded border border-gray-100 shadow-sm">
                                                    <span className="text-sm font-semibold flex items-center gap-2"><BookOpen size={16} className="text-green-500" /> Syllabus</span>
                                                    {syllabus ? (
                                                        <div className="flex items-center justify-between">
                                                            <a href={syllabus.file_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                                                <FileText size={14} /> View File
                                                            </a>
                                                            {isEditMode && (
                                                                <button onClick={() => handleDeleteFile('syllabus', syllabus.id)} className="text-red-500 hover:text-red-700 p-1">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="text-sm text-gray-400 italic">Not uploaded</div>
                                                    )}
                                                    {isEditMode && !syllabus && (
                                                        <div className="mt-2">
                                                            <input 
                                                                type="file" 
                                                                accept="application/pdf"
                                                                className="hidden" 
                                                                ref={el => { fileInputRefs.current[`syl_${yearStr}`] = el; }}
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) handleFileUpload('syllabus', yearStr, file);
                                                                    e.target.value = '';
                                                                }}
                                                            />
                                                            <Button variant="outline" size="sm" onClick={() => fileInputRefs.current[`syl_${yearStr}`]?.click()} className="w-full text-xs h-8 text-green-700 border-green-200 hover:bg-green-50">
                                                                <Upload size={14} className="mr-1" /> Upload
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'curriculum' && (
                            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-[#153D6A] mb-3 flex items-center gap-2">
                                    <BookOpen size={18} /> Program Overview
                                </h4>
                                <EditableText
                                    tag="p"
                                    value={course.curriculum}
                                    multiline
                                    onSave={(v) => onUpdateField(course.id, 'curriculum', v)}
                                    className="text-sm text-gray-700 leading-relaxed font-medium"
                                />
                            </div>
                        )}

                        {activeTab === 'career' && (
                            <div className="space-y-4">
                                <p className="text-sm text-gray-600 font-medium mb-4 flex items-center gap-2">
                                    <span className="bg-green-100 text-green-700 p-1.5 rounded-full"><Briefcase size={14} /></span>
                                    Graduates can pursue careers as:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(course.career_prospects || []).map((career, index) => (
                                        <div key={index} className="flex flex-col group p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors relative">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#153D6A] font-bold">→</span>
                                                <div className="flex-1">
                                                    <EditableText
                                                        tag="span"
                                                        value={career}
                                                        onSave={(v) => handleEditItemInArray('career_prospects', index, v)}
                                                        className="text-sm font-semibold text-gray-800"
                                                    />
                                                </div>
                                            </div>
                                            {isEditMode && (
                                                <button onClick={() => handleRemoveItemFromArray('career_prospects', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-1">
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {isEditMode && (
                                    <div className="pt-2">
                                        {showAddItem === 'career' ? (
                                            <div className="flex gap-2 items-center bg-blue-50 p-2 rounded-md border border-blue-200">
                                                <input
                                                    autoFocus
                                                    value={newItemText}
                                                    onChange={e => setNewItemText(e.target.value)}
                                                    className="flex-1 border rounded px-2 py-1.5 text-sm"
                                                    placeholder="e.g. Software Engineer"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleAddItemToArray('career_prospects');
                                                        if (e.key === 'Escape') { setShowAddItem(null); setNewItemText(''); }
                                                    }}
                                                />
                                                <button onClick={() => handleAddItemToArray('career_prospects')} className="bg-green-600 text-white p-1.5 rounded"><Check size={16} /></button>
                                                <button onClick={() => { setShowAddItem(null); setNewItemText(''); }} className="bg-gray-400 text-white p-1.5 rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setShowAddItem('career')} className="text-[#153D6A] text-sm font-semibold flex items-center gap-1 hover:text-blue-800">
                                                <Plus size={14} /> Add Career Option
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 mt-2 space-y-3">
                        {course.brochure_url ? (
                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 border-2 border-[#153D6A] text-[#153D6A] hover:bg-blue-50 font-bold py-5 text-base rounded-xl transition-all" asChild>
                                    <a href={course.brochure_url} target="_blank" rel="noreferrer">
                                        Download Brochure
                                    </a>
                                </Button>
                                {isEditMode && (
                                    <Button variant="destructive" onClick={() => deleteBrochure.mutateAsync(course.id)} className="border-2 font-bold py-5 text-base rounded-xl flex items-center justify-center">
                                        <Trash2 size={18} />
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <>
                                {isEditMode ? (
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            ref={el => { fileInputRefs.current.brochure = el; }}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) uploadBrochure.mutateAsync({ id: course.id, file });
                                                e.target.value = '';
                                            }}
                                        />
                                        <Button 
                                            variant="outline" 
                                            className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 font-bold py-5 text-base rounded-xl transition-all border-dashed"
                                            onClick={() => fileInputRefs.current.brochure?.click()}
                                        >
                                            <Upload size={18} className="mr-2" /> Upload Brochure PDF
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-400 italic text-center p-3 border rounded border-gray-100 bg-gray-50">
                                        Brochure updating soon
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={showDeleteConfirm}
                title="Delete Course"
                message={`Are you sure you want to delete ${course.name}?`}
                onConfirm={async () => {
                    await onDelete(course.id);
                    setShowDeleteConfirm(false);
                }}
                onCancel={() => setShowDeleteConfirm(false)}
            />
        </div>
    );
};

export default CourseCard;
