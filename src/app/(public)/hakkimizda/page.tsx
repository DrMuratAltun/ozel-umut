import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Award, Users, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Umut Özel Eğitim ve Rehabilitasyon Merkezi hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimiz.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Sevgi ve Şefkat",
    description: "Her öğrencimize sevgi dolu, şefkatli ve anlayışlı bir ortam sunuyoruz.",
  },
  {
    icon: Award,
    title: "Profesyonellik",
    description: "Alanında uzman kadromuzla en yüksek standartlarda hizmet veriyoruz.",
  },
  {
    icon: Users,
    title: "Aile İşbirliği",
    description: "Ailelerle yakın işbirliği içinde çocukların gelişimini destekliyoruz.",
  },
  {
    icon: BookOpen,
    title: "Sürekli Gelişim",
    description: "Güncel bilimsel yaklaşımlar ve yenilikçi yöntemler kullanıyoruz.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      <PageHeader
        title="Hakkımızda"
        description="Umut Özel Eğitim ve Rehabilitasyon Merkezi olarak, her çocuğun potansiyelinin değerli olduğuna inanıyoruz."
        breadcrumbs={[{ label: "Hakkımızda" }]}
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
                Özel gereksinimli bireylerin eğitim ve rehabilitasyon ihtiyaçlarını, bilimsel
                yöntemler ve bireysel yaklaşımlarla karşılayarak, bağımsız yaşam becerilerini
                geliştirmek ve toplumsal katılımlarını desteklemektir. Her bireyin eşit
                fırsatlara sahip olması gerektiği ilkesiyle hareket ediyoruz.
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
                Bölgemizde özel eğitim ve rehabilitasyon alanında öncü, yenilikçi ve güvenilir
                bir kurum olmak. Öğrencilerimizin ve ailelerinin yaşam kalitesini yükseltmek,
                toplumda farkındalık oluşturmak ve kapsayıcı eğitim anlayışını
                yaygınlaştırmak hedefimizdir.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tarihçe */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Tarihçemiz</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Umut Özel Eğitim ve Rehabilitasyon Merkezi, Korkuteli ilçesinde özel gereksinimli
              çocukların eğitim ihtiyaçlarını karşılamak amacıyla kurulmuştur. Kuruluşumuzdan bu
              yana yüzlerce öğrencimize hizmet vermiş, onların gelişim yolculuklarında yanlarında
              olmuşuz.
            </p>
            <p>
              Modern eğitim teknikleri, deneyimli kadromuz ve aile odaklı yaklaşımımızla,
              öğrencilerimizin bireysel ihtiyaçlarına yönelik programlar geliştirerek, onların
              toplumsal yaşamda aktif bireyler olmaları için çalışmaktayız.
            </p>
          </div>
        </div>

        {/* Değerlerimiz */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Değerlerimiz
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
