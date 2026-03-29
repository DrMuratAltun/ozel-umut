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

interface NewsBannerProps {
  items: NewsItem[];
}

export function NewsBanner({ items }: NewsBannerProps) {
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
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isHovered, items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <section
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main slider */}
      <div className="relative aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] w-full overflow-hidden bg-foreground">
        {/* Background image */}
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.title}
            fill
            className="object-cover transition-opacity duration-700"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6 md:pb-8">
            <Link href={`/blog/${item.slug}`} className="group block">
              <div className="flex items-center gap-2 mb-2">
                {item.category && (
                  <Badge className="bg-accent text-white border-0 text-xs">
                    {item.category}
                  </Badge>
                )}
                {item.publishedAt && (
                  <span className="flex items-center gap-1 text-xs text-white/70">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.publishedAt).toLocaleDateString("tr-TR", {
                      year: "numeric", month: "long", day: "numeric"
                    })}
                  </span>
                )}
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:underline decoration-2 underline-offset-4 max-w-3xl">
                {item.title}
              </h2>
              {item.excerpt && (
                <p className="text-sm md:text-base text-white/80 mt-2 max-w-2xl line-clamp-2 hidden sm:block">
                  {item.excerpt}
                </p>
              )}
            </Link>
          </div>
        </div>

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
              aria-label="Önceki haber"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
              aria-label="Sonraki haber"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Page numbers */}
      {items.length > 1 && (
        <div className="bg-foreground">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-8 min-w-[2rem] px-2 text-sm font-bold transition-colors border-t-2",
                    i === current
                      ? "bg-accent text-white border-accent"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5 border-transparent"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
