import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroSection } from "@/components/home/hero-section";
import { NewsBanner } from "@/components/home/news-banner";
import { ServicesPreview } from "@/components/home/services-preview";
import { AboutPreview } from "@/components/home/about-preview";
import { StatsSection } from "@/components/home/stats-section";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const bannerPosts = await prisma.blogPost.findMany({
    where: { status: "published", showInBanner: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      publishedAt: true,
    },
    take: 10,
  });

  const newsItems = bannerPosts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <NewsBanner items={newsItems} />
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
