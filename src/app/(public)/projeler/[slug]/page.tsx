import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Proje Bulunamadı" };
  return { title: project.title, description: project.shortDescription || undefined };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project || !project.isActive) notFound();

  return (
    <>
      <PageHeader
        title={project.title}
        description={project.shortDescription || undefined}
        breadcrumbs={[
          { label: "Projeler", href: "/projeler" },
          { label: project.title },
        ]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge>{project.status === "active" ? "Devam Ediyor" : project.status === "completed" ? "Tamamlandı" : "Planlanıyor"}</Badge>
          {project.startDate && (
            <span className="flex items-center text-sm text-muted-foreground gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(project.startDate).toLocaleDateString("tr-TR")}
              {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString("tr-TR")}`}
            </span>
          )}
        </div>

        {project.coverImageUrl && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none text-muted-foreground">
          {project.description ? (
            project.description.split("\n").map((p: string, i: number) => <p key={i}>{p}</p>)
          ) : (
            <p>{project.shortDescription}</p>
          )}
        </div>
      </div>
    </>
  );
}
