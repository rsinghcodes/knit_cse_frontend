import React from 'react';

const Header: React.FC = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto flex items-center justify-between py-2 px-4">
      <div className="flex items-center space-x-3">
        <img src="/assets/knit.png" alt="KNIT Logo" className="h-28" />
      </div>
      <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
        <a href="#">About Us</a>
        <a href="#">Academics</a>
        <a href="#">Departments</a>
        <a href="#">Placements</a>
        <a href="#">Media</a>
        <a href="#">Contact</a>
      </nav>
    </div>
  </header>
);

export default Header;
