import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="Özel eğitim"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white mb-6">
              Korkuteli, Antalya &bull; 2005&apos;ten beri hizmetinizde
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Her Çocuğun{" "}
              <span className="text-brand-yellow">Potansiyeli</span>{" "}
              Değerlidir
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/90 max-w-xl leading-relaxed">
              Uzman kadromuz ve bireysel eğitim programlarımızla, çocuklarınızın gelişimini
              destekliyor, geleceklerine umutla bakıyoruz.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base bg-brand-red hover:bg-brand-red/90 text-white border-0">
                <a href={`tel:${CONTACT.phoneRaw}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Randevu Alın
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:text-white">
                <Link href="/hizmetlerimiz">
                  Hizmetlerimiz
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Photo collage */}
          <div className="hidden lg:block relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image
                    src="/images/hero/special-ed-1.jpg"
                    alt="Özel eğitim öğrencileri"
                    width={300}
                    height={350}
                    className="object-cover w-full h-[220px]"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image
                    src="/images/hero/caring.jpg"
                    alt="Şefkatli eğitim"
                    width={300}
                    height={200}
                    className="object-cover w-full h-[180px]"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image
                    src="/images/hero/child-happy.jpg"
                    alt="Mutlu çocuklar"
                    width={300}
                    height={250}
                    className="object-cover w-full h-[200px]"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image
                    src="/images/hero/therapy.jpg"
                    alt="Terapi seansı"
                    width={300}
                    height={250}
                    className="object-cover w-full h-[200px]"
                  />
                </div>
              </div>
            </div>
            {/* Farkındalık badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-xl">
              <p className="text-sm font-bold text-primary">2005&apos;ten Beri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
