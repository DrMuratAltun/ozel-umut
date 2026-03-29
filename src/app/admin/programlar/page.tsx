import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminProgramlarPage() {
  const programs = await prisma.program.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Programlar</h1>
        <Button asChild><Link href="/admin/programlar/yeni"><Plus className="mr-2 h-4 w-4" />Yeni Program</Link></Button>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow><TableHead>Başlık</TableHead><TableHead>Hedef Grup</TableHead><TableHead>Durum</TableHead><TableHead>Sıra</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
          <TableBody>
            {programs.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.targetGroup || "-"}</TableCell>
                <TableCell><Badge variant={p.isActive ? "default" : "outline"}>{p.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                <TableCell>{p.sortOrder}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm"><Link href={`/admin/programlar/${p.id}`}><Edit className="h-4 w-4" /></Link></Button>
                    <DeleteButton id={p.id} type="program" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {programs.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Henüz program yok.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
