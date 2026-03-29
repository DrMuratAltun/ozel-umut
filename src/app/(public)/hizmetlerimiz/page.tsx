import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MessageCircle, Activity, Brain, Hand, Ear } from "lucide-react";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "Umut Özel Eğitim ve Rehabilitasyon Merkezi hizmetleri: özel eğitim, dil ve konuşma terapisi, fizyoterapi, psikolojik danışmanlık.",
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, MessageCircle, Activity, Brain, Hand, Ear,
};

const COLOR_VARIANTS = [
  { border: "border-l-brand-blue", iconBg: "bg-brand-blue/10", iconText: "text-brand-blue", hoverIconBg: "group-hover:bg-brand-blue" },
  { border: "border-l-brand-red", iconBg: "bg-brand-red/10", iconText: "text-brand-red", hoverIconBg: "group-hover:bg-brand-red" },
  { border: "border-l-brand-yellow", iconBg: "bg-brand-yellow/20", iconText: "text-amber-700", hoverIconBg: "group-hover:bg-brand-yellow" },
];

const SERVICES = [
  {
    slug: "ozel-egitim",
    title: "Özel Eğitim",
    shortDescription: "Bireysel değerlendirme sonuçlarına göre hazırlanan özel eğitim programları ile öğrencilerimizin akademik ve sosyal gelişimlerini destekliyoruz.",
    icon: "BookOpen",
  },
  {
    slug: "dil-ve-konusma-terapisi",
    title: "Dil ve Konuşma Terapisi",
    shortDescription: "Dil gecikmesi, artikülasyon bozuklukları, kekemelik ve iletişim güçlüklerinde uzman terapistlerimizle destek sağlıyoruz.",
    icon: "MessageCircle",
  },
  {
    slug: "fizyoterapi",
    title: "Fizyoterapi",
    shortDescription: "Motor gelişim geriliği, serebral palsi ve bedensel yetersizliklerde fiziksel rehabilitasyon programları uyguluyoruz.",
    icon: "Activity",
  },
  {
    slug: "psikolojik-danismanlik",
    title: "Psikolojik Danışmanlık",
    shortDescription: "Çocuk ve aile odaklı psikolojik değerlendirme, terapi ve danışmanlık hizmetleri sunuyoruz.",
    icon: "Brain",
  },
  {
    slug: "ergoterapi",
    title: "Ergoterapi",
    shortDescription: "Günlük yaşam aktiviteleri, ince motor beceriler ve duyusal bütünleme terapisi ile bağımsızlık kazandırıyoruz.",
    icon: "Hand",
  },
  {
    slug: "odyoloji",
    title: "Odyoloji",
    shortDescription: "İşitme değerlendirmesi, işitme cihazı uygulamaları ve işitme engelli bireylere yönelik destek programları sunuyoruz.",
    icon: "Ear",
  },
];

export default function HizmetlerimizPage() {
  return (
    <>
      <PageHeader
        title="Hizmetlerimiz"
        description="Uzman kadromuzla sunduğumuz kapsamlı özel eğitim ve rehabilitasyon hizmetlerimiz"
        breadcrumbs={[{ label: "Hizmetlerimiz" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || BookOpen;
            const colors = COLOR_VARIANTS[index % COLOR_VARIANTS.length];
            return (
              <Card key={service.slug} className={`group h-full flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 ${colors.border}`}>
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBg} ${colors.iconText} mb-4 ${colors.hoverIconBg} group-hover:text-white transition-colors`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{service.title}</h2>
                  <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">{service.shortDescription}</p>
                  <Button asChild variant="outline" size="sm" className="w-fit group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    <Link href={`/hizmetlerimiz/${service.slug}`}>
                      Detaylı Bilgi
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
