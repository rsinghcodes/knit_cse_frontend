import type { CourseListBlockContent } from '~/types/cms';
import { BookOpen, FileText } from 'lucide-react';
import { useState } from 'react';

interface CourseListBlockProps {
    content: CourseListBlockContent;
}

export const CourseListBlock: React.FC<CourseListBlockProps> = ({ content }) => {
    const { title, courses, showCredits, showSemester, collapsible } = content;
    const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

    const sortedCourses = [...courses].sort((a, b) => a.order - b.order);

    const toggleCourse = (courseId: string) => {
        const newExpanded = new Set(expandedCourses);
        if (newExpanded.has(courseId)) {
            newExpanded.delete(courseId);
        } else {
            newExpanded.add(courseId);
        }
        setExpandedCourses(newExpanded);
    };

    return (
        <section className="py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {title && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
                        <div className="w-20 h-1 bg-primary rounded-full" />
                    </div>
                )}

                <div className="space-y-2">
                    {sortedCourses.map((course) => {
                        const isExpanded = expandedCourses.has(course.id);

                        return (
                            <div
                                key={course.id}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div
                                    className={`p-4 ${collapsible ? 'cursor-pointer' : ''}`}
                                    onClick={() => collapsible && toggleCourse(course.id)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 flex-1">
                                            <BookOpen className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-baseline gap-2 flex-wrap">
                                                    <h3 className="font-semibold text-gray-900">
                                                        {course.name}
                                                    </h3>
                                                    <span className="text-sm font-mono text-gray-500">
                                                        ({course.code})
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                                    {showCredits && (
                                                        <span className="flex items-center gap-1">
                                                            <strong>Credits:</strong> {course.credits}
                                                        </span>
                                                    )}

                                                    {showSemester && course.semester && (
                                                        <span className="flex items-center gap-1">
                                                            <strong>Semester:</strong> {course.semester}
                                                        </span>
                                                    )}

                                                    {course.type && (
                                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${course.type === 'core' ? 'bg-blue-100 text-blue-700' :
                                                                course.type === 'elective' ? 'bg-green-100 text-green-700' :
                                                                    'bg-purple-100 text-purple-700'
                                                            }`}>
                                                            {course.type.toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {course.syllabus && (
                                            <a
                                                href={course.syllabus}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Syllabus
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
