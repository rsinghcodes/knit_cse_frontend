import type { QuoteBlockContent, QuoteItem } from '~/types/cms';
import { Plus, Trash2, GripVertical, Star } from 'lucide-react';

interface QuoteBlockEditorProps {
    content: QuoteBlockContent;
    onChange: (content: QuoteBlockContent) => void;
}

const layoutOptions = [
    { value: 'card', label: 'Card Grid' },
    { value: 'centered', label: 'Centered' },
    { value: 'sidebar', label: 'Sidebar' },
];

export const QuoteBlockEditor: React.FC<QuoteBlockEditorProps> = ({ content, onChange }) => {
    const updateField = (field: keyof QuoteBlockContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const addQuote = () => {
        const newQuote: QuoteItem = {
            id: `quote-${Date.now()}`,
            text: 'New testimonial text',
            author: 'Author Name',
            authorTitle: '',
            authorPhoto: '',
            rating: 5,
            order: content.quotes.length,
        };
        updateField('quotes', [...content.quotes, newQuote]);
    };

    const updateQuote = (index: number, field: keyof QuoteItem, value: any) => {
        const updatedQuotes = [...content.quotes];
        updatedQuotes[index] = { ...updatedQuotes[index], [field]: value };
        updateField('quotes', updatedQuotes);
    };

    const deleteQuote = (index: number) => {
        const updatedQuotes = content.quotes.filter((_, i) => i !== index);
        updateField('quotes', updatedQuotes);
    };

    return (
        <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
            {/* Layout */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
                <div className="grid grid-cols-3 gap-2">
                    {layoutOptions.map((opt) => (
                        <label key={opt.value} className="relative cursor-pointer">
                            <input
                                type="radio"
                                name="layout"
                                value={opt.value}
                                checked={content.layout === opt.value}
                                onChange={() => updateField('layout', opt.value)}
                                className="sr-only peer"
                            />
                            <div className="px-3 py-2 text-center text-sm border-2 border-gray-300 rounded-md peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-colors">
                                {opt.label}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Background Color */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                </label>
                <div className="flex gap-2 items-center">
                    <input
                        type="color"
                        value={content.backgroundColor || '#ffffff'}
                        onChange={(e) => updateField('backgroundColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                        type="text"
                        value={content.backgroundColor || '#ffffff'}
                        onChange={(e) => updateField('backgroundColor', e.target.value)}
                        placeholder="#ffffff"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Carousel Mode */}
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={content.showCarousel}
                        onChange={(e) => updateField('showCarousel', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Show as carousel (one at a time with navigation)
                    </span>
                </label>
            </div>

            {/* Quotes List */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Quotes/Testimonials ({content.quotes.length})
                    </label>
                    <button
                        onClick={addQuote}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Quote
                    </button>
                </div>

                <div className="space-y-3">
                    {content.quotes.map((quote, index) => (
                        <div
                            key={quote.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 space-y-3"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-sm text-gray-700">
                                        Quote {index + 1}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteQuote(index)}
                                    className="text-red-600 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Quote Text */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Quote Text
                                </label>
                                <textarea
                                    value={quote.text}
                                    onChange={(e) => updateQuote(index, 'text', e.target.value)}
                                    placeholder="The experience was amazing..."
                                    rows={3}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Author */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Author Name
                                    </label>
                                    <input
                                        type="text"
                                        value={quote.author}
                                        onChange={(e) =>
                                            updateQuote(index, 'author', e.target.value)
                                        }
                                        placeholder="John Doe"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Author Title */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Title/Position
                                    </label>
                                    <input
                                        type="text"
                                        value={quote.authorTitle || ''}
                                        onChange={(e) =>
                                            updateQuote(index, 'authorTitle', e.target.value)
                                        }
                                        placeholder="Alumni, Batch 2020"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Author Photo */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Photo URL (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={quote.authorPhoto || ''}
                                    onChange={(e) =>
                                        updateQuote(index, 'authorPhoto', e.target.value)
                                    }
                                    placeholder="https://... or /images/..."
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-2">
                                    Rating (Optional)
                                </label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => updateQuote(index, 'rating', star)}
                                            className="hover:scale-110 transition-transform"
                                        >
                                            <Star
                                                className={`w-6 h-6 ${star <= (quote.rating || 0)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {content.quotes.length === 0 && (
                    <div className="text-center py-8 bg-white rounded border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm mb-2">No quotes yet</p>
                        <button
                            onClick={addQuote}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            + Add your first quote
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
