import HeroSection from '@/components/landing-page/heroSection';
import EventsSection from '@/components/landing-page/comingEvents';
import News from '@/components/landing-page/newsSection';
import AboutUs from '@/components/landing-page/aboutUs';
import FAQ from '@/components/landing-page/FAQSection';
import CallToAction from '@/components/landing-page/callToAction';
import Footer from '@/components/landing-page/footer';
import '@/app/globals.css';
export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <EventsSection />
      <News />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}
