import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectEditForm } from "./edit-form";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function EditProjePage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();
  return <div><h1 className="text-2xl font-bold text-foreground mb-6">Proje Duzenle</h1><ProjectEditForm project={project} /></div>;
}
