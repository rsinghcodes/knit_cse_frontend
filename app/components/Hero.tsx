import React from 'react';
import { useSiteSettingsContext } from '~/context/SiteSettingsContext';

const Hero: React.FC = () => {
  const { settings } = useSiteSettingsContext();
  const { hero } = settings.content;

  return (
    <section
      className="text-center py-10 md:py-16 px-4"
      style={{
        background: hero.backgroundColor || `var(--accent)`,
      }}
    >
      {hero.showLogo && (
        <img
          src={settings.branding.heroLogo}
          alt="Institute Logo"
          className="mx-auto w-24 h-24 md:w-32 md:h-32 mb-4"
        />
      )}
      {hero.welcomeText && (
        <h2 className="text-lg md:text-xl font-semibold" style={{ color: 'var(--secondary)' }}>
          {hero.welcomeText}
        </h2>
      )}
      <h1 className="text-2xl md:text-3xl font-bold mt-2" style={{ color: 'var(--primary)' }}>
        {hero.mainHeading}
      </h1>
      <h1 className="text-lg md:text-xl font-bold mt-2" style={{ color: 'var(--primary)' }}>
        {hero.subHeading}
      </h1>
      {hero.description && (
        <p className="text-gray-600 mt-2 text-xs md:text-sm max-w-2xl mx-auto">
          {hero.description}
        </p>
      )}
    </section>
  );
};

export default Hero;
