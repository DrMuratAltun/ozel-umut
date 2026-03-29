import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function CtaSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/caring.jpg"
          alt="Şefkatli eğitim"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Çocuğunuzun Geleceği İçin İlk Adımı Atın
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Ücretsiz ön değerlendirme görüşmesi için bize ulaşın. Uzman kadromuz
          sizin ve çocuğunuz için en uygun programı belirlesin.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="text-base bg-white text-primary hover:bg-white/90 border-0">
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Phone className="mr-2 h-5 w-5" />
              Hemen Arayın
            </a>
          </Button>
          <Button asChild size="lg" className="text-base bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:text-white">
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
