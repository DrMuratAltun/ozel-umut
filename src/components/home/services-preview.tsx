import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import {
  BookOpen,
  MessageCircle,
  Activity,
  Brain,
  Hand,
  Ear,
} from "lucide-react";

const SERVICES = [
  {
    title: "Özel Eğitim",
    description: "Bireysel ihtiyaçlara uygun özel eğitim programları",
    icon: BookOpen,
    href: "/hizmetlerimiz/ozel-egitim",
  },
  {
    title: "Dil ve Konuşma Terapisi",
    description: "Dil, konuşma ve iletişim becerilerinin geliştirilmesi",
    icon: MessageCircle,
    href: "/hizmetlerimiz/dil-ve-konusma-terapisi",
  },
  {
    title: "Fizyoterapi",
    description: "Motor gelişim ve fiziksel rehabilitasyon desteği",
    icon: Activity,
    href: "/hizmetlerimiz/fizyoterapi",
  },
  {
    title: "Psikolojik Danışmanlık",
    description: "Çocuk ve aile odaklı psikolojik destek hizmetleri",
    icon: Brain,
    href: "/hizmetlerimiz/psikolojik-danismanlik",
  },
  {
    title: "Ergoterapi",
    description: "Günlük yaşam becerilerinin kazandırılması",
    icon: Hand,
    href: "/hizmetlerimiz/ergoterapi",
  },
  {
    title: "Odyoloji",
    description: "İşitme değerlendirmesi ve işitme cihazı uygulamaları",
    icon: Ear,
    href: "/hizmetlerimiz/odyoloji",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Hizmetlerimiz"
          subtitle="Uzman kadromuzla sunduğumuz kapsamlı hizmetlerimiz"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link key={service.title} href={service.href}>
              <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
