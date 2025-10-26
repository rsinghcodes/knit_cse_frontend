'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect } from 'react';

const partners = [
  {
    name: 'AKTU',
    img: '/assets/partners/aktu.jpg',
    link: 'https://aktu.ac.in/',
  },
  {
    name: 'Jansunwai',
    img: '/assets/partners/jansunwai.jpg',
    link: 'https://jansunwai.com/',
  },
  {
    name: 'UPSEE',
    img: '/assets/partners/upsee.jpg',
    link: 'https://upsee.nic.in/',
  },
  {
    name: 'MathWorks',
    img: '/assets/partners/mathworks.jpg',
    link: 'https://www.mathworks.com/',
  },
  {
    name: 'NPTEL',
    img: '/assets/partners/nptel.jpg',
    link: 'https://nptel.ac.in/',
  },
  {
    name: 'Swayam',
    img: '/assets/partners/swayam.jpg',
    link: 'https://swayam.gov.in/',
  },
  {
    name: 'EDX',
    img: '/assets/partners/edx.jpg',
    link: 'https://www.edx.org/',
  },
  {
    name: 'Coursera',
    img: '/assets/partners/coursera.jpg',
    link: 'https://www.coursera.org/',
  },
  {
    name: 'Udemy',
    img: '/assets/partners/udemy.jpg',
    link: 'https://www.udemy.com/',
  },
];

export default function PartnersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: false,
    },
    [Autoplay({ delay: 2500, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  return (
    <div className="relative py-6">
      <div className="max-w-6xl mx-auto relative">
        <button
          onClick={scrollPrev}
          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-blue-100"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {partners.map((partner, i) => (
              <div key={i} className="flex-[0_0_25%] p-3">
                <a
                  href={partner.link}
                  className="flex items-center gap-4 bg-white rounded-xl shadow-md px-2 py-1 h-full justify-center border border-gray-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="h-16 w-auto object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-blue-100"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
