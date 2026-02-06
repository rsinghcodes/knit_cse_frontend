import type { SiteSettings, ThemeColors, Typography, Spacing } from './useSiteSettings';

/**
 * Applies theme settings to the document root
 */
export const applyTheme = (settings: SiteSettings): void => {
    const root = document.documentElement;
    const { theme } = settings;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVarName = `--${camelToKebab(key)}`;
        root.style.setProperty(cssVarName, value);
    });

    // Apply typography variables
    root.style.setProperty('--font-family', theme.typography.fontFamily);
    root.style.setProperty('--heading-font-family', theme.typography.headingFontFamily || theme.typography.fontFamily);
    root.style.setProperty('--font-size-base', theme.typography.baseFontSize);
    root.style.setProperty('--font-size-h1', theme.typography.h1Size);
    root.style.setProperty('--font-size-h2', theme.typography.h2Size);
    root.style.setProperty('--font-size-h3', theme.typography.h3Size);
    root.style.setProperty('--font-size-h4', theme.typography.h4Size);
    root.style.setProperty('--line-height', theme.typography.lineHeight);

    // Apply font weights
    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
        root.style.setProperty(`--font-weight-${key}`, value);
    });

    // Apply spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
        const cssVarName = `--${camelToKebab(key)}`;
        root.style.setProperty(cssVarName, value);
    });

    // Apply custom CSS if present
    applyCustomCSS(settings.custom.customCSS);
};

/**
 * Applies custom CSS to the document
 */
export const applyCustomCSS = (css: string): void => {
    const existingStyle = document.getElementById('custom-site-styles');

    if (existingStyle) {
        existingStyle.textContent = css;
    } else {
        const style = document.createElement('style');
        style.id = 'custom-site-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }
};

/**
 * Removes custom CSS from the document
 */
export const removeCustomCSS = (): void => {
    const existingStyle = document.getElementById('custom-site-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
};

/**
 * Converts camelCase to kebab-case
 */
const camelToKebab = (str: string): string => {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Calculate contrast ratio between two colors
 * Used for accessibility checks
 */
export const getContrastRatio = (color1: string, color2: string): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
};

/**
 * Get relative luminance of a color
 */
const getLuminance = (color: string): number => {
    // Simple implementation - works for hex colors
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
        const v = val / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Convert hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

/**
 * Generate lighter/darker variants of a color
 */
export const generateColorVariant = (color: string, amount: number): string => {
    const rgb = hexToRgb(color);
    if (!rgb) return color;

    const adjust = (value: number) => {
        const adjusted = Math.round(value + (amount * 255));
        return Math.max(0, Math.min(255, adjusted));
    };

    const r = adjust(rgb.r);
    const g = adjust(rgb.g);
    const b = adjust(rgb.b);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

/**
 * Preset theme templates
 */
export const themePresets = {
    light: {
        mode: 'light' as const,
        colors: {
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
        } as ThemeColors,
    },
    dark: {
        mode: 'dark' as const,
        colors: {
            primary: '#60a5fa',
            secondary: '#1f2937',
            accent: '#374151',
            background: '#0f172a',
            foreground: '#f8fafc',
            muted: '#1e293b',
            mutedForeground: '#94a3b8',
            border: '#334155',
            destructive: '#ef4444',
            success: '#22c55e',
            warning: '#f97316',
        } as ThemeColors,
    },
    ocean: {
        mode: 'light' as const,
        colors: {
            primary: '#0891b2',
            secondary: '#ecfeff',
            accent: '#cffafe',
            background: '#ffffff',
            foreground: '#0f172a',
            muted: '#f0fdfa',
            mutedForeground: '#475569',
            border: '#a5f3fc',
            destructive: '#dc2626',
            success: '#14b8a6',
            warning: '#f59e0b',
        } as ThemeColors,
    },
    sunset: {
        mode: 'light' as const,
        colors: {
            primary: '#ea580c',
            secondary: '#fff7ed',
            accent: '#ffedd5',
            background: '#ffffff',
            foreground: '#1c1917',
            muted: '#fef3c7',
            mutedForeground: '#78716c',
            border: '#fed7aa',
            destructive: '#dc2626',
            success: '#16a34a',
            warning: '#eab308',
        } as ThemeColors,
    },
    forest: {
        mode: 'light' as const,
        colors: {
            primary: '#16a34a',
            secondary: '#f0fdf4',
            accent: '#dcfce7',
            background: '#ffffff',
            foreground: '#14532d',
            muted: '#f0fdf4',
            mutedForeground: '#525252',
            border: '#bbf7d0',
            destructive: '#dc2626',
            success: '#22c55e',
            warning: '#f59e0b',
        } as ThemeColors,
    },
};

/**
 * Get a preset theme by name
 */
export const getThemePreset = (name: keyof typeof themePresets) => {
    return themePresets[name];
};
