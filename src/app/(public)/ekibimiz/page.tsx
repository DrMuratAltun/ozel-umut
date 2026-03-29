import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Quote } from "lucide-react";

export const dynamic = "force-dynamic";

const AVATAR_COLORS = [
  "bg-brand-blue/15 text-brand-blue",
  "bg-brand-red/15 text-brand-red",
  "bg-brand-yellow/20 text-amber-700",
  "bg-brand-blue/15 text-brand-blue",
];

export const metadata: Metadata = {
  title: "Ekibimiz",
  description: "Umut Özel Eğitim ve Rehabilitasyon Merkezi uzman kadrosu.",
};

export default async function EkibimizPage() {
  const team = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const displayTeam = team.length > 0 ? team : [
    { id: "1", fullName: "Uzman Kadro", title: "Özel Eğitim Uzmanı", specialization: "Otizm, Zihinsel Yetersizlik", bio: "Alanında deneyimli uzmanlarımız ile hizmetinizdeyiz.", photoUrl: null },
    { id: "2", fullName: "Uzman Kadro", title: "Dil ve Konuşma Terapisti", specialization: "Dil Gecikmesi, Artikülasyon", bio: "Çocuğunuzun iletişim becerilerini geliştirmek için buradayız.", photoUrl: null },
    { id: "3", fullName: "Uzman Kadro", title: "Fizyoterapist", specialization: "Motor Gelişim, Rehabilitasyon", bio: "Fiziksel gelişim ve rehabilitasyon programları sunuyoruz.", photoUrl: null },
    { id: "4", fullName: "Uzman Kadro", title: "Psikolog", specialization: "Çocuk Psikolojisi, Aile Terapisi", bio: "Çocuk ve aile odaklı psikolojik destek hizmetleri veriyoruz.", photoUrl: null },
  ];

  return (
    <>
      <PageHeader
        title="Ekibimiz"
        description="Alanında uzman, deneyimli ve tutkulu kadromuzla tanışın"
        breadcrumbs={[{ label: "Ekibimiz" }]}
      />
      {/* Decorative quote section */}
      <div className="bg-brand-blue-light/40 py-8">
        <div className="container mx-auto px-4 text-center">
          <Quote className="h-8 w-8 text-brand-blue/30 mx-auto mb-3" />
          <p className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto">
            &ldquo;Her çocuk özeldir ve her biri farklı bir şekilde parlar. Bizim görevimiz o ışığı keşfetmek.&rdquo;
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-blue-light/20 to-transparent py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayTeam.map((member, index) => {
              const initials = member.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2);
              const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
              return (
                <Card key={member.id} className="text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                  <CardContent className="p-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4 ring-2 ring-offset-2 ring-primary/20">
                      {member.photoUrl && <AvatarImage src={member.photoUrl} alt={member.fullName} />}
                      <AvatarFallback className={`text-xl font-bold ${avatarColor}`}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold text-foreground">{member.fullName}</h3>
                    <p className="text-sm text-primary font-medium mt-1">{member.title}</p>
                    {member.specialization && (
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {member.specialization.split(",").map((s: string) => (
                          <Badge key={s.trim()} variant="secondary" className="text-xs">
                            {s.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {member.bio && (
                      <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{member.bio}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
