// CMS Type Definitions for Page and Block Management

export type PageStatus = 'draft' | 'published' | 'archived';
export type PageTemplate = 'default' | 'full-width' | 'sidebar' | 'custom';
export type BlockType = 'hero' | 'text' | 'image' | 'gallery' | 'cards' | 'form' | 'custom' | 'html' |
    'faculty-grid' | 'faculty-member' |
    'course-list' | 'course-category' |
    'alumni-grid' | 'alumni-stats' |
    'stats' | 'accordion' | 'quote';

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

// Faculty Block Content Types
export interface FacultyMember {
    id: string;
    name: string;
    designation: string;
    photo?: string;
    email?: string;
    phone?: string;
    qualification?: string;
    specialization?: string;
    experience?: string;
    order: number;
}

export interface FacultyGridBlockContent {
    title?: string;
    department?: string;
    members: FacultyMember[];
    columns: 2 | 3 | 4;
    showEmail: boolean;
    showPhone: boolean;
}

// Course Block Content Types
export interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    semester?: string;
    type?: 'core' | 'elective' | 'lab';
    syllabus?: string;
    order: number;
}

export interface CourseListBlockContent {
    title?: string;
    courses: Course[];
    showCredits: boolean;
    showSemester: boolean;
    collapsible: boolean;
}

export interface CourseCategoryBlockContent {
    categoryName: string;
    courses: Course[];
    expanded: boolean;
}

// Alumni Block Content Types
export interface AlumniProfile {
    id: string;
    name: string;
    photo?: string;
    batch: string;
    degree: string;
    company?: string;
    position?: string;
    location?: string;
    testimonial?: string;
    linkedin?: string;
    order: number;
}

export interface AlumniGridBlockContent {
    title?: string;
    profiles: AlumniProfile[];
    columns: 2 | 3 | 4;
    showCompany: boolean;
    showTestimonial: boolean;
}

export interface AlumniStatsBlockContent {
    stats: Record<string, string | number>;
}

// Stats Block Content Type
export interface StatItem {
    id: string;
    value: string;        // "100" or "95"
    suffix?: string;      // "%", "+", "K", "M"
    label: string;        // "Placement Rate"
    description?: string; // Optional subtitle
    icon?: string;        // Icon name from lucide-react
    order: number;
}

export interface StatsBlockContent {
    title?: string;
    stats: StatItem[];
    columns: 2 | 3 | 4;
    backgroundColor?: string;
    animateOnScroll?: boolean;
}

// Accordion Block Content Type
export interface AccordionItem {
    id: string;
    question: string;
    answer: string;      // Supports HTML/markdown
    order: number;
    defaultOpen?: boolean;
}

export interface AccordionBlockContent {
    title?: string;
    items: AccordionItem[];
    allowMultiple: boolean;  // Allow multiple items open
    searchable?: boolean;
}

// Quote/Testimonial Block Content Type
export interface QuoteItem {
    id: string;
    text: string;
    author: string;
    authorTitle?: string;  // "Alumni, Batch 2020"
    authorPhoto?: string;
    rating?: number;       // 1-5 stars
    order: number;
}

export interface QuoteBlockContent {
    quotes: QuoteItem[];
    layout: 'card' | 'centered' | 'sidebar';
    showCarousel: boolean;
    backgroundColor?: string;
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
    T extends 'faculty-grid' ? FacultyGridBlockContent :
    T extends 'course-list' ? CourseListBlockContent :
    T extends 'course-category' ? CourseCategoryBlockContent :
    T extends 'alumni-grid' ? AlumniGridBlockContent :
    T extends 'alumni-stats' ? AlumniStatsBlockContent :
    T extends 'stats' ? StatsBlockContent :
    T extends 'accordion' ? AccordionBlockContent :
    T extends 'quote' ? QuoteBlockContent :
    Record<string, any>;

