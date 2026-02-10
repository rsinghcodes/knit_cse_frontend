import type { StatsBlockContent, StatItem } from '~/types/cms';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState } from 'react';

interface StatsBlockEditorProps {
    content: StatsBlockContent;
    onChange: (content: StatsBlockContent) => void;
}

const iconOptions = [
    { value: 'trending-up', label: 'Trending Up' },
    { value: 'users', label: 'Users' },
    { value: 'award', label: 'Award' },
    { value: 'target', label: 'Target' },
    { value: 'zap', label: 'Zap' },
    { value: 'star', label: 'Star' },
];

const suffixOptions = [
    { value: '', label: 'None' },
    { value: '%', label: '%' },
    { value: '+', label: '+' },
    { value: 'K', label: 'K' },
    { value: 'M', label: 'M' },
];

export const StatsBlockEditor: React.FC<StatsBlockEditorProps> = ({ content, onChange }) => {
    const updateField = (field: keyof StatsBlockContent, value: any) => {
        onChange({ ...content, [field]: value });
    };

    const addStat = () => {
        const newStat: StatItem = {
            id: `stat-${Date.now()}`,
            value: '0',
            suffix: '',
            label: 'New Stat',
            description: '',
            icon: 'trending-up',
            order: content.stats.length,
        };
        updateField('stats', [...content.stats, newStat]);
    };

    const updateStat = (index: number, field: keyof StatItem, value: any) => {
        const updatedStats = [...content.stats];
        updatedStats[index] = { ...updatedStats[index], [field]: value };
        updateField('stats', updatedStats);
    };

    const deleteStat = (index: number) => {
        const updatedStats = content.stats.filter((_, i) => i !== index);
        updateField('stats', updatedStats);
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
                    placeholder="e.g., By the Numbers"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Columns */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Columns
                </label>
                <div className="flex gap-4">
                    {[2, 3, 4].map((col) => (
                        <label key={col} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="columns"
                                value={col}
                                checked={content.columns === col}
                                onChange={() => updateField('columns', col)}
                                className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm">{col} Columns</span>
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
                        value={content.backgroundColor || '#f9fafb'}
                        onChange={(e) => updateField('backgroundColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                        type="text"
                        value={content.backgroundColor || '#f9fafb'}
                        onChange={(e) => updateField('backgroundColor', e.target.value)}
                        placeholder="#f9fafb"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Animation Toggle */}
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={content.animateOnScroll ?? true}
                        onChange={(e) => updateField('animateOnScroll', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Animate numbers on scroll
                    </span>
                </label>
            </div>

            {/* Stats List */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Stats ({content.stats.length})
                    </label>
                    <button
                        onClick={addStat}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Stat
                    </button>
                </div>

                <div className="space-y-3">
                    {content.stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className="bg-white p-4 rounded-lg border border-gray-200 space-y-3"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-sm text-gray-700">
                                        Stat {index + 1}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteStat(index)}
                                    className="text-red-600 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Value and Suffix */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Value
                                    </label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                                        placeholder="100"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                        Suffix
                                    </label>
                                    <select
                                        value={stat.suffix || ''}
                                        onChange={(e) => updateStat(index, 'suffix', e.target.value)}
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {suffixOptions.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Label */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => updateStat(index, 'label', e.target.value)}
                                    placeholder="Placement Rate"
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Description (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={stat.description || ''}
                                    onChange={(e) =>
                                        updateStat(index, 'description', e.target.value)
                                    }
                                    placeholder="Students placed in top companies"
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Icon */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Icon
                                </label>
                                <select
                                    value={stat.icon || 'trending-up'}
                                    onChange={(e) => updateStat(index, 'icon', e.target.value)}
                                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {iconOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>

                {content.stats.length === 0 && (
                    <div className="text-center py-8 bg-white rounded border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm mb-2">No stats yet</p>
                        <button
                            onClick={addStat}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            + Add your first stat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
