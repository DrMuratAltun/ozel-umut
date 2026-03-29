import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Award, Users, BookOpen } from "lucide-react";

const VALUE_COLORS = [
  "bg-brand-blue/10 text-brand-blue",
  "bg-brand-red/10 text-brand-red",
  "bg-brand-yellow/20 text-amber-700",
  "bg-brand-blue/10 text-brand-blue",
];

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
          <Card className="border-l-4 border-l-brand-blue overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                  <Target className="h-8 w-8" />
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
          <Card className="border-l-4 border-l-brand-red overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                  <Eye className="h-8 w-8" />
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

        {/* Colored divider */}
        <div className="flex items-center gap-2 mb-16">
          <div className="h-1 flex-1 rounded-full bg-brand-blue/20" />
          <div className="h-1 w-8 rounded-full bg-brand-red/40" />
          <div className="h-1 flex-1 rounded-full bg-brand-yellow/30" />
        </div>

        {/* Tarihçe */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Tarihçemiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src="/images/hero/caring.jpg"
                alt="Umut Özel Eğitim - Şefkatli yaklaşım"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Colored divider */}
        <div className="flex items-center gap-2 mb-16">
          <div className="h-1 flex-1 rounded-full bg-brand-yellow/30" />
          <div className="h-1 w-8 rounded-full bg-brand-blue/40" />
          <div className="h-1 flex-1 rounded-full bg-brand-red/20" />
        </div>

        {/* Değerlerimiz */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, index) => {
              const colorClass = VALUE_COLORS[index % VALUE_COLORS.length];
              return (
                <Card key={value.title} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorClass}`}>
                        <value.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
