import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '~/components/ui/button';
import type { Alumni } from '~/utils/useAlumni';

interface Props {
  alumni: Alumni[];
  onEdit: (a: Alumni) => void;
  onDelete: (id: string) => void;
}

export const AlumniTable = ({ alumni, onEdit, onDelete }: Props) => (
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100 text-sm text-gray-700">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Batch</th>
          <th className="p-2 text-left">Company</th>
          <th className="p-2 text-left">Designation</th>
          <th className="p-2 text-left">LinkedIn</th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {alumni.map((a) => (
          <tr key={a.id} className="border-t hover:bg-gray-50">
            <td className="p-2">{a.name}</td>
            <td className="p-2">{a.batch}</td>
            <td className="p-2">{a.company}</td>
            <td className="p-2">{a.designation}</td>
            <td className="p-2">
              <a
                href={a.linkedin}
                target="_blank"
                className="text-blue-600 underline"
              >
                Profile
              </a>
            </td>
            <td className="p-2 flex justify-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(a)}>
                <Pencil size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(a.id)}
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
