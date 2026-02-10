import type { QuoteBlockContent } from '~/types/cms';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface QuoteBlockProps {
    content: QuoteBlockContent;
}

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ content }) => {
    const { quotes, layout = 'card', showCarousel, backgroundColor } = content;
    const [currentIndex, setCurrentIndex] = useState(0);

    const sortedQuotes = [...quotes].sort((a, b) => a.order - b.order);

    const nextQuote = () => {
        setCurrentIndex((prev) => (prev + 1) % sortedQuotes.length);
    };

    const prevQuote = () => {
        setCurrentIndex((prev) => (prev - 1 + sortedQuotes.length) % sortedQuotes.length);
    };

    const renderStars = (rating?: number) => {
        if (!rating) return null;
        return (
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const renderQuote = (quote: typeof sortedQuotes[0]) => {
        if (layout === 'centered') {
            return (
                <div key={quote.id} className="text-center max-w-3xl mx-auto">
                    <Quote className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-6 italic">
                        "{quote.text}"
                    </blockquote>
                    <div className="flex flex-col items-center gap-2">
                        {quote.authorPhoto && (
                            <img
                                src={quote.authorPhoto}
                                alt={quote.author}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        )}
                        <div>
                            <div className="font-semibold text-gray-900">{quote.author}</div>
                            {quote.authorTitle && (
                                <div className="text-sm text-gray-600">{quote.authorTitle}</div>
                            )}
                        </div>
                        {renderStars(quote.rating)}
                    </div>
                </div>
            );
        }

        if (layout === 'sidebar') {
            return (
                <div key={quote.id} className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                        {quote.authorPhoto ? (
                            <img
                                src={quote.authorPhoto}
                                alt={quote.author}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <Quote className="w-8 h-8 text-blue-600" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <blockquote className="text-lg text-gray-700 mb-3 italic">
                            "{quote.text}"
                        </blockquote>
                        <div className="font-semibold text-gray-900">{quote.author}</div>
                        {quote.authorTitle && (
                            <div className="text-sm text-gray-600">{quote.authorTitle}</div>
                        )}
                        {renderStars(quote.rating)}
                    </div>
                </div>
            );
        }

        // Card layout (default)
        return (
            <div
                key={quote.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
                <Quote className="w-8 h-8 text-blue-600 mb-3" />
                <blockquote className="text-gray-700 mb-4 italic">"{quote.text}"</blockquote>
                <div className="flex items-center gap-3">
                    {quote.authorPhoto && (
                        <img
                            src={quote.authorPhoto}
                            alt={quote.author}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    )}
                    <div>
                        <div className="font-semibold text-gray-900">{quote.author}</div>
                        {quote.authorTitle && (
                            <div className="text-sm text-gray-600">{quote.authorTitle}</div>
                        )}
                    </div>
                </div>
                {quote.rating && <div className="mt-3">{renderStars(quote.rating)}</div>}
            </div>
        );
    };

    return (
        <section className="py-12 px-4" style={{ backgroundColor: backgroundColor || 'transparent' }}>
            <div className="max-w-7xl mx-auto">
                {showCarousel && sortedQuotes.length > 1 ? (
                    <div className="relative">
                        {renderQuote(sortedQuotes[currentIndex])}

                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={prevQuote}
                                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                                aria-label="Previous quote"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-700" />
                            </button>
                            <div className="flex items-center gap-2">
                                {sortedQuotes.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                        aria-label={`Go to quote ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextQuote}
                                className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                                aria-label="Next quote"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={
                            layout === 'card'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'space-y-8'
                        }
                    >
                        {sortedQuotes.map((quote) => renderQuote(quote))}
                    </div>
                )}
            </div>
        </section>
    );
};
