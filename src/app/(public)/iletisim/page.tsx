import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { CONTACT, WORKING_HOURS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Iletisim",
  description:
    "Umut Ozel Egitim ve Rehabilitasyon Merkezi iletisim bilgileri. Bize ulasin, sorularinizi sorun.",
};

export default function IletisimPage() {
  return (
    <>
      <PageHeader
        title="Iletisim"
        description="Sorulariniz icin bize ulasin. Size yardimci olmaktan memnuniyet duyariz."
        breadcrumbs={[{ label: "Iletisim" }]}
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Telefon</h3>
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">E-posta</h3>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Adres</h3>
                  <p className="text-muted-foreground">{CONTACT.address}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Calisma Saatleri</h3>
                  <div className="text-sm text-muted-foreground space-y-1 mt-1">
                    <p>Pazartesi - Cuma: {WORKING_HOURS.weekdays}</p>
                    <p>Cumartesi: {WORKING_HOURS.saturday}</p>
                    <p>Pazar: {WORKING_HOURS.sunday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />

            {/* Map */}
            <div className="mt-8 rounded-lg overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12860.123456789!2d30.19!3d37.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c4b6e0b0b0b0b0%3A0x0!2sKorkuteli%2C%20Antalya!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Umut Ozel Egitim Konum"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
