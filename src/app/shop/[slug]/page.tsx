import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, Package } from "lucide-react";
import { OrderButton } from "./OrderButton";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, published: true } });
  if (!product) return {};
  return { title: product.title, description: product.description.slice(0, 160) };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, published: true },
  });

  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { published: true, category: product.category, slug: { not: slug } },
    take: 4,
  });

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowRight className="w-4 h-4" />
          بازگشت به فروشگاه
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1a1a1a]">
            {product.image ? (
              <Image src={product.image} alt={product.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-24 h-24 text-gray-600" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1 text-xs text-[#C6FF34] bg-[#C6FF34]/10 border border-[#C6FF34]/20 px-2.5 py-1 rounded-full">
                  <Tag className="w-3 h-3" />
                  {product.category}
                </span>
                {product.featured && (
                  <span className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2.5 py-1 rounded-full">
                    ویژه
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">{product.title}</h1>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-[#C6FF34]">
                    {Number(product.salePrice).toLocaleString("fa-IR")} تومان
                  </span>
                  <span className="text-gray-500 line-through text-lg">
                    {Number(product.price).toLocaleString("fa-IR")}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-[#C6FF34]">
                  {Number(product.price).toLocaleString("fa-IR")} تومان
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-400" : "bg-red-400"}`} />
              <span className={`text-sm ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                {product.inStock ? "موجود در انبار" : "ناموجود"}
              </span>
            </div>

            <OrderButton product={{ id: product.id, title: product.title, price: Number(product.salePrice ?? product.price) }} disabled={!product.inStock} />
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-bold text-white mb-6">محصولات مشابه</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4 hover:border-[#C6FF34]/30 transition-colors group"
                >
                  {p.image && (
                    <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <p className="text-white text-sm font-medium">{p.title}</p>
                  <p className="text-[#C6FF34] text-sm mt-1">{Number(p.price).toLocaleString("fa-IR")} تومان</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
