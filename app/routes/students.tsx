import { Check, ChevronDown, ChevronUp, Edit2, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { StudentFormModal } from '~/components/StudentFormModal';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useStudents } from '~/utils/useStudents';

export default function Students() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<
    'name' | 'rollNumber' | 'year' | 'course' | 'department' | 'email'
  >('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterYear, setFilterYear] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  const filteredStudents = useMemo(() => {
    let filtered = students;

    if (filterYear) {
      filtered = filtered.filter((s) => s.year === filterYear);
    }

    if (filterCourse) {
      filtered = filtered.filter((s) => s.course === filterCourse);
    }

    if (filterDept) {
      filtered = filtered.filter((s) =>
        s.department.toLowerCase().includes(filterDept.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter((s) =>
        [s.name, s.rollNumber, s.course, s.department].some((field) =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    return filtered.sort((a, b) => {
      const valA = a[sortKey]?.toString().toLowerCase();
      const valB = b[sortKey]?.toString().toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [
    students,
    search,
    sortKey,
    sortOrder,
    filterCourse,
    filterYear,
    filterDept,
  ]);

  const totalStudents = students.length;
  const totalDisplayed = filteredStudents.length;

  const handleAdd = () => {
    setSelectedStudent(null);
    setModalOpen(true);
  };

  const handleEdit = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    if (selectedStudent) updateStudent.mutate(values);
    else addStudent.mutate(values);
  };

  const handleDelete = (rollNumber: string) => {
    deleteStudent.mutate(rollNumber);
    setConfirmDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">
          College Students
        </h2>
        <Button className="bg-primary" onClick={handleAdd}>
          Add Student
        </Button>
      </div>

      {/* Modal */}
      <StudentFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedStudent}
      />

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-3 items-center">
        <Input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-74"
        />

        {/* Filter by Course */}
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="">All Years</option>
          <option value="1st">1st Year</option>
          <option value="2nd">2nd Year</option>
          <option value="3rd">3rd Year</option>
          <option value="4th">4th Year</option>
        </select>

        {/* Filter by Course */}
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="">All Courses</option>
          <option value="B.Tech">B.Tech</option>
          <option value="MCA">MCA</option>
        </select>

        {/* Filter by Department */}
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="border rounded p-2 text-sm"
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Electronics">Electronics</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
        </select>

        {/* Sorting Dropdown */}
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as any)}
          className="border rounded p-2 text-sm"
        >
          <option value="name">Sort by Name</option>
          <option value="rollNumber">Sort by Roll No</option>
          <option value="year">Sort by Year</option>
          <option value="course">Sort by Course</option>
          <option value="department">Sort by Department</option>
          <option value="email">Sort by Email</option>
        </select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
        >
          {sortOrder === 'asc' ? '⬆ Ascending' : '⬇ Descending'}
        </Button>
      </div>

      {/* Stats */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-semibold">{totalDisplayed}</span> of{' '}
        <span className="font-semibold">{totalStudents}</span> total students
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        {filteredStudents.length === 0 ? (
          <p className="text-gray-600 text-center py-6">No students found.</p>
        ) : (
          <table className="min-w-full text-sm border border-border rounded-md">
            <thead className="bg-muted text-sm text-foreground">
              <tr>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'rollNumber', label: 'Roll No' },
                  { key: 'year', label: 'Year' },
                  { key: 'course', label: 'Course' },
                  { key: 'department', label: 'Department' },
                  { key: 'email', label: 'Email' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => setSortKey(key as any)}
                    className="text-left py-3 px-4 cursor-pointer select-none hover:bg-muted/70"
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {sortKey === key &&
                        (sortOrder === 'asc' ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student, i) => (
                <tr
                  key={i}
                  className="border-t border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.rollNumber}</td>
                  <td className="py-2 px-4">{student.year}</td>
                  <td className="py-2 px-4">{student.course}</td>
                  <td className="py-2 px-4">{student.department}</td>
                  <td className="py-2 px-4">{student.email}</td>
                  <td className="py-2 px-4 text-right flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => handleEdit(student)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    {confirmDelete === student.rollNumber ? (
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          className="h-8 w-8 bg-destructive text-white"
                          onClick={() => handleDelete(student.rollNumber)}
                        >
                          <Check size={14} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => setConfirmDelete(null)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => setConfirmDelete(student.rollNumber)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
