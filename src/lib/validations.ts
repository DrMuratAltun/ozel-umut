import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Isim en az 2 karakter olmalidir"),
  email: z.string().email("Gecerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalidir"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(3, "Baslik en az 3 karakter olmalidir"),
  slug: z.string().min(3, "Slug en az 3 karakter olmalidir"),
  content: z.string().min(10, "Icerik en az 10 karakter olmalidir"),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("draft"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type BlogPostValues = z.infer<typeof blogPostSchema>;

export const teamMemberSchema = z.object({
  fullName: z.string().min(2, "Isim en az 2 karakter olmalidir"),
  title: z.string().min(2, "Unvan gereklidir"),
  specialization: z.string().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export type TeamMemberValues = z.infer<typeof teamMemberSchema>;

export const serviceSchema = z.object({
  title: z.string().min(2, "Baslik gereklidir"),
  slug: z.string().min(2, "Slug gereklidir"),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  iconName: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ServiceValues = z.infer<typeof serviceSchema>;

export const programSchema = z.object({
  title: z.string().min(2, "Baslik gereklidir"),
  slug: z.string().min(2, "Slug gereklidir"),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  targetGroup: z.string().optional(),
  iconName: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ProgramValues = z.infer<typeof programSchema>;
