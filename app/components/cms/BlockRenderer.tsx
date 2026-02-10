import type { ContentBlock } from '~/types/cms';
import { HeroBlock } from './blocks/HeroBlock';
import { TextBlock } from './blocks/TextBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { CardGridBlock } from './blocks/CardGridBlock';
import { FacultyGridBlock } from './blocks/FacultyGridBlock';
import { CourseListBlock } from './blocks/CourseListBlock';
import { AlumniGridBlock } from './blocks/AlumniGridBlock';
import { StatsBlock } from './blocks/StatsBlock';
import { AccordionBlock } from './blocks/AccordionBlock';
import { QuoteBlock } from './blocks/QuoteBlock';

interface BlockRendererProps {
    block: ContentBlock;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
    const { type, content, settings } = block;

    // Apply custom styles from settings
    const blockStyles: React.CSSProperties = {
        backgroundColor: settings.backgroundColor,
        padding: settings.padding,
    };

    const blockClassName = `block block-${type} ${settings.className || ''}`;

    // Render different block types
    const renderBlockContent = () => {
        switch (type) {
            case 'hero':
                return <HeroBlock content={content} />;

            case 'text':
                return <TextBlock content={content} />;

            case 'image':
                return <ImageBlock content={content} />;

            case 'cards':
                return <CardGridBlock content={content} />;

            case 'faculty-grid':
                return <FacultyGridBlock content={content} />;

            case 'course-list':
                return <CourseListBlock content={content} />;

            case 'alumni-grid':
                return <AlumniGridBlock content={content} />;

            case 'stats':
                return <StatsBlock content={content} />;

            case 'accordion':
                return <AccordionBlock content={content} />;

            case 'quote':
                return <QuoteBlock content={content} />;

            case 'html':
                return (
                    <div
                        className="html-block"
                        dangerouslySetInnerHTML={{ __html: content.html || '' }}
                    />
                );

            default:
                return (
                    <div className="p-4 bg-gray-100 border border-gray-300 rounded">
                        <p className="text-gray-600 text-sm">
                            Block type "{type}" not yet implemented
                        </p>
                    </div>
                );
        }
    };


    return (
        <div className={blockClassName} style={blockStyles}>
            {settings.customCSS && (
                <style>{settings.customCSS}</style>
            )}
            {renderBlockContent()}
        </div>
    );
};
