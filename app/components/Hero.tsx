import React from 'react';

const Hero: React.FC = () => (
  <section className="text-center py-15 bg-accent">
    <img
      src="/assets/logo.jpg"
      alt="Institute Logo"
      className="mx-auto w-32 h-32 mb-4"
    />
    <h2 className="text-xl font-semibold text-secondary">Welcome To</h2>
    <h1 className="text-3xl font-bold text-primary mt-2">
      Department of Computer Science & Engineering
    </h1>
    <h1 className="text-xl font-bold text-primary mt-2">
      Kamla Nehru Institute of Technology, Sultanpur
    </h1>
    <p className="text-gray-600 mt-2 text-sm">
      An Autonomous Government Funded Institute Affiliated to Dr. A.P.J. Abdul
      Kalam Technical University, Lucknow
    </p>
  </section>
);

export default Hero;
