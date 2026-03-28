import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceEditForm } from "./edit-form";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function EditHizmetPage({ params }: Props) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();
  return <div><h1 className="text-2xl font-bold text-foreground mb-6">Hizmet Duzenle</h1><ServiceEditForm service={service} /></div>;
}
