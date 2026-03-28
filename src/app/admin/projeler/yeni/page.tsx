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
import { createProject } from "@/app/admin/actions";

export default function YeniProjePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await createProject({
        title: fd.get("title") as string,
        shortDescription: (fd.get("shortDescription") as string) || undefined,
        description: (fd.get("description") as string) || undefined,
        coverImageUrl: (fd.get("coverImageUrl") as string) || undefined,
        status: fd.get("status") as string || "active",
        sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
      });
      toast.success("Proje eklendi");
      router.push("/admin/projeler");
    } catch { toast.error("Ekleme basarisiz"); } finally { setLoading(false); }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Yeni Proje</h1>
      <Card><CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><Label htmlFor="title">Baslik *</Label><Input id="title" name="title" required className="mt-1.5" /></div>
          <div><Label htmlFor="shortDescription">Kisa Aciklama</Label><Textarea id="shortDescription" name="shortDescription" rows={2} className="mt-1.5" /></div>
          <div><Label htmlFor="description">Detayli Aciklama</Label><Textarea id="description" name="description" rows={8} className="mt-1.5" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div><Label htmlFor="status">Durum</Label>
              <Select name="status" defaultValue="active"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="active">Devam Ediyor</SelectItem><SelectItem value="completed">Tamamlandi</SelectItem><SelectItem value="planned">Planlaniyor</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="coverImageUrl">Kapak Gorseli URL</Label><Input id="coverImageUrl" name="coverImageUrl" type="url" className="mt-1.5" /></div>
            <div><Label htmlFor="sortOrder">Siralama</Label><Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" className="mt-1.5" /></div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Kaydet</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Iptal</Button>
          </div>
        </form>
      </CardContent></Card>
    </div>
  );
}
