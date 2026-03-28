import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogEditForm } from "./edit-form";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Blog Yazisi Duzenle</h1>
      <BlogEditForm post={post} />
    </div>
  );
}
