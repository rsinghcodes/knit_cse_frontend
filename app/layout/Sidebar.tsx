import clsx from 'clsx';
import {
  ImageIcon,
  LayoutDashboard,
  Newspaper,
  Star,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router';

const sidebarItems = [
  { name: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
  { name: 'Students', icon: Users, to: '/admin/students' },
  { name: 'Alumni', icon: Users, to: '/admin/alumni' },
  { name: 'Photo Gallery', icon: ImageIcon, to: '/admin/gallery' },
  { name: 'Notices', icon: Newspaper, to: '/admin/notices' },
  { name: 'Highlights', icon: Star, to: '/admin/highlights' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#153D6A] text-white flex flex-col">
      <div className="text-center py-4 font-semibold text-lg border-b border-blue-400">
        KNIT Admin
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {sidebarItems.map(({ name, icon: Icon, to }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-800'
                  : 'hover:bg-blue-700 hover:text-white text-gray-200'
              )
            }
          >
            <Icon size={18} />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
