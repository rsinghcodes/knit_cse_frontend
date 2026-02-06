import type { TextBlockContent } from '~/types/cms';

interface TextBlockProps {
    content: TextBlockContent;
}

export const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
    const { content: htmlContent, alignment = 'left' } = content;

    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
    };

    return (
        <div className={`prose prose-lg max-w-4xl mx-auto px-4 py-8 ${alignmentClasses[alignment]}`}>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
};
