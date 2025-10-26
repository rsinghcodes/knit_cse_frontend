import React from 'react';
import { circulars, highlights } from '~/utils/data';

interface HighlightCardProps {
  name: string;
  title: string;
  subtitle: string;
  image: string;
}

const FacultyCard: React.FC<HighlightCardProps> = ({
  name,
  title,
  subtitle,
  image,
}) => (
  <div className="flex items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-all">
    <img
      src={image}
      alt={name}
      className="w-20 h-20 rounded-full object-cover mr-4 border-2 border-[--secondary]"
    />
    <div>
      <h3 className="text-[--secondary] font-semibold">{name}</h3>
      <p className="text-sm font-medium text-[--foreground]">{title}</p>
      <p className="text-sm text-[--muted-foreground]">{subtitle}</p>
    </div>
  </div>
);

interface CircularItemProps {
  title: string;
  date: string;
  size: string;
  lang: string;
}

const CircularItem: React.FC<CircularItemProps> = ({
  title,
  date,
  size,
  lang,
}) => (
  <div className="flex space-x-3 border-b border-slate-400 pb-3 mb-3">
    <div className="shrink-0 bg-primary w-10 h-10 flex items-center justify-center rounded-full">
      <span className="text-lg font-bold">📅</span>
    </div>
    <div>
      <h4 className="font-semibold text-[--foreground]">{title}</h4>
      <p className="text-sm font-semibold text-[--secondary] mt-1">
        DATE: {date}
      </p>
      <p className="text-xs mt-1">
        File Size: {size} | Language: {lang}
      </p>
    </div>
  </div>
);

const Circulars: React.FC = () => {
  return (
    <section className="bg-[--muted] py-8">
      <div className="container mx-auto px-4 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <div className="rounded-b-md p-4 grid sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <FacultyCard key={i} {...h} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-md p-5 shadow-sm max-h-[550px]">
          <h2 className="text-2xl font-bold text-[--primary] mb-4">
            Circulars
          </h2>
          <div className="overflow-y-auto flex-1 px-5 space-y-6 max-h-[400px]">
            {circulars.map((c, i) => (
              <CircularItem key={i} {...c} />
            ))}
          </div>
          <div className="flex justify-end">
            <button className="bg-primary text-white px-4 py-2 rounded-md mt-2 hover:bg-opacity-90">
              View All
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Circulars;
