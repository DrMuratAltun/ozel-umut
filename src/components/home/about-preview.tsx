import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Hakkımızda
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Umut ile Başlar, Başarıyla Devam Eder
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Umut Özel Eğitim ve Rehabilitasyon Merkezi olarak, özel gereksinimli bireylerin
              eğitim ve rehabilitasyon ihtiyaçlarını karşılamak amacıyla Korkuteli&apos;de hizmet
              vermekteyiz. Uzman kadromuz, modern yaklaşımlar ve bireysel eğitim planlarıyla her
              öğrencimizin potansiyelini en üst düzeye çıkarmak için çalışıyoruz.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 via-teal-light to-amber-light flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl font-bold text-primary">U</div>
                <p className="mt-2 text-lg font-medium text-foreground">Umut Özel Eğitim</p>
                <p className="text-sm text-muted-foreground">Korkuteli, Antalya</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-xl bg-amber/20 -z-10" />
            <div className="absolute -top-4 -left-4 h-16 w-16 rounded-lg bg-primary/10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
