"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createGalleryItem, deleteItem } from "@/app/admin/actions";

interface GalleryItem {
  id: string; title: string | null; imageUrl: string; category: string | null;
}

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    fetch("/api/gallery").then((r) => r.json()).then(setItems).catch(() => {});
  }, []);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const item = await createGalleryItem({
        title: (fd.get("title") as string) || undefined,
        imageUrl: fd.get("imageUrl") as string,
        category: (fd.get("category") as string) || undefined,
      });
      setItems((prev) => [...prev, item as unknown as GalleryItem]);
      toast.success("Görsel eklendi");
      setAddOpen(false);
    } catch { toast.error("Ekleme başarısız"); } finally { setLoading(false); }
  }

  async function handleDelete(id: string) {
    try {
      await deleteItem("gallery", id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Görsel silindi");
    } catch { toast.error("Silme başarısız"); }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Galeri Yönetimi</h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger render={<Button />}>
            <Plus className="mr-2 h-4 w-4" />Görsel Ekle
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Yeni Görsel Ekle</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div><Label htmlFor="imageUrl">Görsel URL *</Label><Input id="imageUrl" name="imageUrl" type="url" required className="mt-1.5" /></div>
              <div><Label htmlFor="title">Başlık</Label><Input id="title" name="title" className="mt-1.5" /></div>
              <div><Label htmlFor="category">Kategori</Label><Input id="category" name="category" placeholder="Etkinlikler, Siniflar..." className="mt-1.5" /></div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}Ekle
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">Henüz galeri görseli yok.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden">
              <div className="aspect-square">
                <img src={item.imageUrl} alt={item.title || "Galeri"} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{item.title || "Başlıksız"}</p>
                {item.category && <p className="text-xs text-muted-foreground">{item.category}</p>}
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
