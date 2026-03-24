import React from 'react';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { Mail, Phone, MapPin, Users } from 'lucide-react';

export function meta() {
    return [
        { title: 'Contact Us | KNIT CSE Department' },
        { name: 'description', content: 'Get in touch with the Computer Science & Engineering department at KNIT Sultanpur.' },
    ];
}

const directoryData = [
    { id: 1, designation: 'Director', name: 'Dr. R.K. Upadhyay', mobile: '9415041790 (O)', email: 'director@knit.ac.in' },
    { id: 2, designation: 'Registrar', name: 'Prof. A.K. Chauhan', mobile: '9307448592', email: 'registrar@knit.ac.in' },
    { id: 3, designation: 'Finance & Accounts Officer', name: 'Mr. Vipin Dwivedi', mobile: '', email: '' },
    { id: 4, designation: 'Dean of Academic Affair', name: 'Prof. A. K. Malviya', mobile: '9415797975', email: 'anilkmalviya@yahoo.com' },
    { id: 5, designation: 'Dean of Student welfare', name: 'Prof. Harsh Vikram Singh', mobile: '9450990114', email: '' },
    { id: 6, designation: 'Dean R&D', name: 'Prof. H.K. Mishra', mobile: '9407570623', email: '' },
    { id: 7, designation: 'Chairman CSA', name: 'Prof. Pradeep Kumar', mobile: '8004298741', email: '' },
    { id: 8, designation: 'In-charge Security', name: 'Prof. S. P. Kutar', mobile: '9454869441', email: '' },
    { id: 9, designation: 'Controller of Exam', name: 'Prof. R. K. Singh', mobile: '9415962461', email: 'coe@knit.ac.in' },
    { id: 10, designation: 'Prof. In-charge, T&P', name: 'Prof. D.L. Gupta', mobile: '9415156184', email: 'dlgupta@knit.ac.in' },
    { id: 11, designation: 'Prof.In-charge, Library', name: 'Prof. R.P. Tripathi', mobile: '9837239545', email: 'rp.tripathi@knit.ac.in' },
];

export default function ContactUs() {
    return (
        <div className="font-sans min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <div className="bg-[#153D6A] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="container mx-auto px-4 md:px-12 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-light">
                        We're here to help and answer any questions you might have about the Computer Science & Engineering department.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-12 py-16 flex-grow">
                <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-12">
                    
                    {/* Left Side: Contact Info & Map */}
                    <div className="xl:col-span-4 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-8">Get In Touch</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#153D6A] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                                        <p className="text-gray-600 text-[15px] leading-relaxed">
                                            Kamla Nehru Institute of Technology,<br />
                                            Sultanpur, Uttar Pradesh - 228118,<br />
                                            India
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#153D6A] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                                        <p className="text-gray-600 text-[15px]">
                                            <a href="tel:+915362240454" className="hover:text-[#153D6A] transition-colors">+91-5362-240454</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-[#153D6A] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                                        <p className="text-gray-600 text-[15px]">
                                            <a href="mailto:cse@knit.ac.in" className="hover:text-[#153D6A] transition-colors">cse@knit.ac.in</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="w-full h-80 bg-gray-200 rounded-3xl overflow-hidden shadow-inner border border-gray-100 relative group">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14309.832717983633!2d82.07223635541991!3d26.2792611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a7c86d691219f%3A0x99a3eb1e7c07f78f!2sKamla%20Nehru%20Institute%20of%20Technology%2C%20Sultanpur%20(U.P.)!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                                className="w-full h-full border-0 absolute inset-0 mix-blend-multiply" 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="KNIT Location Map"
                            ></iframe>
                            <div className="absolute inset-0 bg-[#153D6A]/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
                        </div>
                    </div>

                    {/* Right Side: Administrative Directory Table */}
                    <div className="xl:col-span-8">
                        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 h-full flex flex-col overflow-hidden">
                            <div className="flex items-center gap-3 mb-8">
                                <Users className="text-[#153D6A]" size={28} />
                                <h2 className="text-2xl font-bold text-gray-800">Administrative Directory</h2>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm flex-grow">
                                <table className="w-full text-left border-collapse whitespace-nowrap lg:whitespace-normal">
                                    <thead>
                                        <tr className="bg-[#4a4a4a] text-white">
                                            <th className="py-3.5 px-4 font-bold text-[14px] border-r border-[#5d5d5d] w-16 text-center">S.No.</th>
                                            <th className="py-3.5 px-5 font-bold text-[14px] border-r border-[#5d5d5d]">Designation</th>
                                            <th className="py-3.5 px-5 font-bold text-[14px] border-r border-[#5d5d5d]">Name</th>
                                            <th className="py-3.5 px-5 font-bold text-[14px] border-r border-[#5d5d5d]">Mobile No.</th>
                                            <th className="py-3.5 px-5 font-bold text-[14px]">E-Mail</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700 text-[14.5px]">
                                        {directoryData.map((row, index) => (
                                            <tr 
                                                key={row.id} 
                                                className={`transition-colors hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/80'} border-b border-gray-200 last:border-b-0`}
                                            >
                                                <td className="py-3.5 px-4 text-center border-r border-gray-200 text-gray-600 font-medium">{row.id}</td>
                                                <td className="py-3.5 px-5 border-r border-gray-200 font-medium text-gray-900">{row.designation}</td>
                                                <td className="py-3.5 px-5 border-r border-gray-200">{row.name}</td>
                                                <td className="py-3.5 px-5 border-r border-gray-200">
                                                    {row.mobile ? (
                                                        <a href={`tel:${row.mobile.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 hover:underline">{row.mobile}</a>
                                                    ) : (
                                                        null
                                                    )}
                                                </td>
                                                <td className="py-3.5 px-5">
                                                    {row.email ? (
                                                        <a href={`mailto:${row.email}`} className="text-blue-600 hover:underline break-all">{row.email}</a>
                                                    ) : (
                                                        null
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
