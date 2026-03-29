import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { FileText, Users, ImageIcon, MessageSquare, Stethoscope, GraduationCap, FolderKanban } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [blogCount, teamCount, galleryCount, messageCount, unreadCount, serviceCount, programCount, projectCount] =
    await Promise.all([
      prisma.blogPost.count(),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.galleryItem.count({ where: { isActive: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.program.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isActive: true } }),
    ]);

  const stats = [
    { label: "Blog Yazıları", value: blogCount, icon: FileText, color: "text-blue-600" },
    { label: "Ekip Üyeleri", value: teamCount, icon: Users, color: "text-green-600" },
    { label: "Hizmetler", value: serviceCount, icon: Stethoscope, color: "text-teal-600" },
    { label: "Programlar", value: programCount, icon: GraduationCap, color: "text-purple-600" },
    { label: "Galeri", value: galleryCount, icon: ImageIcon, color: "text-amber-600" },
    { label: "Projeler", value: projectCount, icon: FolderKanban, color: "text-indigo-600" },
    { label: "Toplam Mesaj", value: messageCount, icon: MessageSquare, color: "text-red-600" },
    { label: "Okunmamış Mesaj", value: unreadCount, icon: MessageSquare, color: "text-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
