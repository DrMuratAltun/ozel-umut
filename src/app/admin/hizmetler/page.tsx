import type { Service } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminHizmetlerPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Hizmetler</h1>
        <Button asChild><Link href="/admin/hizmetler/yeni"><Plus className="mr-2 h-4 w-4" />Yeni Hizmet</Link></Button>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Baslik</TableHead><TableHead>Slug</TableHead><TableHead>Durum</TableHead><TableHead>Sira</TableHead><TableHead className="text-right">Islemler</TableHead></TableRow></TableHeader>
          <TableBody>
            {services.map((s: Service) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.slug}</TableCell>
                <TableCell><Badge variant={s.isActive ? "default" : "outline"}>{s.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                <TableCell>{s.sortOrder}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm"><Link href={`/admin/hizmetler/${s.id}`}><Edit className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={s.id} type="service" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {services.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Henuz hizmet yok.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
