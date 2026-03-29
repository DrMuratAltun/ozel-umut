import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Calendar, PenLine, BookOpen, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Umut Özel Eğitim ve Rehabilitasyon Merkezi blog yazıları, duyurular ve rehberlik makaleleri.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    include: { author: true },
  });

  return (
    <>
      <PageHeader
        title="Blog"
        description="Özel eğitim, rehberlik ve gelişim hakkında yazılarımız"
        breadcrumbs={[{ label: "Blog" }]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <PenLine className="h-7 w-7" />
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red/10 text-brand-red">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/20 text-amber-700">
                <Sparkles className="h-7 w-7" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Yazılarımız Çok Yakında!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Özel eğitim, aile rehberliği ve çocuk gelişimi hakkında faydalı yazılarımız
              yakında burada yayınlanacak. Takipte kalın!
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="h-1.5 w-8 rounded-full bg-brand-blue/30" />
              <div className="h-1.5 w-8 rounded-full bg-brand-red/30" />
              <div className="h-1.5 w-8 rounded-full bg-brand-yellow/30" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group h-full flex flex-col transition-all hover:shadow-lg hover:border-primary/20">
                  {post.coverImageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {post.category && (
                        <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                      )}
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("tr-TR")
                          : ""}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
