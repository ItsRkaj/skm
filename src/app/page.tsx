import HeroSection from './landingPage/HeroSection';
import EventsSection from './landingPage/comingEvents';
import '../app/globals.css';
export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsSection />
    </div>
  );
}
