"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Delete item by type
export async function deleteItem(
  type: "blog" | "team" | "service" | "program" | "gallery" | "project" | "message" | "testimonial",
  id: string
) {
  switch (type) {
    case "blog":
      await prisma.blogPost.delete({ where: { id } });
      revalidatePath("/admin/blog");
      revalidatePath("/blog");
      break;
    case "team":
      await prisma.teamMember.delete({ where: { id } });
      revalidatePath("/admin/ekip");
      revalidatePath("/ekibimiz");
      break;
    case "service":
      await prisma.service.delete({ where: { id } });
      revalidatePath("/admin/hizmetler");
      revalidatePath("/hizmetlerimiz");
      break;
    case "program":
      await prisma.program.delete({ where: { id } });
      revalidatePath("/admin/programlar");
      revalidatePath("/programlar");
      break;
    case "gallery":
      await prisma.galleryItem.delete({ where: { id } });
      revalidatePath("/admin/galeri");
      revalidatePath("/galeri");
      break;
    case "project":
      await prisma.project.delete({ where: { id } });
      revalidatePath("/admin/projeler");
      revalidatePath("/projeler");
      break;
    case "message":
      await prisma.contactMessage.delete({ where: { id } });
      revalidatePath("/admin/mesajlar");
      break;
    case "testimonial":
      await prisma.testimonial.delete({ where: { id } });
      revalidatePath("/");
      break;
  }
}

// Blog CRUD
export async function createBlogPost(data: {
  title: string; content: string; excerpt?: string; category?: string;
  tags?: string[]; status?: string; coverImageUrl?: string;
  metaTitle?: string; metaDescription?: string;
}) {
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug: slugify(data.title),
      publishedAt: data.status === "published" ? new Date() : null,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}

export async function updateBlogPost(id: string, data: {
  title?: string; content?: string; excerpt?: string; category?: string;
  tags?: string[]; status?: string; coverImageUrl?: string;
  metaTitle?: string; metaDescription?: string;
}) {
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      slug: data.title ? slugify(data.title) : undefined,
      publishedAt: data.status === "published" ? new Date() : undefined,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return post;
}

// Team CRUD
export async function createTeamMember(data: {
  fullName: string; title: string; specialization?: string;
  bio?: string; photoUrl?: string; email?: string; sortOrder?: number;
}) {
  const member = await prisma.teamMember.create({ data });
  revalidatePath("/admin/ekip");
  revalidatePath("/ekibimiz");
  return member;
}

export async function updateTeamMember(id: string, data: {
  fullName?: string; title?: string; specialization?: string;
  bio?: string; photoUrl?: string; email?: string; sortOrder?: number; isActive?: boolean;
}) {
  const member = await prisma.teamMember.update({ where: { id }, data });
  revalidatePath("/admin/ekip");
  revalidatePath("/ekibimiz");
  return member;
}

// Service CRUD
export async function createService(data: {
  title: string; shortDescription?: string; description?: string;
  iconName?: string; imageUrl?: string; sortOrder?: number;
  metaTitle?: string; metaDescription?: string;
}) {
  const service = await prisma.service.create({
    data: { ...data, slug: slugify(data.title) },
  });
  revalidatePath("/admin/hizmetler");
  revalidatePath("/hizmetlerimiz");
  return service;
}

export async function updateService(id: string, data: {
  title?: string; shortDescription?: string; description?: string;
  iconName?: string; imageUrl?: string; sortOrder?: number; isActive?: boolean;
  metaTitle?: string; metaDescription?: string;
}) {
  const service = await prisma.service.update({
    where: { id },
    data: {
      ...data,
      slug: data.title ? slugify(data.title) : undefined,
    },
  });
  revalidatePath("/admin/hizmetler");
  revalidatePath("/hizmetlerimiz");
  return service;
}

// Program CRUD
export async function createProgram(data: {
  title: string; shortDescription?: string; description?: string;
  targetGroup?: string; iconName?: string; imageUrl?: string;
  features?: string[]; sortOrder?: number;
  metaTitle?: string; metaDescription?: string;
}) {
  const program = await prisma.program.create({
    data: { ...data, slug: slugify(data.title) },
  });
  revalidatePath("/admin/programlar");
  revalidatePath("/programlar");
  return program;
}

export async function updateProgram(id: string, data: {
  title?: string; shortDescription?: string; description?: string;
  targetGroup?: string; iconName?: string; imageUrl?: string;
  features?: string[]; sortOrder?: number; isActive?: boolean;
  metaTitle?: string; metaDescription?: string;
}) {
  const program = await prisma.program.update({
    where: { id },
    data: {
      ...data,
      slug: data.title ? slugify(data.title) : undefined,
    },
  });
  revalidatePath("/admin/programlar");
  revalidatePath("/programlar");
  return program;
}

// Project CRUD
export async function createProject(data: {
  title: string; description?: string; shortDescription?: string;
  coverImageUrl?: string; status?: string;
  startDate?: Date; endDate?: Date; sortOrder?: number;
}) {
  const project = await prisma.project.create({
    data: { ...data, slug: slugify(data.title) },
  });
  revalidatePath("/admin/projeler");
  revalidatePath("/projeler");
  return project;
}

export async function updateProject(id: string, data: {
  title?: string; description?: string; shortDescription?: string;
  coverImageUrl?: string; status?: string;
  startDate?: Date; endDate?: Date; sortOrder?: number; isActive?: boolean;
}) {
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...data,
      slug: data.title ? slugify(data.title) : undefined,
    },
  });
  revalidatePath("/admin/projeler");
  revalidatePath("/projeler");
  return project;
}

// Message actions
export async function markMessageAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
  revalidatePath("/admin/mesajlar");
}

// Gallery
export async function createGalleryItem(data: {
  title?: string; description?: string; imageUrl: string;
  category?: string; mediaType?: string; videoUrl?: string; sortOrder?: number;
}) {
  const item = await prisma.galleryItem.create({ data });
  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  return item;
}

// Site Settings
export async function updateSiteSettings(settings: { key: string; value: string; group?: string }[]) {
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value, group: setting.group || "general" },
    });
  }
  revalidatePath("/");
}
