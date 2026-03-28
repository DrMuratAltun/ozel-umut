import type { Metadata } from "next";
import type { Service } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CONTACT } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return { title: "Hizmet Bulunamadi" };
  return {
    title: service.metaTitle || service.title,
    description: service.metaDescription || service.shortDescription || undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });

  if (!service || !service.isActive) notFound();

  const relatedServices = await prisma.service.findMany({
    where: { isActive: true, slug: { not: slug } },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription || undefined}
        breadcrumbs={[
          { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
          { label: service.title },
        ]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {service.description ? (
                service.description.split("\n").map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <p>{service.shortDescription}</p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-10 p-6 rounded-lg bg-primary/5 border border-primary/10">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Bu hizmetimiz hakkinda bilgi almak ister misiniz?
              </h3>
              <p className="text-muted-foreground mb-4">
                Ucretsiz on degerlendirme gorusmesi icin bize ulasin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <a href={`tel:${CONTACT.phoneRaw}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Arayin
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/iletisim">Iletisim Formu</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Services */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Diger Hizmetlerimiz</h3>
            <div className="space-y-3">
              {relatedServices.map((s: Service) => (
                <Link key={s.slug} href={`/hizmetlerimiz/${s.slug}`}>
                  <Card className="hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground">{s.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {s.shortDescription}
                      </p>
                      <span className="inline-flex items-center text-sm text-primary mt-2">
                        Detay <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
