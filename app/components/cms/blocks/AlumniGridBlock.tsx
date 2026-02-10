import type { AlumniGridBlockContent } from '~/types/cms';
import { Briefcase, MapPin, Linkedin, Quote } from 'lucide-react';

interface AlumniGridBlockProps {
    content: AlumniGridBlockContent;
}

export const AlumniGridBlock: React.FC<AlumniGridBlockProps> = ({ content }) => {
    const { title, profiles, columns = 3, showCompany, showTestimonial } = content;

    const sortedProfiles = [...profiles].sort((a, b) => a.order - b.order);

    const gridClasses = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {title && (
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                        <div className="w-24 h-1 bg-primary rounded-full" />
                    </div>
                )}

                <div className={`grid grid-cols-1 ${gridClasses[columns]} gap-6`}>
                    {sortedProfiles.map((profile) => (
                        <div
                            key={profile.id}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {profile.photo && (
                                <div className="aspect-square w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={profile.photo}
                                        alt={profile.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {profile.name}
                                </h3>

                                <p className="text-sm text-blue-600 font-medium mb-2">
                                    {profile.degree} • Batch {profile.batch}
                                </p>

                                {showCompany && (profile.company || profile.position) && (
                                    <div className="mb-3 space-y-1">
                                        {profile.position && (
                                            <div className="flex items-start gap-2 text-sm text-gray-700">
                                                <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                <span>{profile.position}</span>
                                            </div>
                                        )}
                                        {profile.company && (
                                            <div className="text-sm text-gray-600 pl-6">
                                                at <span className="font-medium">{profile.company}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {profile.location && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        <MapPin className="w-4 h-4" />
                                        <span>{profile.location}</span>
                                    </div>
                                )}

                                {showTestimonial && profile.testimonial && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <Quote className="w-4 h-4 text-gray-400 mb-1" />
                                        <p className="text-sm text-gray-600 italic line-clamp-3">
                                            "{profile.testimonial}"
                                        </p>
                                    </div>
                                )}

                                {profile.linkedin && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <a
                                            href={profile.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span>Connect on LinkedIn</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
