import { Link2, Pencil, Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { Highlight } from '~/utils/useHighlights';

interface Props {
  highlights: Highlight[];
  onEdit: (h: Highlight) => void;
  onDelete: (id: string) => void;
}

export const HighlightsTable = ({ highlights, onEdit, onDelete }: Props) => {
  if (highlights.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No highlights added yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg border">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-[#153D6A] text-white">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Title</th>
            <th className="px-4 py-2 text-left font-medium">Link</th>
            <th className="px-4 py-2 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {highlights.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.title}</td>
              <td className="px-4 py-2 text-blue-600 underline">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <Link2 size={16} className="inline mr-1" />
                  {item.link}
                </a>
              </td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(item)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
