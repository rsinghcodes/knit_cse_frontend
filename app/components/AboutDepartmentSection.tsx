import React, { useState } from 'react';
import { useEditMode } from '~/context/EditModeContext';
import { useAboutApi } from '~/utils/api/useAboutApi';
import EditableText from '~/components/admin/EditableText';
import { Plus, Trash2, X } from 'lucide-react';
import ConfirmDialog from '~/components/admin/ConfirmDialog';

const AboutDepartmentSection: React.FC = () => {
    const { isEditMode } = useEditMode();
    const { about, links, isLoading, updateAbout, addLink, updateLink, deleteLink } = useAboutApi();

    const [showAddModal, setShowAddModal] = useState(false);
    const [adding, setAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newHref, setNewHref] = useState('');
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleUpdateAbout = async (field: string, value: string) => {
        await updateAbout.mutateAsync({ [field]: value });
    };

    const handleAddLinkSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAdding(true);
        try {
            await addLink.mutateAsync({ title: newTitle, href: newHref });
            setShowAddModal(false);
            setNewTitle('');
            setNewHref('');
        } finally {
            setAdding(false);
        }
    };

    const handleDeleteLink = async () => {
        if (deleteId) {
            await deleteLink.mutateAsync(deleteId);
            setDeleteId(null);
        }
    };

    if (isLoading || !about) {
        return <section className="py-6 bg-white min-h-[400px] animate-pulse" />;
    }

    return (
        <section className={`py-6 bg-white ${isEditMode ? 'ring-2 ring-inset ring-blue-300' : ''}`}>
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">

                    {/* Left Column - Main Details */}
                    <div className="md:col-span-8 space-y-4">
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold text-[#153D6A] relative inline-block mb-3">
                                About Department
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-red-500 rounded-full"></div>
                            </h2>
                        </div>

                        {isEditMode && (
                            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow mb-2 inline-block">
                                ✏️ Editing About Section
                            </span>
                        )}

                        <div className="text-gray-700 text-[15px] leading-relaxed text-justify">
                            <EditableText
                                tag="p"
                                value={about.intro_text_1}
                                onSave={(v) => handleUpdateAbout('intro_text_1', v)}
                                multiline
                                className="mb-4"
                            />
                            <EditableText
                                tag="p"
                                value={about.intro_text_2}
                                onSave={(v) => handleUpdateAbout('intro_text_2', v)}
                                multiline
                                className="mb-6"
                            />
                        </div>

                        {/* Objective */}
                        <div className="mt-8">
                            <h3 className="text-[22px] text-gray-800 font-normal border-t border-b border-dotted border-[#e53e3e] py-1.5 my-4">
                                Objective
                            </h3>
                            <EditableText
                                tag="p"
                                value={about.objective}
                                onSave={(v) => handleUpdateAbout('objective', v)}
                                multiline
                                className="text-[15px] text-gray-700 leading-relaxed text-justify mt-3"
                            />
                        </div>

                        {/* Vision */}
                        <div className="mt-6">
                            <h3 className="text-[22px] text-gray-800 font-normal border-t border-b border-dotted border-[#e53e3e] py-1.5 my-4">
                                Vision
                            </h3>
                            <EditableText
                                tag="p"
                                value={about.vision}
                                onSave={(v) => handleUpdateAbout('vision', v)}
                                multiline
                                className="text-[15px] text-gray-700 leading-relaxed text-justify mt-3"
                            />
                        </div>

                        {/* Mission */}
                        <div className="mt-6">
                            <h3 className="text-[22px] text-gray-800 font-normal border-t border-b border-dotted border-[#e53e3e] py-1.5 my-4">
                                Mission
                            </h3>
                            <div className="text-[15px] text-gray-700 leading-relaxed pl-5 mt-3">
                                <EditableText
                                    tag="p"
                                    value={about.mission}
                                    onSave={(v) => handleUpdateAbout('mission', v)}
                                    multiline
                                    className="whitespace-pre-wrap leading-loose"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="md:col-span-4 mt-8 md:mt-0">
                        <div className="border border-gray-100 shadow-sm rounded-sm overflow-hidden sticky top-6">
                            {isEditMode && (
                                <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                                    <span className="text-xs font-bold text-gray-600 uppercase">Sidebar Links</span>
                                    <button
                                        onClick={() => setShowAddModal(true)}
                                        className="text-[11px] flex items-center gap-1 bg-green-500 text-white px-2 py-1.5 rounded hover:bg-green-600 transition"
                                    >
                                        <Plus size={12} /> Add Link
                                    </button>
                                </div>
                            )}
                            <ul className="flex flex-col">
                                {links.map((link) => (
                                    <li key={link.id} className="border-b border-gray-100 last:border-0 relative group">
                                        {isEditMode ? (
                                            <div className="p-3 bg-white hover:bg-gray-50 flex items-center justify-between">
                                                <div className="flex-1 space-y-1 pr-2">
                                                    <EditableText
                                                        tag="span"
                                                        value={link.title}
                                                        onSave={async (v) => { await updateLink.mutateAsync({ id: link.id, payload: { title: v } }) }}
                                                        className="block text-[#555] text-sm"
                                                    />
                                                    <EditableText
                                                        tag="span"
                                                        value={link.href}
                                                        onSave={async (v) => { await updateLink.mutateAsync({ id: link.id, payload: { href: v } }) }}
                                                        className="block text-xs text-blue-500 underline"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setDeleteId(link.id)}
                                                    className="p-1.5 text-red-400 hover:text-white bg-red-50 hover:bg-red-500 rounded transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="block p-4 text-[13px] font-medium text-[#555] hover:bg-gray-100 hover:text-gray-900 transition-colors"
                                            >
                                                {link.title}
                                            </a>
                                        )}
                                    </li>
                                ))}
                                {!isLoading && links.length === 0 && !isEditMode && (
                                    <div className="p-6 text-center text-[13px] text-gray-400">
                                        No links available
                                    </div>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={deleteId !== null}
                title="Delete Link"
                message="Are you sure you want to remove this link from the sidebar?"
                onConfirm={handleDeleteLink}
                onCancel={() => setDeleteId(null)}
                loading={deleteLink.isPending}
            />

            {/* Add Link Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-xl font-bold text-gray-800">Add Sidebar Link</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleAddLinkSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input required value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#153D6A]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL / Href *</label>
                                <input required value={newHref} onChange={e => setNewHref(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#153D6A]" placeholder="/" />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 px-4 rounded-lg bg-gray-100 font-medium text-gray-700 hover:bg-gray-200 transition-colors">Cancel</button>
                                <button type="submit" disabled={adding} className="flex-1 py-2.5 px-4 rounded-lg bg-[#153D6A] text-white font-medium hover:bg-[#1a4a7f] transition-colors disabled:opacity-70">{adding ? 'Adding...' : 'Add Link'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AboutDepartmentSection;
