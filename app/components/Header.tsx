'use client';

import {
  Accessibility,
  Globe,
  Home,
  Menu,
  Rss,
  Search,
  ThumbsUp,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { useHeaderSettings } from '~/utils/useHeaderSettings';

export default function Header() {
  const { settings: siteSettings } = useSiteSettingsContext();
  const { settings: headerSettings } = useHeaderSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Icon component mapping
  const getIconComponent = (iconType: string) => {
    const iconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
      home: Home,
      skip: ThumbsUp,
      accessibility: Accessibility,
      rss: Rss,
      globe: Globe,
      search: Search,
    };
    return iconMap[iconType] || Home;
  };

  const headerStyle: React.CSSProperties = {
    background: headerSettings.layout.transparent ? 'transparent' : headerSettings.style.backgroundColor,
    borderBottom: `${headerSettings.style.borderWidth} solid ${headerSettings.style.borderColor}`,
    boxShadow: headerSettings.style.shadow ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
    position: headerSettings.layout.sticky ? 'sticky' : 'relative',
    top: headerSettings.layout.sticky ? 0 : 'auto',
    zIndex: headerSettings.layout.sticky ? 50 : 'auto',
  };

  return (
    <header className="w-full" style={headerStyle}>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 py-3 relative gap-4">
        <div className="flex items-center space-x-3">
          <a href={headerSettings.logo.link}>
            <img
              src={headerSettings.logo.src}
              alt={headerSettings.logo.alt}
              style={{ height: headerSettings.logo.height }}
              className="w-auto"
            />
          </a>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-auto items-center lg:items-end">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {headerSettings.topBarIcons
              .filter((icon) => icon.visible)
              .sort((a, b) => a.order - b.order)
              .map((icon) => {
                const IconComponent = getIconComponent(icon.icon);

                if (icon.icon === 'search') {
                  return headerSettings.search.enabled ? (
                    <button
                      key={icon.id}
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      title={icon.label}
                      className="cursor-pointer"
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: siteSettings.theme.colors.primary }}
                      />
                    </button>
                  ) : null;
                }

                return (
                  <a key={icon.id} href={icon.href} title={icon.label}>
                    <IconComponent
                      className="w-5 h-5"
                      style={{ color: siteSettings.theme.colors.primary }}
                    />
                  </a>
                );
              })}
          </div>

          {isSearchOpen && headerSettings.search.enabled && (
            <div className="absolute top-full right-4 bg-white border shadow-md p-4 rounded-md mt-2 z-50 w-64">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Site Search
                </h4>
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={headerSettings.search.placeholder}
                  className="border rounded-md px-2 py-1 w-full text-sm"
                />
                <button
                  className="text-white text-xs px-3 py-1 rounded"
                  style={{ background: siteSettings.theme.colors.primary }}
                >
                  {headerSettings.search.submitText}
                </button>
              </div>
            </div>
          )}

          {headerSettings.banners.filter((b) => b.visible).length > 0 && (
            <div className="flex justify-center lg:justify-end gap-4">
              {headerSettings.banners
                .filter((banner) => banner.visible)
                .sort((a, b) => a.order - b.order)
                .map((banner) => (
                  <img
                    key={banner.id}
                    src={banner.src}
                    alt={banner.alt}
                    className="h-10 md:h-12 w-auto"
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      <nav
        className="text-white"
        style={{
          background: headerSettings.style.navBackgroundColor,
          color: headerSettings.style.navTextColor,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            style={{ color: headerSettings.style.navTextColor }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <ul
            className={`flex-col md:flex-row md:flex md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto transition-all duration-300 ${isMenuOpen ? 'flex' : 'hidden'
              }`}
            style={{ background: headerSettings.style.navBackgroundColor }}
          >
            {siteSettings.content.navigation.map((item) => (
              <li key={item.id} className="px-4 py-1.5 md:px-1 rounded-md">
                <a
                  href={item.href}
                  className="block font-medium"
                  style={{ color: headerSettings.style.navTextColor }}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
