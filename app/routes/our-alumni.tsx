'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import AlumniCard from '~/components/AlumniCard';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { Input } from '~/components/ui/input';
import { useAlumni } from '~/utils/useAlumni';
import type { Route } from './+types/our-alumni';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Our Alumni | KNIT CSE Department' },
        {
            name: 'description',
            content:
                'Meet our successful alumni from the Department of Computer Science & Engineering, KNIT Sultanpur, working at top companies worldwide.',
        },
    ];
}

export default function OurAlumni() {
    const { alumni } = useAlumni();
    const [search, setSearch] = useState('');
    const [filterBatch, setFilterBatch] = useState('');
    const [filterCompany, setFilterCompany] = useState('');

    // Get unique batches and companies for filters
    const batches = useMemo(
        () => [...new Set(alumni.map((a) => a.batch))].sort(),
        [alumni]
    );

    const companies = useMemo(
        () => [...new Set(alumni.map((a) => a.company))].sort(),
        [alumni]
    );

    // Filter alumni
    const filteredAlumni = useMemo(() => {
        return alumni.filter((a) => {
            const matchesSearch = a.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesBatch = !filterBatch || a.batch === filterBatch;
            const matchesCompany = !filterCompany || a.company === filterCompany;
            return matchesSearch && matchesBatch && matchesCompany;
        });
    }, [alumni, search, filterBatch, filterCompany]);

    return (
        <div className="font-sans bg-white min-h-screen">
            <Header />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-[#153D6A] to-[#1a4a7f] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Alumni</h1>
                    <p className="text-lg md:text-xl text-blue-100">
                        Proud graduates making an impact in the tech industry
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-12">
                {/* Search and Filters */}
                <div className="mb-8 flex flex-wrap gap-4 items-center">
                    {/* Search */}
                    <div className="flex-1 min-w-[250px] max-w-md relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            type="text"
                            placeholder="Search alumni by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Filter by Batch */}
                    <select
                        value={filterBatch}
                        onChange={(e) => setFilterBatch(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
                        <option value="">All Batches</option>
                        {batches.map((batch) => (
                            <option key={batch} value={batch}>
                                {batch}
                            </option>
                        ))}
                    </select>

                    {/* Filter by Company */}
                    <select
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm bg-white"
                    >
                        <option value="">All Companies</option>
                        {companies.map((company) => (
                            <option key={company} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>

                    {/* Results Count */}
                    <div className="text-sm text-gray-600">
                        Showing <span className="font-semibold">{filteredAlumni.length}</span> of{' '}
                        <span className="font-semibold">{alumni.length}</span> alumni
                    </div>
                </div>

                {/* Alumni Grid */}
                {filteredAlumni.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">
                            {alumni.length === 0
                                ? 'No alumni data available yet.'
                                : 'No alumni found matching your search criteria.'}
                        </p>
                        {search || filterBatch || filterCompany ? (
                            <button
                                onClick={() => {
                                    setSearch('');
                                    setFilterBatch('');
                                    setFilterCompany('');
                                }}
                                className="mt-4 text-[#153D6A] hover:underline"
                            >
                                Clear filters
                            </button>
                        ) : null}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAlumni.map((alumnus) => (
                            <AlumniCard key={alumnus.id} alumni={alumnus} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
