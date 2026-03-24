import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AlumniCard from './AlumniCard';
import { useAlumniApi } from '~/utils/api/useAlumniApi';
import { useEditMode } from '~/context/EditModeContext';
import { Plus, X } from 'lucide-react';

const AlumniCarousel: React.FC = () => {
    const { alumni, isLoading, addAlumni, updateAlumni, deleteAlumni } = useAlumniApi();
    const { isEditMode } = useEditMode();
    const [plugins] = useState(() => [Autoplay({ delay: 3000, stopOnInteraction: true })]);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, plugins);

    // modal states for adding
    const [showAddModal, setShowAddModal] = useState(false);
    const [adding, setAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newBatch, setNewBatch] = useState('');
    const [newCompany, setNewCompany] = useState('');
    const [newDesignation, setNewDesignation] = useState('');
    const [newLinkedin, setNewLinkedin] = useState('');
    const [newPhoto, setNewPhoto] = useState<File | null>(null);

    // Stop autoplay when in edit mode
    useEffect(() => {
        if (emblaApi) {
            const autoplayPlugin = emblaApi.plugins()?.autoplay;
            if (autoplayPlugin && typeof autoplayPlugin.stop === 'function' && typeof autoplayPlugin.play === 'function') {
                if (isEditMode) {
                    autoplayPlugin.stop();
                } else {
                    try {
                        if (emblaApi.scrollSnapList().length > 0) {
                            autoplayPlugin.play();
                        }
                    } catch (e) {
                        // silently handle
                    }
                }
            }
        }
    }, [isEditMode, emblaApi]);

    const handleUpdate = async (id: number, field: string, value: string) => {
        const fd = new FormData();
        fd.append(field, value);
        await updateAlumni.mutateAsync({ id, payload: fd });
    };

    const handleUploadPhoto = async (id: number, file: File) => {
        const fd = new FormData();
        fd.append('photo', file);
        await updateAlumni.mutateAsync({ id, payload: fd });
    };

    const handleDelete = async (id: number) => {
        await deleteAlumni.mutateAsync(id);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);
        try {
            const fd = new FormData();
            fd.append('name', newName);
            fd.append('batch', newBatch);
            fd.append('company', newCompany);
            fd.append('designation', newDesignation);
            if (newLinkedin) fd.append('linkedin', newLinkedin);
            if (newPhoto) fd.append('photo', newPhoto);

            await addAlumni.mutateAsync(fd);

            setShowAddModal(false);
            setNewName('');
            setNewBatch('');
            setNewCompany('');
            setNewDesignation('');
            setNewLinkedin('');
            setNewPhoto(null);
        } finally {
            setAdding(false);
        }
    };

    if (isLoading) {
        return <section className="py-6 bg-gray-50 min-h-[400px] animate-pulse" />;
    }

    return (
        <section className={`py-6 bg-gray-50 overflow-hidden ${isEditMode ? 'ring-2 ring-inset ring-blue-300' : ''}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold text-[#153D6A]">Our Alumni</h2>
                        {isEditMode && (
                            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow mt-1">
                                ✏️ Editing Alumni
                            </span>
                        )}
                    </div>
                    <div>
                        {isEditMode ? (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white cursor-pointer px-4 py-2 rounded-lg transition text-sm font-semibold shadow-sm"
                            >
                                <Plus size={16} /> Add Alumni
                            </button>
                        ) : (
                            <a href="/our-alumni" className="text-[#153D6A] font-medium hover:underline text-sm md:text-base">
                                VIEW ALL ALUMNI &rarr;
                            </a>
                        )}
                    </div>
                </div>

                {alumni.length > 0 ? (
                    <div className="overflow-visible" ref={emblaRef}>
                        <div className="flex gap-6 pb-6 pt-2 px-2">
                            {alumni.map((alum) => (
                                <div key={alum.id} className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%] shrink-0">
                                    <AlumniCard
                                        alumni={alum}
                                        onUpdateField={handleUpdate}
                                        onUploadPhoto={handleUploadPhoto}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-500 py-10 text-center font-medium bg-white rounded-lg border border-dashed border-gray-300 mx-2">
                        No alumni found. Add some!
                    </div>
                )}
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-800">Add New Alumni</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input required value={newName} onChange={e => setNewName(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Batch *</label>
                                <input required value={newBatch} onChange={e => setNewBatch(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] outline-none" placeholder="e.g. 2019" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                                <input required value={newCompany} onChange={e => setNewCompany(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                                <input required value={newDesignation} onChange={e => setNewDesignation(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                                <input type="url" value={newLinkedin} onChange={e => setNewLinkedin(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#153D6A] outline-none" placeholder="https://linkedin.com/..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                                <input type="file" accept="image/*" onChange={e => setNewPhoto(e.target.files?.[0] || null)} className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-[#153D6A] hover:file:bg-blue-100" />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 px-4 rounded-lg bg-gray-100 font-medium text-gray-700 hover:bg-gray-200">Cancel</button>
                                <button type="submit" disabled={adding} className="flex-1 py-2.5 px-4 rounded-lg bg-[#153D6A] text-white font-medium hover:bg-[#1a4a7f] disabled:opacity-70">{adding ? 'Adding...' : 'Add Alumni'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AlumniCarousel;
