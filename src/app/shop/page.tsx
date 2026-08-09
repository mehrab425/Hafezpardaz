import { prisma } from "@/lib/prisma";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProductCard } from "@/components/shop/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروشگاه",
  description: "محصولات و بسته‌های خدماتی حافظ پرداز سپهر",
};

export const revalidate = 60;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const categories = await prisma.product.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });

  const categoryList = categories.map((c) => c.category);

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          tag="فروشگاه"
          title="محصولات"
          titleHighlight="ما"
          description="بسته‌های خدماتی و محصولات دیجیتال حافظ پرداز سپهر"
        />

        <div className="mt-12">
          <ShopFilters categories={categoryList} activeCategory={category} />
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">محصولی در این دسته‌بندی یافت نشد</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
