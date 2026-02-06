import React, { useState } from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { ThemeCustomizer } from '~/components/admin/ThemeCustomizer';
import { BrandingCustomizer } from '~/components/admin/BrandingCustomizer';
import { LayoutCustomizer } from '~/components/admin/LayoutCustomizer';
import { ContentCustomizer } from '~/components/admin/ContentCustomizer';
import { CustomStylesEditor } from '~/components/admin/CustomStylesEditor';
import {
    Settings,
    Palette,
    Image,
    Layout,
    FileText,
    Code,
    Save,
    RotateCcw,
    Download,
    Upload,
    CheckCircle,
} from 'lucide-react';

type TabId = 'theme' | 'branding' | 'layout' | 'content' | 'custom';

export default function SiteSettings() {
    const {
        settings,
        resetToDefaults,
        exportSettings,
        importSettings,
        isLoading,
    } = useSiteSettingsContext();

    const [activeTab, setActiveTab] = useState<TabId>('theme');
    const [showSaveNotification, setShowSaveNotification] = useState(false);

    const tabs = [
        { id: 'theme' as TabId, label: 'Theme', icon: Palette },
        { id: 'branding' as TabId, label: 'Branding', icon: Image },
        { id: 'layout' as TabId, label: 'Layout', icon: Layout },
        { id: 'content' as TabId, label: 'Content', icon: FileText },
        { id: 'custom' as TabId, label: 'Custom CSS', icon: Code },
    ];

    const handleSave = () => {
        // Settings are auto-saved via the context
        setShowSaveNotification(true);
        setTimeout(() => setShowSaveNotification(false), 3000);
    };

    const handleReset = () => {
        if (
            confirm(
                'Are you sure you want to reset all settings to defaults? This action cannot be undone.'
            )
        ) {
            resetToDefaults();
            alert('Settings reset to defaults');
        }
    };

    const handleExport = () => {
        exportSettings();
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    await importSettings(file);
                    alert('Settings imported successfully!');
                } catch (error) {
                    alert('Failed to import settings. Please check the file format.');
                }
            }
        };
        input.click();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Settings className="w-8 h-8 text-blue-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Site Settings
                                </h1>
                                <p className="text-sm text-gray-600">
                                    Customize your website appearance and content
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden md:inline">Export</span>
                            </button>

                            <button
                                onClick={handleImport}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                <span className="hidden md:inline">Import</span>
                            </button>

                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span className="hidden md:inline">Reset</span>
                            </button>

                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                <span className="hidden md:inline">Save</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Notification */}
            {showSaveNotification && (
                <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in z-50">
                    <CheckCircle className="w-5 h-5" />
                    Settings saved successfully!
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex space-x-1 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="bg-white rounded-lg shadow-sm border p-6 md:p-8">
                    {activeTab === 'theme' && <ThemeCustomizer />}
                    {activeTab === 'branding' && <BrandingCustomizer />}
                    {activeTab === 'layout' && <LayoutCustomizer />}
                    {activeTab === 'content' && <ContentCustomizer />}
                    {activeTab === 'custom' && <CustomStylesEditor />}
                </div>
            </div>

            {/* Preview Button (Future Enhancement) */}
            <div className="fixed bottom-8 right-8">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    Preview Site
                </a>
            </div>
        </div>
    );
}
