'use client';

import {
    Award,
    BookOpen,
    Briefcase,
    ChevronDown,
    ChevronUp,
    Clock,
    GraduationCap,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import type { Course } from '~/utils/data';

interface CourseCardProps {
    course: Course;
}

type TabType = 'eligibility' | 'highlights' | 'curriculum' | 'career';

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('highlights');

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] p-6 text-white">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                        <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                            {course.degree}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <Clock size={18} />
                        <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span className="text-sm">{course.intake}</span>
                    </div>
                </div>
            </div>

            {/* Expand/Collapse Button */}
            <div className="p-4 border-b">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between text-[#153D6A] font-medium hover:text-[#1a4a7f] transition-colors"
                >
                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
                <div className="border-t">
                    {/* Tabs */}
                    <div className="flex border-b overflow-x-auto">
                        {[
                            { key: 'highlights', label: 'Highlights', icon: Award },
                            { key: 'eligibility', label: 'Eligibility', icon: GraduationCap },
                            { key: 'curriculum', label: 'Curriculum', icon: BookOpen },
                            { key: 'career', label: 'Career', icon: Briefcase },
                        ].map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key as TabType)}
                                className={`flex-1 min-w-fit px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${activeTab === key
                                        ? 'bg-[#153D6A] text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'highlights' && (
                            <ul className="space-y-2">
                                {course.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-[#153D6A] mt-1">•</span>
                                        <span className="text-sm">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'eligibility' && (
                            <ul className="space-y-2">
                                {course.eligibility.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-[#153D6A] mt-1">✓</span>
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'curriculum' && (
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {course.curriculum}
                            </p>
                        )}

                        {activeTab === 'career' && (
                            <div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Graduates can pursue careers as:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {course.careerProspects.map((career, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded"
                                        >
                                            <span className="text-[#153D6A]">→</span>
                                            {career}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 flex gap-3">
                        <Button className="flex-1 bg-[#153D6A] hover:bg-[#1a4a7f]">
                            Apply Now
                        </Button>
                        <Button variant="outline" className="flex-1">
                            Enquire
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
