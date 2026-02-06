import React, { useState, useRef } from 'react';

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
    presets?: string[];
}

const defaultPresets = [
    '#153d6a', // Primary blue
    '#0891b2', // Cyan
    '#16a34a', // Green
    '#ea580c', // Orange
    '#dc2626', // Red
    '#7c3aed', // Purple
    '#0284c7', // Sky blue
    '#ca8a04', // Yellow
    '#000000', // Black
    '#ffffff', // White
    '#6b7280', // Gray
    '#f5f5f5', // Light gray
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
    label,
    value,
    onChange,
    presets = defaultPresets,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handlePresetClick = (color: string) => {
        onChange(color);
    };

    const handleInputClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            <div className="flex items-center gap-3">
                {/* Color preview box */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: value }}
                    title="Click to show presets"
                />

                {/* Hex input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Native color picker */}
                <input
                    ref={inputRef}
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="sr-only"
                />

                <button
                    type="button"
                    onClick={handleInputClick}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                    Pick
                </button>
            </div>

            {/* Preset colors */}
            {isOpen && (
                <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-xs font-medium text-gray-600 mb-2">Quick Presets</p>
                    <div className="grid grid-cols-6 gap-2">
                        {presets.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                onClick={() => handlePresetClick(preset)}
                                className="w-10 h-10 rounded-md border-2 hover:scale-110 transition-transform"
                                style={{
                                    backgroundColor: preset,
                                    borderColor: preset === value ? '#3b82f6' : '#d1d5db',
                                }}
                                title={preset}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
