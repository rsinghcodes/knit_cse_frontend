import { MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';
import { useFooterSettings } from '~/utils/useFooterSettings';

const Footer: React.FC = () => {
  const { settings: siteSettings } = useSiteSettingsContext();
  const { settings: footerSettings } = useFooterSettings();
  const { contactInfo } = footerSettings;

  const footerStyle: React.CSSProperties = {
    backgroundColor: footerSettings.style.backgroundColor,
    color: footerSettings.style.textColor,
    borderTop: footerSettings.style.borderTop
      ? `1px solid ${footerSettings.style.borderColor}`
      : 'none',
  };

  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[footerSettings.layout.columns] || 'md:grid-cols-4';

  return (
    <footer className="pt-10" style={footerStyle}>
      <div className={`max-w-7xl mx-auto px-4 grid grid-cols-1 ${gridColsClass} gap-10 pb-10`}>
        {/* --- College Info --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={siteSettings.branding.footerLogo}
              alt={siteSettings.branding.siteName}
              className="w-16 h-16 object-contain"
            />
            <p className="text-sm mt-1" style={{ color: footerSettings.style.textColor }}>
              {contactInfo.establishedYear && `Estd: ${contactInfo.establishedYear}`}
              {contactInfo.establishedYear && contactInfo.collegeCode && ' | '}
              {contactInfo.collegeCode && `AKTU College Code: ${contactInfo.collegeCode}`}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            {contactInfo.address && (
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: footerSettings.style.textColor }} />
                <span>{contactInfo.address}</span>
              </p>
            )}
            {contactInfo.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: footerSettings.style.textColor }} /> {contactInfo.phone}
              </p>
            )}
            {contactInfo.email && (
              <p className="flex items-center gap-2">
                ✉️ {contactInfo.email}
              </p>
            )}
          </div>
        </div>

        {/* --- Dynamic Footer Sections --- */}
        {footerSettings.sections.map((section) => (
          <div key={section.id}>
            <h4
              className="text-xl font-semibold mb-4"
              style={{ color: footerSettings.style.headingColor }}
            >
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="hover:underline"
                    style={{
                      color: footerSettings.style.linkColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = footerSettings.style.linkHoverColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = footerSettings.style.linkColor;
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="py-3 text-center text-xs"
        style={{
          background: footerSettings.style.bottomBarBackgroundColor,
          color: footerSettings.style.bottomBarTextColor,
        }}
      >
        <p>
          {footerSettings.copyright}
          {footerSettings.showVisitorCount && (
            <>
              {' | '}
              <span>Number of Visitors:</span> 674,695
            </>
          )}
        </p>
        {footerSettings.showLastUpdated && (
          <p className="mt-2">
            Last Updated On: <span>{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</span>
          </p>
        )}
        {footerSettings.developerCredit && <p>{footerSettings.developerCredit}</p>}
      </div>
    </footer>
  );
};

export default Footer;
