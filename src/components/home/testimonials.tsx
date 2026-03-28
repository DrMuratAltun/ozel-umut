import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ayse K.",
    relation: "Veli",
    content:
      "Cocugumuzun gelisiminde inanilmaz bir ilerleme kaydettik. Ogretmenler cok ilgili ve alakali. Her gun okula gitmek istiyor artik.",
    rating: 5,
  },
  {
    name: "Mehmet Y.",
    relation: "Veli",
    content:
      "Dil ve konusma terapisi sonuclarini kisa surede gormeye basladik. Profesyonel kadro ve sicak ortam icin tesekkur ediyoruz.",
    rating: 5,
  },
  {
    name: "Fatma D.",
    relation: "Veli",
    content:
      "Umut Ozel Egitim ailesi gercekten adina yarasiyor. Cocuklarimiza umut asiliyor burada. Herkese gonul rahatligiyla tavsiye ederim.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Velilerimizin Gorusleri"
          subtitle="Ailelerimizden gelen degerli geri bildirimler"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber text-amber"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.relation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
