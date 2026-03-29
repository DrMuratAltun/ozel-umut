import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-16 md:py-20 bg-brand-blue-light/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Hakkımızda
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Umut ile Başlar, <span className="text-accent">Başarıyla</span> Devam Eder
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Umut Özel Eğitim ve Rehabilitasyon Merkezi olarak, özel gereksinimli bireylerin
              eğitim ve rehabilitasyon ihtiyaçlarını karşılamak amacıyla Korkuteli&apos;de hizmet
              vermekteyiz. Uzman kadromuz, modern yaklaşımlar ve bireysel eğitim planlarıyla her
              öğrencimizin potansiyelini en üst düzeye çıkarmak için çalışıyoruz.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sevgi</p>
                  <p className="text-xs text-muted-foreground">Şefkatli yaklaşım</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Güven</p>
                  <p className="text-xs text-muted-foreground">Profesyonel hizmet</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow/20 text-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ekip</p>
                  <p className="text-xs text-muted-foreground">Uzman kadro</p>
                </div>
              </div>
            </div>
            <Button asChild className="mt-8">
              <Link href="/hakkimizda">
                Daha Fazla Bilgi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/hero/special-ed-1.jpg"
                  alt="Özel eğitim öğrencileri"
                  width={400}
                  height={300}
                  className="object-cover w-full h-[200px] md:h-[240px]"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg mt-8">
                <Image
                  src="/images/hero/child-happy.jpg"
                  alt="Mutlu çocuklar"
                  width={400}
                  height={300}
                  className="object-cover w-full h-[200px] md:h-[240px]"
                />
              </div>
            </div>
            {/* Yıl badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-accent text-white rounded-2xl px-6 py-4 shadow-xl text-center">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-sm">Yıllık Deneyim</p>
            </div>
            {/* Dekoratif elemanlar */}
            <div className="absolute -top-3 -right-3 h-20 w-20 rounded-full bg-brand-yellow/20 -z-10" />
            <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-xl bg-primary/10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
