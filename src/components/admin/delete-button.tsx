"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteItem } from "@/app/admin/actions";

interface DeleteButtonProps {
  id: string;
  type: "blog" | "team" | "service" | "program" | "gallery" | "project" | "message" | "testimonial";
}

export function DeleteButton({ id, type }: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteItem(type, id);
      toast.success("Basariyla silindi");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Silme islemi basarisiz");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" />}>
        <Trash2 className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Silme Onayi</DialogTitle>
          <DialogDescription>
            Bu ogeyikaldirmak istediginizden emin misiniz? Bu islem geri alinamaz.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Iptal</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
