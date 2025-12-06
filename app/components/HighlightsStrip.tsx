'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface HighlightsStrip {
  highlights: string;
  href?: string;
}

export default function HighlightsStrip() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  const highlights: HighlightsStrip[] = [
    {
      highlights:
        'Notice List of Eligible Students for tablet distribution scheduled on 31-October-2025 at 10 AM',
      href: '/',
    },
    {
      highlights: 'Online Fee Payment',
      href: '/',
    },
    {
      highlights: 'Academic Calendar for the Odd Semester 2025-26',
      href: '/',
    },
  ];

  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = isPaused
        ? 'paused'
        : 'running';
    }
  }, [isPaused]);

  return (
    <div className="flex items-center w-full bg-gray-100 border-t border-b border-gray-300 text-sm">
      <div className="bg-[#A80D1E] text-white font-semibold px-3 py-2 md:px-5 relative after:absolute after:right-0 after:top-0 after:bottom-0 after:border-t-22 after:border-b-22 after:border-l-12 after:border-l-[#A80D1E] after:border-t-transparent after:border-b-transparent text-xs md:text-sm whitespace-nowrap z-10 shrink-0">
        HIGHLIGHTS
      </div>

      <div className="relative overflow-hidden flex-1 py-2">
        <div
          ref={marqueeRef}
          className="inline-flex whitespace-nowrap animate-marquee"
        >
          {highlights.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center whitespace-nowrap"
            >
              <a
                className="mx-4 md:mx-8 text-gray-800 font-medium hover:text-[#A80D1E] cursor-pointer transition-colors text-xs md:text-sm whitespace-nowrap"
                href={item.href}
              >
                {item.highlights}
              </a>
              <span className="text-gray-400 mx-2">|</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-2 z-10 bg-gray-100 pl-2 shrink-0">
        {isPaused ? (
          <button
            onClick={() => setIsPaused(false)}
            className="bg-[#A80D1E] text-white px-2 py-1 rounded hover:bg-primary transition"
          >
            <Play className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsPaused(true)}
            className="bg-[#A80D1E] text-white px-2 py-1 rounded hover:bg-primary transition"
          >
            <Pause className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
