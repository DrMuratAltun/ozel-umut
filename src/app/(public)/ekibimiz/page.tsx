import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";

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

// Ekip kategorileri
const CATEGORIES = [
  { key: "Yönetim", label: "Yönetim", description: "Kurumumuzun yönetim kadrosu" },
  { key: "Fizyoterapi", label: "Fizyoterapi Birimi", description: "Fiziksel rehabilitasyon uzmanlarımız" },
  { key: "Zihinsel Engelliler Eğitimi", label: "Zihinsel Engelliler Eğitimi", description: "Zihinsel engelliler sınıf öğretmenlerimiz" },
  { key: "Özel Eğitim", label: "Özel Eğitim Uzmanları", description: "Özel eğitim alanı uzman öğreticilerimiz" },
  { key: "İşitme Engelliler Eğitimi", label: "İşitme Engelliler Eğitimi", description: "İşitme engelli bireyler için uzman eğitmenimiz" },
  { key: "Rehberlik, Psikolojik Danışmanlık", label: "Rehberlik ve Psikolojik Danışmanlık", description: "Psikolojik destek ekibimiz" },
  { key: "Dil ve Konuşma Terapisi", label: "Dil ve Konuşma Terapisi", description: "İletişim becerilerini geliştiren uzmanlarımız" },
  { key: "İdari", label: "İdari Kadro", description: "İdari ve büro personelimiz" },
  { key: "Destek", label: "Destek Personeli", description: "Öğrencilerimize eşlik eden ekibimiz" },
  { key: "Ulaşım", label: "Ulaşım Ekibi", description: "Servis şoförlerimiz" },
];

export default async function EkibimizPage() {
  const team = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  // Kategorilere göre grupla
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    members: team.filter((m) => m.specialization === cat.key),
  })).filter((g) => g.members.length > 0);

  return (
    <>
      <PageHeader
        title="Ekibimiz"
        description="Değer, Sevgi, Özveri ve Uzmanlık — 29 kişilik profesyonel kadromuzla tanışın"
        breadcrumbs={[{ label: "Ekibimiz" }]}
      />
      {/* Motivasyon alıntısı */}
      <div className="bg-brand-blue-light/40 py-8">
        <div className="container mx-auto px-4 text-center">
          <Quote className="h-8 w-8 text-brand-blue/30 mx-auto mb-3" />
          <p className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto">
            &ldquo;Her çocuk özeldir ve her biri farklı bir şekilde parlar. Bizim görevimiz o ışığı keşfetmek.&rdquo;
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {grouped.map((group, groupIndex) => (
          <div key={group.key} className={groupIndex > 0 ? "mt-14" : ""}>
            <SectionHeader
              title={group.label}
              subtitle={group.description}
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {group.members.map((member, index) => {
                const initials = member.fullName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2);
                const avatarColor = AVATAR_COLORS[(groupIndex + index) % AVATAR_COLORS.length];
                return (
                  <Card key={member.id} className="text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                    <CardContent className="p-4">
                      <Avatar className="h-16 w-16 mx-auto mb-3 ring-2 ring-offset-2 ring-primary/20">
                        {member.photoUrl && <AvatarImage src={member.photoUrl} alt={member.fullName} />}
                        <AvatarFallback className={`text-sm font-bold ${avatarColor}`}>
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-sm font-semibold text-foreground leading-tight">{member.fullName}</h3>
                      <Badge variant="secondary" className="text-[10px] mt-1.5 px-1.5">
                        {member.title}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
