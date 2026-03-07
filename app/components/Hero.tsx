import React from 'react';
import { useHero } from '~/utils/api/useHero';
import EditableText from '~/components/admin/EditableText';
import EditableImage from '~/components/admin/EditableImage';
import { useEditMode } from '~/context/EditModeContext';

const Hero: React.FC = () => {
  const { hero, isLoading, updateField, uploadLogo } = useHero();
  const { isEditMode } = useEditMode();

  if (isLoading || !hero) {
    return (
      <section className="text-center py-10 md:py-16 px-4 bg-blue-50 animate-pulse">
        <div className="mx-auto w-24 h-24 bg-blue-200 rounded-full mb-4" />
        <div className="h-6 bg-blue-200 rounded w-48 mx-auto mb-3" />
        <div className="h-8 bg-blue-200 rounded w-64 mx-auto mb-3" />
        <div className="h-4 bg-blue-100 rounded w-80 mx-auto" />
      </section>
    );
  }

  return (
    <section
      className={`text-center py-10 md:py-16 px-4 bg-blue-50 ${isEditMode ? 'ring-2 ring-inset ring-blue-300' : ''}`}
      style={isEditMode ? { outlineOffset: '-4px' } : {}}
    >
      {isEditMode && (
        <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 shadow">
          ✏️ Hero Section — editing
        </div>
      )}

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <EditableImage
          src={hero.logo || '/logo.png'}
          alt="Institute Logo"
          onSave={uploadLogo}
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
        />
      </div>

      {/* Welcome text */}
      <EditableText
        tag="h2"
        value={hero.welcome_text}
        onSave={(v) => updateField('welcome_text', v)}
        className="text-lg md:text-xl font-semibold text-blue-600"
      />

      {/* Dept name */}
      <EditableText
        tag="h1"
        value={hero.dept_name}
        onSave={(v) => updateField('dept_name', v)}
        className="text-2xl md:text-3xl font-bold mt-2 text-blue-900"
      />

      {/* Institute name */}
      <EditableText
        tag="h1"
        value={hero.institute_name}
        onSave={(v) => updateField('institute_name', v)}
        className="text-lg md:text-xl font-bold mt-2 text-blue-800"
      />

      {/* Tagline */}
      <EditableText
        tag="p"
        value={hero.tagline}
        onSave={(v) => updateField('tagline', v)}
        multiline
        className="text-gray-600 mt-2 text-xs md:text-sm max-w-2xl mx-auto"
      />
    </section>
  );
};

export default Hero;
