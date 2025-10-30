import { useState } from 'react';
import { HighlightFormModal } from '~/components/HighlightFormModal';
import { HighlightsTable } from '~/components/HighlightsTable';
import { Button } from '~/components/ui/button';
import type { Highlight } from '~/utils/useHighlights';
import { highlightsData } from '~/utils/useHighlights';

const HighlightsPage = () => {
  // const { highlights, addHighlight, updateHighlight, deleteHighlight } =
  //   useHighlights();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<Highlight | null>(null);

  const handleAdd = (data: Omit<Highlight, 'id' | 'createdAt'>) => {
    // addHighlight.mutate(data);
    console.log(data);
  };
  const handleUpdate = (data: Highlight) => {
    // updateHighlight.mutate(data);
    console.log(data);
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this highlight?')) {
      // deleteHighlight.mutate(id);
      console.log('Deleted highlight with id:', id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#153D6A]">
          Highlights Management
        </h1>
        <Button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
        >
          + Add Highlight
        </Button>
      </div>

      <HighlightsTable
        highlights={highlightsData}
        onEdit={(h) => {
          setEditData(h);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <HighlightFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={editData || undefined}
        onSubmit={(values) => {
          editData
            ? handleUpdate({
                ...values,
                id: editData.id,
                createdAt: editData.createdAt,
              })
            : handleAdd(values);
        }}
      />
    </div>
  );
};

export default HighlightsPage;
