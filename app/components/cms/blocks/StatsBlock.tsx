import type { StatsBlockContent } from '~/types/cms';
import { TrendingUp, Users, Award, Target, Zap, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface StatsBlockProps {
    content: StatsBlockContent;
}

// Icon mapping for common icons
const iconMap: Record<string, any> = {
    'trending-up': TrendingUp,
    'users': Users,
    'award': Award,
    'target': Target,
    'zap': Zap,
    'star': Star,
};

export const StatsBlock: React.FC<StatsBlockProps> = ({ content }) => {
    const { title, stats, columns = 3, backgroundColor, animateOnScroll = true } = content;
    const [hasAnimated, setHasAnimated] = useState(false);
    const blockRef = useRef<HTMLElement>(null);

    const sortedStats = [...stats].sort((a, b) => a.order - b.order);

    const gridClasses = {
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4',
    };

    // Intersection Observer for scroll animation
    useEffect(() => {
        if (!animateOnScroll || !blockRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(blockRef.current);

        return () => observer.disconnect();
    }, [animateOnScroll, hasAnimated]);

    // Counter animation hook
    const useCounter = (end: number, duration: number, shouldAnimate: boolean) => {
        const [count, setCount] = useState(shouldAnimate ? 0 : end);

        useEffect(() => {
            if (!shouldAnimate || count === end) return;

            const startTime = Date.now();
            const endTime = startTime + duration;

            const timer = setInterval(() => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                const currentCount = Math.floor(progress * end);

                setCount(currentCount);

                if (now >= endTime) {
                    setCount(end);
                    clearInterval(timer);
                }
            }, 16);

            return () => clearInterval(timer);
        }, [end, duration, shouldAnimate]);

        return count;
    };

    return (
        <section
            ref={blockRef}
            className="py-12 px-4"
            style={{ backgroundColor: backgroundColor || 'transparent' }}
        >
            <div className="max-w-7xl mx-auto">
                {title && (
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                        <div className="w-24 h-1 bg-primary rounded-full mx-auto" />
                    </div>
                )}

                <div className={`grid grid-cols-1 ${gridClasses[columns]} gap-8`}>
                    {sortedStats.map((stat) => {
                        const IconComponent = stat.icon ? iconMap[stat.icon] : null;
                        const numericValue = parseInt(stat.value) || 0;
                        const animatedCount = useCounter(
                            numericValue,
                            2000,
                            animateOnScroll && hasAnimated
                        );

                        return (
                            <div
                                key={stat.id}
                                className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                {IconComponent && (
                                    <div className="flex justify-center mb-3">
                                        <IconComponent className="w-10 h-10 text-blue-600" />
                                    </div>
                                )}

                                <div className="text-4xl font-bold text-gray-900 mb-2">
                                    {animateOnScroll && hasAnimated ? animatedCount : stat.value}
                                    {stat.suffix && (
                                        <span className="text-blue-600">{stat.suffix}</span>
                                    )}
                                </div>

                                <div className="text-lg font-semibold text-gray-700 mb-1">
                                    {stat.label}
                                </div>

                                {stat.description && (
                                    <p className="text-sm text-gray-500">{stat.description}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
