import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { blogPosts } from "@/data";
import { BlogPostClient } from "./BlogPostClient";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dbPost = await prisma.post.findUnique({ where: { slug, published: true } }).catch(() => null);
  const staticPost = blogPosts.find((p) => p.slug === slug);
  const post = dbPost ?? staticPost;
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const dbPost = await prisma.post.findUnique({ where: { slug, published: true } }).catch(() => null);
  const staticPost = blogPosts.find((p) => p.slug === slug);

  if (!dbPost && !staticPost) notFound();

  const post = dbPost
    ? {
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        category: dbPost.category,
        author: dbPost.author,
        readTime: dbPost.readTime ?? "۵ دقیقه",
        date: new Date(dbPost.createdAt).toLocaleDateString("fa-IR"),
        image: dbPost.image ?? null,
        tags: Array.isArray(dbPost.tags) ? (dbPost.tags as string[]) : [],
      }
    : {
        slug: staticPost!.slug,
        title: staticPost!.title,
        excerpt: staticPost!.excerpt,
        content: staticPost!.content ?? "",
        category: staticPost!.category,
        author: staticPost!.author,
        readTime: staticPost!.readTime,
        date: staticPost!.date,
        image: null,
        tags: staticPost!.tags,
      };

  const related = dbPost
    ? (await prisma.post
        .findMany({ where: { published: true, slug: { not: slug } }, take: 3 })
        .catch(() => []))
        .map((p) => ({ slug: p.slug, title: p.title, category: p.category, readTime: p.readTime ?? "۵ دقیقه" }))
    : blogPosts
        .filter((p) => p.slug !== slug)
        .slice(0, 3)
        .map((p) => ({ slug: p.slug, title: p.title, category: p.category, readTime: p.readTime }));

  return <BlogPostClient post={post} related={related} />;
}
