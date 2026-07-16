import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getAllProductSlugs,
  getRelatedProducts,
  isVarietyNutrition,
  isMixNutrition,
} from "@/lib/productHelpers";
import { ProductDetailClient } from "./ProductDetailClient";

/* ─── Static params for SSG ─── */
export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

/* ─── Dynamic SEO metadata ─── */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product Not Found" };

  const headlineStat = isVarietyNutrition(product.nutrition)
    ? ` — ${product.nutrition.headlineStat}`
    : "";

  return {
    title: `${product.name} Microgreens${headlineStat} | Fern Forest`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Fern Forest Microgreens`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      type: "website",
      siteName: "Fern Forest",
    },
  };
}

/* ─── Page Component ─── */
export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(params.slug, 4);

  return <ProductDetailClient product={product} related={related} />;
}
