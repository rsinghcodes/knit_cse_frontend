import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Page } from '~/types/cms';

const STORAGE_KEY = 'cms_pages';

// Default empty pages array
const getDefaultPages = (): Page[] => [];

// Get pages from localStorage
const getPages = (): Page[] => {
    if (typeof window === 'undefined') return getDefaultPages();

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return getDefaultPages();

        const pages = JSON.parse(stored);
        return Array.isArray(pages) ? pages : getDefaultPages();
    } catch (error) {
        console.error('Error loading pages:', error);
        return getDefaultPages();
    }
};

// Save pages to localStorage
const savePages = (pages: Page[]): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch (error) {
        console.error('Error saving pages:', error);
    }
};

// Generate unique ID
const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Generate slug from title
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};

export const usePages = () => {
    const queryClient = useQueryClient();

    // Fetch all pages
    const { data: pages = [], isLoading } = useQuery<Page[]>({
        queryKey: ['cms-pages'],
        queryFn: getPages,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Get single page by ID
    const getPageById = (id: string): Page | undefined => {
        return pages.find(page => page.id === id);
    };

    // Get single page by slug
    const getPageBySlug = (slug: string): Page | undefined => {
        return pages.find(page => page.slug === slug && page.status === 'published');
    };

    // Create new page
    const createPage = useMutation({
        mutationFn: async (pageData: Partial<Page>): Promise<Page> => {
            const currentPages = getPages();
            const now = new Date().toISOString();

            const newPage: Page = {
                id: generateId(),
                slug: pageData.slug || generateSlug(pageData.title || 'untitled'),
                title: pageData.title || 'Untitled Page',
                status: pageData.status || 'draft',
                type: pageData.type || 'dynamic',
                template: pageData.template || 'default',
                seo: pageData.seo || {
                    metaTitle: pageData.title || 'Untitled Page',
                    metaDescription: '',
                    keywords: [],
                },
                blocks: pageData.blocks || [],
                author: 'admin', // TODO: Get from auth context
                createdAt: now,
                updatedAt: now,
                publishedAt: pageData.status === 'published' ? now : undefined,
                parentId: pageData.parentId,
                order: pageData.order || currentPages.length,
                featuredImage: pageData.featuredImage,
            };

            const updatedPages = [...currentPages, newPage];
            savePages(updatedPages);
            return newPage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
        },
    });

    // Update existing page
    const updatePage = useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Page> }): Promise<Page> => {
            const currentPages = getPages();
            const pageIndex = currentPages.findIndex(p => p.id === id);

            if (pageIndex === -1) {
                throw new Error('Page not found');
            }

            const existingPage = currentPages[pageIndex];
            const now = new Date().toISOString();

            const updatedPage: Page = {
                ...existingPage,
                ...updates,
                id: existingPage.id, // Prevent ID changes
                updatedAt: now,
                publishedAt: updates.status === 'published' && !existingPage.publishedAt
                    ? now
                    : existingPage.publishedAt,
            };

            const updatedPages = [...currentPages];
            updatedPages[pageIndex] = updatedPage;
            savePages(updatedPages);

            return updatedPage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
        },
    });

    // Delete page
    const deletePage = useMutation({
        mutationFn: async (id: string): Promise<void> => {
            const currentPages = getPages();
            const updatedPages = currentPages.filter(p => p.id !== id);
            savePages(updatedPages);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
        },
    });

    // Duplicate page
    const duplicatePage = useMutation({
        mutationFn: async (id: string): Promise<Page> => {
            const currentPages = getPages();
            const originalPage = currentPages.find(p => p.id === id);

            if (!originalPage) {
                throw new Error('Page not found');
            }

            const now = new Date().toISOString();
            const newPage: Page = {
                ...originalPage,
                id: generateId(),
                title: `${originalPage.title} (Copy)`,
                slug: `${originalPage.slug}-copy`,
                status: 'draft',
                createdAt: now,
                updatedAt: now,
                publishedAt: undefined,
            };

            const updatedPages = [...currentPages, newPage];
            savePages(updatedPages);
            return newPage;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
        },
    });

    // Get published pages only
    const getPublishedPages = (): Page[] => {
        return pages.filter(page => page.status === 'published');
    };

    // Export pages
    const exportPages = (): void => {
        const dataStr = JSON.stringify(pages, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pages-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Import pages
    const importPages = async (file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target?.result as string);
                    if (!Array.isArray(imported)) {
                        throw new Error('Invalid pages format');
                    }
                    savePages(imported);
                    queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    };

    return {
        pages,
        isLoading,
        getPageById,
        getPageBySlug,
        getPublishedPages,
        createPage: createPage.mutate,
        updatePage: updatePage.mutate,
        deletePage: deletePage.mutate,
        duplicatePage: duplicatePage.mutate,
        exportPages,
        importPages,
        isCreating: createPage.isPending,
        isUpdating: updatePage.isPending,
        isDeleting: deletePage.isPending,
    };
};
