// Prisma 7 model types - manually defined to match schema
export type Profile = {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  iconName: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Program = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  targetGroup: string | null;
  iconName: string | null;
  imageUrl: string | null;
  features: string[];
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TeamMember = {
  id: string;
  fullName: string;
  title: string;
  specialization: string | null;
  bio: string | null;
  photoUrl: string | null;
  email: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type GalleryItem = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  category: string | null;
  mediaType: string;
  videoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  authorId: string | null;
  category: string | null;
  tags: string[];
  status: string;
  publishedAt: Date | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  shortDescription: string | null;
  coverImageUrl: string | null;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  readBy: string | null;
  createdAt: Date;
};

export type Testimonial = {
  id: string;
  name: string;
  relation: string | null;
  content: string;
  rating: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: string;
  group: string;
};
