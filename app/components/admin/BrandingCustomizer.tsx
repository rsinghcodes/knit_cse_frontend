import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { ImageUploader } from '../ui/ImageUploader';

export const BrandingCustomizer: React.FC = () => {
    const { settings, updatePartialSettings } = useSiteSettingsContext();
    const { branding } = settings;

    const handleChange = (
        key: keyof typeof branding,
        value: string
    ) => {
        updatePartialSettings({
            branding: {
                ...branding,
                [key]: value,
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* Site Identity */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Site Identity</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Site Name
                        </label>
                        <input
                            type="text"
                            value={branding.siteName}
                            onChange={(e) => handleChange('siteName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tagline
                        </label>
                        <input
                            type="text"
                            value={branding.tagline}
                            onChange={(e) => handleChange('tagline', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Logo & Images */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Logos & Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUploader
                        label="Header Logo"
                        value={branding.logo}
                        onChange={(val) => handleChange('logo', val)}
                    />

                    <ImageUploader
                        label="Hero Section Logo"
                        value={branding.heroLogo}
                        onChange={(val) => handleChange('heroLogo', val)}
                    />

                    <ImageUploader
                        label="Footer Logo"
                        value={branding.footerLogo}
                        onChange={(val) => handleChange('footerLogo', val)}
                    />

                    <ImageUploader
                        label="Favicon"
                        value={branding.favicon}
                        onChange={(val) => handleChange('favicon', val)}
                    />
                </div>
            </section>

            {/* Branding Tips */}
            <section className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                    💡 Branding Tips
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use high-quality PNG images with transparent backgrounds for logos</li>
                    <li>• Recommended header logo size: 200x80px or similar aspect ratio</li>
                    <li>• Favicon should be 32x32px or 64x64px</li>
                    <li>• Keep your site name concise and memorable</li>
                    <li>• Ensure logos have good contrast with your theme colors</li>
                </ul>
            </section>
        </div>
    );
};
