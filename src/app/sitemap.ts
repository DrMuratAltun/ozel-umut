import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ozelegitimumut.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, programs, blogPosts, projects] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.program.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ where: { status: "published" }, select: { slug: true, updatedAt: true } }),
    prisma.project.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/hizmetlerimiz`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/programlar`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/ekibimiz`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_URL}/galeri`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_URL}/projeler`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_URL}/iletisim`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const servicePages = services.map((s: { slug: string; updatedAt: Date }) => ({
    url: `${SITE_URL}/hizmetlerimiz/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const programPages = programs.map((p: { slug: string; updatedAt: Date }) => ({
    url: `${SITE_URL}/programlar/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((p: { slug: string; updatedAt: Date }) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const projectPages = projects.map((p: { slug: string; updatedAt: Date }) => ({
    url: `${SITE_URL}/projeler/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...programPages, ...blogPages, ...projectPages];
}
