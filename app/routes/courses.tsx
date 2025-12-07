import CourseCard from '~/components/CourseCard';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { courses } from '~/utils/data';
import type { Route } from './+types/courses';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Courses Offered | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Explore academic programs offered by the Department of Computer Science & Engineering, KNIT Sultanpur. B.Tech CSE and MCA programs with excellent placement records.',
        },
    ];
}

export default function Courses() {
    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        Courses Offered
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100">
                        Academic programs designed for excellence in Computer Science
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* Introduction */}
                <div className="mb-10 max-w-3xl">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        The Department of Computer Science & Engineering at KNIT Sultanpur
                        offers industry-oriented programs that combine theoretical knowledge
                        with practical skills. Our curriculum is regularly updated to match
                        industry requirements and emerging technologies.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        With experienced faculty, state-of-the-art labs, and strong industry
                        connections, we prepare students for successful careers in the tech
                        industry.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-[#153D6A] mb-2">
                            {courses.length}
                        </div>
                        <div className="text-sm text-gray-600">Programs Offered</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-[#153D6A] mb-2">
                            {courses.reduce(
                                (sum, course) => sum + parseInt(course.intake),
                                0
                            )}
                        </div>
                        <div className="text-sm text-gray-600">Total Seats</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <div className="text-3xl font-bold text-[#153D6A] mb-2">100%</div>
                        <div className="text-sm text-gray-600">AICTE Approved</div>
                    </div>
                </div>

                {/* Courses Grid */}
                <div className="space-y-6">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] rounded-lg p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-3">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Join KNIT CSE Department and build a successful career in technology.
                        Get in touch with us for admissions and more information.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="#"
                            className="bg-white text-[#153D6A] px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                        >
                            Apply for Admission
                        </a>
                        <a
                            href="#"
                            className="border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                        >
                            Download Brochure
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
