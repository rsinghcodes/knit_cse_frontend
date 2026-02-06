import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { Eye, EyeOff, GripVertical } from 'lucide-react';

export const LayoutCustomizer: React.FC = () => {
    const { settings, updatePartialSettings } = useSiteSettingsContext();
    const { layout } = settings;

    const toggleSectionVisibility = (
        section: keyof typeof layout.sectionVisibility
    ) => {
        updatePartialSettings({
            layout: {
                ...layout,
                sectionVisibility: {
                    ...layout.sectionVisibility,
                    [section]: !layout.sectionVisibility[section],
                },
            },
        });
    };

    const toggleSetting = (key: keyof typeof layout, value: boolean) => {
        updatePartialSettings({
            layout: {
                ...layout,
                [key]: value,
            },
        });
    };

    const sectionLabels: Record<keyof typeof layout.sectionVisibility, string> = {
        hero: 'Hero Section',
        highlights: 'Highlights Strip',
        circulars: 'Circulars/Notices',
        featuredCarousel: 'Featured Carousel',
        quickLinks: 'Quick Links Grid',
        partnersCarousel: 'Partners Carousel',
    };

    return (
        <div className="space-y-8">
            {/* Section Visibility */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Section Visibility</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Show or hide sections on the homepage
                </p>

                <div className="space-y-3">
                    {(Object.keys(layout.sectionVisibility) as Array<keyof typeof layout.sectionVisibility>).map(
                        (section) => (
                            <div
                                key={section}
                                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-5 h-5 text-gray-400" />
                                    <span className="font-medium">{sectionLabels[section]}</span>
                                </div>

                                <button
                                    onClick={() => toggleSectionVisibility(section)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${layout.sectionVisibility[section]
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {layout.sectionVisibility[section] ? (
                                        <>
                                            <Eye className="w-4 h-4" />
                                            Visible
                                        </>
                                    ) : (
                                        <>
                                            <EyeOff className="w-4 h-4" />
                                            Hidden
                                        </>
                                    )}
                                </button>
                            </div>
                        )
                    )}
                </div>
            </section>

            {/* Layout Options */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Layout Options</h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div>
                            <p className="font-medium">Sticky Header</p>
                            <p className="text-sm text-gray-600">
                                Keep the header fixed at the top while scrolling
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={layout.enableStickyHeader}
                                onChange={(e) => toggleSetting('enableStickyHeader', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                        <div>
                            <p className="font-medium">Smooth Scroll</p>
                            <p className="text-sm text-gray-600">
                                Enable smooth scrolling for anchor links
                            </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={layout.enableSmoothScroll}
                                onChange={(e) => toggleSetting('enableSmoothScroll', e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </section>

            {/* Info Box */}
            <section className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-900 mb-2">
                    ℹ️ Layout Note
                </h4>
                <p className="text-sm text-amber-800">
                    Hidden sections will not appear on the homepage but their data will still be accessible through direct links. You can reorder sections by dragging them (feature coming soon).
                </p>
            </section>
        </div>
    );
};
