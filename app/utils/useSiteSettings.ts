import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ============ TYPE DEFINITIONS ============

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  destructive: string;
  success: string;
  warning: string;
}

export interface Typography {
  fontFamily: string;
  headingFontFamily?: string;
  baseFontSize: string;
  h1Size: string;
  h2Size: string;
  h3Size: string;
  h4Size: string;
  lineHeight: string;
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

export interface Spacing {
  containerMaxWidth: string;
  sectionPaddingY: string;
  sectionPaddingX: string;
  elementSpacing: string;
  borderRadius: string;
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'custom';
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
}

export interface BrandingSettings {
  siteName: string;
  tagline: string;
  logo: string;
  favicon: string;
  heroLogo: string;
  footerLogo: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface HeroContent {
  welcomeText: string;
  mainHeading: string;
  subHeading: string;
  description: string;
  backgroundImage?: string;
  backgroundColor?: string;
  showLogo: boolean;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email?: string;
  establishedYear?: string;
  collegeCode?: string;
}

export interface FooterContent {
  sections: FooterSection[];
  contactInfo: ContactInfo;
  copyright: string;
  developerCredit: string;
  showVisitorCount: boolean;
  showLastUpdated: boolean;
}

export interface ContentSettings {
  navigation: NavigationItem[];
  hero: HeroContent;
  footer: FooterContent;
}

export interface SectionVisibility {
  hero: boolean;
  highlights: boolean;
  circulars: boolean;
  featuredCarousel: boolean;
  quickLinks: boolean;
  partnersCarousel: boolean;
}

export interface LayoutSettings {
  sectionVisibility: SectionVisibility;
  sectionOrder: string[];
  enableStickyHeader: boolean;
  enableSmoothScroll: boolean;
}

export interface CustomStyles {
  customCSS: string;
  customJavaScript?: string;
}

export interface SiteSettings {
  theme: ThemeSettings;
  branding: BrandingSettings;
  content: ContentSettings;
  layout: LayoutSettings;
  custom: CustomStyles;
}

// ============ DEFAULT VALUES ============

const defaultThemeColors: ThemeColors = {
  primary: '#153d6a',
  secondary: '#f5f5f5',
  accent: '#f0f0f0',
  background: '#ffffff',
  foreground: '#0a0a0a',
  muted: '#f5f5f5',
  mutedForeground: '#737373',
  border: '#e5e5e5',
  destructive: '#dc2626',
  success: '#16a34a',
  warning: '#ea580c',
};

const defaultTypography: Typography = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  headingFontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  baseFontSize: '16px',
  h1Size: '2.5rem',
  h2Size: '2rem',
  h3Size: '1.5rem',
  h4Size: '1.25rem',
  lineHeight: '1.6',
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

const defaultSpacing: Spacing = {
  containerMaxWidth: '1280px',
  sectionPaddingY: '2.5rem',
  sectionPaddingX: '1rem',
  elementSpacing: '1rem',
  borderRadius: '0.625rem',
};

const defaultSiteSettings: SiteSettings = {
  theme: {
    mode: 'light',
    colors: defaultThemeColors,
    typography: defaultTypography,
    spacing: defaultSpacing,
  },
  branding: {
    siteName: 'Department of Computer Science & Engineering',
    tagline: 'Kamla Nehru Institute of Technology, Sultanpur',
    logo: '/assets/knit.png',
    favicon: '/favicon.ico',
    heroLogo: '/assets/logo.jpg',
    footerLogo: '/assets/logo.jpg',
  },
  content: {
    navigation: [
      { id: '1', label: 'Academics', href: '#' },
      { id: '2', label: 'Departments', href: '#' },
      { id: '3', label: 'Faculty', href: '/faculty' },
      { id: '4', label: 'Photo Gallery', href: '/photo-gallery' },
      { id: '5', label: 'Training & Placements', href: '#' },
      { id: '6', label: 'Media', href: '#' },
      { id: '7', label: 'Contact Us', href: '#' },
    ],
    hero: {
      welcomeText: 'Welcome To',
      mainHeading: 'Department of Computer Science & Engineering',
      subHeading: 'Kamla Nehru Institute of Technology, Sultanpur',
      description:
        'An Autonomous Government Funded Institute Affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
      showLogo: true,
    },
    footer: {
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
      copyright:
        '© Kamla Nehru Institute of Technology, Sultanpur (U.P.)',
      developerCredit: 'Developed by: Raghvendra',
      showVisitorCount: true,
      showLastUpdated: true,
    },
  },
  layout: {
    sectionVisibility: {
      hero: true,
      highlights: true,
      circulars: true,
      featuredCarousel: true,
      quickLinks: true,
      partnersCarousel: true,
    },
    sectionOrder: [
      'hero',
      'highlights',
      'circulars',
      'featuredCarousel',
      'quickLinks',
      'partnersCarousel',
    ],
    enableStickyHeader: false,
    enableSmoothScroll: true,
  },
  custom: {
    customCSS: '',
    customJavaScript: '',
  },
};

// ============ STORAGE UTILITIES ============

const STORAGE_KEY = 'knit_cse_site_settings';

const loadSettingsFromStorage = (): SiteSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all properties exist
      return {
        ...defaultSiteSettings,
        ...parsed,
        theme: { ...defaultSiteSettings.theme, ...parsed.theme },
        branding: { ...defaultSiteSettings.branding, ...parsed.branding },
        content: { ...defaultSiteSettings.content, ...parsed.content },
        layout: { ...defaultSiteSettings.layout, ...parsed.layout },
        custom: { ...defaultSiteSettings.custom, ...parsed.custom },
      };
    }
  } catch (error) {
    console.error('Failed to load site settings from storage:', error);
  }
  return defaultSiteSettings;
};

const saveSettingsToStorage = (settings: SiteSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save site settings to storage:', error);
  }
};

// ============ REACT HOOK ============

export const useSiteSettings = () => {
  const queryClient = useQueryClient();

  // Fetch settings
  const { data: settings = defaultSiteSettings, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      // Simulate async load
      await new Promise((res) => setTimeout(res, 100));
      return loadSettingsFromStorage();
    },
    staleTime: Infinity, // Settings don't go stale
  });

  // Update entire settings
  const updateSettings = useMutation({
    mutationFn: async (newSettings: SiteSettings) => {
      saveSettingsToStorage(newSettings);
      return newSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
    },
  });

  // Update partial settings
  const updatePartialSettings = useMutation({
    mutationFn: async (partial: Partial<SiteSettings>) => {
      const current = queryClient.getQueryData<SiteSettings>(['siteSettings']) || defaultSiteSettings;
      const updated = { ...current, ...partial };
      saveSettingsToStorage(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
    },
  });

  // Reset to defaults
  const resetToDefaults = useMutation({
    mutationFn: async () => {
      saveSettingsToStorage(defaultSiteSettings);
      return defaultSiteSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] });
    },
  });

  // Export settings as JSON
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import settings from JSON
  const importSettings = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          updateSettings.mutate(imported);
          resolve();
        } catch (error) {
          reject(new Error('Invalid settings file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return {
    settings,
    isLoading,
    updateSettings: updateSettings.mutate,
    updatePartialSettings: updatePartialSettings.mutate,
    resetToDefaults: resetToDefaults.mutate,
    exportSettings,
    importSettings,
    defaultSettings: defaultSiteSettings,
  };
};
