import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminEkipPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Ekip Üyeleri</h1>
        <Button asChild>
          <Link href="/admin/ekip/yeni"><Plus className="mr-2 h-4 w-4" />Yeni Üye</Link>
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Üye</TableHead>
                <TableHead>Ünvan</TableHead>
                <TableHead>Uzmanlık</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {m.photoUrl && <AvatarImage src={m.photoUrl} />}
                        <AvatarFallback className="text-xs">{m.fullName.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{m.fullName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{m.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{m.specialization || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={m.isActive ? "default" : "outline"}>
                      {m.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/ekip/${m.id}`}><Edit className="h-4 w-4" /></Link>
                      </Button>
                      <DeleteButton id={m.id} type="team" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Henüz ekip üyesi yok.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
