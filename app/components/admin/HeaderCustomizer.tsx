import React, { useState } from 'react';
import { useHeaderSettings } from '~/utils/useHeaderSettings';
import type { HeaderIcon, HeaderBanner } from '~/utils/useHeaderSettings';
import { Plus, Trash2, Edit2, Save, Eye, EyeOff } from 'lucide-react';

export const HeaderCustomizer: React.FC = () => {
    const { settings, updatePartialSettings } = useHeaderSettings();
    const [editingIconId, setEditingIconId] = useState<string | null>(null);
    const [editingBannerId, setEditingBannerId] = useState<string | null>(null);

    // Logo Settings
    const updateLogo = (key: keyof typeof settings.logo, value: string) => {
        updatePartialSettings({
            logo: {
                ...settings.logo,
                [key]: value,
            },
        });
    };

    // Top Bar Icons
    const addIcon = () => {
        const newIcon: HeaderIcon = {
            id: crypto.randomUUID(),
            icon: 'home',
            label: 'New Link',
            href: '#',
            order: settings.topBarIcons.length,
            visible: true,
        };
        updatePartialSettings({
            topBarIcons: [...settings.topBarIcons, newIcon],
        });
        setEditingIconId(newIcon.id);
    };

    const updateIcon = (id: string, updates: Partial<HeaderIcon>) => {
        updatePartialSettings({
            topBarIcons: settings.topBarIcons.map((icon) =>
                icon.id === id ? { ...icon, ...updates } : icon
            ),
        });
    };

    const deleteIcon = (id: string) => {
        if (!confirm('Delete this icon?')) return;
        updatePartialSettings({
            topBarIcons: settings.topBarIcons.filter((icon) => icon.id !== id),
        });
    };

    // Banners
    const addBanner = () => {
        const newBanner: HeaderBanner = {
            id: crypto.randomUUID(),
            src: '',
            alt: 'New Banner',
            order: settings.banners.length,
            visible: true,
        };
        updatePartialSettings({
            banners: [...settings.banners, newBanner],
        });
        setEditingBannerId(newBanner.id);
    };

    const updateBanner = (id: string, updates: Partial<HeaderBanner>) => {
        updatePartialSettings({
            banners: settings.banners.map((banner) =>
                banner.id === id ? { ...banner, ...updates } : banner
            ),
        });
    };

    const deleteBanner = (id: string) => {
        if (!confirm('Delete this banner?')) return;
        updatePartialSettings({
            banners: settings.banners.filter((banner) => banner.id !== id),
        });
    };

    // Search Settings
    const updateSearch = (key: keyof typeof settings.search, value: string | boolean) => {
        updatePartialSettings({
            search: {
                ...settings.search,
                [key]: value,
            },
        });
    };

    // Layout Settings
    const updateLayout = (key: keyof typeof settings.layout, value: string | boolean) => {
        updatePartialSettings({
            layout: {
                ...settings.layout,
                [key]: value,
            },
        });
    };

    // Style Settings
    const updateStyle = (key: keyof typeof settings.style, value: string | boolean) => {
        updatePartialSettings({
            style: {
                ...settings.style,
                [key]: value,
            },
        });
    };

    return (
        <div className="space-y-8">
            {/* Logo Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Logo Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo Image URL
                        </label>
                        <input
                            type="text"
                            value={settings.logo.src}
                            onChange={(e) => updateLogo('src', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="/assets/logo.png"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alt Text
                        </label>
                        <input
                            type="text"
                            value={settings.logo.alt}
                            onChange={(e) => updateLogo('alt', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo Height (e.g., 80px, 5rem)
                        </label>
                        <input
                            type="text"
                            value={settings.logo.height}
                            onChange={(e) => updateLogo('height', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Logo Link
                        </label>
                        <input
                            type="text"
                            value={settings.logo.link}
                            onChange={(e) => updateLogo('link', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="/"
                        />
                    </div>

                    {/* Logo Preview */}
                    {settings.logo.src && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                            <img
                                src={settings.logo.src}
                                alt={settings.logo.alt}
                                style={{ height: settings.logo.height }}
                                className="max-w-full"
                            />
                        </div>
                    )}
                </div>
            </section>

            <hr />

            {/* Top Bar Icons */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Top Bar Icons</h3>
                    <button
                        onClick={addIcon}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Icon
                    </button>
                </div>

                <div className="space-y-3">
                    {settings.topBarIcons
                        .sort((a, b) => a.order - b.order)
                        .map((icon) => (
                            <div
                                key={icon.id}
                                className="p-4 bg-white border border-gray-200 rounded-lg"
                            >
                                {editingIconId === icon.id ? (
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Icon Type</label>
                                                <select
                                                    value={icon.icon}
                                                    onChange={(e) =>
                                                        updateIcon(icon.id, { icon: e.target.value as any })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                >
                                                    <option value="home">Home</option>
                                                    <option value="skip">Skip to Content</option>
                                                    <option value="accessibility">Accessibility</option>
                                                    <option value="rss">RSS Feed</option>
                                                    <option value="globe">Language/Globe</option>
                                                    <option value="search">Search</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Label</label>
                                                <input
                                                    type="text"
                                                    value={icon.label}
                                                    onChange={(e) =>
                                                        updateIcon(icon.id, { label: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                        </div>
                                        {icon.icon !== 'search' && (
                                            <div>
                                                <label className="block text-xs font-medium mb-1">Link URL</label>
                                                <input
                                                    type="text"
                                                    value={icon.href || ''}
                                                    onChange={(e) =>
                                                        updateIcon(icon.id, { href: e.target.value })
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                        )}
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingIconId(null)}
                                                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                {icon.icon}
                                            </span>
                                            <div>
                                                <p className="font-medium text-sm">{icon.label}</p>
                                                {icon.href && (
                                                    <p className="text-xs text-gray-600">{icon.href}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    updateIcon(icon.id, { visible: !icon.visible })
                                                }
                                                className={`p-2 rounded-lg ${icon.visible
                                                        ? 'text-green-600 hover:bg-green-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                    }`}
                                                title={icon.visible ? 'Visible' : 'Hidden'}
                                            >
                                                {icon.visible ? (
                                                    <Eye className="w-4 h-4" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => setEditingIconId(icon.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteIcon(icon.id)}
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

            <hr />

            {/* Header Banners */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Header Banners</h3>
                    <button
                        onClick={addBanner}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Banner
                    </button>
                </div>

                <div className="space-y-3">
                    {settings.banners
                        .sort((a, b) => a.order - b.order)
                        .map((banner) => (
                            <div
                                key={banner.id}
                                className="p-4 bg-white border border-gray-200 rounded-lg"
                            >
                                {editingBannerId === banner.id ? (
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium mb-1">
                                                Banner Image URL
                                            </label>
                                            <input
                                                type="text"
                                                value={banner.src}
                                                onChange={(e) =>
                                                    updateBanner(banner.id, { src: e.target.value })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium mb-1">Alt Text</label>
                                            <input
                                                type="text"
                                                value={banner.alt}
                                                onChange={(e) =>
                                                    updateBanner(banner.id, { alt: e.target.value })
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingBannerId(null)}
                                                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                            >
                                                <Save className="w-4 h-4" />
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {banner.src && (
                                                <img
                                                    src={banner.src}
                                                    alt={banner.alt}
                                                    className="h-12 w-auto object-contain"
                                                />
                                            )}
                                            <p className="text-sm">{banner.alt}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    updateBanner(banner.id, { visible: !banner.visible })
                                                }
                                                className={`p-2 rounded-lg ${banner.visible
                                                        ? 'text-green-600 hover:bg-green-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                    }`}
                                                title={banner.visible ? 'Visible' : 'Hidden'}
                                            >
                                                {banner.visible ? (
                                                    <Eye className="w-4 h-4" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => setEditingBannerId(banner.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteBanner(banner.id)}
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

            <hr />

            {/* Search Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Search Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="searchEnabled"
                            checked={settings.search.enabled}
                            onChange={(e) => updateSearch('enabled', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="searchEnabled" className="text-sm font-medium">
                            Enable Search
                        </label>
                    </div>

                    {settings.search.enabled && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Placeholder Text
                                </label>
                                <input
                                    type="text"
                                    value={settings.search.placeholder}
                                    onChange={(e) => updateSearch('placeholder', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Submit Button Text
                                </label>
                                <input
                                    type="text"
                                    value={settings.search.submitText}
                                    onChange={(e) => updateSearch('submitText', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </>
                    )}
                </div>
            </section>

            <hr />

            {/* Layout Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Layout Settings</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="stickyHeader"
                            checked={settings.layout.sticky}
                            onChange={(e) => updateLayout('sticky', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="stickyHeader" className="text-sm font-medium">
                            Sticky Header (fixed on scroll)
                        </label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="transparentHeader"
                            checked={settings.layout.transparent}
                            onChange={(e) => updateLayout('transparent', e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label htmlFor="transparentHeader" className="text-sm font-medium">
                            Transparent Background
                        </label>
                    </div>
                </div>
            </section>

            <hr />

            {/* Style Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Style Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Background Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.backgroundColor}
                            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Border Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.borderColor}
                            onChange={(e) => updateStyle('borderColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Navigation Background
                        </label>
                        <input
                            type="color"
                            value={settings.style.navBackgroundColor}
                            onChange={(e) => updateStyle('navBackgroundColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Navigation Text Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.navTextColor}
                            onChange={(e) => updateStyle('navTextColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="headerShadow"
                                checked={settings.style.shadow}
                                onChange={(e) => updateStyle('shadow', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label htmlFor="headerShadow" className="text-sm font-medium">
                                Show Shadow
                            </label>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
