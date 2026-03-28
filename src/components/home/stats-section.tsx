import { GraduationCap, Calendar, Users, BookOpen } from "lucide-react";

const STATS = [
  { label: "Yillik Deneyim", value: "10+", icon: Calendar },
  { label: "Mutlu Ogrenci", value: "500+", icon: GraduationCap },
  { label: "Uzman Kadro", value: "15+", icon: Users },
  { label: "Egitim Programi", value: "6", icon: BookOpen },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-3">
                <stat.icon className="h-8 w-8 opacity-80" />
              </div>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
