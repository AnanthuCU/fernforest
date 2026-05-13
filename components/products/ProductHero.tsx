"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import type { EnrichedProduct } from "@/lib/productHelpers";
import { isVarietyNutrition } from "@/lib/productHelpers";
import toast from "react-hot-toast";

interface ProductHeroProps {
  product: EnrichedProduct;
}

export function ProductHero({ product }: ProductHeroProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCartStore();

  const headlineStat = isVarietyNutrition(product.nutrition)
    ? product.nutrition.headlineStat
    : null;

  const keyCompound = isVarietyNutrition(product.nutrition)
    ? product.nutrition.keyCompound
    : null;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      category: product.category,
      size: selectedSize.label,
      price: selectedSize.price,
      quantity: 1,
      image: product.image,
    });
    setAdded(true);
    toast.success(`${product.name} (${selectedSize.label}) added to cart`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="pt-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Breadcrumb */}
        <div className="py-4 sm:py-6">
          <Link
            href="/#varieties"
            className="inline-flex items-center gap-2 text-sm text-bark/50 hover:text-forest transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-12 sm:pb-16">
          {/* ─── Image Column ─── */}
          <div className="relative">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-parchment border border-sage/10 shadow-lg shadow-forest/5 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className={cn(
                  "object-cover transition-all duration-700",
                  imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
                )}
                sizes="(max-width: 1024px) 100vw, 50vw"
                onLoad={() => setImageLoaded(true)}
              />
              {/* Subtle hover zoom */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.badge && <Badge>{product.badge}</Badge>}
                {product.featured && <Badge variant="gold">Best Seller</Badge>}
              </div>

              {/* Category pill */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-forest">
                  {product.category === "variety" ? "Individual Variety" : "Performance Mix"}
                </span>
              </div>
            </div>
          </div>

          {/* ─── Details Column ─── */}
          <div className="flex flex-col justify-center">
            {/* Latin name */}
            {product.latinName && (
              <p className="text-xs text-sage italic tracking-wide mb-2 font-medium">
                {product.latinName}
              </p>
            )}

            {/* Product title */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-forest leading-[1.1] mb-4">
              {product.name}
            </h1>

            {/* Headline stat */}
            {headlineStat && (
              <div className="flex items-start gap-2.5 bg-forest/5 rounded-2xl px-5 py-4 mb-5 border border-forest/8">
                <Sparkles className="h-4 w-4 text-sage mt-0.5 flex-shrink-0" />
                <p className="text-sm text-forest/80 leading-relaxed font-medium">
                  {headlineStat}
                </p>
              </div>
            )}

            {/* Description */}
            <p className="text-bark/60 text-base sm:text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Key compound */}
            {keyCompound && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-widest text-bark/30 font-bold mb-1.5">
                  Key Compound
                </p>
                <p className="text-sm text-leaf font-semibold">{keyCompound}</p>
              </div>
            )}

            {/* ─── Pricing & Size ─── */}
            <div className="hidden lg:block">
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-widest text-bark/30 font-bold mb-3">
                  Select Size
                </p>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.label}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "flex-1 max-w-[160px] py-3.5 px-4 rounded-2xl border-2 text-center transition-all duration-200",
                        selectedSize.label === size.label
                          ? "border-sage bg-sage/5 shadow-md shadow-sage/10"
                          : "border-parchment hover:border-sage/40"
                      )}
                    >
                      <span className="block text-sm font-bold text-forest">
                        {size.label}
                      </span>
                      <span className="block text-lg font-bold text-forest mt-0.5">
                        {formatPrice(size.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={cn(
                  "w-full max-w-[340px] flex items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-bold transition-all duration-200",
                  added
                    ? "bg-sage text-white"
                    : "bg-forest text-white hover:bg-leaf active:scale-[0.98] shadow-lg shadow-forest/20 hover:shadow-xl hover:shadow-forest/25"
                )}
              >
                {added ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" /> Add to Cart —{" "}
                    {formatPrice(selectedSize.price)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
