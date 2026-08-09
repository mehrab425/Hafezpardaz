import { z } from "zod";

export const postSchema = z.object({
  slug: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  category: z.string().min(1).max(100),
  author: z.string().min(1).max(100),
  image: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  readTime: z.string().max(50).optional(),
});

export const productSchema = z.object({
  slug: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().positive(),
  salePrice: z.number().positive().optional().nullable(),
  category: z.string().min(1).max(100),
  image: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const orderSchema = z.object({
  customerName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().min(1).max(20),
  company: z.string().max(100).optional(),
  totalAmount: z.number().min(0).default(0),
  notes: z.string().optional(),
  projectType: z.any().optional(),
  features: z.any().optional(),
  budget: z.string().max(50).optional(),
  timeline: z.string().max(50).optional(),
  description: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.number(),
        quantity: z.number().positive(),
        price: z.number().positive(),
      })
    )
    .optional()
    .default([]),
});

export const videoSchema = z.object({
  slug: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  cloudinaryId: z.string().min(1),
  thumbnailUrl: z.string().optional(),
  category: z.string().max(100).optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const contentSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string(),
  type: z.enum(["TEXT", "JSON", "HTML"]).default("TEXT"),
  label: z.string().min(1).max(255),
});

export const chatMessageSchema = z.object({
  content: z.string().min(1),
  role: z.enum(["VISITOR", "ADMIN"]),
  sessionId: z.string().min(1),
  visitorName: z.string().optional(),
  visitorEmail: z.string().email().optional(),
});

export const analyticsSchema = z.object({
  event: z.string().min(1).max(100),
  path: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(),
  sessionId: z.string().max(100).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export const orderStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
});

export const gallerySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  filePath: z.string().min(1),
  alt: z.string().optional(),
  sortOrder: z.number().default(0),
});

export const serviceAdminSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  price: z.number().positive().optional().nullable(),
  image: z.string().optional().nullable(),
  icon: z.string().max(50).optional().nullable(),
  active: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const portfolioItemSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  image: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

export const settingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string(),
  label: z.string().min(1).max(255),
  type: z.enum(["TEXT", "JSON", "HTML", "IMAGE", "BOOLEAN"]).default("TEXT"),
});
