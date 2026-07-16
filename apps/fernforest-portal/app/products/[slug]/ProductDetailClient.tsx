"use client";

import { ProductHero } from "@/components/products/ProductHero";
import { StickyMobileCTA } from "@/components/products/StickyMobileCTA";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import { NutritionTable } from "@/components/products/NutritionTable";
import { BenefitBadge } from "@/components/products/BenefitBadge";
import { isVarietyNutrition, isMixNutrition } from "@/lib/productHelpers";
import type { EnrichedProduct } from "@/lib/productHelpers";
import { Info, Sparkles, Layers } from "lucide-react";

interface ProductDetailClientProps {
  product: EnrichedProduct;
  related: EnrichedProduct[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  return (
    <>
      <ProductHero product={product} />

      <section className="py-16 sm:py-24 bg-white border-t border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main content column */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-4xl text-forest mb-6">
              Why {product.name}?
            </h2>
            
            <div className="flex flex-wrap gap-2.5 mb-8">
              {product.benefits.map((benefit, i) => (
                <BenefitBadge key={i} benefit={benefit} />
              ))}
            </div>

            {/* Render Consumption Tips if Variety or Mix */}
            {product.nutrition?.consumptionTips && (
              <div className="mb-12">
                <h3 className="text-sm font-bold uppercase tracking-widest text-sage mb-4">
                  How to Consume
                </h3>
                <ul className="space-y-3">
                  {product.nutrition.consumptionTips.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-bark/80">
                      <span className="text-leaf mt-1.5 flex-shrink-0 leading-none">•</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Render Bioactives if Variety */}
            {isVarietyNutrition(product.nutrition) && (
              <div className="mb-12">
                <h3 className="text-sm font-bold uppercase tracking-widest text-sage mb-4">
                  Key Bioactives
                </h3>
                <div className="space-y-4">
                  {product.nutrition.bioactives.map((bio, i) => (
                    <div key={i} className="bg-cream/40 rounded-2xl p-5 border border-sage/10">
                      <h4 className="font-semibold text-forest mb-2">{bio.compound}</h4>
                      <p className="text-sm text-bark/70 leading-relaxed">{bio.benefit}</p>
                      {bio.note && (
                        <p className="text-xs text-bark/50 mt-3 pt-3 border-t border-sage/10 italic">
                          💡 {bio.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Render Mix Specific Details */}
            {isMixNutrition(product.nutrition) && (
              <>
                <div className="mb-12">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-sage mb-4">
                    The Synergy
                  </h3>
                  <p className="text-bark/80 leading-relaxed mb-6">
                    {product.nutrition.combinedBenefit}
                  </p>
                  
                  {product.nutrition.synergies && product.nutrition.synergies.length > 0 && (
                    <div className="space-y-4">
                      {product.nutrition.synergies.map((syn, i) => (
                        <div key={i} className="bg-cream/40 rounded-2xl p-5 border border-sage/10">
                          <h4 className="font-semibold text-forest mb-2 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-sage" /> {syn.combination}
                          </h4>
                          <p className="text-sm text-bark/70 leading-relaxed">{syn.mechanism}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Sources / References */}
            {isVarietyNutrition(product.nutrition) && product.nutrition.references && product.nutrition.references.length > 0 && (
              <div className="mt-8 pt-8 border-t border-sage/10">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-bark/30 mb-4">
                  <Info className="h-3.5 w-3.5" /> Sources & Studies
                </h3>
                <ul className="space-y-2">
                  {product.nutrition.references.map((ref, i) => (
                    <li key={i} className="text-xs text-bark/40">
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar / Nutrition Profile */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-8">
              {isVarietyNutrition(product.nutrition) ? (
                <>
                  <h3 className="font-serif text-2xl text-forest mb-6">
                    Nutritional Profile
                  </h3>
                  <NutritionTable 
                    vitamins={product.nutrition.vitamins}
                    minerals={product.nutrition.minerals}
                    macros={product.nutrition.macros}
                  />
                </>
              ) : isMixNutrition(product.nutrition) ? (
                <>
                  <div className="bg-forest rounded-2xl p-6 text-white shadow-xl shadow-forest/10">
                    <h3 className="font-serif text-2xl mb-6">Key Nutrients</h3>
                    <div className="space-y-6">
                      {product.nutrition.keyNutrients.map((kn, i) => (
                        <div key={i} className="border-b border-white/10 last:border-0 pb-4 last:pb-0">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-parchment text-sm">{kn.nutrient}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold bg-white/10 px-2 py-1 rounded-full text-white ml-3 shrink-0">
                              {kn.source}
                            </span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed">{kn.benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-cream/40 rounded-2xl p-6 border border-sage/10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-sage mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Quick Stats
                    </h3>
                    <ul className="space-y-3">
                      {product.nutrition.headlineStats.map((stat, i) => (
                        <li key={i} className="flex gap-3 text-sm text-bark/80">
                          <span className="text-leaf mt-0.5 shrink-0">•</span>
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="bg-cream/40 p-6 rounded-2xl border border-sage/10 text-center">
                   <p className="text-sm text-bark/50">Detailed nutritional data is currently being updated for this product.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <RelatedProducts products={related} />
      <StickyMobileCTA product={product} />
    </>
  );
}
