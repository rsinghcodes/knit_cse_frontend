import React from 'react';
import { quickLinks } from '../utils/data';

const QuickLinksGrid: React.FC = () => (
  <section className="bg-accent py-10">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {quickLinks.map((link, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 text-center text-sm font-medium cursor-pointer"
          >
            <img
              src={link.src}
              alt={link.title}
              className="w-8 h-8 mx-auto mb-2"
            />
            {link.title}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickLinksGrid;
