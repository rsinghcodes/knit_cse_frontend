import { Briefcase, GraduationCap, Linkedin } from 'lucide-react';
import type { Alumni } from '~/utils/useAlumni';

interface AlumniCardProps {
    alumni: Alumni;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group">
            {/* Header with Company Initial */}
            <div className="bg-gradient-to-br from-[#153D6A] to-[#1a4a7f] h-24 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-[#153D6A]">
                        {alumni.company.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Alumni Info */}
            <div className="p-5">
                {/* Name */}
                <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">
                    {alumni.name}
                </h3>

                {/* Batch */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
                    <GraduationCap size={16} className="text-[#153D6A]" />
                    <span>Batch: {alumni.batch}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                {/* Company & Designation */}
                <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                        <Briefcase size={16} className="text-[#153D6A] mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {alumni.company}
                            </p>
                            <p className="text-xs text-gray-600">{alumni.designation}</p>
                        </div>
                    </div>
                </div>

                {/* LinkedIn Link */}
                <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#0077B5] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#006399] transition-colors duration-200 shadow-sm"
                >
                    <Linkedin size={16} />
                    View LinkedIn Profile
                </a>
            </div>
        </div>
    );
};

export default AlumniCard;
