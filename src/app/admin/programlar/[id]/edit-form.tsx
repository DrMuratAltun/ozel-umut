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
import { updateProgram } from "@/app/admin/actions";

interface Program {
  id: string; title: string; shortDescription: string | null; description: string | null;
  targetGroup: string | null; features: string[]; sortOrder: number;
}

export function ProgramEditForm({ program }: { program: Program }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const featuresStr = fd.get("features") as string;
    try {
      await updateProgram(program.id, {
        title: fd.get("title") as string,
        shortDescription: (fd.get("shortDescription") as string) || undefined,
        description: (fd.get("description") as string) || undefined,
        targetGroup: (fd.get("targetGroup") as string) || undefined,
        features: featuresStr ? featuresStr.split(",").map((f) => f.trim()).filter(Boolean) : [],
        sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
      });
      toast.success("Program guncellendi");
      router.push("/admin/programlar");
    } catch { toast.error("Guncelleme basarisiz"); } finally { setLoading(false); }
  }

  return (
    <Card><CardContent className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label htmlFor="title">Baslik *</Label><Input id="title" name="title" defaultValue={program.title} required className="mt-1.5" /></div>
          <div><Label htmlFor="targetGroup">Hedef Grup</Label><Input id="targetGroup" name="targetGroup" defaultValue={program.targetGroup || ""} className="mt-1.5" /></div>
        </div>
        <div><Label htmlFor="shortDescription">Kisa Aciklama</Label><Textarea id="shortDescription" name="shortDescription" defaultValue={program.shortDescription || ""} rows={2} className="mt-1.5" /></div>
        <div><Label htmlFor="description">Detayli Aciklama</Label><Textarea id="description" name="description" defaultValue={program.description || ""} rows={8} className="mt-1.5" /></div>
        <div><Label htmlFor="features">Ozellikler (virgülle ayirin)</Label><Input id="features" name="features" defaultValue={program.features.join(", ")} className="mt-1.5" /></div>
        <div><Label htmlFor="sortOrder">Siralama</Label><Input id="sortOrder" name="sortOrder" type="number" defaultValue={program.sortOrder} className="mt-1.5 w-32" /></div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Guncelle</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Iptal</Button>
        </div>
      </form>
    </CardContent></Card>
  );
}
