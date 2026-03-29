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
import { updateProject } from "@/app/admin/actions";

interface Project {
  id: string; title: string; shortDescription: string | null; description: string | null;
  coverImageUrl: string | null; status: string; sortOrder: number;
}

export function ProjectEditForm({ project }: { project: Project }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await updateProject(project.id, {
        title: fd.get("title") as string,
        shortDescription: (fd.get("shortDescription") as string) || undefined,
        description: (fd.get("description") as string) || undefined,
        coverImageUrl: (fd.get("coverImageUrl") as string) || undefined,
        status: fd.get("status") as string,
        sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
      });
      toast.success("Proje güncellendi");
      router.push("/admin/projeler");
    } catch { toast.error("Güncelleme başarısız"); } finally { setLoading(false); }
  }

  return (
    <Card><CardContent className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><Label htmlFor="title">Başlık *</Label><Input id="title" name="title" defaultValue={project.title} required className="mt-1.5" /></div>
        <div><Label htmlFor="shortDescription">Kısa Açıklama</Label><Textarea id="shortDescription" name="shortDescription" defaultValue={project.shortDescription || ""} rows={2} className="mt-1.5" /></div>
        <div><Label htmlFor="description">Detaylı Açıklama</Label><Textarea id="description" name="description" defaultValue={project.description || ""} rows={8} className="mt-1.5" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label htmlFor="status">Durum</Label>
            <Select name="status" defaultValue={project.status}><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="active">Devam Ediyor</SelectItem><SelectItem value="completed">Tamamlandı</SelectItem><SelectItem value="planned">Planlanıyor</SelectItem></SelectContent>
            </Select>
          </div>
          <div><Label htmlFor="coverImageUrl">Kapak Görseli URL</Label><Input id="coverImageUrl" name="coverImageUrl" type="url" defaultValue={project.coverImageUrl || ""} className="mt-1.5" /></div>
          <div><Label htmlFor="sortOrder">Sıralama</Label><Input id="sortOrder" name="sortOrder" type="number" defaultValue={project.sortOrder} className="mt-1.5" /></div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Güncelle</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>İptal</Button>
        </div>
      </form>
    </CardContent></Card>
  );
}
