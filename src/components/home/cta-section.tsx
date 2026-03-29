import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary/5 via-teal-light/30 to-amber-light/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Çocuğunuzun Geleceği İçin İlk Adımı Atın
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ücretsiz ön değerlendirme görüşmesi için bize ulaşın. Uzman kadromuz
          sizin ve çocuğunuz için en uygun programı belirlesin.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-base">
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Phone className="mr-2 h-5 w-5" />
              Hemen Arayın
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/iletisim">
              İletişim Formu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
