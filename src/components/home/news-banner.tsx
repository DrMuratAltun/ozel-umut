"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Newspaper, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
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

  // Auto-slide
  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isHovered, items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <section
      className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Label */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
              <Newspaper className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Haberler</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-border" />

          {/* Slider content */}
          <div className="flex-1 min-w-0 relative overflow-hidden">
            <Link
              href={`/blog/${item.slug}`}
              className="flex items-center gap-3 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {item.category && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 shrink-0">
                      {item.category}
                    </Badge>
                  )}
                  {item.publishedAt && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.publishedAt).toLocaleDateString("tr-TR")}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {item.title}
                </p>
                {item.excerpt && (
                  <p className="text-xs text-muted-foreground truncate hidden md:block">
                    {item.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </div>

          {/* Controls */}
          {items.length > 1 && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={prev}
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                aria-label="Önceki haber"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1 mx-1">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === current ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"
                    )}
                    aria-label={`Haber ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                aria-label="Sonraki haber"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
