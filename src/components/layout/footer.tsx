import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { NAV_LINKS, CONTACT, WORKING_HOURS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Kurum bilgisi */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                U
              </div>
              <div>
                <p className="font-bold text-background">Umut</p>
                <p className="text-xs text-background/60">Özel Eğitim ve Rehabilitasyon</p>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Özel eğitim alanında uzman kadromuzla, öğrencilerimizin potansiyellerini en üst
              düzeye çıkarmak için çalışıyoruz.
            </p>
          </div>

          {/* Hızlı linkler */}
          <div>
            <h3 className="font-semibold text-background mb-4">Hızlı Erişim</h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="font-semibold text-background mb-4">İletişim</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-sm text-background/60 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-background/60">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                {CONTACT.address}
              </div>
            </div>
          </div>

          {/* Çalışma saatleri */}
          <div>
            <h3 className="font-semibold text-background mb-4">Çalışma Saatleri</h3>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" />
                <div>
                  <p>Hafta içi: {WORKING_HOURS.weekdays}</p>
                  <p>Cumartesi: {WORKING_HOURS.saturday}</p>
                  <p>Pazar: {WORKING_HOURS.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 text-center text-sm text-background/40">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
