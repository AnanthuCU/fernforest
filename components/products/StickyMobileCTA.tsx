"use client";

import { useState } from "react";
import { ShoppingCart, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product, SizeOption } from "@/types";
import toast from "react-hot-toast";

interface StickyMobileCTAProps {
  product: Product;
}

export function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const [selectedSize, setSelectedSize] = useState<SizeOption>(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem } = useCartStore();

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
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-t border-sage/20 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Size toggle */}
        <div className="flex gap-1.5 flex-shrink-0">
          {product.sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "px-3 py-2 rounded-xl text-xs font-bold transition-all border-2",
                selectedSize.label === size.label
                  ? "border-sage bg-cream text-forest"
                  : "border-parchment text-bark/40"
              )}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* Price */}
        <div className="flex-shrink-0">
          <p className="text-lg font-bold text-forest leading-none">
            {formatPrice(selectedSize.price)}
          </p>
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all duration-200",
            added
              ? "bg-sage text-white"
              : "bg-forest text-white hover:bg-leaf active:scale-95"
          )}
        >
          {added ? (
            <>
              <CheckCircle2 className="h-4 w-4" /> Added!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
