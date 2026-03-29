import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { prisma } from "@/lib/prisma";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { Camera, Image as ImageIcon, Star } from "lucide-react";

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
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
            <div className="relative mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Camera className="h-10 w-10" />
              </div>
              <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow/20 text-amber-700">
                <Star className="h-4 w-4" />
              </div>
              <div className="absolute -bottom-1 -left-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <ImageIcon className="h-4 w-4" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Galeri Hazırlanıyor</h3>
            <p className="text-muted-foreground leading-relaxed">
              Merkezimizden kareler, etkinlik fotoğrafları ve özel anlar yakında burada
              paylaşılacak.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-8 w-full max-w-xs">
              <div className="aspect-square rounded-xl bg-brand-blue/5 border-2 border-dashed border-brand-blue/20" />
              <div className="aspect-square rounded-xl bg-brand-red/5 border-2 border-dashed border-brand-red/20" />
              <div className="aspect-square rounded-xl bg-brand-yellow/5 border-2 border-dashed border-brand-yellow/20" />
            </div>
          </div>
        ) : (
          <GalleryGrid items={items} categories={categories} />
        )}
      </div>
    </>
  );
}
