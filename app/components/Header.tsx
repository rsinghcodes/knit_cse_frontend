'use client';

import {
  Accessibility,
  Globe,
  Home,
  Menu,
  Rss,
  Search,
  ThumbsUp,
  X,
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="w-full border-b shadow-sm bg-white">
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 relative">
        <div className="flex items-center space-x-3">
          <a href="/">
            <img
              src="/assets/knit.png"
              alt="Kamla Nehru Institute of Technology, Sultanpur (U.P.)"
              className="h-20 md:h-24 w-auto"
            />
          </a>
        </div>

        <div className="flex justify-around flex-col gap-4">
          <div className="flex items-center gap-3">
            <a href="https://knit.ac.in/" title="Home">
              <Home className="text-[#153D6A] w-5 h-5" />
            </a>
            <a
              href="https://knit.ac.in/#main-content"
              title="Skip to Main Content"
            >
              <ThumbsUp className="text-[#153D6A] w-5 h-5" />
            </a>
            <a
              href="https://knit.ac.in/en/article/screen-reader-access"
              title="Screen Reader Access"
            >
              <Accessibility className="text-[#153D6A] w-5 h-5" />
            </a>
            <a href="https://knit.ac.in/en/article/sitemap" title="Feed">
              <Rss className="text-[#153D6A] w-5 h-5" />
            </a>
            <a href="https://knit.ac.in/hi" title="Hindi Version">
              <Globe className="text-[#153D6A] w-5 h-5" />
            </a>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search"
              className="cursor-pointer"
            >
              <Search className="text-[#153D6A] w-5 h-5" />
            </button>
          </div>

          {isSearchOpen && (
            <div className="absolute top-full right-4 bg-white border shadow-md p-4 rounded-md mt-2 z-50 w-64">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800 text-sm">
                  Site Search
                </h4>
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="border rounded-md px-2 py-1 w-full text-sm"
                />
                <button className="bg-[#153D6A] text-white text-xs px-3 py-1 rounded">
                  Submit
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <img
              src="/assets/kumbh2025.jpg"
              alt="Maha Kumbh 2025"
              className="h-12 w-auto"
            />
            <img
              src="/assets/kakori.jpg"
              alt="Kakori Train Action Shatabdi Mahotsav"
              className="h-12 w-auto"
            />
          </div>
        </div>
      </div>
      <nav className="bg-[#153D6A] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          <ul
            className={`flex-col md:flex-row md:flex md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-[#153D6A] transition-all duration-300 ${
              isMenuOpen ? 'flex' : 'hidden'
            }`}
          >
            {[
              'Academics',
              'Departments',
              'Training & Placements',
              'Media',
              'Contact Us',
            ].map((item) => (
              <li key={item} className="px-4 py-1.5 md:px-1 rounded-md">
                <a href="#" className="block font-medium">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
