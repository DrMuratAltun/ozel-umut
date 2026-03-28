"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function GirisPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("Giris basarisiz. E-posta veya sifre hatali.");
      setLoading(false);
      return;
    }

    toast.success("Basariyla giris yapildi!");
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl mx-auto mb-4">
              U
            </div>
            <h1 className="text-2xl font-bold text-foreground">Yonetim Paneli</h1>
            <p className="text-sm text-muted-foreground mt-1">Giris yapmak icin bilgilerinizi girin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@ozelegitimumut.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="password">Sifre</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              Giris Yap
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
