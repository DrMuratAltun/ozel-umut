"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  category: string | null;
}

interface GalleryGridProps {
  items: GalleryItem[];
  categories: string[];
}

export function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = selectedCategory
    ? items.filter((i) => i.category === selectedCategory)
    : items;

  return (
    <>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            Tumunu Goster
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={item.imageUrl}
              alt={item.title || "Galeri gorseli"}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {item.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-sm text-white font-medium">{item.title}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={!!lightboxItem} onOpenChange={() => setLightboxItem(null)}>
        <DialogContent className={cn("max-w-4xl p-2")}>
          <DialogTitle className="sr-only">{lightboxItem?.title || "Galeri gorseli"}</DialogTitle>
          {lightboxItem && (
            <div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title || "Galeri gorseli"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
              {(lightboxItem.title || lightboxItem.description) && (
                <div className="p-4">
                  {lightboxItem.title && (
                    <h3 className="font-semibold text-foreground">{lightboxItem.title}</h3>
                  )}
                  {lightboxItem.description && (
                    <p className="text-sm text-muted-foreground mt-1">{lightboxItem.description}</p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
