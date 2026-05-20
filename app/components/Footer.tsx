import { MapPin, Phone } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
        {/* College Info */}
        <div>
          <h4 className="text-xl font-semibold mb-4">KNIT CSE Department</h4>
          <div className="space-y-2 text-sm text-blue-100">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>Kamla Nehru Institute of Technology, Sultanpur, UP - 228118</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91-5362-240454
            </p>
            <p>✉️ cse@knit.ac.in</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/faculty" className="hover:underline">Faculty</a></li>
            <li><a href="/courses" className="hover:underline">Courses</a></li>
            <li><a href="/photo-gallery" className="hover:underline">Photo Gallery</a></li>
            <li><a href="/our-alumni" className="hover:underline">Our Alumni</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="text-xl font-semibold mb-4">About</h4>
          <p className="text-sm text-blue-100">
            The Department of Computer Science & Engineering at KNIT Sultanpur offers B.Tech CSE and MCA programs, dedicated to excellence in technical education and research.
          </p>
        </div>
      </div>

      <div className="py-3 text-center text-xs bg-blue-950 text-blue-200">
        <p>© {new Date().getFullYear()} KNIT CSE Department. All rights reserved.</p>
        <p className="mt-1">
          Last Updated: {new Date().toLocaleDateString()} | {new Date().toLocaleTimeString()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
