"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Merhaba, bilgi almak istiyorum."
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="WhatsApp ile iletisime gecin"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
