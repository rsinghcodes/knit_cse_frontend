import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { FooterSection, ContactInfo } from './useSiteSettings';

// ============ TYPE DEFINITIONS ============

export interface FooterWidget {
    id: string;
    type: 'html' | 'social' | 'newsletter';
    title?: string;
    content: Record<string, any>;
    order: number;
    visible: boolean;
}

export interface FooterLayoutSettings {
    columns: 2 | 3 | 4;
    columnGap: string;
    alignment: 'left' | 'center' | 'right';
}

export interface FooterStyleSettings {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    linkHoverColor: string;
    headingColor: string;
    bottomBarBackgroundColor: string;
    bottomBarTextColor: string;
    borderTop: boolean;
    borderColor: string;
}

export interface FooterSettings {
    sections: FooterSection[];
    contactInfo: ContactInfo;
    widgets: FooterWidget[];
    layout: FooterLayoutSettings;
    style: FooterStyleSettings;
    copyright: string;
    developerCredit: string;
    showVisitorCount: boolean;
    showLastUpdated: boolean;
}

// ============ DEFAULT VALUES ============

const defaultFooterSettings: FooterSettings = {
    sections: [
        {
            id: '1',
            title: 'Quick Links',
            links: [
                { id: '1-1', label: 'Vision & Mission', href: '#' },
                { id: '1-2', label: 'Downloads', href: '#' },
                { id: '1-3', label: 'Sitemap', href: '#' },
                { id: '1-4', label: 'Locate Us', href: '#' },
            ],
        },
        {
            id: '2',
            title: 'Support',
            links: [
                { id: '2-1', label: 'Help', href: '#' },
                { id: '2-2', label: 'Support', href: '#' },
                { id: '2-3', label: 'Disclaimer', href: '#' },
                { id: '2-4', label: 'Terms and Conditions', href: '#' },
            ],
        },
        {
            id: '3',
            title: 'Policies',
            links: [
                { id: '3-1', label: 'Privacy Policy', href: '#' },
                { id: '3-2', label: 'Hyperlinking Policy', href: '#' },
                { id: '3-3', label: 'Copyright Policy', href: '#' },
                { id: '3-4', label: 'Security Policy', href: '#' },
            ],
        },
    ],
    contactInfo: {
        address: 'Sultanpur - Kadipur Road, Sultanpur, Uttar Pradesh 228118',
        phone: '05362 240 454',
        email: '',
        establishedYear: '1979',
        collegeCode: '104',
    },
    widgets: [],
    layout: {
        columns: 4,
        columnGap: '2.5rem',
        alignment: 'left',
    },
    style: {
        backgroundColor: '#153d6a',
        textColor: '#ffffff',
        linkColor: '#ffffff',
        linkHoverColor: '#f0f0f0',
        headingColor: '#f5f5f5',
        bottomBarBackgroundColor: '#153d6a',
        bottomBarTextColor: '#d1d5db',
        borderTop: true,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    copyright: '© Kamla Nehru Institute of Technology, Sultanpur (U.P.)',
    developerCredit: 'Developed by: Raghvendra',
    showVisitorCount: true,
    showLastUpdated: true,
};

// ============ STORAGE UTILITIES ============

const STORAGE_KEY = 'knit_cse_footer_settings';

const loadFooterSettingsFromStorage = (): FooterSettings => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Merge with defaults to ensure all properties exist
            return {
                ...defaultFooterSettings,
                ...parsed,
                sections: parsed.sections || defaultFooterSettings.sections,
                contactInfo: { ...defaultFooterSettings.contactInfo, ...parsed.contactInfo },
                widgets: parsed.widgets || defaultFooterSettings.widgets,
                layout: { ...defaultFooterSettings.layout, ...parsed.layout },
                style: { ...defaultFooterSettings.style, ...parsed.style },
            };
        }
    } catch (error) {
        console.error('Failed to load footer settings from storage:', error);
    }
    return defaultFooterSettings;
};

const saveFooterSettingsToStorage = (settings: FooterSettings): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save footer settings to storage:', error);
    }
};

// ============ REACT HOOK ============

export const useFooterSettings = () => {
    const queryClient = useQueryClient();

    // Fetch settings
    const { data: settings = defaultFooterSettings, isLoading } = useQuery({
        queryKey: ['footerSettings'],
        queryFn: async () => {
            // Simulate async load
            await new Promise((res) => setTimeout(res, 50));
            return loadFooterSettingsFromStorage();
        },
        staleTime: Infinity,
    });

    // Update entire settings
    const updateSettings = useMutation({
        mutationFn: async (newSettings: FooterSettings) => {
            saveFooterSettingsToStorage(newSettings);
            return newSettings;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['footerSettings'] });
        },
    });

    // Update partial settings
    const updatePartialSettings = useMutation({
        mutationFn: async (partial: Partial<FooterSettings>) => {
            const current =
                queryClient.getQueryData<FooterSettings>(['footerSettings']) ||
                defaultFooterSettings;
            const updated = { ...current, ...partial };
            saveFooterSettingsToStorage(updated);
            return updated;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['footerSettings'] });
        },
    });

    // Reset to defaults
    const resetToDefaults = useMutation({
        mutationFn: async () => {
            saveFooterSettingsToStorage(defaultFooterSettings);
            return defaultFooterSettings;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['footerSettings'] });
        },
    });

    return {
        settings,
        isLoading,
        updateSettings: updateSettings.mutate,
        updatePartialSettings: updatePartialSettings.mutate,
        resetToDefaults: resetToDefaults.mutate,
        defaultSettings: defaultFooterSettings,
    };
};
