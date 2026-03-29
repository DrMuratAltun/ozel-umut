"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  coverImageUrl: string | null;
  publishedAt: string | null;
}

export function HeroNewsSlider({ items }: { items: NewsItem[] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isHovered, items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3]">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/80 to-primary/80" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Link href={`/blog/${item.slug}`} className="group block">
            <div className="flex items-center gap-2 mb-2">
              {item.category && (
                <Badge className="bg-accent text-white border-0 text-[11px]">
                  {item.category}
                </Badge>
              )}
              {item.publishedAt && (
                <span className="flex items-center gap-1 text-[11px] text-white/70">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.publishedAt).toLocaleDateString("tr-TR")}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-white leading-snug group-hover:underline decoration-2 underline-offset-2 line-clamp-2">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-sm text-white/70 mt-1 line-clamp-1">
                {item.excerpt}
              </p>
            )}
          </Link>
        </div>

        {/* Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Page numbers */}
      {items.length > 1 && (
        <div className="flex items-center bg-black/70 backdrop-blur-sm">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold transition-colors text-center",
                i === current
                  ? "bg-accent text-white"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
