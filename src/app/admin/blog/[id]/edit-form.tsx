"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateBlogPost } from "@/app/admin/actions";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  status: string;
  coverImageUrl: string | null;
}

export function BlogEditForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await updateBlogPost(post.id, {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        excerpt: (formData.get("excerpt") as string) || undefined,
        category: (formData.get("category") as string) || undefined,
        status: formData.get("status") as string,
        coverImageUrl: (formData.get("coverImageUrl") as string) || undefined,
      });
      toast.success("Blog yazisi guncellendi");
      router.push("/admin/blog");
    } catch {
      toast.error("Guncelleme basarisiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Baslik *</Label>
            <Input id="title" name="title" defaultValue={post.title} required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="excerpt">Ozet</Label>
            <Textarea id="excerpt" name="excerpt" defaultValue={post.excerpt || ""} rows={2} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="content">Icerik (Markdown) *</Label>
            <Textarea id="content" name="content" defaultValue={post.content} rows={15} required className="mt-1.5 font-mono text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Kategori</Label>
              <Input id="category" name="category" defaultValue={post.category || ""} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="status">Durum</Label>
              <Select name="status" defaultValue={post.status}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="published">Yayinla</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="coverImageUrl">Kapak Gorseli URL</Label>
            <Input id="coverImageUrl" name="coverImageUrl" defaultValue={post.coverImageUrl || ""} type="url" className="mt-1.5" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Guncelle
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Iptal</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
