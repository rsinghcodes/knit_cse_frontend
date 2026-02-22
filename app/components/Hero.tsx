import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-10 md:py-16 px-4 bg-blue-50">
      <img
        src="/logo.png"
        alt="Institute Logo"
        className="mx-auto w-24 h-24 md:w-32 md:h-32 mb-4"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
      <h2 className="text-lg md:text-xl font-semibold text-blue-600">
        Welcome to
      </h2>
      <h1 className="text-2xl md:text-3xl font-bold mt-2 text-blue-900">
        Department of Computer Science & Engineering
      </h1>
      <h1 className="text-lg md:text-xl font-bold mt-2 text-blue-800">
        Kamla Nehru Institute of Technology, Sultanpur
      </h1>
      <p className="text-gray-600 mt-2 text-xs md:text-sm max-w-2xl mx-auto">
        Striving for excellence in technical education, research, and innovation since 1962.
      </p>
    </section>
  );
};

export default Hero;
