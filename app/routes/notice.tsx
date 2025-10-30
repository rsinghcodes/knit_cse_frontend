import { useState } from 'react';
import { NoticeFormModal } from '~/components/NoticeFormModal';
import { NoticeTable } from '~/components/NoticeTable';
import { Button } from '~/components/ui/button';
import type { Notice } from '~/utils/useNotice';
import { noticeData } from '~/utils/useNotice';

const NoticePage = () => {
  // const { notices, addNotice, updateNotice, deleteNotice } = useNotice();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Notice | null>(null);

  const handleAdd = (values: Omit<Notice, 'id'>) => {
    // addNotice.mutate(values);
    console.log(values);
  };
  const handleUpdate = (values: Notice) => {
    // updateNotice.mutate(values);
    console.log(values);
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this notice?')) {
      // deleteNotice.mutate(id);
      console.log('Deleted notice with id:', id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#153D6A]">
          Notice & Circular Management
        </h1>
        <Button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Notice
        </Button>
      </div>

      <NoticeTable
        notices={noticeData}
        onEdit={(n) => {
          setEditData(n);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <NoticeFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={editData || undefined}
        onSubmit={(values) => {
          editData
            ? handleUpdate({ ...values, id: editData.id })
            : handleAdd(values);
        }}
      />
    </div>
  );
};

export default NoticePage;
