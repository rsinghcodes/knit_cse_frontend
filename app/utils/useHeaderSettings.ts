import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ============ TYPE DEFINITIONS ============

export interface HeaderIcon {
  id: string;
  icon: 'home' | 'skip' | 'accessibility' | 'rss' | 'globe' | 'search';
  label: string;
  href?: string;
  order: number;
  visible: boolean;
}

export interface HeaderBanner {
  id: string;
  src: string;
  alt: string;
  order: number;
  visible: boolean;
}

export interface HeaderSearchSettings {
  enabled: boolean;
  placeholder: string;
  submitText: string;
}

export interface HeaderLogoSettings {
  src: string;
  alt: string;
  height: string; // e.g., "64px", "5rem"
  link: string;
}

export interface HeaderLayoutSettings {
  sticky: boolean;
  transparent: boolean;
  height: string;
  containerMaxWidth: string;
}

export interface HeaderStyleSettings {
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
  shadow: boolean;
  navBackgroundColor: string;
  navTextColor: string;
}

export interface HeaderSettings {
  logo: HeaderLogoSettings;
  topBarIcons: HeaderIcon[];
  banners: HeaderBanner[];
  search: HeaderSearchSettings;
  layout: HeaderLayoutSettings;
  style: HeaderStyleSettings;
}

// ============ DEFAULT VALUES ============

const defaultHeaderSettings: HeaderSettings = {
  logo: {
    src: '/assets/knit.png',
    alt: 'KNIT Logo',
    height: '80px',
    link: '/',
  },
  topBarIcons: [
    {
      id: '1',
      icon: 'home',
      label: 'Home',
      href: 'https://knit.ac.in/',
      order: 0,
      visible: true,
    },
    {
      id: '2',
      icon: 'skip',
      label: 'Skip to Main Content',
      href: 'https://knit.ac.in/#main-content',
      order: 1,
      visible: true,
    },
    {
      id: '3',
      icon: 'accessibility',
      label: 'Screen Reader Access',
      href: 'https://knit.ac.in/en/article/screen-reader-access',
      order: 2,
      visible: true,
    },
    {
      id: '4',
      icon: 'rss',
      label: 'Feed',
      href: 'https://knit.ac.in/en/article/sitemap',
      order: 3,
      visible: true,
    },
    {
      id: '5',
      icon: 'globe',
      label: 'Hindi Version',
      href: 'https://knit.ac.in/hi',
      order: 4,
      visible: true,
    },
    {
      id: '6',
      icon: 'search',
      label: 'Search',
      order: 5,
      visible: true,
    },
  ],
  banners: [
    {
      id: '1',
      src: '/assets/kumbh2025.jpg',
      alt: 'Maha Kumbh 2025',
      order: 0,
      visible: true,
    },
    {
      id: '2',
      src: '/assets/kakori.jpg',
      alt: 'Kakori Train Action Shatabdi Mahotsav',
      order: 1,
      visible: true,
    },
  ],
  search: {
    enabled: true,
    placeholder: 'Search here...',
    submitText: 'Submit',
  },
  layout: {
    sticky: false,
    transparent: false,
    height: 'auto',
    containerMaxWidth: '1280px',
  },
  style: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e5e5',
    borderWidth: '1px',
    shadow: true,
    navBackgroundColor: '#153d6a',
    navTextColor: '#ffffff',
  },
};

// ============ STORAGE UTILITIES ============

const STORAGE_KEY = 'knit_cse_header_settings';

const loadHeaderSettingsFromStorage = (): HeaderSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all properties exist
      return {
        ...defaultHeaderSettings,
        ...parsed,
        logo: { ...defaultHeaderSettings.logo, ...parsed.logo },
        topBarIcons: parsed.topBarIcons || defaultHeaderSettings.topBarIcons,
        banners: parsed.banners || defaultHeaderSettings.banners,
        search: { ...defaultHeaderSettings.search, ...parsed.search },
        layout: { ...defaultHeaderSettings.layout, ...parsed.layout },
        style: { ...defaultHeaderSettings.style, ...parsed.style },
      };
    }
  } catch (error) {
    console.error('Failed to load header settings from storage:', error);
  }
  return defaultHeaderSettings;
};

const saveHeaderSettingsToStorage = (settings: HeaderSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save header settings to storage:', error);
  }
};

// ============ REACT HOOK ============

export const useHeaderSettings = () => {
  const queryClient = useQueryClient();

  // Fetch settings
  const { data: settings = defaultHeaderSettings, isLoading } = useQuery({
    queryKey: ['headerSettings'],
    queryFn: async () => {
      // Simulate async load
      await new Promise((res) => setTimeout(res, 50));
      return loadHeaderSettingsFromStorage();
    },
    staleTime: Infinity,
  });

  // Update entire settings
  const updateSettings = useMutation({
    mutationFn: async (newSettings: HeaderSettings) => {
      saveHeaderSettingsToStorage(newSettings);
      return newSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerSettings'] });
    },
  });

  // Update partial settings
  const updatePartialSettings = useMutation({
    mutationFn: async (partial: Partial<HeaderSettings>) => {
      const current =
        queryClient.getQueryData<HeaderSettings>(['headerSettings']) ||
        defaultHeaderSettings;
      const updated = { ...current, ...partial };
      saveHeaderSettingsToStorage(updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerSettings'] });
    },
  });

  // Reset to defaults
  const resetToDefaults = useMutation({
    mutationFn: async () => {
      saveHeaderSettingsToStorage(defaultHeaderSettings);
      return defaultHeaderSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['headerSettings'] });
    },
  });

  return {
    settings,
    isLoading,
    updateSettings: updateSettings.mutate,
    updatePartialSettings: updatePartialSettings.mutate,
    resetToDefaults: resetToDefaults.mutate,
    defaultSettings: defaultHeaderSettings,
  };
};
