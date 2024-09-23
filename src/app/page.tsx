import HeroSection from '@/components/landing-page/hero-section';
import EventsSection from '../components/landing-page/coming-events';
import News from '../components/landing-page/news-section';
import '../app/globals.css';
export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <News />
    </>
  );
}
