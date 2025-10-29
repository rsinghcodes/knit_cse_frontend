import { Button } from '~/components/ui/button';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm px-6 py-3">
      <h1 className="text-xl font-semibold text-[#153D6A]">Admin Dashboard</h1>
      <Button variant="outline" className="text-[#153D6A] border-[#153D6A]">
        Logout
      </Button>
    </header>
  );
}
