"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleBanner } from "@/app/admin/actions";

interface BannerToggleProps {
  postId: string;
  initialValue: boolean;
}

export function BannerToggle({ postId, initialValue }: BannerToggleProps) {
  const [checked, setChecked] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleToggle() {
    setLoading(true);
    const newValue = !checked;
    try {
      await toggleBanner(postId, newValue);
      setChecked(newValue);
      toast.success(newValue ? "Haber bandına eklendi" : "Haber bandından çıkarıldı");
      router.refresh();
    } catch {
      toast.error("Güncelleme başarısız");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        checked ? "bg-primary" : "bg-muted"
      } ${loading ? "opacity-50" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label="Haber bandında göster"
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
