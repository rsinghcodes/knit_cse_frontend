import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { BlockRenderer } from '~/components/cms/BlockRenderer';
import { seedCMSPages } from '~/utils/seedCMS';
import type { Page } from '~/types/cms';
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
    const [page, setPage] = useState<Page | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Seed CMS pages if not already done
        seedCMSPages();

        // Load alumni page from CMS
        const pagesRaw = localStorage.getItem('cms_pages');
        if (pagesRaw) {
            const pages: Page[] = JSON.parse(pagesRaw);
            const alumniPage = pages.find(p => p.slug === 'our-alumni');

            if (alumniPage && alumniPage.status === 'published') {
                setPage(alumniPage);
            } else {
                console.error('Alumni page not found or not published');
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
                    <p className="text-gray-600 mb-6">The alumni page could not be loaded.</p>
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
