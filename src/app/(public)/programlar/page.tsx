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
  title: "Egitim Programlari",
  description: "Umut Ozel Egitim ve Rehabilitasyon Merkezi egitim programlari: zihinsel yetersizlik, otizm, ogrenme guclugu, dil-konusma bozukluklari destegi.",
};

export default async function ProgramlarPage() {
  const programs = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  // Fallback static data when DB is empty
  const displayPrograms = programs.length > 0 ? programs : [
    { slug: "zihinsel-yetersizlik-destegi", title: "Zihinsel Yetersizlik Destegi", shortDescription: "Zihinsel gelisim geriliği olan bireylere yonelik bireysel egitim programlari.", targetGroup: "3-18 Yas", features: ["Bireysel egitim", "Gunluk yasam becerileri", "Sosyal uyum"] },
    { slug: "otizm-spektrum-bozuklugu-destegi", title: "Otizm Spektrum Bozuklugu Destegi", shortDescription: "Otizm spektrum bozuklugu teshisi almis bireylere ozel yapilandirilmis egitim.", targetGroup: "2-18 Yas", features: ["ABA terapi", "Sosyal beceri", "Iletisim destegi"] },
    { slug: "ogrenme-guclugu-destegi", title: "Ogrenme Guclugu Destegi", shortDescription: "Disleksi, diskalkuli ve diger ogrenme gucluklerinde akademik destek.", targetGroup: "6-18 Yas", features: ["Okuma-yazma", "Matematik destegi", "Dikkat calismalari"] },
    { slug: "dil-konusma-bozukluklari-destegi", title: "Dil ve Konusma Bozukluklari Destegi", shortDescription: "Dil gecikmesi, artikulasyon ve akicilik bozukluklarinda uzman terapi.", targetGroup: "2-18 Yas", features: ["Dil terapisi", "Artikulasyon", "Pragmatik dil"] },
    { slug: "bedensel-yetersizlik-destegi", title: "Bedensel Yetersizlik Destegi", shortDescription: "Bedensel engelli bireylere yonelik fiziksel rehabilitasyon ve egitim.", targetGroup: "3-18 Yas", features: ["Fizyoterapi", "Motor gelisim", "Adaptif beceriler"] },
    { slug: "isitme-yetersizlik-destegi", title: "Isitme Yetersizlik Destegi", shortDescription: "Isitme engelli bireylere yonelik isitsel egitim ve iletisim destegi.", targetGroup: "2-18 Yas", features: ["Isitsel egitim", "Dudak okuma", "Isaret dili"] },
  ];

  return (
    <>
      <PageHeader
        title="Egitim Programlari"
        description="Bireysel ihtiyaclara gore hazirlanan destek egitim programlarimiz"
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
                    {program.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">{feature}</Badge>
                    ))}
                  </div>
                )}
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link href={`/programlar/${program.slug}`}>
                    Detayli Bilgi
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
