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
import { updateTeamMember } from "@/app/admin/actions";

interface TeamMember {
  id: string; fullName: string; title: string; specialization: string | null;
  bio: string | null; photoUrl: string | null; email: string | null; sortOrder: number;
}

export function TeamEditForm({ member }: { member: TeamMember }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await updateTeamMember(member.id, {
        fullName: fd.get("fullName") as string,
        title: fd.get("title") as string,
        specialization: (fd.get("specialization") as string) || undefined,
        bio: (fd.get("bio") as string) || undefined,
        photoUrl: (fd.get("photoUrl") as string) || undefined,
        email: (fd.get("email") as string) || undefined,
        sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
      });
      toast.success("Ekip üyesi güncellendi");
      router.push("/admin/ekip");
    } catch {
      toast.error("Güncelleme başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label htmlFor="fullName">Ad Soyad *</Label><Input id="fullName" name="fullName" defaultValue={member.fullName} required className="mt-1.5" /></div>
            <div><Label htmlFor="title">Ünvan *</Label><Input id="title" name="title" defaultValue={member.title} required className="mt-1.5" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label htmlFor="specialization">Uzmanlık Alanı</Label><Input id="specialization" name="specialization" defaultValue={member.specialization || ""} className="mt-1.5" /></div>
            <div><Label htmlFor="email">E-posta</Label><Input id="email" name="email" type="email" defaultValue={member.email || ""} className="mt-1.5" /></div>
          </div>
          <div><Label htmlFor="bio">Biyografi</Label><Textarea id="bio" name="bio" defaultValue={member.bio || ""} rows={4} className="mt-1.5" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label htmlFor="photoUrl">Fotoğraf URL</Label><Input id="photoUrl" name="photoUrl" type="url" defaultValue={member.photoUrl || ""} className="mt-1.5" /></div>
            <div><Label htmlFor="sortOrder">Sıralama</Label><Input id="sortOrder" name="sortOrder" type="number" defaultValue={member.sortOrder} className="mt-1.5" /></div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Güncelle</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>İptal</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
