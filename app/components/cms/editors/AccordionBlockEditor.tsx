import type { AccordionBlockContent, AccordionItem } from '~/types/cms';
import { Plus, Trash2, GripVertical, Search as SearchIcon } from 'lucide-react';

interface AccordionBlockEditorProps {
    content: AccordionBlockContent;
    onChange: (content: AccordionBlockContent) => void;
}

export const AccordionBlockEditor: React.FC<AccordionBlockEditorProps> = ({ content, onChange }) => {
    const updateField = (field: keyof AccordionBlockContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const addItem = () => {
        const newItem: AccordionItem = {
            id: `faq-${Date.now()}`,
            question: 'New Question',
            answer: 'Answer here',
            order: content.items.length,
            defaultOpen: false,
        };
        updateField('items', [...content.items, newItem]);
    };

    const updateItem = (index: number, field: keyof AccordionItem, value: any) => {
        const updatedItems = [...content.items];
        updatedItems[index] = { ...updatedItems[index], [field]: value };
        updateField('items', updatedItems);
    };

    const deleteItem = (index: number) => {
        const updatedItems = content.items.filter((_, i) => i !== index);
        updateField('items', updatedItems);
    };

    return (
        <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Block Title (Optional)
                </label>
                <input
                    type="text"
                    value={content.title || ''}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Frequently Asked Questions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Settings */}
            <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={content.allowMultiple}
                        onChange={(e) => updateField('allowMultiple', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Allow multiple items open at once
                    </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={content.searchable ?? false}
                        onChange={(e) => updateField('searchable', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        <SearchIcon className="w-4 h-4 inline mr-1" />
                        Enable search box
                    </span>
                </label>
            </div>

            {/* Items List */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        FAQ Items ({content.items.length})
                    </label>
                    <button
                        onClick={addItem}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Item
                    </button>
                </div>

                <div className="space-y-3">
                    {content.items.map((item, index) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 space-y-3"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-sm text-gray-700">
                                        Item {index + 1}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteItem(index)}
                                    className="text-red-600 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Question */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    value={item.question}
                                    onChange={(e) => updateItem(index, 'question', e.target.value)}
                                    placeholder="What is the admission process?"
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Answer */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Answer
                                </label>
                                <textarea
                                    value={item.answer}
                                    onChange={(e) => updateItem(index, 'answer', e.target.value)}
                                    placeholder="The admission process includes..."
                                    rows={3}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Default Open */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.defaultOpen ?? false}
                                    onChange={(e) =>
                                        updateItem(index, 'defaultOpen', e.target.checked)
                                    }
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-xs text-gray-600">Open by default</span>
                            </label>
                        </div>
                    ))}
                </div>

                {content.items.length === 0 && (
                    <div className="text-center py-8 bg-white rounded border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm mb-2">No FAQ items yet</p>
                        <button
                            onClick={addItem}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            + Add your first FAQ item
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
