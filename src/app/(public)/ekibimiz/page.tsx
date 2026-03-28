import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ekibimiz",
  description: "Umut Ozel Egitim ve Rehabilitasyon Merkezi uzman kadrosu.",
};

export default async function EkibimizPage() {
  const team = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const displayTeam = team.length > 0 ? team : [
    { id: "1", fullName: "Uzman Kadro", title: "Ozel Egitim Uzmani", specialization: "Otizm, Zihinsel Yetersizlik", bio: "Alaninda deneyimli uzmanlarimiz ile hizmetinizdeyiz.", photoUrl: null },
    { id: "2", fullName: "Uzman Kadro", title: "Dil ve Konusma Terapisti", specialization: "Dil Gecikmesi, Artikulasyon", bio: "Cocugunuzun iletisim becerilerini gelistirmek icin buradayiz.", photoUrl: null },
    { id: "3", fullName: "Uzman Kadro", title: "Fizyoterapist", specialization: "Motor Gelisim, Rehabilitasyon", bio: "Fiziksel gelisim ve rehabilitasyon programlari sunuyoruz.", photoUrl: null },
    { id: "4", fullName: "Uzman Kadro", title: "Psikolog", specialization: "Cocuk Psikolojisi, Aile Terapisi", bio: "Cocuk ve aile odakli psikolojik destek hizmetleri veriyoruz.", photoUrl: null },
  ];

  return (
    <>
      <PageHeader
        title="Ekibimiz"
        description="Alaninda uzman, deneyimli ve tutkulu kadromuzla taniniz"
        breadcrumbs={[{ label: "Ekibimiz" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayTeam.map((member) => {
            const initials = member.fullName
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2);
            return (
              <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    {member.photoUrl && <AvatarImage src={member.photoUrl} alt={member.fullName} />}
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
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
    </>
  );
}
