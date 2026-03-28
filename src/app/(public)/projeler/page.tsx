import type { Metadata } from "next";
import type { Project } from "@prisma/client";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Umut Ozel Egitim ve Rehabilitasyon Merkezi projeleri.",
};

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Devam Ediyor", variant: "default" },
  completed: { label: "Tamamlandi", variant: "secondary" },
  planned: { label: "Planlaniyor", variant: "outline" },
};

export default async function ProjelerPage() {
  const projects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <>
      <PageHeader
        title="Projelerimiz"
        description="Kurumumuzun yuruttuğu projeler ve etkinlikler"
        breadcrumbs={[{ label: "Projeler" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        {projects.length === 0 ? (
          <EmptyState
            title="Henuz proje yok"
            description="Projelerimiz yakindir burada yayinlanacak."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: Project) => {
              const status = STATUS_MAP[project.status] || STATUS_MAP.active;
              return (
                <Link key={project.id} href={`/projeler/${project.slug}`}>
                  <Card className="group h-full flex flex-col transition-all hover:shadow-lg hover:border-primary/20">
                    {project.coverImageUrl && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={project.coverImageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardContent className="p-5 flex flex-col flex-1">
                      <Badge variant={status.variant} className="w-fit mb-2">{status.label}</Badge>
                      <h2 className="text-lg font-semibold text-foreground mb-2">{project.title}</h2>
                      {project.shortDescription && (
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{project.shortDescription}</p>
                      )}
                      <span className="inline-flex items-center text-sm text-primary mt-3 font-medium">
                        Detay <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
