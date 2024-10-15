import '@/app/globals.css';
import HeroSection from '@/components/landing-page/hero-section';
import EventsSection from '@/components/landing-page/coming-events';
import News from '@/components/landing-page/news-section';
import AboutUs from '@/components/landing-page/about-us';
import FAQ from '@/components/landing-page/faq-section';
import CallToAction from '@/components/landing-page/call-to-action';
import Footer from '@/components/landing-page/footer';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <EventsSection />
      <AboutUs />
      <News />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}
