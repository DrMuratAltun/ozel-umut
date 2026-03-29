import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TeamEditForm } from "./edit-form";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function EditEkipPage({ params }: Props) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Ekip Üyesi Düzenle</h1>
      <TeamEditForm member={member} />
    </div>
  );
}
