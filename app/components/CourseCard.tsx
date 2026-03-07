'use client';

import {
    Award, BookOpen, Briefcase, ChevronDown, ChevronUp, Clock, GraduationCap, Users, Plus, Trash2, X, Check
} from 'lucide-react';
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

type TabType = 'highlights' | 'eligibility' | 'curriculum' | 'career';

const CourseCard: React.FC<CourseCardProps> = ({ course, onUpdateField, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('highlights');
    const { isEditMode } = useEditMode();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // UI state for adding new items to JSON arrays
    const [newItemText, setNewItemText] = useState('');
    const [showAddItem, setShowAddItem] = useState<TabType | null>(null);

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
                            { key: 'eligibility', label: 'Eligibility', icon: GraduationCap },
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

                        {activeTab === 'eligibility' && (
                            <div className="space-y-4">
                                <ul className="space-y-3">
                                    {(course.eligibility || []).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-700 group">
                                            <span className="text-green-600 mt-1 shrink-0 bg-green-50 p-1 rounded-full"><Check size={14} /></span>
                                            <div className="flex-1">
                                                <EditableText
                                                    tag="p"
                                                    value={item}
                                                    onSave={(v) => handleEditItemInArray('eligibility', index, v)}
                                                    className="text-sm font-medium leading-relaxed"
                                                />
                                            </div>
                                            {isEditMode && (
                                                <button onClick={() => handleRemoveItemFromArray('eligibility', index)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity p-1">
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                {isEditMode && (
                                    <div className="pt-2">
                                        {showAddItem === 'eligibility' ? (
                                            <div className="flex gap-2 items-center bg-blue-50 p-2 rounded-md border border-blue-200">
                                                <input
                                                    autoFocus
                                                    value={newItemText}
                                                    onChange={e => setNewItemText(e.target.value)}
                                                    className="flex-1 border rounded px-2 py-1.5 text-sm"
                                                    placeholder="New eligibility criteria..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleAddItemToArray('eligibility');
                                                        if (e.key === 'Escape') { setShowAddItem(null); setNewItemText(''); }
                                                    }}
                                                />
                                                <button onClick={() => handleAddItemToArray('eligibility')} className="bg-green-600 text-white p-1.5 rounded"><Check size={16} /></button>
                                                <button onClick={() => { setShowAddItem(null); setNewItemText(''); }} className="bg-gray-400 text-white p-1.5 rounded"><X size={16} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setShowAddItem('eligibility')} className="text-[#153D6A] text-sm font-semibold flex items-center gap-1 hover:text-blue-800">
                                                <Plus size={14} /> Add Eligibility Criteria
                                            </button>
                                        )}
                                    </div>
                                )}
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
                    <div className="p-6 pt-0 flex gap-4 mt-2">
                        <Button className="flex-1 bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] hover:from-[#1a4a7f] hover:to-[#225b9c] text-white shadow-md font-bold py-5 text-base rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5">
                            Apply for {course.degree}
                        </Button>
                        <Button variant="outline" className="flex-1 border-2 border-[#153D6A] text-[#153D6A] hover:bg-blue-50 font-bold py-5 text-base rounded-xl transition-all">
                            Download Brochure
                        </Button>
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
