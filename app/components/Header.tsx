import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { id: '1', label: 'Home', href: '/' },
  { id: '2', label: 'Faculty', href: '/faculty' },
  { id: '3', label: 'Courses', href: '/courses' },
  { id: '4', label: 'Photo Gallery', href: '/photo-gallery' },
  { id: '5', label: 'Our Alumni', href: '/our-alumni' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-3">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="KNIT CSE"
            className="h-12 w-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-bold text-lg text-blue-800">KNIT CSE</span>
        </a>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none text-gray-700"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-gray-700 font-medium hover:text-blue-700 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="block py-2 text-gray-700 font-medium hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
