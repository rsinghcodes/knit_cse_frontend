import { useParams } from 'react-router';
import { usePages } from '~/utils/usePages';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { BlockRenderer } from '~/components/cms/BlockRenderer';

export default function DynamicPage() {
    const { slug } = useParams();
    const { getPageBySlug, isLoading } = usePages();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading page...</p>
                </div>
            </div>
        );
    }

    const page = slug ? getPageBySlug(slug) : null;

    if (!page) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8">Page not found</p>
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

    // Apply template wrapper based on page template
    const renderContent = () => {
        const sortedBlocks = [...page.blocks].sort((a, b) => a.order - b.order);

        return (
            <div className="dynamic-page">
                {sortedBlocks.map((block) => (
                    block.settings.visible && (
                        <BlockRenderer key={block.id} block={block} />
                    )
                ))}
            </div>
        );
    };

    const renderWithTemplate = () => {
        switch (page.template) {
            case 'full-width':
                return <div className="w-full">{renderContent()}</div>;

            case 'sidebar':
                return (
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">{renderContent()}</div>
                            <aside className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold mb-4">Sidebar</h3>
                                {/* TODO: Add configurable sidebar content */}
                            </aside>
                        </div>
                    </div>
                );

            case 'default':
            default:
                return (
                    <div className="max-w-7xl mx-auto px-4 py-8">{renderContent()}</div>
                );
        }
    };

    return (
        <div className="font-sans bg-white">
            <Header />
            {renderWithTemplate()}
            <Footer />
        </div>
    );
}

export function meta({ params }: any) {
    // TODO: Load page data and return SEO meta tags
    return [
        { title: 'Page' },
        { name: 'description', content: 'Dynamic page content' },
    ];
}
