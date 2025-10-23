import React from 'react';
import { quickLinks } from '../utils/data';

const QuickLinksGrid: React.FC = () => (
  <section className="bg-accent py-10">
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold text-primary mb-6">Quick Links</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
