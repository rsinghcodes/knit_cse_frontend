import React, { useState } from 'react';
import { Trash2, FileText, Megaphone, User } from 'lucide-react';
import { useCircularApi } from '~/utils/api/useCircularApi';
import { useNoticeApi } from '~/utils/api/useNoticeApi';
import { useFacultyApi } from '~/utils/api/useFacultyApi';
import { useEditMode } from '~/context/EditModeContext';
import EditableText from '~/components/admin/EditableText';
import AddItemButton from '~/components/admin/AddItemButton';
import ConfirmDialog from '~/components/admin/ConfirmDialog';
import EditableFile from '~/components/admin/EditableFile';
import FacultyCard from '~/components/FacultyCard';

/* ── Notice Item ───────────────────────────────────────────── */
interface NoticeItemProps {
  id: number;
  title: string;
  description: string;
  date: string;
  fileUrl: string | null;
  onUpdate: (id: number, field: string, value: string) => Promise<void>;
  onUploadFile: (id: number, file: File) => Promise<void>;
  onDelete: (id: number) => void;
}

const NoticeItem: React.FC<NoticeItemProps> = ({
  id, title, description, date, fileUrl, onUpdate, onUploadFile, onDelete,
}) => {
  const { isEditMode } = useEditMode();
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div className="relative flex space-x-3 border-b border-slate-300 pb-3 mb-3 group/item">
      <div className="shrink-0 bg-amber-500 w-10 h-10 flex items-center justify-center rounded-full shadow-sm">
        <Megaphone size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <EditableText
          tag="h3"
          value={title}
          onSave={(v) => onUpdate(id, 'title', v)}
          className="font-semibold text-[--foreground] text-sm leading-snug"
        />
        <EditableText
          tag="p"
          value={description}
          onSave={(v) => onUpdate(id, 'description', v)}
          className="text-xs text-gray-600 mt-1 line-clamp-2"
          multiline
          placeholder="Add description..."
        />
        <EditableText
          tag="p"
          value={date}
          onSave={(v) => onUpdate(id, 'date', v)}
          className="text-xs font-semibold text-[--secondary] mt-1"
          placeholder="DD/MM/YYYY"
        />

        {fileUrl && !isEditMode && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-md transition-colors"
          >
            <FileText size={14} />
            View Document
          </a>
        )}
        
        {isEditMode && (
          <div className="mt-2">
            <EditableFile
              label="Document (PDF/DOC)"
              currentFileUrl={fileUrl || undefined}
              onSave={(f) => onUploadFile(id, f)}
            />
          </div>
        )}
      </div>

      {isEditMode && (
        <button
          onClick={() => setConfirmDel(true)}
          className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors opacity-0 group-hover/item:opacity-100"
          title="Delete notice"
        >
          <Trash2 size={12} />
        </button>
      )}

      <ConfirmDialog
        open={confirmDel}
        title="Delete Notice"
        message={`Remove "${title}"?`}
        onConfirm={() => { onDelete(id); setConfirmDel(false); }}
        onCancel={() => setConfirmDel(false)}
      />
    </div>
  );
};

/* ── Circular Item ─────────────────────────────────────────── */
interface CircularItemProps {
  id: number;
  title: string;
  date: string;
  file_size: string;
  language: string;
  fileUrl: string | null;
  onUpdate: (id: number, field: string, value: string) => Promise<void>;
  onUploadFile: (id: number, file: File) => Promise<void>;
  onDelete: (id: number) => void;
}

const CircularItem: React.FC<CircularItemProps> = ({
  id, title, date, file_size, language, fileUrl, onUpdate, onUploadFile, onDelete,
}) => {
  const { isEditMode } = useEditMode();
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <div className="relative flex space-x-3 border-b border-slate-300 pb-3 mb-3 group/item">
      <div className="shrink-0 bg-[#153D6A] w-10 h-10 flex items-center justify-center rounded-full shadow-sm">
        <FileText size={18} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <EditableText
          tag="h3"
          value={title}
          onSave={(v) => onUpdate(id, 'title', v)}
          className="font-semibold text-gray-900 text-sm leading-snug"
        />
        <div className="flex flex-wrap gap-x-3 mt-1">
          <EditableText
            tag="span"
            value={date}
            onSave={(v) => onUpdate(id, 'date', v)}
            className="text-xs font-semibold text-gray-600"
            placeholder="DD/MM/YYYY"
          />
        </div>
        <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-2 font-medium">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
            {file_size || 'Unknown Size'}
          </span>
          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 border border-slate-200">
            {language || 'Language Unknown'}
          </span>
        </p>

        {fileUrl && !isEditMode && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-[#153D6A] hover:text-[#0b284b] bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition-colors"
          >
            <FileText size={14} />
            Download Circular
          </a>
        )}
        
        {isEditMode && (
          <div className="mt-2 text-xs">
            <EditableFile
              label="Document (PDF/DOC)"
              currentFileUrl={fileUrl || undefined}
              onSave={(f) => onUploadFile(id, f)}
            />
          </div>
        )}
      </div>

      {isEditMode && (
        <button
          onClick={() => setConfirmDel(true)}
          className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors opacity-0 group-hover/item:opacity-100"
          title="Delete circular"
        >
          <Trash2 size={12} />
        </button>
      )}

      <ConfirmDialog
        open={confirmDel}
        title="Delete Circular"
        message={`Remove "${title}"?`}
        onConfirm={() => { onDelete(id); setConfirmDel(false); }}
        onCancel={() => setConfirmDel(false)}
      />
    </div>
  );
};

/* ── Main Section ──────────────────────────────────────────── */
const Circulars: React.FC = () => {
  const { isEditMode } = useEditMode();
  const { circulars, addCircular, updateCircular, deleteCircular } = useCircularApi();
  const { notices, addNotice, updateNotice, deleteNotice } = useNoticeApi();

  /* ── handlers ── */
  const handleUpdateCircular = async (id: number, field: string, value: string) => {
    await updateCircular.mutateAsync({ id, payload: { [field]: value } });
  };
  const handleUploadCircularFile = async (id: number, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    await updateCircular.mutateAsync({ id, payload: fd });
  };
  const handleDeleteCircular = (id: number) => {
    deleteCircular.mutate(id);
  };
  const handleAddCircular = () => {
    addCircular.mutate({
      title: 'New Circular',
      date: new Date().toLocaleDateString('en-GB'),
      file_size: '',
      language: 'English',
    });
  };

  const handleUpdateNotice = async (id: number, field: string, value: string) => {
    await updateNotice.mutateAsync({ id, payload: { [field]: value } });
  };
  const handleUploadNoticeFile = async (id: number, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    await updateNotice.mutateAsync({ id, payload: fd });
  };
  const handleDeleteNotice = (id: number) => {
    deleteNotice.mutate(id);
  };
  const handleAddNotice = () => {
    addNotice.mutate({
      title: 'New Notice',
      description: '',
      date: new Date().toLocaleDateString('en-GB'),
    });
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">

        {/* ── Row 1: Notices (left) + Circulars (right) ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Department Notices */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-amber-600 mb-4 flex items-center gap-2">
              <Megaphone size={22} />
              Department Notices
            </h2>
            <div className="overflow-y-auto max-h-[420px] pr-2">
              {notices.length === 0 && !isEditMode && (
                <p className="text-gray-400 text-sm italic py-8 text-center">No notices at the moment.</p>
              )}
              {notices.map((n) => (
                <NoticeItem
                  key={n.id}
                  id={n.id}
                  title={n.title}
                  description={n.description}
                  date={n.date}
                  fileUrl={n.file_url}
                  onUpdate={handleUpdateNotice}
                  onUploadFile={handleUploadNoticeFile}
                  onDelete={handleDeleteNotice}
                />
              ))}
            </div>
            <AddItemButton label="Add Notice" onClick={handleAddNotice} />
          </div>

          {/* Circulars */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#153D6A] mb-4 flex items-center gap-2">
              <FileText size={22} />
              Circulars
            </h2>
            <div className="overflow-y-auto max-h-[420px] pr-2">
              {circulars.length === 0 && !isEditMode && (
                <p className="text-gray-400 text-sm italic py-8 text-center">No circulars at the moment.</p>
              )}
              {circulars.map((c) => (
                <CircularItem
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  date={c.date}
                  file_size={c.file_size}
                  language={c.language}
                  fileUrl={c.file_url}
                  onUpdate={handleUpdateCircular}
                  onUploadFile={handleUploadCircularFile}
                  onDelete={handleDeleteCircular}
                />
              ))}
            </div>
            <AddItemButton label="Add Circular" onClick={handleAddCircular} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Circulars;
