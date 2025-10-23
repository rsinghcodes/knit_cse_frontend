import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useRef } from 'react';

interface FeaturedItem {
  image: string;
  title: string;
  size: string;
  lang: string;
  date: string;
}

const FeaturedCarousel: React.FC = () => {
  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplay.current]
  );

  const featured: FeaturedItem[] = [
    {
      image: '/assets/featured.jpeg',
      title: 'Organization of a lecture in the Engineering Department of KNIT',
      size: '126 KB',
      lang: 'Hindi',
      date: '11/10/2025',
    },
    {
      image: '/assets/featured.jpeg',
      title: 'Uttar Pradesh will become a developed state by the year 2047',
      size: '163 KB',
      lang: 'Hindi',
      date: '12/09/2025',
    },
    {
      image: '/assets/featured.jpeg',
      title: 'Workshop conducted on innovation and startup ecosystem at KNIT',
      size: '182 KB',
      lang: 'English',
      date: '05/09/2025',
    },
    {
      image: '/assets/featured.jpeg',
      title: 'Workshop conducted on innovation and startup ecosystem at KNIT',
      size: '182 KB',
      lang: 'English',
      date: '05/09/2025',
    },
    {
      image: '/assets/featured.jpeg',
      title: 'Workshop conducted on innovation and startup ecosystem at KNIT',
      size: '111KB',
      lang: 'English',
      date: '02/09/2025',
    },
  ];

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('pointerDown', autoplay.current.stop);
      emblaApi.on('pointerUp', autoplay.current.reset);
    }
  }, [emblaApi]);

  return (
    <section className="bg-primary py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-white font-bold mb-4">Featured</h2>
          <button className="border border-white text-white cursor-pointer px-4 py-1 rounded transition">
            View All
          </button>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {featured.map((item, i) => (
              <div
                key={i}
                className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[--secondary]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    File Size: {item.size} | Language: {item.lang}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Date: <span>{item.date}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
