import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCoursesApi, type ApiCourse } from '~/utils/api/useCoursesApi';
import { Link, useLocation } from 'react-router';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { courses } = useCoursesApi();
  const location = useLocation();

  const handleDropdownClick = (menu: string, e: React.MouseEvent) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setOpenDropdown(openDropdown === menu ? null : menu);
    }
  };

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="w-full flex items-center justify-between px-4 md:px-8 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="KNIT CSE"
            className="h-12 w-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-bold text-lg text-[#153D6A] tracking-wider">KNIT CSE</span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none text-gray-700"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <nav className="hidden md:flex items-center gap-7">
          <Link to="/" className={`font-medium hover:text-[#153D6A] transition-colors ${location.pathname === '/' ? 'text-[#153D6A]' : 'text-gray-700'}`}>Home</Link>
          
          {/* People Dropdown */}
          <div className="relative group cursor-pointer inline-flex h-full py-2">
            <Link to="#" className={`flex items-center gap-1 font-medium hover:text-[#153D6A] transition-colors ${['/faculty', '/staff', '/students'].includes(location.pathname) ? 'text-[#153D6A]' : 'text-gray-700'}`} onClick={e => e.preventDefault()}>
              People <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
            </Link>
            
            <div className="absolute top-full mt-2 left-0 w-52 bg-white shadow-xl rounded-lg py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-left -translate-y-2 group-hover:translate-y-0">
              
              {/* Students Cascading */}
              <div className="relative group/sub">
                <Link to="/students" className="w-full px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#153D6A] flex items-center justify-between transition-colors font-medium">
                  Students <ChevronRight size={14} className="text-gray-400 group-hover/sub:text-[#153D6A]" />
                </Link>
                {/* Courses sub-menu */}
                <div className="absolute top-0 mt-0 left-[95%] w-60 bg-white shadow-xl rounded-lg py-2 border border-gray-100 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible group-hover/sub:translate-x-2 transition-all duration-200 -translate-x-2 before:absolute before:-left-2 before:top-0 before:w-2 before:h-full">
                  {courses.length > 0 ? courses.map((c: ApiCourse) => (
                    <Link key={c.id} to={`/students?course=${c.id}`} className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#153D6A] transition-colors font-medium">
                      {c.name} ({c.degree})
                    </Link>
                  )) : (
                    <div className="px-5 py-2.5 text-sm text-gray-400 italic">No courses found</div>
                  )}
                </div>
              </div>

              <Link to="/faculty" className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#153D6A] transition-colors">Faculty</Link>
              <Link to="/staff" className="block px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#153D6A] transition-colors">Staff</Link>
            </div>
          </div>

          <Link to="/courses" className={`font-medium hover:text-[#153D6A] transition-colors ${location.pathname === '/courses' ? 'text-[#153D6A]' : 'text-gray-700'}`}>Courses</Link>
          <Link to="/photo-gallery" className={`font-medium hover:text-[#153D6A] transition-colors ${location.pathname.startsWith('/photo-gallery') ? 'text-[#153D6A]' : 'text-gray-700'}`}>Photo Gallery</Link>
          <Link to="/our-alumni" className={`font-medium hover:text-[#153D6A] transition-colors ${location.pathname === '/our-alumni' ? 'text-[#153D6A]' : 'text-gray-700'}`}>Our Alumni</Link>
          <Link to="/contact-us" className={`font-medium hover:text-[#153D6A] transition-colors ${location.pathname === '/contact-us' ? 'text-[#153D6A]' : 'text-gray-700'}`}>Contact Us</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-3 shadow-inner max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-gray-800 font-bold border-b border-gray-50">Home</Link>
            
            {/* People Mobile Accordion */}
            <div className="border-b border-gray-50">
              <button onClick={(e) => handleDropdownClick('people', e)} className="w-full flex items-center justify-between py-3 px-2 text-gray-800 font-bold">
                People <ChevronDown size={18} className={`transition-transform text-gray-500 ${openDropdown === 'people' || openDropdown === 'students' ? 'rotate-180' : ''}`} />
              </button>
              
              {(openDropdown === 'people' || openDropdown === 'students') && (
                <div className="pl-3 pb-2 pt-1 bg-gray-50 rounded-lg shrink-0 mb-2">
                  <div className="border-b border-gray-200">
                     <button onClick={(e) => handleDropdownClick('students', e)} className="w-full flex items-center justify-between py-3 px-3 text-gray-700 font-semibold">
                      Students <ChevronDown size={16} className={`transition-transform text-gray-400 ${openDropdown === 'students' ? 'rotate-180' : ''}`} />
                     </button>
                     {openDropdown === 'students' && (
                       <div className="pl-4 pb-3 pt-1 border-l-[3px] border-[#153D6A]/30 ml-4 space-y-1">
                         {courses.map((c: ApiCourse) => (
                           <Link key={c.id} to={`/students?course=${c.id}`} onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 text-[13px] font-medium text-gray-600 hover:text-[#153D6A] hover:bg-white rounded-lg">
                             {c.name}
                           </Link>
                         ))}
                       </div>
                     )}
                  </div>
                  <Link to="/faculty" onClick={() => setIsMenuOpen(false)} className="block py-3 px-3 text-gray-700 font-semibold border-b border-gray-200">Faculty</Link>
                  <Link to="/staff" onClick={() => setIsMenuOpen(false)} className="block py-3 px-3 text-gray-700 font-semibold">Staff</Link>
                </div>
              )}
            </div>

            <Link to="/courses" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-gray-800 font-bold border-b border-gray-50">Courses</Link>
            <Link to="/photo-gallery" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-gray-800 font-bold border-b border-gray-50">Photo Gallery</Link>
            <Link to="/our-alumni" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-gray-800 font-bold border-b border-gray-50">Our Alumni</Link>
            <Link to="/contact-us" onClick={() => setIsMenuOpen(false)} className="block py-3 px-2 text-gray-800 font-bold">Contact Us</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
