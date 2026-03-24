import Circulars from '~/components/Circulars';
import FeaturedCarousel from '~/components/FeaturedCarousel';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Hero from '~/components/Hero';
import AlumniCarousel from '~/components/AlumniCarousel';
import AboutDepartmentSection from '~/components/AboutDepartmentSection';
import HighlightsStrip from '~/components/HighlightsStrip';
import PartnersCarousel from '~/components/PartnersCarousel';
import QuickLinksGrid from '~/components/QuickLinksGrid';
import type { Route } from './+types/home';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'KNIT CSE Department' },
    { name: 'description', content: 'Department of Computer Science & Engineering, KNIT Sultanpur' },
  ];
}

export default function Home() {
  return (
    <div className="font-sans bg-white">
      <Header />
      <Hero />
      <AlumniCarousel />
      <AboutDepartmentSection />
      <HighlightsStrip />
      <Circulars />
      <FeaturedCarousel />
      <QuickLinksGrid />
      <PartnersCarousel />
      <Footer />
    </div>
  );
}
