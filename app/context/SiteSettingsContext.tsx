import React, { createContext, useContext, useEffect } from 'react';
import { useSiteSettings } from '~/utils/useSiteSettings';
import { applyTheme } from '~/utils/themeManager';
import type { SiteSettings } from '~/utils/useSiteSettings';

interface SiteSettingsContextType {
    settings: SiteSettings;
    isLoading: boolean;
    updateSettings: (settings: SiteSettings) => void;
    updatePartialSettings: (partial: Partial<SiteSettings>) => void;
    resetToDefaults: () => void;
    exportSettings: () => void;
    importSettings: (file: File) => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(
    undefined
);

export const useSiteSettingsContext = () => {
    const context = useContext(SiteSettingsContext);
    if (!context) {
        throw new Error(
            'useSiteSettingsContext must be used within SiteSettingsProvider'
        );
    }
    return context;
};

interface SiteSettingsProviderProps {
    children: React.ReactNode;
}

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({
    children,
}) => {
    const siteSettings = useSiteSettings();

    // Apply theme whenever settings change
    useEffect(() => {
        if (siteSettings.settings) {
            applyTheme(siteSettings.settings);
        }
    }, [siteSettings.settings]);

    return (
        <SiteSettingsContext.Provider value={siteSettings}>
            {children}
        </SiteSettingsContext.Provider>
    );
};
