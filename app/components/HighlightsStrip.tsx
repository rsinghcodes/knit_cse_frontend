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
      <div className="bg-[#A80D1E] text-white font-semibold px-5 py-2 relative after:absolute after:right-0 after:top-0 after:bottom-0 after:border-t-22 after:border-b-22 after:border-l-12 after:border-l-[#A80D1E] after:border-t-transparent after:border-b-transparent">
        HIGHLIGHTS
      </div>

      <div className="relative overflow-hidden flex-1 py-2">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap animate-marquee"
        >
          {highlights.map((item, idx) => (
            <>
              <a
                key={idx}
                className="mx-8 text-gray-800 font-medium hover:text-[#A80D1E] cursor-pointer transition-colors"
                href={item.href}
              >
                {item.highlights}
              </a>{' '}
              |
            </>
          ))}
        </div>
      </div>

      <div className="mx-2">
        {isPaused ? (
          <button
            onClick={() => setIsPaused(false)}
            className="bg-[#A80D1E] text-white px-2 py-1 rounded hover:bg-primary transition"
          >
            <Play className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsPaused(true)}
            className="bg-[#A80D1E] text-white px-2 py-1 rounded hover:bg-primary transition"
          >
            <Pause className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
