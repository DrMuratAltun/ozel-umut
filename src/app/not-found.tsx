import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">Sayfa Bulunamadı</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Ana Sayfaya Dön
        </Link>
      </Button>
    </div>
  );
}
