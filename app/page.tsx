import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Leaf, Zap, Target, Download } from "lucide-react";
import { VARIETIES, MIXES, PLANS } from "@/lib/data";
import { ProductCard } from "@/components/products/ProductCard";
import { PlanCard } from "@/components/products/PlanCard";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
        {/* Left */}
        <div className="bg-forest flex flex-col justify-center px-8 sm:px-14 py-20 relative overflow-hidden order-2 lg:order-1">
          {/* Decorative blob */}
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sage/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-leaf/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-lime mb-8">
              <Leaf className="h-3 w-3" /> Fresh Microgreens · Bengaluru
            </span>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
              Nature's <em className="text-lime not-italic">finest</em>
              <br />
              on your plate.
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-md">
              Hand-harvested microgreens, packed at peak nutrition. Fuel your
              body with 7 individual varieties, 6 goal-oriented plans, and 5
              performance mixes.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link
                href="/#varieties"
                className="inline-flex items-center justify-center gap-2 bg-lime text-forest rounded-full px-8 py-4 font-bold text-sm hover:bg-white transition-colors"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#plans"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white rounded-full px-8 py-4 font-semibold text-sm hover:border-white transition-colors"
              >
                View Plans
              </Link>
              <a
                href="/brochures/brochurefernforest.pdf"
                download="Fern_Forest_Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-full px-8 py-4 font-semibold text-sm transition-colors border border-white/10 backdrop-blur-sm"
              >
                <Download className="h-4 w-4" /> Download Brochure
              </a>
            </div>

            {/* Stats */}
            <div className="mt-14 pt-10 border-t border-white/10">
              <div className="inline-grid grid-cols-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 overflow-hidden">
                {[
                  { num: "7", label: "Varieties" },
                  { num: "6", label: "Plans" },
                  { num: "5", label: "Mixes" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center justify-center w-[120px] py-4 ${
                      i > 0 ? "border-l border-white/10" : ""
                    }`}
                  >
                    <p className="font-serif text-4xl text-lime leading-none">{s.num}</p>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.15em] mt-1 font-medium">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right image grid */}
        <div className="grid grid-cols-2 order-1 lg:order-2 min-h-64 lg:min-h-0">
          <div className="relative col-span-1 row-span-2">
            <Image
              src="/images/microgreens/greenamaranthus.png"
              alt="Fresh microgreens in hand"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/microgreens/redgarnetamaranthus.png"
              alt="Microgreens close up"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/microgreens/beetroot.png"
              alt="Beetroot microgreens"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>
      </section>

      {/* ─── WHY FERN FOREST ─── */}
      <section className="py-20 px-4 sm:px-8 lg:px-16 bg-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sage font-bold text-xs uppercase tracking-widest">
              Why Us
            </span>
            <h2 className="font-serif text-4xl text-forest mt-2">
              Nutrition meets luxury
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="h-6 w-6" />,
                title: "Hand-Harvested",
                desc: "Every tray harvested at peak freshness, just before your order is dispatched.",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                title: "Performance-First",
                desc: "Each variety is chosen for specific goals — fat loss, muscle recovery, endurance.",
              },
              {
                icon: <Target className="h-6 w-6" />,
                title: "Goal-Oriented",
                desc: "Curated plans designed around your fitness journey, from beginner to elite athlete.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 flex flex-col items-start gap-4 border border-sage/15 hover:border-sage/40 transition-colors"
              >
                <div className="h-12 w-12 rounded-xl bg-cream flex items-center justify-center text-sage">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDIVIDUAL VARIETIES ─── */}
      <section id="varieties" className="py-24 px-4 sm:px-8 lg:px-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-sage font-bold text-xs uppercase tracking-widest">
              Individual Varieties
            </span>
            <h2 className="font-serif text-4xl text-forest mt-2 mb-3">
              Pure, targeted superfoods
            </h2>
            <p className="text-gray-500 max-w-xl">
              Each crafted to fuel a specific performance need — from recovery to
              endurance to hormone balance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {VARIETIES.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PERFORMANCE MIXES ─── */}
      <section id="mixes" className="py-24 px-4 sm:px-8 lg:px-16 bg-parchment scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-sage font-bold text-xs uppercase tracking-widest">
              Performance Mixes
            </span>
            <h2 className="font-serif text-4xl text-forest mt-2 mb-3">
              Combined superfood blends
            </h2>
            <p className="text-gray-500 max-w-xl">
              Natural supplement-strength blends. Delivering powerful results in
              strength, stamina, recovery, and metabolic health.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MIXES.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOAL-ORIENTED PLANS ─── */}
      <section id="plans" className="py-24 px-4 sm:px-8 lg:px-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="text-sage font-bold text-xs uppercase tracking-widest">
              Monthly Plans
            </span>
            <h2 className="font-serif text-4xl text-forest mt-2 mb-3">
              Chart a course. Stick to it.
            </h2>
            <p className="text-gray-500 max-w-xl">
              Find the ideal nutrition for your body — whether you're a beginner,
              starting your transformation, or seeking peak performance.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-forest py-24 px-4 sm:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(122,171,58,0.15)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-lime font-bold text-xs uppercase tracking-widest mb-4">
            Ready to elevate?
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6">
            Elevate your plate.
            <br />
            <em className="text-lime">Embrace the forest.</em>
          </h2>
          <p className="text-white/60 mb-10">
            Questions? Chat with us directly on WhatsApp.
          </p>
          <a
            href="https://wa.me/918113998511"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white rounded-full px-10 py-4 font-bold text-sm hover:bg-[#1ebe5a] transition-colors"
          >
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.007 22l4.932-1.409C8.341 21.476 10.13 22 11.999 22 17.522 22 22 17.523 22 12S17.522 2 11.999 2zm0 18c-1.71 0-3.305-.48-4.663-1.31l-.334-.198-3.464.99.944-3.558-.217-.347A8 8 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-bark text-white/60 py-16 px-4 sm:px-8 text-center text-sm">
        <div className="flex flex-col items-center justify-center gap-8 max-w-lg mx-auto">
          {/* Logo & Name */}
          <div className="flex items-center justify-center gap-2">
            <Leaf className="h-5 w-5 text-sage" />
            <span className="font-serif text-white text-lg tracking-wide">fern forest</span>
            <span className="text-white/30 hidden sm:inline">·</span>
            <span className="hidden sm:inline tracking-wide">Fresh Microgreens</span>
          </div>

          {/* FSSAI License block */}
          <div className="bg-white/5 rounded-lg border border-white/10 px-6 py-4 flex flex-col items-center shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1.5 font-semibold">
              Certified & Licensed
            </span>
            <span className="text-white/90 font-medium tracking-wider text-sm">
              FSSAI Reg No: <span className="text-white font-bold ml-1">21226007000572</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Fern Forest. All rights reserved. · Bengaluru, India
          </p>
        </div>
      </footer>
    </>
  );
}
