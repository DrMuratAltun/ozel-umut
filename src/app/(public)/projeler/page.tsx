import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket, Lightbulb, Target } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projeler",
  description: "Umut Özel Eğitim ve Rehabilitasyon Merkezi projeleri.",
};

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  active: { label: "Devam Ediyor", variant: "default" },
  completed: { label: "Tamamlandı", variant: "secondary" },
  planned: { label: "Planlanıyor", variant: "outline" },
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
        description="Kurumumuzun yürüttüğü projeler ve etkinlikler"
        breadcrumbs={[{ label: "Projeler" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red rotate-[-6deg]">
                <Lightbulb className="h-7 w-7" />
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <Rocket className="h-8 w-8" />
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/20 text-amber-700 rotate-[6deg]">
                <Target className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Projelerimiz Yakında!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Kurumumuzun yürüttüğü sosyal sorumluluk projeleri, etkinlikler ve
              işbirlikleri yakında burada paylaşılacak.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="h-1.5 w-8 rounded-full bg-brand-red/30" />
              <div className="h-1.5 w-8 rounded-full bg-brand-blue/30" />
              <div className="h-1.5 w-8 rounded-full bg-brand-yellow/30" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
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
