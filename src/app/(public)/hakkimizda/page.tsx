import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Award, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkimizda",
  description:
    "Umut Ozel Egitim ve Rehabilitasyon Merkezi hakkinda bilgi edinin. Misyonumuz, vizyonumuz ve degerlerimiz.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Sevgi ve Sefkat",
    description: "Her ogrencimize sevgi dolu, sefkatli ve anlayisli bir ortam sunuyoruz.",
  },
  {
    icon: Award,
    title: "Profesyonellik",
    description: "Alaninda uzman kadromuzla en yuksek standartlarda hizmet veriyoruz.",
  },
  {
    icon: Users,
    title: "Aile Isbirligi",
    description: "Ailelerle yakin isbirligi icinde cocuklarin gelisimini destekliyoruz.",
  },
  {
    icon: BookOpen,
    title: "Surekli Gelisim",
    description: "Guncel bilimsel yaklasimlar ve yenilikci yontemler kullaniyoruz.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader
        title="Hakkimizda"
        description="Umut Ozel Egitim ve Rehabilitasyon Merkezi olarak, her cocugun potansiyelinin degerli olduguna inaniyoruz."
        breadcrumbs={[{ label: "Hakkimizda" }]}
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Misyon & Vizyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Misyonumuz</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ozel gereksinimli bireylerin egitim ve rehabilitasyon ihtiyaclarini, bilimsel
                yontemler ve bireysel yaklasimlarla karsilayarak, bagimsiz yasam becerilerini
                gelistirmek ve toplumsal katilimlarini desteklemektir. Her bireyin esit
                firsatlara sahip olmasi gerektigi ilkesiyle hareket ediyoruz.
              </p>
            </CardContent>
          </Card>
          <Card className="border-amber/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber/10 text-amber-foreground">
                  <Eye className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Vizyonumuz</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bolgemizde ozel egitim ve rehabilitasyon alaninda oncu, yenilikci ve guvenilir
                bir kurum olmak. Ogrencilerimizin ve ailelerinin yasam kalitesini yukseltmek,
                toplumda farkindalik olusturmak ve kapsayici egitim anlayisini
                yayginlastirmak hedefimizdir.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tarihce */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Tarihcemiz</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Umut Ozel Egitim ve Rehabilitasyon Merkezi, Korkuteli ilcesinde ozel gereksinimli
              cocuklarin egitim ihtiyaclarini karsilamak amaciyla kurulmustur. Kurulusumuzdan bu
              yana yuzlerce ogrencimize hizmet vermis, onlarin gelisim yolculuklarinda yanlarinda
              olmusuz.
            </p>
            <p>
              Modern egitim teknikleri, deneyimli kadromuz ve aile odakli yaklasimimizla,
              ogrencilerimizin bireysel ihtiyaclarina yonelik programlar gelistirerek, onlarin
              toplumsal yasamda aktif bireyler olmalari icin calismaktayiz.
            </p>
          </div>
        </div>

        {/* Degerlerimiz */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Degerlerimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <value.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
