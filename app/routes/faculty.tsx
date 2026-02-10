import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { BlockRenderer } from '~/components/cms/BlockRenderer';
import { seedCMSPages } from '~/utils/seedCMS';
import type { Page } from '~/types/cms';
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
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Seed CMS pages if not already done
        seedCMSPages();

        // Load faculty page from CMS
        const pagesRaw = localStorage.getItem('cms_pages');
        if (pagesRaw) {
            const pages: Page[] = JSON.parse(pagesRaw);
            const facultyPage = pages.find(p => p.slug === 'faculty');

            if (facultyPage && facultyPage.status === 'published') {
                setPage(facultyPage);
            } else {
                console.error('Faculty page not found or not published');
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="font-sans bg-white min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!page) {
        return (
            <div className="font-sans bg-white min-h-screen">
                <Header />
                <div className="container mx-auto px-4 py-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                    <p className="text-gray-600 mb-6">The faculty page could not be loaded.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Go Home
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    // Sort blocks by order
    const sortedBlocks = [...page.blocks]
        .filter(block => block.settings.visible)
        .sort((a, b) => a.order - b.order);

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />

            {/* Render all blocks */}
            {sortedBlocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
            ))}

            <Footer />
        </div>
    );
}
