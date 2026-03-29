import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import { prisma } from "@/lib/prisma";
import { Calendar } from "lucide-react";

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
          <EmptyState
            title="Henüz yazı yok"
            description="Blog yazıları yakındır burada yayınlanacak."
          />
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
