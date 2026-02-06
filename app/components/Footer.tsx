import { MapPin, Phone } from 'lucide-react';
import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';

const Footer: React.FC = () => {
  const { settings } = useSiteSettingsContext();
  const { footer } = settings.content;
  const { contactInfo } = footer;

  return (
    <footer className="pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/20">
        {/* --- College Info --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={settings.branding.footerLogo}
              alt={settings.branding.siteName}
              className="w-16 h-16 object-contain"
            />
            <p className="text-sm mt-1">
              {contactInfo.establishedYear && `Estd: ${contactInfo.establishedYear}`}
              {contactInfo.establishedYear && contactInfo.collegeCode && ' | '}
              {contactInfo.collegeCode && `AKTU College Code: ${contactInfo.collegeCode}`}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            {contactInfo.address && (
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>{contactInfo.address}</span>
              </p>
            )}
            {contactInfo.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {contactInfo.phone}
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
        {footer.sections.map((section) => (
          <div key={section.id}>
            <h4 className="text-xl font-semibold mb-4 text-[--secondary]">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="py-3 text-center text-xs text-gray-300" style={{ background: 'var(--primary)' }}>
        <p>
          {footer.copyright}
          {footer.showVisitorCount && (
            <>
              {' | '}
              <span>Number of Visitors:</span> 674,695
            </>
          )}
        </p>
        {footer.showLastUpdated && (
          <p className="mt-2">
            Last Updated On: <span>{new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}</span>
          </p>
        )}
        {footer.developerCredit && (
          <p>
            {footer.developerCredit}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
