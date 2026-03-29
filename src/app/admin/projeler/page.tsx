import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProjelerPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Projeler</h1>
        <Button asChild><Link href="/admin/projeler/yeni"><Plus className="mr-2 h-4 w-4" />Yeni Proje</Link></Button>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Başlık</TableHead><TableHead>Durum</TableHead><TableHead>Sıra</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell><Badge>{p.status === "active" ? "Devam Ediyor" : p.status === "completed" ? "Tamamlandı" : "Planlanıyor"}</Badge></TableCell>
                <TableCell>{p.sortOrder}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm"><Link href={`/admin/projeler/${p.id}`}><Edit className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={p.id} type="project" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Henüz proje yok.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
