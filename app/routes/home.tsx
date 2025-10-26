import Circulars from '~/components/Circulars';
import FeaturedCarousel from '~/components/FeaturedCarousel';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Hero from '~/components/Hero';
import HighlightsStrip from '~/components/HighlightsStrip';
import PartnersCarousel from '~/components/PartnersCarousel';
import QuickLinksGrid from '~/components/QuickLinksGrid';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <div className="font-sans bg-white">
      <Header />
      <Hero />
      <HighlightsStrip />
      <Circulars />
      <FeaturedCarousel />
      <QuickLinksGrid />
      <PartnersCarousel />
      <Footer />
    </div>
  );
}
