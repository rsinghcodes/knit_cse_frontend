import React, { useState } from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import type { NavigationItem, FooterLink } from '~/utils/useSiteSettings';

export const ContentCustomizer: React.FC = () => {
    const { settings, updatePartialSettings } = useSiteSettingsContext();
    const { content } = settings;
    const [editingNavId, setEditingNavId] = useState<string | null>(null);

    // Hero Section
    const updateHero = (key: keyof typeof content.hero, value: string | boolean) => {
        updatePartialSettings({
            content: {
                ...content,
                hero: {
                    ...content.hero,
                    [key]: value,
                },
            },
        });
    };

    // Navigation
    const addNavItem = () => {
        const newItem: NavigationItem = {
            id: crypto.randomUUID(),
            label: 'New Link',
            href: '#',
        };
        updatePartialSettings({
            content: {
                ...content,
                navigation: [...content.navigation, newItem],
            },
        });
        setEditingNavId(newItem.id);
    };

    const updateNavItem = (id: string, updates: Partial<NavigationItem>) => {
        updatePartialSettings({
            content: {
                ...content,
                navigation: content.navigation.map((item) =>
                    item.id === id ? { ...item, ...updates } : item
                ),
            },
        });
    };

    const deleteNavItem = (id: string) => {
        updatePartialSettings({
            content: {
                ...content,
                navigation: content.navigation.filter((item) => item.id !== id),
            },
        });
    };

    // Footer
    const updateContactInfo = (key: keyof typeof content.footer.contactInfo, value: string) => {
        updatePartialSettings({
            content: {
                ...content,
                footer: {
                    ...content.footer,
                    contactInfo: {
                        ...content.footer.contactInfo,
                        [key]: value,
                    },
                },
            },
        });
    };

    const updateFooterField = (key: keyof typeof content.footer, value: boolean | string) => {
        updatePartialSettings({
            content: {
                ...content,
                footer: {
                    ...content.footer,
                    [key]: value,
                },
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="showHeroLogo"
                            checked={content.hero.showLogo}
                            onChange={(e) => updateHero('showLogo', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="showHeroLogo " className="text-sm font-medium">
                            Show Logo
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Welcome Text
                        </label>
                        <input
                            type="text"
                            value={content.hero.welcomeText}
                            onChange={(e) => updateHero('welcomeText', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Main Heading
                        </label>
                        <input
                            type="text"
                            value={content.hero.mainHeading}
                            onChange={(e) => updateHero('mainHeading', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sub Heading
                        </label>
                        <input
                            type="text"
                            value={content.hero.subHeading}
                            onChange={(e) => updateHero('subHeading', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={content.hero.description}
                            onChange={(e) => updateHero('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Navigation Menu */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Navigation Menu</h3>
                    <button
                        onClick={addNavItem}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Link
                    </button>
                </div>

                <div className="space-y-3">
                    {content.navigation.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 bg-white border border-gray-200 rounded-lg"
                        >
                            {editingNavId === item.id ? (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) =>
                                                updateNavItem(item.id, { label: e.target.value })
                                            }
                                            placeholder="Label"
                                            className="px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                        <input
                                            type="text"
                                            value={item.href}
                                            onChange={(e) =>
                                                updateNavItem(item.id, { href: e.target.value })
                                            }
                                            placeholder="URL"
                                            className="px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setEditingNavId(null)}
                                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">{item.label}</p>
                                        <p className="text-sm text-gray-600">{item.href}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingNavId(item.id)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteNavItem(item.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Contact Info */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Footer Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <textarea
                            value={content.footer.contactInfo.address}
                            onChange={(e) => updateContactInfo('address', e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                        </label>
                        <input
                            type="text"
                            value={content.footer.contactInfo.phone}
                            onChange={(e) => updateContactInfo('phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email (Optional)
                        </label>
                        <input
                            type="email"
                            value={content.footer.contactInfo.email || ''}
                            onChange={(e) => updateContactInfo('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Established Year
                        </label>
                        <input
                            type="text"
                            value={content.footer.contactInfo.establishedYear || ''}
                            onChange={(e) => updateContactInfo('establishedYear', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            College Code
                        </label>
                        <input
                            type="text"
                            value={content.footer.contactInfo.collegeCode || ''}
                            onChange={(e) => updateContactInfo('collegeCode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            {/* Footer Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Footer Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Copyright Text
                        </label>
                        <input
                            type="text"
                            value={content.footer.copyright}
                            onChange={(e) => updateFooterField('copyright', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Developer Credit
                        </label>
                        <input
                            type="text"
                            value={content.footer.developerCredit}
                            onChange={(e) => updateFooterField('developerCredit', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="showVisitorCount"
                            checked={content.footer.showVisitorCount}
                            onChange={(e) => updateFooterField('showVisitorCount', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="showVisitorCount" className="text-sm font-medium">
                            Show Visitor Count
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="showLastUpdated"
                            checked={content.footer.showLastUpdated}
                            onChange={(e) => updateFooterField('showLastUpdated', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="showLastUpdated" className="text-sm font-medium">
                            Show Last Updated
                        </label>
                    </div>
                </div>
            </section>
        </div>
    );
};
