import { MapPin, Phone } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[--color-primary] pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/20">
        {/* --- College Info --- */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/assets/logo.png"
              alt="KNIT Logo"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h3 className="text-lg font-bold">
                Kamla Nehru Institute of Technology, Sultanpur
              </h3>
              <p className="text-sm text-gray-200 mt-1">
                Estd: 1979 | AKTU College Code: 104
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-200">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5" />
              <span>
                Sultanpur - Kadipur Road,
                <br />
                Sultanpur, Uttar Pradesh 228118
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 05362 240 454
            </p>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[--secondary]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Vision & Mission
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Downloads
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Locate Us
              </a>
            </li>
          </ul>
        </div>

        {/* --- Support --- */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[--secondary]">
            Support
          </h4>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* --- Policies --- */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-[--secondary]">
            Policies
          </h4>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hyperlinking Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Copyright Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Security Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="bg-[#0e2a4a] py-3 text-center text-xs text-gray-300">
        <p>
          © Kamla Nehru Institute of Technology, Sultanpur (U.P.) |{' '}
          <span className="text-[--secondary]">Number of Visitors:</span>{' '}
          674,695
        </p>
        <p>
          Last Updated On:{' '}
          <span className="text-[--secondary]">18 October 2025 | 02:32 PM</span>
        </p>
        <p className="mt-1">
          For any query regarding this website, please contact the{' '}
          <span className="text-[--secondary] font-medium">
            “Web Information Manager”
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
