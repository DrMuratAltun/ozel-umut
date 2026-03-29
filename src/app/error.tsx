"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold text-foreground">Bir hata oluştu</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Sayfayı yüklerken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
      </p>
      <Button onClick={reset} className="mt-6">
        <RefreshCw className="mr-2 h-4 w-4" />
        Tekrar Dene
      </Button>
    </div>
  );
}
