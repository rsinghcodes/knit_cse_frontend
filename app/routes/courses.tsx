import Footer from '~/components/Footer';
import Header from '~/components/Header';
import CourseCard from '~/components/CourseCard';
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
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Courses Offered</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
