import { FileText, User } from 'lucide-react';
import type { Faculty } from '~/utils/data';

interface FacultyCardProps {
    faculty: Faculty;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty }) => {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group">
            {/* Faculty Photo */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-gray-100 h-64">
                <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/images/placeholder-faculty.jpg';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Faculty Info */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                    {faculty.name}
                </h3>
                <p className="text-sm text-[#153D6A] font-medium mb-4">
                    {faculty.designation}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {faculty.resumeLink && (
                        <a
                            href={faculty.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#153D6A] text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-[#1a4a7f] transition-colors duration-200 shadow-sm"
                        >
                            <FileText size={16} />
                            Resume
                        </a>
                    )}
                    {faculty.profileLink && (
                        <a
                            href={faculty.profileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-[#153D6A] text-sm font-medium py-2.5 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                        >
                            <User size={16} />
                            Profile
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FacultyCard;
