import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, User } from "lucide-react";
import { markMessageAsRead } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }> }

export default async function MessageDetailPage({ params }: Props) {
  const { id } = await params;
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) notFound();

  if (!message.isRead) {
    await markMessageAsRead(id);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Mesaj Detay</h1>
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{message.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${message.email}`} className="text-primary hover:underline">{message.email}</a>
            </div>
            {message.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${message.phone}`} className="text-primary hover:underline">{message.phone}</a>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {new Date(message.createdAt).toLocaleString("tr-TR")}
            </div>
          </div>
          {message.subject && (
            <div className="mb-4">
              <Badge variant="secondary">{message.subject}</Badge>
            </div>
          )}
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-foreground whitespace-pre-wrap">{message.message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
