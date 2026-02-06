import type { HeroBlockContent } from '~/types/cms';

interface HeroBlockProps {
    content: HeroBlockContent;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ content }) => {
    const {
        heading,
        subheading,
        description,
        backgroundImage,
        backgroundColor,
        ctaText,
        ctaLink,
        alignment = 'center',
    } = content;

    const alignmentClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: backgroundColor || 'var(--accent)',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <section
            className={`py-16 px-4 flex flex-col ${alignmentClasses[alignment]}`}
            style={containerStyle}
        >
            <div className="max-w-4xl">
                {subheading && (
                    <h2 className="text-lg md:text-xl font-semibold text-secondary mb-2">
                        {subheading}
                    </h2>
                )}
                {heading && (
                    <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                        {heading}
                    </h1>
                )}
                {description && (
                    <p className="text-gray-600 text-lg max-w-2xl mb-6">
                        {description}
                    </p>
                )}
                {ctaText && ctaLink && (
                    <a
                        href={ctaLink}
                        className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                        {ctaText}
                    </a>
                )}
            </div>
        </section>
    );
};
