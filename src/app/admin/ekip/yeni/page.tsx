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
import { createTeamMember } from "@/app/admin/actions";

export default function YeniEkipPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await createTeamMember({
        fullName: fd.get("fullName") as string,
        title: fd.get("title") as string,
        specialization: (fd.get("specialization") as string) || undefined,
        bio: (fd.get("bio") as string) || undefined,
        photoUrl: (fd.get("photoUrl") as string) || undefined,
        email: (fd.get("email") as string) || undefined,
        sortOrder: parseInt(fd.get("sortOrder") as string) || 0,
      });
      toast.success("Ekip uyesi eklendi");
      router.push("/admin/ekip");
    } catch {
      toast.error("Ekleme basarisiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Yeni Ekip Uyesi</h1>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Ad Soyad *</Label>
                <Input id="fullName" name="fullName" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="title">Unvan *</Label>
                <Input id="title" name="title" required placeholder="Ozel Egitim Uzmani" className="mt-1.5" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialization">Uzmanlik Alani</Label>
                <Input id="specialization" name="specialization" placeholder="Otizm, Ogrenme Guclugu" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" name="email" type="email" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Biyografi</Label>
              <Textarea id="bio" name="bio" rows={4} className="mt-1.5" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="photoUrl">Fotograf URL</Label>
                <Input id="photoUrl" name="photoUrl" type="url" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="sortOrder">Siralama</Label>
                <Input id="sortOrder" name="sortOrder" type="number" defaultValue="0" className="mt-1.5" />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Kaydet
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Iptal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
