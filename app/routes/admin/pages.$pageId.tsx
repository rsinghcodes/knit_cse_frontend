import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePages, generateSlug } from '~/utils/usePages';
import {
    Save,
    Eye,
    ArrowLeft,
    Plus,
    Trash2,
    GripVertical,
} from 'lucide-react';
import type { Page, ContentBlock, BlockType, PageStatus, PageTemplate } from '~/types/cms';
import { StatsBlockEditor } from '~/components/cms/editors/StatsBlockEditor';
import { AccordionBlockEditor } from '~/components/cms/editors/AccordionBlockEditor';
import { QuoteBlockEditor } from '~/components/cms/editors/QuoteBlockEditor';

export default function PageEditor() {
    const { pageId } = useParams();
    const navigate = useNavigate();
    const { getPageById, updatePage, isUpdating } = usePages();

    const [page, setPage] = useState<Page | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [showBlockMenu, setShowBlockMenu] = useState(false);

    useEffect(() => {
        if (pageId) {
            const loadedPage = getPageById(pageId);
            if (loadedPage) {
                setPage(loadedPage);
            } else {
                alert('Page not found');
                navigate('/admin/pages');
            }
        }
    }, [pageId, getPageById, navigate]);

    const handleSave = async () => {
        if (!page) return;

        setIsSaving(true);
        try {
            await new Promise<void>((resolve, reject) => {
                updatePage(
                    { id: page.id, updates: page },
                    {
                        onSuccess: () => resolve(),
                        onError: reject,
                    }
                );
            });
            alert('Page saved successfully!');
        } catch (error) {
            alert('Failed to save page');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddBlock = (type: BlockType) => {
        if (!page) return;

        const newBlock: ContentBlock = {
            id: `block-${Date.now()}`,
            type,
            content: getDefaultBlockContent(type),
            settings: {
                visible: true,
            },
            order: page.blocks.length,
        };

        setPage({
            ...page,
            blocks: [...page.blocks, newBlock],
        });
        setShowBlockMenu(false); // Close menu after selection
    };

    const handleDeleteBlock = (blockId: string) => {
        if (!page) return;
        if (!confirm('Delete this block?')) return;

        setPage({
            ...page,
            blocks: page.blocks.filter((b) => b.id !== blockId),
        });
    };

    const handleUpdateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
        if (!page) return;

        setPage({
            ...page,
            blocks: page.blocks.map((block) =>
                block.id === blockId ? { ...block, ...updates } : block
            ),
        });
    };

    if (!page) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/pages')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">{page.title}</h1>
                        <p className="text-sm text-gray-600">/{page.slug}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {page.status === 'published' && (
                        <a
                            href={`/pages/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                            Preview
                        </a>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isUpdating}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Settings */}
                <div className="w-80 bg-white border-r overflow-y-auto p-6">
                    <h2 className="text-lg font-semibold mb-4">Page Settings</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input
                                type="text"
                                value={page.title}
                                onChange={(e) => {
                                    const newTitle = e.target.value;
                                    setPage({
                                        ...page,
                                        title: newTitle,
                                        slug: generateSlug(newTitle),
                                    });
                                }}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <div className="flex items-center gap-1">
                                <span className="text-gray-500 text-sm">/</span>
                                <input
                                    type="text"
                                    value={page.slug}
                                    onChange={(e) =>
                                        setPage({ ...page, slug: e.target.value })
                                    }
                                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                value={page.status}
                                onChange={(e) =>
                                    setPage({ ...page, status: e.target.value as PageStatus })
                                }
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Template</label>
                            <select
                                value={page.template}
                                onChange={(e) =>
                                    setPage({ ...page, template: e.target.value as PageTemplate })
                                }
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="default">Default</option>
                                <option value="full-width">Full Width</option>
                                <option value="sidebar">Sidebar</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>

                        <hr className="my-6" />

                        <h3 className="text-md font-semibold mb-3">SEO Settings</h3>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Meta Title
                            </label>
                            <input
                                type="text"
                                value={page.seo.metaTitle}
                                onChange={(e) =>
                                    setPage({
                                        ...page,
                                        seo: { ...page.seo, metaTitle: e.target.value },
                                    })
                                }
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Meta Description
                            </label>
                            <textarea
                                value={page.seo.metaDescription}
                                onChange={(e) =>
                                    setPage({
                                        ...page,
                                        seo: { ...page.seo, metaDescription: e.target.value },
                                    })
                                }
                                rows={3}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content - Blocks */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-4">Content Blocks</h2>

                            {/* Block Type Buttons */}
                            <div className="bg-white border rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600 mb-3">Add a new block:</p>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleAddBlock('hero')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        + Hero Section
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('text')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                    >
                                        + Text Content
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('image')}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                                    >
                                        + Image
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('cards')}
                                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                                    >
                                        + Card Grid
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('html')}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                    >
                                        + Custom HTML
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('faculty-grid')}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                                    >
                                        + Faculty Grid
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('course-list')}
                                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                                    >
                                        + Course List
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('alumni-grid')}
                                        className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-sm"
                                    >
                                        + Alumni Grid
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('stats')}
                                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                                    >
                                        + Stats/Counter
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('accordion')}
                                        className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm"
                                    >
                                        + Accordion/FAQ
                                    </button>
                                    <button
                                        onClick={() => handleAddBlock('quote')}
                                        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-sm"
                                    >
                                        + Quote/Testimonial
                                    </button>
                                </div>
                            </div>
                        </div>

                        {page.blocks.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed">
                                <p className="text-gray-500 mb-4">No blocks yet</p>
                                <p className="text-sm text-gray-400">
                                    Click one of the buttons above to add your first block
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {[...page.blocks]
                                    .sort((a, b) => a.order - b.order)
                                    .map((block, index) => (
                                        <BlockEditor
                                            key={block.id}
                                            block={block}
                                            onUpdate={(updates) => handleUpdateBlock(block.id, updates)}
                                            onDelete={() => handleDeleteBlock(block.id)}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Block Editor Component
interface BlockEditorProps {
    block: ContentBlock;
    onUpdate: (updates: Partial<ContentBlock>) => void;
    onDelete: () => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const renderBlockSettings = () => {
        switch (block.type) {
            case 'hero':
                return (
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Heading"
                            value={block.content.heading || ''}
                            onChange={(e) =>
                                onUpdate({ content: { ...block.content, heading: e.target.value } })
                            }
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Subheading"
                            value={block.content.subheading || ''}
                            onChange={(e) =>
                                onUpdate({ content: { ...block.content, subheading: e.target.value } })
                            }
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            placeholder="Description"
                            value={block.content.description || ''}
                            onChange={(e) =>
                                onUpdate({ content: { ...block.content, description: e.target.value } })
                            }
                            rows={3}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                );
            case 'text':
                return (
                    <textarea
                        placeholder="Enter your text content here..."
                        value={block.content.content || ''}
                        onChange={(e) =>
                            onUpdate({ content: { ...block.content, content: e.target.value } })
                        }
                        rows={6}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                );
            case 'image':
                return (
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={block.content.src || ''}
                            onChange={(e) =>
                                onUpdate({ content: { ...block.content, src: e.target.value } })
                            }
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Alt text"
                            value={block.content.alt || ''}
                            onChange={(e) =>
                                onUpdate({ content: { ...block.content, alt: e.target.value } })
                            }
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                );
            case 'html':
                return (
                    <textarea
                        placeholder="Enter HTML content..."
                        value={block.content.html || ''}
                        onChange={(e) =>
                            onUpdate({ content: { ...block.content, html: e.target.value } })
                        }
                        rows={8}
                        className="w-full px-3 py-2 border rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                );
            case 'stats':
                return (
                    <StatsBlockEditor
                        content={block.content}
                        onChange={(newContent) => onUpdate({ content: newContent })}
                    />
                );
            case 'accordion':
                return (
                    <AccordionBlockEditor
                        content={block.content}
                        onChange={(newContent) => onUpdate({ content: newContent })}
                    />
                );
            case 'quote':
                return (
                    <QuoteBlockEditor
                        content={block.content}
                        onChange={(newContent) => onUpdate({ content: newContent })}
                    />
                );
            default:
                return <p className="text-gray-500 text-sm">Block editor not implemented</p>;
        }
    };

    return (
        <div className="bg-white border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="font-medium text-sm"
                    >
                        {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={block.settings.visible}
                            onChange={(e) =>
                                onUpdate({
                                    settings: { ...block.settings, visible: e.target.checked },
                                })
                            }
                            className="rounded"
                        />
                        <span className="text-sm">Visible</span>
                    </label>
                    <button
                        onClick={onDelete}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {isExpanded && <div className="p-4">{renderBlockSettings()}</div>}
        </div>
    );
};

// Helper function to get default content for new blocks
function getDefaultBlockContent(type: BlockType): Record<string, any> {
    switch (type) {
        case 'hero':
            return {
                heading: 'Welcome',
                subheading: '',
                description: '',
                alignment: 'center',
            };
        case 'text':
            return {
                content: '<p>Enter your text here...</p>',
                alignment: 'left',
            };
        case 'image':
            return {
                src: '',
                alt: '',
                alignment: 'center',
            };
        case 'cards':
            return {
                title: '',
                cards: [],
                columns: 3,
                cardStyle: 'default',
            };
        case 'html':
            return {
                html: '',
            };
        case 'faculty-grid':
            return {
                title: 'Our Faculty',
                department: '',
                members: [],
                columns: 3,
                showEmail: true,
                showPhone: false,
            };
        case 'course-list':
            return {
                title: 'Courses',
                courses: [],
                showCredits: true,
                showSemester: true,
                collapsible: false,
            };
        case 'alumni-grid':
            return {
                title: 'Our Alumni',
                profiles: [],
                columns: 3,
                showCompany: true,
                showTestimonial: true,
            };
        case 'stats':
            return {
                title: 'By the Numbers',
                stats: [
                    {
                        id: 'stat-1',
                        value: '100',
                        suffix: '%',
                        label: 'Placement Rate',
                        description: 'Students placed in top companies',
                        icon: 'trending-up',
                        order: 0,
                    },
                    {
                        id: 'stat-2',
                        value: '500',
                        suffix: '+',
                        label: 'Alumni Network',
                        description: 'Successful graduates worldwide',
                        icon: 'users',
                        order: 1,
                    },
                    {
                        id: 'stat-3',
                        value: '25',
                        suffix: '+',
                        label: 'Industry Partners',
                        icon: 'award',
                        order: 2,
                    },
                ],
                columns: 3,
                backgroundColor: '#f9fafb',
                animateOnScroll: true,
            };
        case 'accordion':
            return {
                title: 'Frequently Asked Questions',
                items: [
                    {
                        id: 'faq-1',
                        question: 'What is the admission process?',
                        answer: 'The admission process includes filling out an application form, submitting required documents, and appearing for an entrance exam. Selected candidates will be invited for counseling.',
                        order: 0,
                        defaultOpen: true,
                    },
                    {
                        id: 'faq-2',
                        question: 'What are the eligibility criteria?',
                        answer: 'Candidates must have passed 10+2 with Mathematics and Physics as compulsory subjects along with Chemistry/Computer Science/Biology. A minimum of 60% marks is required.',
                        order: 1,
                        defaultOpen: false,
                    },
                    {
                        id: 'faq-3',
                        question: 'What is the course duration?',
                        answer: 'The B.Tech program is 4 years (8 semesters) and the MCA program is 2 years (4 semesters).',
                        order: 2,
                        defaultOpen: false,
                    },
                    {
                        id: 'faq-4',
                        question: 'Are scholarships available?',
                        answer: 'Yes, we offer merit-based scholarships and financial assistance to deserving students. Please visit the admission office for more details.',
                        order: 3,
                        defaultOpen: false,
                    },
                ],
                allowMultiple: false,
                searchable: true,
            };
        case 'quote':
            return {
                quotes: [
                    {
                        id: 'quote-1',
                        text: 'The faculty and infrastructure at KNIT CSE Department are exceptional. The industry-oriented curriculum helped me land my dream job at Google.',
                        author: 'Rahul Sharma',
                        authorTitle: 'Software Engineer at Google, Batch 2020',
                        rating: 5,
                        order: 0,
                    },
                    {
                        id: 'quote-2',
                        text: 'I am grateful for the mentorship and guidance I received during my time here. The coding culture and competitive programming environment prepared me well for the industry.',
                        author: 'Priya Singh',
                        authorTitle: 'SDE at Amazon, Batch 2021',
                        rating: 5,
                        order: 1,
                    },
                    {
                        id: 'quote-3',
                        text: 'Best decision of my academic career. The department focuses on both theoretical knowledge and practical implementation, which is crucial for success.',
                        author: 'Amit Kumar',
                        authorTitle: 'Data Scientist at Microsoft, Batch 2019',
                        rating: 5,
                        order: 2,
                    },
                ],
                layout: 'card',
                showCarousel: false,
                backgroundColor: '#f9fafb',
            };
        default:
            return {};
    }
}
