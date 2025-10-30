import { useState } from 'react';
import { AlumniFormModal } from '~/components/AlumniFormModal';
import { AlumniTable } from '~/components/AlumniTable';
import { Button } from '~/components/ui/button';
import type { Alumni } from '~/utils/useAlumni';
import { alumniData } from '~/utils/useAlumni';

const AlumniPage = () => {
  //   const { alumni, addAlumni, updateAlumni, deleteAlumni } = useAlumni();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Alumni | null>(null);

  const handleAdd = (values: Omit<Alumni, 'id'>) => {
    // addAlumni.mutate(values);
  };

  const handleUpdate = (values: Alumni) => {
    // updateAlumni.mutate(values);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this alumni?')) {
      // deleteAlumni.mutate(id)
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#153D6A]">
          Alumni Management
        </h1>
        <Button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Alumni
        </Button>
      </div>

      <AlumniTable
        alumni={alumniData}
        onEdit={(a) => {
          setEditData(a);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <AlumniFormModal
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

export default AlumniPage;
