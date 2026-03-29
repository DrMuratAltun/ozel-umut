"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gönderim başarısız");

      toast.success("Mesajınız başarıyla gönderildi! En kısa sürede size döneceğiz.");
      reset();
    } catch {
      toast.error("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Bize Yazın</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Adınız Soyadınız *</Label>
              <Input
                id="name"
                placeholder="Adınız Soyadınız"
                {...register("name")}
                className="mt-1.5"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                {...register("email")}
                className="mt-1.5"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0555 555 55 55"
                {...register("phone")}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="subject">Konu</Label>
              <Input
                id="subject"
                placeholder="Mesaj konusu"
                {...register("subject")}
                className="mt-1.5"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="message">Mesajınız *</Label>
            <Textarea
              id="message"
              placeholder="Mesajınızı buraya yazınız..."
              rows={5}
              {...register("message")}
              className="mt-1.5"
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Mesaj Gönder
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
