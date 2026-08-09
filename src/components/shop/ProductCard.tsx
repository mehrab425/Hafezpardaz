import Link from "next/link";
import Image from "next/image";
import { Package, Tag } from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";

interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: Decimal | number;
  salePrice?: Decimal | number | null;
  category: string;
  image?: string | null;
  featured: boolean;
  inStock: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C6FF34]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-48 bg-[#141414] overflow-hidden flex-shrink-0">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-700" />
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 right-3 text-xs bg-[#C6FF34] text-black font-bold px-2 py-0.5 rounded-full">
            ویژه
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-red-400 text-sm font-medium">ناموجود</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <Tag className="w-3 h-3 text-[#C6FF34]" />
          <span className="text-xs text-[#C6FF34]">{product.category}</span>
        </div>
        <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-gray-400 text-xs line-clamp-2 flex-1 mb-3">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          {product.salePrice ? (
            <div>
              <span className="text-[#C6FF34] font-bold text-sm">{Number(product.salePrice).toLocaleString("fa-IR")} تومان</span>
              <span className="text-gray-600 line-through text-xs mr-2">{Number(product.price).toLocaleString("fa-IR")}</span>
            </div>
          ) : (
            <span className="text-[#C6FF34] font-bold text-sm">{Number(product.price).toLocaleString("fa-IR")} تومان</span>
          )}
          <span className="text-xs text-gray-500 group-hover:text-[#C6FF34] transition-colors">مشاهده →</span>
        </div>
      </div>
    </Link>
  );
}
