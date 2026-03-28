import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Calendar, User, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Yazi Bulunamadi" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!post || post.status !== "published") notFound();

  const relatedPosts = await prisma.blogPost.findMany({
    where: { status: "published", slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
              {post.publishedAt && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
              )}
              {post.author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {post.author.fullName || post.author.email}
                </span>
              )}
              {post.category && <Badge variant="secondary">{post.category}</Badge>}
            </div>

            {post.coverImageUrl && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8">
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside>
            <h3 className="text-lg font-semibold text-foreground mb-4">Diger Yazilar</h3>
            <div className="space-y-3">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}>
                  <Card className="hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-foreground line-clamp-2">{p.title}</h4>
                      {p.publishedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(p.publishedAt).toLocaleDateString("tr-TR")}
                        </p>
                      )}
                      <span className="inline-flex items-center text-sm text-primary mt-2">
                        Oku <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
