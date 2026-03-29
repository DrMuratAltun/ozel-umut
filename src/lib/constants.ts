export const SITE_NAME = "Umut Özel Eğitim ve Rehabilitasyon Merkezi";
export const SITE_DESCRIPTION =
  "Korkuteli'de özel eğitim, dil ve konuşma terapisi, fizyoterapi ve psikolojik danışmanlık hizmetleri sunan profesyonel rehabilitasyon merkezi.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ozelegitimumut.com";

export const CONTACT = {
  phone: "0242 643 01 45",
  phoneRaw: "+902426430145",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "902426430145",
  email: "info@ozelegitimumut.com",
  address: "Korkuteli, Antalya",
  city: "Antalya",
  district: "Korkuteli",
};

export const WORKING_HOURS = {
  weekdays: "08:30 - 17:30",
  saturday: "09:00 - 14:00",
  sunday: "Kapalı",
};

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
  { label: "Programlar", href: "/programlar" },
  { label: "Ekibimiz", href: "/ekibimiz" },
  { label: "Galeri", href: "/galeri" },
  { label: "Blog", href: "/blog" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Blog", href: "/admin/blog", icon: "FileText" },
  { label: "Ekip", href: "/admin/ekip", icon: "Users" },
  { label: "Hizmetler", href: "/admin/hizmetler", icon: "Stethoscope" },
  { label: "Programlar", href: "/admin/programlar", icon: "GraduationCap" },
  { label: "Galeri", href: "/admin/galeri", icon: "ImageIcon" },
  { label: "Projeler", href: "/admin/projeler", icon: "FolderKanban" },
  { label: "Mesajlar", href: "/admin/mesajlar", icon: "MessageSquare" },
  { label: "Ayarlar", href: "/admin/ayarlar", icon: "Settings" },
] as const;
