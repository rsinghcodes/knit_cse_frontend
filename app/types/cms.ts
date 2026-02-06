// CMS Type Definitions for Page and Block Management

export type PageStatus = 'draft' | 'published' | 'archived';
export type PageTemplate = 'default' | 'full-width' | 'sidebar' | 'custom';
export type BlockType = 'hero' | 'text' | 'image' | 'gallery' | 'cards' | 'form' | 'custom' | 'html';

export interface SEOSettings {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    canonical?: string;
}

export interface ContentBlock {
    id: string;
    type: BlockType;
    content: Record<string, any>;
    settings: {
        visible: boolean;
        className?: string;
        customCSS?: string;
        backgroundColor?: string;
        padding?: string;
    };
    order: number;
}

export interface Page {
    id: string;
    slug: string; // URL path
    title: string;
    status: PageStatus;
    type: 'static' | 'dynamic';
    template: PageTemplate;

    seo: SEOSettings;
    blocks: ContentBlock[];

    // Metadata
    author: string;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    parentId?: string;
    order: number;
    featuredImage?: string;
}

// Block-specific content types
export interface HeroBlockContent {
    heading: string;
    subheading?: string;
    description?: string;
    backgroundImage?: string;
    backgroundColor?: string;
    ctaText?: string;
    ctaLink?: string;
    showLogo?: boolean;
    alignment: 'left' | 'center' | 'right';
}

export interface TextBlockContent {
    content: string; // HTML content
    alignment: 'left' | 'center' | 'right' | 'justify';
}

export interface ImageBlockContent {
    src: string;
    alt: string;
    caption?: string;
    width?: string;
    alignment: 'left' | 'center' | 'right';
    link?: string;
}

export interface CardItem {
    id: string;
    image?: string;
    title: string;
    description: string;
    link?: string;
    order: number;
}

export interface CardGridBlockContent {
    title?: string;
    cards: CardItem[];
    columns: 2 | 3 | 4;
    cardStyle: 'default' | 'bordered' | 'shadow';
}

export interface GalleryBlockContent {
    images: Array<{
        id: string;
        src: string;
        alt: string;
        caption?: string;
    }>;
    layout: 'grid' | 'masonry' | 'carousel';
    columns?: number;
}

export interface FormField {
    id: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
    label: string;
    placeholder?: string;
    required: boolean;
    options?: string[]; // for select/checkbox
}

export interface FormBlockContent {
    title?: string;
    description?: string;
    fields: FormField[];
    submitButtonText: string;
    successMessage: string;
}

export interface HTMLBlockContent {
    html: string;
}

// Helper type to get content type based on block type
export type BlockContentType<T extends BlockType> =
    T extends 'hero' ? HeroBlockContent :
    T extends 'text' ? TextBlockContent :
    T extends 'image' ? ImageBlockContent :
    T extends 'cards' ? CardGridBlockContent :
    T extends 'gallery' ? GalleryBlockContent :
    T extends 'form' ? FormBlockContent :
    T extends 'html' ? HTMLBlockContent :
    Record<string, any>;
