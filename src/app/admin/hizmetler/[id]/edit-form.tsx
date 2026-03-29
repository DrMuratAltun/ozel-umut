"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateService } from "@/app/admin/actions";

interface Service {
  id: string; title: string; shortDescription: string | null; description: string | null;
  iconName: string | null; imageUrl: string | null; sortOrder: number;
}

export function ServiceEditForm({ service }: { service: Service }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await updateService(service.id, {
        title: fd.get("title") as string,
        shortDescription: (fd.get("shortDescription") as string) || undefined,
        description: (fd.get("description") as string) || undefined,
        iconName: (fd.get("iconName") as string) || undefined,
        imageUrl: (fd.get("imageUrl") as string) || undefined,
        sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
      });
      toast.success("Hizmet güncellendi");
      router.push("/admin/hizmetler");
    } catch { toast.error("Güncelleme başarısız"); } finally { setLoading(false); }
  }

  return (
    <Card><CardContent className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><Label htmlFor="title">Başlık *</Label><Input id="title" name="title" defaultValue={service.title} required className="mt-1.5" /></div>
        <div><Label htmlFor="shortDescription">Kısa Açıklama</Label><Textarea id="shortDescription" name="shortDescription" defaultValue={service.shortDescription || ""} rows={2} className="mt-1.5" /></div>
        <div><Label htmlFor="description">Detaylı Açıklama</Label><Textarea id="description" name="description" defaultValue={service.description || ""} rows={8} className="mt-1.5" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><Label htmlFor="iconName">İkon Adı</Label><Input id="iconName" name="iconName" defaultValue={service.iconName || ""} className="mt-1.5" /></div>
          <div><Label htmlFor="imageUrl">Görsel URL</Label><Input id="imageUrl" name="imageUrl" type="url" defaultValue={service.imageUrl || ""} className="mt-1.5" /></div>
          <div><Label htmlFor="sortOrder">Sıralama</Label><Input id="sortOrder" name="sortOrder" type="number" defaultValue={service.sortOrder} className="mt-1.5" /></div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Güncelle</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>İptal</Button>
        </div>
      </form>
    </CardContent></Card>
  );
}
