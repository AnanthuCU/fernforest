"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NutrientEntry } from "@/lib/nutritionData";

interface NutritionTableProps {
  vitamins: NutrientEntry[];
  minerals: NutrientEntry[];
  macros?: {
    calories: string;
    protein: string;
    carbohydrates: string;
    fiber: string;
    fat: string;
  };
}

function MacroRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-sage/10 last:border-0">
      <td className="py-3.5 pr-4 text-sm font-medium text-bark">{label}</td>
      <td className="py-3.5 text-sm text-bark/70 text-right font-semibold">
        {value}
      </td>
      <td className="py-3.5 pl-4 text-xs text-bark/40 text-right">—</td>
    </tr>
  );
}

function NutrientRow({ entry }: { entry: NutrientEntry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className={cn(
          "border-b border-sage/8 last:border-0 transition-colors",
          entry.note
            ? "cursor-pointer hover:bg-sage/5"
            : ""
        )}
        onClick={() => entry.note && setExpanded(!expanded)}
      >
        <td className="py-3.5 pr-4 text-sm text-bark flex items-center gap-2">
          <span className="font-medium">{entry.name}</span>
          {entry.note && (
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-sage transition-transform duration-200 flex-shrink-0",
                expanded && "rotate-180"
              )}
            />
          )}
        </td>
        <td className="py-3.5 text-sm text-bark/70 text-right font-semibold whitespace-nowrap">
          {entry.value}
        </td>
        <td className="py-3.5 pl-4 text-xs text-sage font-bold text-right whitespace-nowrap">
          {entry.percentDV ?? "—"}
        </td>
      </tr>
      {expanded && entry.note && (
        <tr className="bg-cream/60">
          <td colSpan={3} className="px-4 py-3 text-xs text-bark/60 leading-relaxed">
            💡 {entry.note}
          </td>
        </tr>
      )}
    </>
  );
}

export function NutritionTable({ vitamins, minerals, macros }: NutritionTableProps) {
  const [activeTab, setActiveTab] = useState<"macros" | "vitamins" | "minerals">(
    macros ? "macros" : "vitamins"
  );

  const tabs = [
    ...(macros ? [{ key: "macros" as const, label: "Macros" }] : []),
    { key: "vitamins" as const, label: "Vitamins" },
    { key: "minerals" as const, label: "Minerals" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-sage/15 overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex border-b border-sage/15 bg-cream/40">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex-1 py-3.5 text-sm font-semibold transition-all duration-200 relative",
              activeTab === tab.key
                ? "text-forest"
                : "text-bark/40 hover:text-bark/60"
            )}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-sage rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div className="px-5 pt-3">
        <div className="flex text-[10px] uppercase tracking-widest text-bark/30 font-bold pb-2 border-b border-sage/10">
          <span className="flex-1">Nutrient</span>
          <span className="text-right">Amount/100g</span>
          <span className="pl-4 text-right w-16">% DV</span>
        </div>
      </div>

      {/* Table body */}
      <div className="px-5 pb-4 max-h-[420px] overflow-y-auto">
        <table className="w-full">
          <tbody>
            {activeTab === "macros" && macros && (
              <>
                <MacroRow label="Calories" value={macros.calories} />
                <MacroRow label="Protein" value={macros.protein} />
                <MacroRow label="Carbohydrates" value={macros.carbohydrates} />
                <MacroRow label="Dietary Fiber" value={macros.fiber} />
                <MacroRow label="Fat" value={macros.fat} />
              </>
            )}
            {activeTab === "vitamins" &&
              vitamins.map((v) => <NutrientRow key={v.name} entry={v} />)}
            {activeTab === "minerals" &&
              minerals.map((m) => <NutrientRow key={m.name} entry={m} />)}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-cream/30 border-t border-sage/10">
        <p className="text-[10px] text-bark/35 leading-relaxed">
          Values per 100g fresh weight (FW). % Daily Value based on 2,000 kcal diet.
          Tap a nutrient row to see sourcing notes.
        </p>
      </div>
    </div>
  );
}
