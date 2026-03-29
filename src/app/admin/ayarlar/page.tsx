"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateSiteSettings } from "@/app/admin/actions";

export default function AdminAyarlarPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const settings = [
      { key: "phone", value: fd.get("phone") as string, group: "contact" },
      { key: "email", value: fd.get("email") as string, group: "contact" },
      { key: "address", value: fd.get("address") as string, group: "contact" },
      { key: "whatsapp", value: fd.get("whatsapp") as string, group: "contact" },
      { key: "weekday_hours", value: fd.get("weekday_hours") as string, group: "contact" },
      { key: "saturday_hours", value: fd.get("saturday_hours") as string, group: "contact" },
      { key: "facebook", value: fd.get("facebook") as string, group: "social" },
      { key: "instagram", value: fd.get("instagram") as string, group: "social" },
      { key: "youtube", value: fd.get("youtube") as string, group: "social" },
    ].filter((s) => s.value);

    try {
      await updateSiteSettings(settings);
      toast.success("Ayarlar kaydedildi");
    } catch {
      toast.error("Kaydetme başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Site Ayarları</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">İletişim Bilgileri</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="phone">Telefon</Label><Input id="phone" name="phone" defaultValue="0242 643 01 45" className="mt-1.5" /></div>
                <div><Label htmlFor="email">E-posta</Label><Input id="email" name="email" defaultValue="info@ozelegitimumut.com" className="mt-1.5" /></div>
                <div><Label htmlFor="address">Adres</Label><Input id="address" name="address" defaultValue="Korkuteli, Antalya" className="mt-1.5" /></div>
                <div><Label htmlFor="whatsapp">WhatsApp Numarası</Label><Input id="whatsapp" name="whatsapp" defaultValue="902426430145" className="mt-1.5" /></div>
              </div>
              <Separator className="my-4" />
              <h3 className="text-sm font-medium text-foreground mb-3">Çalışma Saatleri</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><Label htmlFor="weekday_hours">Hafta İçi</Label><Input id="weekday_hours" name="weekday_hours" defaultValue="08:30 - 17:30" className="mt-1.5" /></div>
                <div><Label htmlFor="saturday_hours">Cumartesi</Label><Input id="saturday_hours" name="saturday_hours" defaultValue="09:00 - 14:00" className="mt-1.5" /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Sosyal Medya</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><Label htmlFor="facebook">Facebook</Label><Input id="facebook" name="facebook" type="url" placeholder="https://facebook.com/..." className="mt-1.5" /></div>
                <div><Label htmlFor="instagram">Instagram</Label><Input id="instagram" name="instagram" type="url" placeholder="https://instagram.com/..." className="mt-1.5" /></div>
                <div><Label htmlFor="youtube">YouTube</Label><Input id="youtube" name="youtube" type="url" placeholder="https://youtube.com/..." className="mt-1.5" /></div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" disabled={loading} size="lg">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Ayarları Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
}
