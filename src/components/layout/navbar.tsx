"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS, CONTACT, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar - marka kırmızısı */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-1.5 text-sm">
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="flex items-center gap-1.5 hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            {CONTACT.phone}
          </a>
          <span className="hidden sm:inline">Korkuteli, Antalya &bull; 2005&apos;ten beri</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-md">
            U
          </div>
          <div className="hidden sm:block">
            <p className="font-bold text-lg leading-tight text-foreground">Umut</p>
            <p className="text-xs text-muted-foreground leading-tight">Özel Eğitim ve Rehabilitasyon</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-primary/10 hover:text-primary",
                pathname === link.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-white" size="sm">
            <a href={`tel:${CONTACT.phoneRaw}`}>
              <Phone className="mr-1.5 h-4 w-4" />
              Bizi Arayın
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />} className="lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="text-lg font-bold">{SITE_NAME}</SheetTitle>
              <nav className="flex flex-col gap-1 mt-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-white">
                  <a href={`tel:${CONTACT.phoneRaw}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {CONTACT.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
