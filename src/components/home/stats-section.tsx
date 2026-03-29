import { GraduationCap, Calendar, Users, BookOpen } from "lucide-react";

const STATS = [
  { label: "Yıllık Deneyim", value: "20+", icon: Calendar },
  { label: "Mutlu Öğrenci", value: "500+", icon: GraduationCap },
  { label: "Uzman Kadro", value: "15+", icon: Users },
  { label: "Eğitim Programı", value: "6", icon: BookOpen },
];

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-primary via-primary to-accent text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <stat.icon className="h-7 w-7" />
                </div>
              </div>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
