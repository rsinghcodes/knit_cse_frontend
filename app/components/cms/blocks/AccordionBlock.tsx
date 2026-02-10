import type { AccordionBlockContent } from '~/types/cms';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';

interface AccordionBlockProps {
    content: AccordionBlockContent;
}

export const AccordionBlock: React.FC<AccordionBlockProps> = ({ content }) => {
    const { title, items, allowMultiple, searchable } = content;
    const [openItems, setOpenItems] = useState<Set<string>>(
        new Set(items.filter(item => item.defaultOpen).map(item => item.id))
    );
    const [searchQuery, setSearchQuery] = useState('');

    const sortedItems = [...items].sort((a, b) => a.order - b.order);

    // Filter items based on search
    const filteredItems = searchQuery
        ? sortedItems.filter(
            (item) =>
                item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : sortedItems;

    const toggleItem = (itemId: string) => {
        const newOpenItems = new Set(openItems);

        if (newOpenItems.has(itemId)) {
            newOpenItems.delete(itemId);
        } else {
            if (!allowMultiple) {
                newOpenItems.clear();
            }
            newOpenItems.add(itemId);
        }

        setOpenItems(newOpenItems);
    };

    const handleKeyDown = (e: React.KeyboardEvent, itemId: string) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleItem(itemId);
        }
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {title && (
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                        <div className="w-24 h-1 bg-primary rounded-full" />
                    </div>
                )}

                {searchable && (
                    <div className="mb-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}

                {filteredItems.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No items found matching your search.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredItems.map((item) => {
                            const isOpen = openItems.has(item.id);

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                                >
                                    <button
                                        onClick={() => toggleItem(item.id)}
                                        onKeyDown={(e) => handleKeyDown(e, item.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                                        aria-expanded={isOpen}
                                        aria-controls={`accordion-content-${item.id}`}
                                    >
                                        <span className="font-semibold text-gray-900 pr-4">
                                            {item.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    <div
                                        id={`accordion-content-${item.id}`}
                                        className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        style={{
                                            overflow: isOpen ? 'visible' : 'hidden',
                                        }}
                                    >
                                        <div className="px-6 pb-4 pt-2">
                                            <div
                                                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: item.answer }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
