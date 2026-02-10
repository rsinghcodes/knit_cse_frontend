import React, { useState } from 'react';
import { useFooterSettings } from '~/utils/useFooterSettings';
import type { FooterSection, FooterLink } from '~/utils/useSiteSettings';
import { Plus, Trash2, Edit2, Save, Eye, EyeOff, GripVertical } from 'lucide-react';

export const FooterCustomizer: React.FC = () => {
    const { settings, updatePartialSettings } = useFooterSettings();
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

    // Footer Sections
    const addSection = () => {
        const newSection: FooterSection = {
            id: crypto.randomUUID(),
            title: 'New Section',
            links: [],
        };
        updatePartialSettings({
            sections: [...settings.sections, newSection],
        });
        setEditingSectionId(newSection.id);
    };

    const updateSection = (id: string, updates: Partial<FooterSection>) => {
        updatePartialSettings({
            sections: settings.sections.map((section) =>
                section.id === id ? { ...section, ...updates } : section
            ),
        });
    };

    const deleteSection = (id: string) => {
        if (!confirm('Delete this section?')) return;
        updatePartialSettings({
            sections: settings.sections.filter((section) => section.id !== id),
        });
    };

    // Footer Links
    const addLinkToSection = (sectionId: string) => {
        const section = settings.sections.find((s) => s.id === sectionId);
        if (!section) return;

        const newLink: FooterLink = {
            id: crypto.randomUUID(),
            label: 'New Link',
            href: '#',
        };

        updateSection(sectionId, {
            links: [...section.links, newLink],
        });
        setEditingLinkId(newLink.id);
    };

    const updateLink = (sectionId: string, linkId: string, updates: Partial<FooterLink>) => {
        const section = settings.sections.find((s) => s.id === sectionId);
        if (!section) return;

        updateSection(sectionId, {
            links: section.links.map((link) =>
                link.id === linkId ? { ...link, ...updates } : link
            ),
        });
    };

    const deleteLink = (sectionId: string, linkId: string) => {
        if (!confirm('Delete this link?')) return;
        const section = settings.sections.find((s) => s.id === sectionId);
        if (!section) return;

        updateSection(sectionId, {
            links: section.links.filter((link) => link.id !== linkId),
        });
    };

    // Contact Info
    const updateContactInfo = (key: keyof typeof settings.contactInfo, value: string) => {
        updatePartialSettings({
            contactInfo: {
                ...settings.contactInfo,
                [key]: value,
            },
        });
    };

    // Layout Settings
    const updateLayout = (key: keyof typeof settings.layout, value: any) => {
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

    // General Footer Settings
    const updateGeneralSetting = (key: keyof FooterSettings, value: any) => {
        updatePartialSettings({
            [key]: value,
        });
    };

    return (
        <div className="space-y-8">
            {/* Footer Sections */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Footer Sections</h3>
                    <button
                        onClick={addSection}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Section
                    </button>
                </div>

                <div className="space-y-4">
                    {settings.sections.map((section) => (
                        <div
                            key={section.id}
                            className="p-4 bg-white border border-gray-200 rounded-lg"
                        >
                            {editingSectionId === section.id ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-medium mb-1">
                                            Section Title
                                        </label>
                                        <input
                                            type="text"
                                            value={section.title}
                                            onChange={(e) =>
                                                updateSection(section.id, { title: e.target.value })
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setEditingSectionId(null)}
                                            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                        >
                                            <Save className="w-4 h-4" />
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-semibold text-base">{section.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setEditingSectionId(section.id)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteSection(section.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Section Links */}
                                    <div className="space-y-2 ml-4">
                                        {section.links.map((link) => (
                                            <div
                                                key={link.id}
                                                className="p-2 bg-gray-50 border border-gray-200 rounded"
                                            >
                                                {editingLinkId === link.id ? (
                                                    <div className="space-y-2">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <input
                                                                type="text"
                                                                value={link.label}
                                                                onChange={(e) =>
                                                                    updateLink(section.id, link.id, {
                                                                        label: e.target.value,
                                                                    })
                                                                }
                                                                placeholder="Label"
                                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={link.href}
                                                                onChange={(e) =>
                                                                    updateLink(section.id, link.id, {
                                                                        href: e.target.value,
                                                                    })
                                                                }
                                                                placeholder="URL"
                                                                className="px-2 py-1 border border-gray-300 rounded text-sm"
                                                            />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={() => setEditingLinkId(null)}
                                                                className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs"
                                                            >
                                                                <Save className="w-3 h-3" />
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium">{link.label}</p>
                                                            <p className="text-xs text-gray-600">{link.href}</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() => setEditingLinkId(link.id)}
                                                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                            >
                                                                <Edit2 className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteLink(section.id, link.id)}
                                                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            onClick={() => addLinkToSection(section.id)}
                                            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                            Add Link
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <hr />

            {/* Contact Information */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address
                        </label>
                        <textarea
                            value={settings.contactInfo.address}
                            onChange={(e) => updateContactInfo('address', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone
                        </label>
                        <input
                            type="text"
                            value={settings.contactInfo.phone}
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
                            value={settings.contactInfo.email || ''}
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
                            value={settings.contactInfo.establishedYear || ''}
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
                            value={settings.contactInfo.collegeCode || ''}
                            onChange={(e) => updateContactInfo('collegeCode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </section>

            <hr />

            {/* Layout Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Layout Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Columns
                        </label>
                        <select
                            value={settings.layout.columns}
                            onChange={(e) => updateLayout('columns', parseInt(e.target.value) as 2 | 3 | 4)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="2">2 Columns</option>
                            <option value="3">3 Columns</option>
                            <option value="4">4 Columns</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Column Alignment
                        </label>
                        <select
                            value={settings.layout.alignment}
                            onChange={(e) => updateLayout('alignment', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
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
                            Text Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.textColor}
                            onChange={(e) => updateStyle('textColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.linkColor}
                            onChange={(e) => updateStyle('linkColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Heading Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.headingColor}
                            onChange={(e) => updateStyle('headingColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bottom Bar Background
                        </label>
                        <input
                            type="color"
                            value={settings.style.bottomBarBackgroundColor}
                            onChange={(e) => updateStyle('bottomBarBackgroundColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bottom Bar Text Color
                        </label>
                        <input
                            type="color"
                            value={settings.style.bottomBarTextColor}
                            onChange={(e) => updateStyle('bottomBarTextColor', e.target.value)}
                            className="w-full h-10 rounded border border-gray-300"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="footerBorderTop"
                                checked={settings.style.borderTop}
                                onChange={(e) => updateStyle('borderTop', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded"
                            />
                            <label htmlFor="footerBorderTop" className="text-sm font-medium">
                                Show Top Border
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            {/* General Footer Settings */}
            <section>
                <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Copyright Text
                        </label>
                        <input
                            type="text"
                            value={settings.copyright}
                            onChange={(e) => updateGeneralSetting('copyright', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Developer Credit
                        </label>
                        <input
                            type="text"
                            value={settings.developerCredit}
                            onChange={(e) => updateGeneralSetting('developerCredit', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="showVisitorCount"
                            checked={settings.showVisitorCount}
                            onChange={(e) => updateGeneralSetting('showVisitorCount', e.target.checked)}
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
                            checked={settings.showLastUpdated}
                            onChange={(e) => updateGeneralSetting('showLastUpdated', e.target.checked)}
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

type FooterSettings = ReturnType<typeof useFooterSettings>['settings'];
