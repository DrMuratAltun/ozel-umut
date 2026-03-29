"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Stethoscope,
  GraduationCap,
  ImageIcon,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { toast } from "sonner";

const LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Ekip", href: "/admin/ekip", icon: Users },
  { label: "Hizmetler", href: "/admin/hizmetler", icon: Stethoscope },
  { label: "Programlar", href: "/admin/programlar", icon: GraduationCap },
  { label: "Galeri", href: "/admin/galeri", icon: ImageIcon },
  { label: "Projeler", href: "/admin/projeler", icon: FolderKanban },
  { label: "Mesajlar", href: "/admin/mesajlar", icon: MessageSquare },
  { label: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("Çıkış yapıldı");
    router.push("/giris");
    router.refresh();
  }

  return (
    <aside className="w-64 bg-sidebar border-r flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            U
          </div>
          <div>
            <p className="font-semibold text-sm text-sidebar-foreground">Umut</p>
            <p className="text-xs text-muted-foreground">Yönetim Paneli</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {LINKS.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Home className="h-4 w-4" />
          Siteye Git
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </aside>
  );
}
