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
    title: "Ozel Egitim",
    description: "Bireysel ihtiyaclara uygun ozel egitim programlari",
    icon: BookOpen,
    href: "/hizmetlerimiz/ozel-egitim",
  },
  {
    title: "Dil ve Konusma Terapisi",
    description: "Dil, konusma ve iletisim becerilerinin gelistirilmesi",
    icon: MessageCircle,
    href: "/hizmetlerimiz/dil-ve-konusma-terapisi",
  },
  {
    title: "Fizyoterapi",
    description: "Motor gelisim ve fiziksel rehabilitasyon destegi",
    icon: Activity,
    href: "/hizmetlerimiz/fizyoterapi",
  },
  {
    title: "Psikolojik Danismanlik",
    description: "Cocuk ve aile odakli psikolojik destek hizmetleri",
    icon: Brain,
    href: "/hizmetlerimiz/psikolojik-danismanlik",
  },
  {
    title: "Ergoterapi",
    description: "Gunluk yasam becerilerinin kazandirilmasi",
    icon: Hand,
    href: "/hizmetlerimiz/ergoterapi",
  },
  {
    title: "Odyoloji",
    description: "Isitme degerlendirmesi ve isitme cihazi uygulamalari",
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
          subtitle="Uzman kadromuzla sunduğumuz kapsamli hizmetlerimiz"
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
