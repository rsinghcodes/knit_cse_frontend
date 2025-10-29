import { useState } from 'react';
import { StudentFormModal } from '~/components/StudentFormModal';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export default function Students() {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  // const { students, addStudent } = useStudents();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">Students</h2>
        <Button className="bg-primary" onClick={() => setModalOpen(true)}>
          Add Student
        </Button>
      </div>
      <StudentFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(values) => console.log(values)}
      />

      <div className="flex gap-3">
        <Input
          placeholder="Search by name, roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline">Filter</Button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-600">Student list goes here...</p>
      </div>
    </div>
  );
}
