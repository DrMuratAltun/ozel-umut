import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CONTACT } from "@/lib/constants";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await prisma.program.findUnique({ where: { slug } });
  if (!program) return { title: "Program Bulunamadı" };
  return {
    title: program.metaTitle || program.title,
    description: program.metaDescription || program.shortDescription || undefined,
  };
}

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = await prisma.program.findUnique({ where: { slug } });

  if (!program || !program.isActive) notFound();

  const relatedPrograms = await prisma.program.findMany({
    where: { isActive: true, slug: { not: slug } },
    orderBy: { sortOrder: "asc" },
    take: 3,
  });

  return (
    <>
      <PageHeader
        title={program.title}
        description={program.shortDescription || undefined}
        breadcrumbs={[
          { label: "Programlar", href: "/programlar" },
          { label: program.title },
        ]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {program.targetGroup && (
              <Badge className="mb-4">{program.targetGroup}</Badge>
            )}

            <div className="prose prose-lg max-w-none text-muted-foreground">
              {program.description ? (
                program.description.split("\n").map((p: string, i: number) => <p key={i}>{p}</p>)
              ) : (
                <p>{program.shortDescription}</p>
              )}
            </div>

            {program.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Program Özellikleri</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {program.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 p-6 rounded-lg bg-primary/5 border border-primary/10">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Bu program hakkında bilgi almak ister misiniz?
              </h3>
              <p className="text-muted-foreground mb-4">
                Ücretsiz ön değerlendirme için bize ulaşın.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <a href={`tel:${CONTACT.phoneRaw}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Hemen Arayın
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/iletisim">İletişim Formu</Link>
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Diğer Programlar</h3>
            <div className="space-y-3">
              {relatedPrograms.map((p) => (
                <Link key={p.slug} href={`/programlar/${p.slug}`}>
                  <Card className="hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground">{p.title}</h4>
                      {p.targetGroup && (
                        <Badge variant="secondary" className="text-xs mt-1">{p.targetGroup}</Badge>
                      )}
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
