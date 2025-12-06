import FacultyCard from '~/components/FacultyCard';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
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

            {/* Page Header */}
            <div className="bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Faculty</h1>
                    <p className="text-lg md:text-xl text-blue-100">
                        Department of Computer Science & Engineering
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* CSE Faculty Section */}
                <section className="mb-16">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Computer Science & Engineering
                        </h2>
                        <div className="w-24 h-1 bg-[#153D6A] rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cseFaculty.map((faculty, index) => (
                            <FacultyCard key={index} faculty={faculty} />
                        ))}
                    </div>
                </section>

                {/* MCA Faculty Section */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Master of Computer Applications (MCA)
                        </h2>
                        <div className="w-24 h-1 bg-[#153D6A] rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {mcaFaculty.map((faculty, index) => (
                            <FacultyCard key={index} faculty={faculty} />
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
