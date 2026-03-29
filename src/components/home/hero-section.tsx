import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-light via-background to-amber-light">
      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Korkuteli, Antalya
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Her Çocuğun{" "}
            <span className="text-primary">Potansiyeli</span>{" "}
            Değerlidir
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Uzman kadromuz ve bireysel eğitim programlarımızla, çocuklarınızın gelişimini
            destekliyor, geleceklerine umutla bakıyoruz.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base">
              <a href={`tel:${CONTACT.phoneRaw}`}>
                <Phone className="mr-2 h-5 w-5" />
                Randevu Alın
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <Link href="/hizmetlerimiz">
                Hizmetlerimiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber/10 blur-3xl" />
    </section>
  );
}
