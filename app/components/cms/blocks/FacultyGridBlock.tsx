import type { FacultyGridBlockContent } from '~/types/cms';
import { Mail, Phone, Award } from 'lucide-react';

interface FacultyGridBlockProps {
    content: FacultyGridBlockContent;
}

export const FacultyGridBlock: React.FC<FacultyGridBlockProps> = ({ content }) => {
    const { title, department, members, columns = 3, showEmail, showPhone } = content;

    const sortedMembers = [...members].sort((a, b) => a.order - b.order);

    const gridClasses = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {(title || department) && (
                    <div className="mb-8">
                        {title && (
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                        )}
                        {department && (
                            <p className="text-lg text-gray-600">{department}</p>
                        )}
                        <div className="w-24 h-1 bg-primary rounded-full mt-2" />
                    </div>
                )}

                <div className={`grid grid-cols-1 ${gridClasses[columns]} gap-6`}>
                    {sortedMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {member.photo && (
                                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {member.name}
                                </h3>

                                <p className="text-sm text-blue-600 font-medium mb-3">
                                    {member.designation}
                                </p>

                                {member.qualification && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                        <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>{member.qualification}</span>
                                    </div>
                                )}

                                {member.specialization && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Specialization:</span> {member.specialization}
                                    </p>
                                )}

                                {member.experience && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Experience:</span> {member.experience}
                                    </p>
                                )}

                                <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                                    {showEmail && member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span className="truncate">{member.email}</span>
                                        </a>
                                    )}

                                    {showPhone && member.phone && (
                                        <a
                                            href={`tel:${member.phone}`}
                                            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>{member.phone}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
