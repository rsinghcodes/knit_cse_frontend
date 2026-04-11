import React, { useState } from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { Mail, Phone, MapPin, Users, Trash2, X } from 'lucide-react';
import { useContactInfoApi, useDirectoryApi } from '~/utils/api/useContactApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableText from '~/components/admin/EditableText';
import AddItemButton from '~/components/admin/AddItemButton';
import ConfirmDialog from '~/components/admin/ConfirmDialog';

export function meta() {
    return [
        { title: 'Contact Us | KNIT CSE Department' },
        { name: 'description', content: 'Get in touch with the Computer Science & Engineering department at KNIT Sultanpur.' },
    ];
}

const INITIAL_ENTRY = {
    designation: '',
    name: '',
    mobile: '',
    email: '',
};

export default function ContactUs() {
    const { contactInfo, isLoading: infoLoading, updateField } = useContactInfoApi();
    const { entries, isLoading: dirLoading, addEntry, updateEntry, deleteEntry } = useDirectoryApi();
    const { isEditMode } = useEditMode();

    const [showAddModal, setShowAddModal] = useState(false);
    const [form, setForm] = useState(INITIAL_ENTRY);
    const [saving, setSaving] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    const handleUpdateEntry = async (id: number, field: string, value: string) => {
        await updateEntry.mutateAsync({ id, payload: { [field]: value } });
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await addEntry.mutateAsync({
                designation: form.designation,
                name: form.name,
                mobile: form.mobile,
                email: form.email,
            });
            setShowAddModal(false);
            setForm(INITIAL_ENTRY);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (deleteTarget == null) return;
        setDeleting(true);
        try {
            await deleteEntry.mutateAsync(deleteTarget);
            setDeleteTarget(null);
        } finally {
            setDeleting(false);
        }
    };

    const isLoading = infoLoading || dirLoading;

    return (
        <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <div className="bg-[#153D6A] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
                    <EditableText
                        value={contactInfo?.page_title ?? 'Contact Us'}
                        onSave={(v) => updateField('page_title', v)}
                        tag="h1"
                        className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
                    />
                    <EditableText
                        value={contactInfo?.page_subtitle ?? ''}
                        onSave={(v) => updateField('page_subtitle', v)}
                        tag="p"
                        className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light"
                        multiline
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-12 py-16 flex-grow">
                {isLoading ? (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12">
                        <div className="xl:col-span-4 space-y-8">
                            <div className="bg-gray-200 rounded-3xl h-72 animate-pulse" />
                            <div className="bg-gray-200 rounded-3xl h-80 animate-pulse" />
                        </div>
                        <div className="xl:col-span-8">
                            <div className="bg-gray-200 rounded-3xl h-96 animate-pulse" />
                        </div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12">

                        {/* Left Side: Contact Info & Map */}
                        <div className="xl:col-span-4 space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-800 mb-8">Get In Touch</h2>
                                <div className="space-y-8">
                                    {/* Location */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-[#153D6A] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <MapPin size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                                            <div className="text-gray-600 text-[15px] leading-relaxed">
                                                <EditableText
                                                    value={contactInfo?.address_line_1 ?? ''}
                                                    onSave={(v) => updateField('address_line_1', v)}
                                                    tag="span"
                                                    className="block"
                                                />
                                                <EditableText
                                                    value={contactInfo?.address_line_2 ?? ''}
                                                    onSave={(v) => updateField('address_line_2', v)}
                                                    tag="span"
                                                    className="block"
                                                />
                                                <EditableText
                                                    value={contactInfo?.address_line_3 ?? ''}
                                                    onSave={(v) => updateField('address_line_3', v)}
                                                    tag="span"
                                                    className="block"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Phone */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-[#153D6A] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Phone size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                                            {isEditMode ? (
                                                <EditableText
                                                    value={contactInfo?.phone ?? ''}
                                                    onSave={(v) => updateField('phone', v)}
                                                    tag="p"
                                                    className="text-gray-600 text-[15px]"
                                                />
                                            ) : (
                                                <p className="text-gray-600 text-[15px]">
                                                    <a href={`tel:${contactInfo?.phone?.replace(/[^0-9+]/g, '') ?? ''}`} className="hover:text-[#153D6A] transition-colors">
                                                        {contactInfo?.phone}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-[#153D6A] rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Mail size={22} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                                            {isEditMode ? (
                                                <EditableText
                                                    value={contactInfo?.email ?? ''}
                                                    onSave={(v) => updateField('email', v)}
                                                    tag="p"
                                                    className="text-gray-600 text-[15px]"
                                                />
                                            ) : (
                                                <p className="text-gray-600 text-[15px]">
                                                    <a href={`mailto:${contactInfo?.email ?? ''}`} className="hover:text-[#153D6A] transition-colors">
                                                        {contactInfo?.email}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Embed */}
                            <div className="w-full h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-inner border border-gray-100 relative group">
                                {isEditMode && (
                                    <div className="absolute top-2 left-2 right-2 z-20">
                                        <EditableText
                                            value={contactInfo?.map_embed_url ?? ''}
                                            onSave={(v) => updateField('map_embed_url', v)}
                                            tag="span"
                                            className="text-[10px] text-gray-500 bg-white/90 backdrop-blur rounded-lg px-2 py-1 block truncate"
                                            placeholder="Google Maps embed URL"
                                        />
                                    </div>
                                )}
                                <iframe
                                    src={contactInfo?.map_embed_url ?? ''}
                                    className="w-full h-full border-0 absolute inset-0 mix-blend-multiply"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="KNIT Location Map"
                                ></iframe>
                                <div className="absolute inset-0 bg-[#153D6A]/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Right Side: Administrative Directory Table */}
                        <div className="xl:col-span-8">
                            <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-full flex flex-col overflow-hidden">
                                <div className="flex items-center gap-3 mb-8">
                                    <Users className="text-[#153D6A]" size={28} />
                                    <h2 className="text-2xl font-bold text-gray-800">Administrative Directory</h2>
                                    {isEditMode && (
                                        <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow ml-auto">
                                            ✏️ Editing
                                        </span>
                                    )}
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm flex-grow">
                                    <table className="w-full text-left border-collapse whitespace-nowrap lg:whitespace-normal">
                                        <thead>
                                            <tr className="bg-[#4a4a4a] text-white">
                                                <th className="py-3.5 px-4 font-bold text-[14px] border-r border-[#5d5d5d] w-16 text-center">S.No.</th>
                                                <th className="py-3.5 px-5 font-bold text-[14px] border-r border-[#5d5d5d]">Designation</th>
                                                <th className="py-3.5 px-5 font-bold text-[14px] border-r border-[#5d5d5d]">Name</th>
                                                <th className="py-3.5 px-5 font-bold text-[14px] border-r border-[#5d5d5d]">Mobile No.</th>
                                                <th className="py-3.5 px-5 font-bold text-[14px]">E-Mail</th>
                                                {isEditMode && <th className="py-3.5 px-3 font-bold text-[14px] w-12 text-center"></th>}
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-700 text-[14.5px]">
                                            {entries.map((row, index) => (
                                                <tr
                                                    key={row.id}
                                                    className={`transition-colors hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/80'} border-b border-gray-200 last:border-b-0`}
                                                >
                                                    <td className="py-3.5 px-4 text-center border-r border-gray-200 text-gray-600 font-medium">{index + 1}</td>
                                                    <td className="py-3.5 px-5 border-r border-gray-200 font-medium text-gray-900">
                                                        <EditableText
                                                            value={row.designation}
                                                            onSave={(v) => handleUpdateEntry(row.id, 'designation', v)}
                                                            tag="span"
                                                        />
                                                    </td>
                                                    <td className="py-3.5 px-5 border-r border-gray-200">
                                                        <EditableText
                                                            value={row.name}
                                                            onSave={(v) => handleUpdateEntry(row.id, 'name', v)}
                                                            tag="span"
                                                        />
                                                    </td>
                                                    <td className="py-3.5 px-5 border-r border-gray-200">
                                                        {isEditMode ? (
                                                            <EditableText
                                                                value={row.mobile}
                                                                onSave={(v) => handleUpdateEntry(row.id, 'mobile', v)}
                                                                tag="span"
                                                                placeholder="No phone"
                                                            />
                                                        ) : row.mobile ? (
                                                            <a href={`tel:${row.mobile.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 hover:underline">{row.mobile}</a>
                                                        ) : null}
                                                    </td>
                                                    <td className="py-3.5 px-5">
                                                        {isEditMode ? (
                                                            <EditableText
                                                                value={row.email}
                                                                onSave={(v) => handleUpdateEntry(row.id, 'email', v)}
                                                                tag="span"
                                                                placeholder="No email"
                                                            />
                                                        ) : row.email ? (
                                                            <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline break-all">{row.email}</a>
                                                        ) : null}
                                                    </td>
                                                    {isEditMode && (
                                                        <td className="py-3.5 px-3 text-center">
                                                            <button
                                                                onClick={() => setDeleteTarget(row.id)}
                                                                className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                                                                title="Delete entry"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                            {entries.length === 0 && !isEditMode && (
                                                <tr>
                                                    <td colSpan={5} className="py-8 text-center text-gray-400">No directory entries available.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <AddItemButton label="Add Directory Entry" onClick={() => setShowAddModal(true)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />

            {/* Add Directory Entry Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-gray-800">Add Directory Entry</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                                <input required value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Director" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Dr. John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                                <input value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="9415041790" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="name@knit.ac.in" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 py-2.5 px-4 rounded-xl bg-[#153D6A] hover:bg-[#1a4a7f] text-white text-sm font-medium transition-colors">{saving ? 'Saving...' : 'Add Entry'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                open={deleteTarget != null}
                title="Delete Directory Entry"
                message="Are you sure you want to remove this entry from the directory?"
                onConfirm={handleDelete}
                onCancel={() => setDeleteTarget(null)}
                loading={deleting}
            />
        </div>
    );
}
