import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, title: true, imageUrl: true, category: true },
  });
  return NextResponse.json(items);
}
