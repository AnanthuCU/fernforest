import type { Product } from "@/types";
import { VARIETIES, MIXES, ALL_PRODUCTS } from "./data";
import {
  VARIETY_NUTRITION,
  MIX_NUTRITION,
  type VarietyNutrition,
  type MixNutrition,
} from "./nutritionData";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  Enriched Product — combines catalog + nutrition data                      */
/* ─────────────────────────────────────────────────────────────────────────── */

export interface EnrichedProduct extends Product {
  nutrition: VarietyNutrition | MixNutrition | null;
  isVariety: boolean;
  isMix: boolean;
}

/** Get a single enriched product by slug */
export function getProductBySlug(slug: string): EnrichedProduct | null {
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;

  const isVariety = product.category === "variety";
  const isMix = product.category === "mix";

  const nutrition: VarietyNutrition | MixNutrition | null =
    isVariety
      ? VARIETY_NUTRITION[product.id] ?? null
      : isMix
        ? MIX_NUTRITION[product.id] ?? null
        : null;

  return { ...product, nutrition, isVariety, isMix };
}

/** Get all enriched products */
export function getAllEnrichedProducts(): EnrichedProduct[] {
  return ALL_PRODUCTS.map((product) => {
    const isVariety = product.category === "variety";
    const isMix = product.category === "mix";
    const nutrition: VarietyNutrition | MixNutrition | null =
      isVariety
        ? VARIETY_NUTRITION[product.id] ?? null
        : isMix
          ? MIX_NUTRITION[product.id] ?? null
          : null;
    return { ...product, nutrition, isVariety, isMix };
  });
}

/** Get related products (same category, excluding current) */
export function getRelatedProducts(
  currentSlug: string,
  limit = 4
): EnrichedProduct[] {
  const current = ALL_PRODUCTS.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const related = ALL_PRODUCTS.filter(
    (p) => p.category === current.category && p.slug !== currentSlug
  );

  // Shuffle and limit
  const shuffled = related.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, limit).map((product) => {
    const isVariety = product.category === "variety";
    const isMix = product.category === "mix";
    const nutrition: VarietyNutrition | MixNutrition | null =
      isVariety
        ? VARIETY_NUTRITION[product.id] ?? null
        : isMix
          ? MIX_NUTRITION[product.id] ?? null
          : null;
    return { ...product, nutrition, isVariety, isMix };
  });
}

/** Get all product slugs (for generateStaticParams) */
export function getAllProductSlugs(): string[] {
  return ALL_PRODUCTS.map((p) => p.slug);
}

/** Type guard — is VarietyNutrition */
export function isVarietyNutrition(
  n: VarietyNutrition | MixNutrition | null
): n is VarietyNutrition {
  return n !== null && "macros" in n;
}

/** Type guard — is MixNutrition */
export function isMixNutrition(
  n: VarietyNutrition | MixNutrition | null
): n is MixNutrition {
  return n !== null && "constituents" in n;
}
