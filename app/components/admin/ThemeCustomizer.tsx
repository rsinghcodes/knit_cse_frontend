import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { ColorPicker } from '../ui/ColorPicker';
import { getThemePreset, themePresets } from '~/utils/themeManager';

export const ThemeCustomizer: React.FC = () => {
    const { settings, updatePartialSettings } = useSiteSettingsContext();
    const { theme } = settings;

    const handleColorChange = (key: keyof typeof theme.colors, value: string) => {
        updatePartialSettings({
            theme: {
                ...theme,
                colors: {
                    ...theme.colors,
                    [key]: value,
                },
            },
        });
    };

    const handleTypographyChange = (
        key: keyof typeof theme.typography,
        value: string
    ) => {
        updatePartialSettings({
            theme: {
                ...theme,
                typography: {
                    ...theme.typography,
                    [key]: value,
                },
            },
        });
    };

    const handleSpacingChange = (
        key: keyof typeof theme.spacing,
        value: string
    ) => {
        updatePartialSettings({
            theme: {
                ...theme,
                spacing: {
                    ...theme.spacing,
                    [key]: value,
                },
            },
        });
    };

    const applyPreset = (presetName: keyof typeof themePresets) => {
        const preset = getThemePreset(presetName);
        updatePartialSettings({
            theme: {
                ...theme,
                mode: preset.mode,
                colors: preset.colors,
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* Theme Presets */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Theme Presets</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Object.keys(themePresets).map((presetName) => (
                        <button
                            key={presetName}
                            onClick={() =>
                                applyPreset(presetName as keyof typeof themePresets)
                            }
                            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors capitalize font-medium"
                        >
                            {presetName}
                        </button>
                    ))}
                </div>
            </section>

            {/* Color Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ColorPicker
                        label="Primary Color"
                        value={theme.colors.primary}
                        onChange={(val) => handleColorChange('primary', val)}
                    />
                    <ColorPicker
                        label="Secondary Color"
                        value={theme.colors.secondary}
                        onChange={(val) => handleColorChange('secondary', val)}
                    />
                    <ColorPicker
                        label="Accent Color"
                        value={theme.colors.accent}
                        onChange={(val) => handleColorChange('accent', val)}
                    />
                    <ColorPicker
                        label="Background Color"
                        value={theme.colors.background}
                        onChange={(val) => handleColorChange('background', val)}
                    />
                    <ColorPicker
                        label="Text Color"
                        value={theme.colors.foreground}
                        onChange={(val) => handleColorChange('foreground', val)}
                    />
                    <ColorPicker
                        label="Muted Background"
                        value={theme.colors.muted}
                        onChange={(val) => handleColorChange('muted', val)}
                    />
                    <ColorPicker
                        label="Muted Text"
                        value={theme.colors.mutedForeground}
                        onChange={(val) => handleColorChange('mutedForeground', val)}
                    />
                    <ColorPicker
                        label="Border Color"
                        value={theme.colors.border}
                        onChange={(val) => handleColorChange('border', val)}
                    />
                    <ColorPicker
                        label="Success Color"
                        value={theme.colors.success}
                        onChange={(val) => handleColorChange('success', val)}
                    />
                    <ColorPicker
                        label="Warning Color"
                        value={theme.colors.warning}
                        onChange={(val) => handleColorChange('warning', val)}
                    />
                    <ColorPicker
                        label="Destructive Color"
                        value={theme.colors.destructive}
                        onChange={(val) => handleColorChange('destructive', val)}
                    />
                </div>
            </section>

            {/* Typography Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Typography</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Font Family
                        </label>
                        <select
                            value={theme.typography.fontFamily}
                            onChange={(e) =>
                                handleTypographyChange('fontFamily', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Inter, ui-sans-serif, system-ui, sans-serif">
                                Inter (Default)
                            </option>
                            <option value="'Roboto', sans-serif">Roboto</option>
                            <option value="'Open Sans', sans-serif">Open Sans</option>
                            <option value="'Lato', sans-serif">Lato</option>
                            <option value="'Poppins', sans-serif">Poppins</option>
                            <option value="'Montserrat', sans-serif">Montserrat</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Times New Roman', serif">Times New Roman</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Base Font Size
                        </label>
                        <input
                            type="text"
                            value={theme.typography.baseFontSize}
                            onChange={(e) =>
                                handleTypographyChange('baseFontSize', e.target.value)
                            }
                            placeholder="16px"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            H1 Size
                        </label>
                        <input
                            type="text"
                            value={theme.typography.h1Size}
                            onChange={(e) => handleTypographyChange('h1Size', e.target.value)}
                            placeholder="2.5rem"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            H2 Size
                        </label>
                        <input
                            type="text"
                            value={theme.typography.h2Size}
                            onChange={(e) => handleTypographyChange('h2Size', e.target.value)}
                            placeholder="2rem"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            H3 Size
                        </label>
                        <input
                            type="text"
                            value={theme.typography.h3Size}
                            onChange={(e) => handleTypographyChange('h3Size', e.target.value)}
                            placeholder="1.5rem"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Line Height
                        </label>
                        <input
                            type="text"
                            value={theme.typography.lineHeight}
                            onChange={(e) =>
                                handleTypographyChange('lineHeight', e.target.value)
                            }
                            placeholder="1.6"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Spacing Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Spacing & Layout</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Container Max Width
                        </label>
                        <input
                            type="text"
                            value={theme.spacing.containerMaxWidth}
                            onChange={(e) =>
                                handleSpacingChange('containerMaxWidth', e.target.value)
                            }
                            placeholder="1280px"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Padding Y
                        </label>
                        <input
                            type="text"
                            value={theme.spacing.sectionPaddingY}
                            onChange={(e) =>
                                handleSpacingChange('sectionPaddingY', e.target.value)
                            }
                            placeholder="2.5rem"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section Padding X
                        </label>
                        <input
                            type="text"
                            value={theme.spacing.sectionPaddingX}
                            onChange={(e) =>
                                handleSpacingChange('sectionPaddingX', e.target.value)
                            }
                            placeholder="1rem"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Border Radius
                        </label>
                        <input
                            type="text"
                            value={theme.spacing.borderRadius}
                            onChange={(e) =>
                                handleSpacingChange('borderRadius', e.target.value)
                            }
                            placeholder="0.625rem"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};
