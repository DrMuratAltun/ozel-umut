import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProgramEditForm } from "./edit-form";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function EditProgramPage({ params }: Props) {
  const { id } = await params;
  const program = await prisma.program.findUnique({ where: { id } });
  if (!program) notFound();
  return <div><h1 className="text-2xl font-bold text-foreground mb-6">Program Duzenle</h1><ProgramEditForm program={program} /></div>;
}
