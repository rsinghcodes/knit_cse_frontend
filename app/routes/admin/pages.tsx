import React, { useState } from 'react';
import { usePages } from '~/utils/usePages';
import { useNavigate } from 'react-router';
import {
    Plus,
    Search,
    Eye,
    Edit,
    Copy,
    Trash2,
    Download,
    Upload,
} from 'lucide-react';
import type { Page, PageStatus } from '~/types/cms';

export default function AdminPages() {
    const navigate = useNavigate();
    const {
        pages,
        isLoading,
        createPage,
        deletePage,
        duplicatePage,
        exportPages,
        importPages,
    } = usePages();

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all');

    const filteredPages = pages.filter((page) => {
        const matchesSearch =
            page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            page.slug.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || page.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleCreatePage = async () => {
        try {
            const newPage = await new Promise<Page>((resolve, reject) => {
                createPage(
                    { title: 'New Page' },
                    {
                        onSuccess: (page) => resolve(page as Page),
                        onError: reject,
                    }
                );
            });
            navigate(`/admin/pages/${newPage.id}`);
        } catch (error) {
            alert('Failed to create page');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this page?')) return;

        try {
            await new Promise<void>((resolve, reject) => {
                deletePage(id, {
                    onSuccess: () => resolve(),
                    onError: reject,
                });
            });
        } catch (error) {
            alert('Failed to delete page');
        }
    };

    const handleDuplicate = async (id: string) => {
        try {
            const duplicated = await new Promise<Page>((resolve, reject) => {
                duplicatePage(id, {
                    onSuccess: (page) => resolve(page as Page),
                    onError: reject,
                });
            });
            navigate(`/admin/pages/${duplicated.id}`);
        } catch (error) {
            alert('Failed to duplicate page');
        }
    };

    const handleImport = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                try {
                    await importPages(file);
                    alert('Pages imported successfully!');
                } catch (error) {
                    alert('Failed to import pages');
                }
            }
        };
        input.click();
    };

    const getStatusBadgeColor = (status: PageStatus) => {
        switch (status) {
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'draft':
                return 'bg-yellow-100 text-yellow-800';
            case 'archived':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading pages...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
                        <p className="text-gray-600 mt-1">
                            Manage your website pages - {pages.length} total
                        </p>
                    </div>
                    <button
                        onClick={handleCreatePage}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Page
                    </button>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search pages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as PageStatus | 'all')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={exportPages}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Export pages"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleImport}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            title="Import pages"
                        >
                            <Upload className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Pages Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {filteredPages.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">
                            {searchQuery || statusFilter !== 'all'
                                ? 'No pages found matching your filters'
                                : 'No pages yet'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <button
                                onClick={handleCreatePage}
                                className="text-blue-600 hover:underline"
                            >
                                Create your first page
                            </button>
                        )}
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Updated
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPages.map((page) => (
                                <tr key={page.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {page.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600">/{page.slug}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(
                                                page.status
                                            )}`}
                                        >
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(page.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {page.status === 'published' && (
                                                <a
                                                    href={`/pages/${page.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                                    title="View page"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            )}
                                            <button
                                                onClick={() => navigate(`/admin/pages/${page.id}`)}
                                                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                                title="Edit page"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDuplicate(page.id)}
                                                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                                                title="Duplicate page"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(page.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                                                title="Delete page"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
