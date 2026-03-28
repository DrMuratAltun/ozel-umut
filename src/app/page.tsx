import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesPreview />
        <AboutPreview />
        <StatsSection />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
