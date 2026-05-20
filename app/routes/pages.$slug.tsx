import { useParams } from 'react-router';
import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default function DynamicPage() {
    const { slug } = useParams();

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Page "<span className="font-semibold">{slug}</span>" not found
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Go Home
                </a>
            </div>
            <Footer />
        </div>
    );
}

export function meta({ params }: any) {
    return [
        { title: 'Page Not Found | KNIT CSE' },
        { name: 'description', content: 'The requested page could not be found.' },
    ];
}
