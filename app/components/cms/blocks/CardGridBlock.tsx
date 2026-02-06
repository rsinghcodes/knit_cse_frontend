import type { CardGridBlockContent } from '~/types/cms';

interface CardGridBlockProps {
    content: CardGridBlockContent;
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({ content }) => {
    const { title, cards, columns = 3, cardStyle = 'default' } = content;

    const sortedCards = [...cards].sort((a, b) => a.order - b.order);

    const gridClasses = {
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    };

    const cardStyleClasses = {
        default: 'bg-white',
        bordered: 'bg-white border-2 border-gray-200',
        shadow: 'bg-white shadow-lg',
    };

    return (
        <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {title && (
                    <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
                )}

                <div className={`grid grid-cols-1 ${gridClasses[columns]} gap-6`}>
                    {sortedCards.map((card) => (
                        <div
                            key={card.id}
                            className={`${cardStyleClasses[cardStyle]} rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform`}
                        >
                            {card.image && (
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                                <p className="text-gray-600 mb-4">{card.description}</p>
                                {card.link && (
                                    <a
                                        href={card.link}
                                        className="text-blue-600 hover:underline font-medium"
                                    >
                                        Learn More →
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
