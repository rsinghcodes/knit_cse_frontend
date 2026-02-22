import Footer from '~/components/Footer';
import Header from '~/components/Header';
import AlumniCard from '~/components/AlumniCard';
import { useAlumni } from '~/utils/useAlumni';
import type { Route } from './+types/our-alumni';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Our Alumni | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Meet our successful alumni from the Department of Computer Science & Engineering, KNIT Sultanpur, working at top companies worldwide.',
        },
    ];
}

export default function OurAlumni() {
    const { alumni } = useAlumni();

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Alumni</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {alumni.map((alumnus) => (
                        <AlumniCard key={alumnus.id} alumni={alumnus} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
