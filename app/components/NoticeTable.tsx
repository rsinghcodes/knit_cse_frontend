import { FileText, Pencil, Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { Notice } from '~/utils/useNotice';

interface Props {
  notices: Notice[];
  onEdit: (n: Notice) => void;
  onDelete: (id: string) => void;
}

export const NoticeTable = ({ notices, onEdit, onDelete }: Props) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100 text-sm text-gray-700">
        <tr>
          <th className="p-2 text-left">Title</th>
          <th className="p-2 text-left">Description</th>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-center">File</th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {notices.map((n) => (
          <tr key={n.id} className="border-t hover:bg-gray-50">
            <td className="p-2 font-medium">{n.title}</td>
            <td className="p-2 text-sm">{n.description}</td>
            <td className="p-2">{n.date}</td>
            <td className="p-2">{n.type}</td>
            <td className="p-2 text-center">
              {n.file ? (
                <a
                  href={n.file}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  <FileText size={18} />
                </a>
              ) : (
                '-'
              )}
            </td>
            <td className="p-2 flex justify-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(n)}>
                <Pencil size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(n.id)}
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
