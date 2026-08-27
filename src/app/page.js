import Hero from '@/components/Hero';
import PromoteSupportDeliver from '@/components/PromoteSupportDeliver';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <PromoteSupportDeliver />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
