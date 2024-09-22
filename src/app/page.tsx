import HeroSection from '../components/landing-page/heroSection';
import EventsSection from '../components/landing-page/comingEvents';
import News from '../components/landing-page/newsSection';
import '../app/globals.css';
export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsSection />
      <News />
    </div>
  );
}
