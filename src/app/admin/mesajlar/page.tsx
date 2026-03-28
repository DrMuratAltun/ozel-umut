import type { ContactMessage } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminMesajlarPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Iletisim Mesajlari</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gonderen</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">Islemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((msg: ContactMessage) => (
                <TableRow key={msg.id} className={msg.isRead ? "" : "bg-primary/5"}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{msg.name}</p>
                      <p className="text-xs text-muted-foreground">{msg.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{msg.subject || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(msg.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={msg.isRead ? "secondary" : "default"}>
                      {msg.isRead ? "Okundu" : "Yeni"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/mesajlar/${msg.id}`}><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <DeleteButton id={msg.id} type="message" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {messages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Henuz mesaj yok.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
