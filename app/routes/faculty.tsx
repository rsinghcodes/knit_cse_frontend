import Footer from '~/components/Footer';
import Header from '~/components/Header';
import FacultyCard from '~/components/FacultyCard';
import { cseFaculty, mcaFaculty } from '~/utils/data';
import type { Route } from './+types/faculty';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Faculty | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Meet our distinguished faculty members from the Computer Science & Engineering and MCA departments at KNIT Sultanpur.',
        },
    ];
}

export default function Faculty() {
    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Faculty Members</h1>

                <h2 className="text-2xl font-semibold text-blue-800 mb-4">CSE Department</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    {cseFaculty.map((faculty) => (
                        <FacultyCard key={faculty.name} faculty={faculty} />
                    ))}
                </div>

                <h2 className="text-2xl font-semibold text-blue-800 mb-4">MCA Department</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {mcaFaculty.map((faculty) => (
                        <FacultyCard key={faculty.name} faculty={faculty} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
