import type { ImageBlockContent } from '~/types/cms';

interface ImageBlockProps {
    content: ImageBlockContent;
}

export const ImageBlock: React.FC<ImageBlockProps> = ({ content }) => {
    const { src, alt, caption, width, alignment = 'center', link } = content;

    const alignmentClasses = {
        left: 'mr-auto',
        center: 'mx-auto',
        right: 'ml-auto',
    };

    const imageElement = (
        <img
            src={src}
            alt={alt}
            className={`rounded-lg ${alignmentClasses[alignment]}`}
            style={{ width: width || 'auto', maxWidth: '100%' }}
        />
    );

    return (
        <figure className="py-8 px-4">
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {imageElement}
                </a>
            ) : (
                imageElement
            )}
            {caption && (
                <figcaption className="text-center text-sm text-gray-600 mt-2">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
};
