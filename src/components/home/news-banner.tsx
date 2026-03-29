"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Newspaper, Calendar, ArrowRight } from "lucide-react";
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

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isHovered, items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <section
      className="bg-gradient-to-r from-accent via-accent to-primary text-white shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex items-center gap-4">
          {/* Label */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Newspaper className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Haberler</span>
              <div className="text-[10px] opacity-60">{current + 1}/{items.length}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-10 w-px bg-white/20" />

          {/* Navigation left */}
          {items.length > 1 && (
            <button
              onClick={prev}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Önceki haber"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Content */}
          <Link
            href={`/blog/${item.slug}`}
            className="flex-1 min-w-0 group"
          >
            <div className="flex items-center gap-2 mb-1">
              {item.category && (
                <Badge className="bg-white/20 text-white border-0 text-[10px] px-2 py-0 h-5">
                  {item.category}
                </Badge>
              )}
              {item.publishedAt && (
                <span className="flex items-center gap-1 text-xs opacity-70">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.publishedAt).toLocaleDateString("tr-TR")}
                </span>
              )}
            </div>
            <p className="text-base md:text-lg font-semibold truncate group-hover:underline">
              {item.title}
            </p>
            {item.excerpt && (
              <p className="text-sm opacity-75 truncate hidden md:block mt-0.5">
                {item.excerpt}
              </p>
            )}
          </Link>

          {/* Read more */}
          <Link
            href={`/blog/${item.slug}`}
            className="hidden lg:flex items-center gap-1.5 shrink-0 text-sm font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            Oku
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Navigation right */}
          {items.length > 1 && (
            <button
              onClick={next}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Sonraki haber"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Dots - mobile */}
          {items.length > 1 && (
            <div className="flex sm:hidden items-center gap-1">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === current ? "w-5 bg-white" : "w-2 bg-white/40"
                  )}
                  aria-label={`Haber ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
