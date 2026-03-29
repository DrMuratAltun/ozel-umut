import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eğitim Programları",
  description: "Umut Özel Eğitim ve Rehabilitasyon Merkezi eğitim programları: zihinsel yetersizlik, otizm, öğrenme güçlüğü, dil-konuşma bozuklukları desteği.",
};

export default async function ProgramlarPage() {
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  // Fallback static data when DB is empty
  const displayPrograms = programs.length > 0 ? programs : [
    { slug: "zihinsel-yetersizlik-destegi", title: "Zihinsel Yetersizlik Desteği", shortDescription: "Zihinsel gelişim geriliği olan bireylere yönelik bireysel eğitim programları.", targetGroup: "3-18 Yaş", features: ["Bireysel eğitim", "Günlük yaşam becerileri", "Sosyal uyum"] },
    { slug: "otizm-spektrum-bozuklugu-destegi", title: "Otizm Spektrum Bozukluğu Desteği", shortDescription: "Otizm spektrum bozukluğu teşhisi almış bireylere özel yapılandırılmış eğitim.", targetGroup: "2-18 Yaş", features: ["ABA terapi", "Sosyal beceri", "İletişim desteği"] },
    { slug: "ogrenme-guclugu-destegi", title: "Öğrenme Güçlüğü Desteği", shortDescription: "Disleksi, diskalkuli ve diğer öğrenme güçlüklerinde akademik destek.", targetGroup: "6-18 Yaş", features: ["Okuma-yazma", "Matematik desteği", "Dikkat çalışmaları"] },
    { slug: "dil-konusma-bozukluklari-destegi", title: "Dil ve Konuşma Bozuklukları Desteği", shortDescription: "Dil gecikmesi, artikülasyon ve akıcılık bozukluklarında uzman terapi.", targetGroup: "2-18 Yaş", features: ["Dil terapisi", "Artikülasyon", "Pragmatik dil"] },
    { slug: "bedensel-yetersizlik-destegi", title: "Bedensel Yetersizlik Desteği", shortDescription: "Bedensel engelli bireylere yönelik fiziksel rehabilitasyon ve eğitim.", targetGroup: "3-18 Yaş", features: ["Fizyoterapi", "Motor gelişim", "Adaptif beceriler"] },
    { slug: "isitme-yetersizlik-destegi", title: "İşitme Yetersizlik Desteği", shortDescription: "İşitme engelli bireylere yönelik işitsel eğitim ve iletişim desteği.", targetGroup: "2-18 Yaş", features: ["İşitsel eğitim", "Dudak okuma", "İşaret dili"] },
  ];

  return (
    <>
      <PageHeader
        title="Eğitim Programları"
        description="Bireysel ihtiyaçlara göre hazırlanan destek eğitim programlarımız"
        breadcrumbs={[{ label: "Programlar" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPrograms.map((program) => (
            <Card key={program.slug} className="group h-full flex flex-col transition-all hover:shadow-lg hover:border-primary/20">
              <CardContent className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-2">{program.title}</h2>
                {program.targetGroup && (
                  <Badge variant="secondary" className="w-fit mb-3">{program.targetGroup}</Badge>
                )}
                <p className="text-sm text-muted-foreground flex-1 mb-4">{program.shortDescription}</p>
                {program.features && program.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {program.features.slice(0, 3).map((feature: string) => (
                      <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
                    ))}
                  </div>
                )}
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href={`/programlar/${program.slug}`}>
                    Detaylı Bilgi
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
