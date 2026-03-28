import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary/5 via-teal-light/30 to-amber-light/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Cocugunuzun Gelecegi Icin Ilk Adimi Atin
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ucretsiz on degerlendirme gorusmesi icin bize ulasin. Uzman kadromuz
          sizin ve cocugunuz icin en uygun programi belirlesin.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-base">
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Phone className="mr-2 h-5 w-5" />
              Hemen Arayin
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/iletisim">
              Iletisim Formu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
