import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Umut Özel Eğitim ve Rehabilitasyon Merkezi foto galeri.",
};

export default async function GaleriPage() {
  const items = await prisma.galleryItem.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))] as string[];

  return (
    <>
      <PageHeader
        title="Foto Galeri"
        description="Merkezimizden kareler, etkinlikler ve özel anlar"
        breadcrumbs={[{ label: "Galeri" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        {items.length === 0 ? (
          <EmptyState
            title="Galeri boş"
            description="Henüz galeriye fotoğraf eklenmemiş."
          />
        ) : (
          <GalleryGrid items={items} categories={categories} />
        )}
      </div>
    </>
  );
}
