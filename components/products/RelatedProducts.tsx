"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { EnrichedProduct } from "@/lib/productHelpers";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface RelatedProductsProps {
  products: EnrichedProduct[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You might also love",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-8 lg:px-16 bg-parchment">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sage font-bold text-xs uppercase tracking-widest">
              Explore More
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-forest mt-2">
              {title}
            </h2>
          </div>
          <Link
            href="/#varieties"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-leaf transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/8"
            >
              <div className="relative aspect-square overflow-hidden bg-parchment">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-106"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {product.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge>{product.badge}</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                {product.latinName && (
                  <p className="text-[10px] text-gray-400 italic mb-0.5">
                    {product.latinName}
                  </p>
                )}
                <h3 className="font-serif text-base sm:text-lg text-forest mb-1 group-hover:text-leaf transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-bark/50 mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm font-bold text-forest">
                  From {formatPrice(product.sizes[0].price)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link
            href="/#varieties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-leaf transition-colors"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
