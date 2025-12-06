import React from 'react';

const Hero: React.FC = () => (
  <section className="text-center py-10 md:py-16 bg-accent px-4">
    <img
      src="/assets/logo.jpg"
      alt="Institute Logo"
      className="mx-auto w-24 h-24 md:w-32 md:h-32 mb-4"
    />
    <h2 className="text-lg md:text-xl font-semibold text-secondary">
      Welcome To
    </h2>
    <h1 className="text-2xl md:text-3xl font-bold text-primary mt-2">
      Department of Computer Science & Engineering
    </h1>
    <h1 className="text-lg md:text-xl font-bold text-primary mt-2">
      Kamla Nehru Institute of Technology, Sultanpur
    </h1>
    <p className="text-gray-600 mt-2 text-xs md:text-sm max-w-2xl mx-auto">
      An Autonomous Government Funded Institute Affiliated to Dr. A.P.J. Abdul
      Kalam Technical University, Lucknow
    </p>
  </section>
);

export default Hero;
