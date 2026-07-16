import { cn } from "@/lib/utils";
import {
  Flame,
  Zap,
  Heart,
  Shield,
  Leaf,
  Droplets,
  Brain,
  Dumbbell,
  type LucideIcon,
} from "lucide-react";

interface BenefitBadgeProps {
  benefit: string;
  size?: "sm" | "md";
  className?: string;
}

/** Maps common benefit keywords to themed icons */
function getIcon(text: string): LucideIcon {
  const lower = text.toLowerCase();
  if (lower.includes("fat") || lower.includes("metabolism") || lower.includes("detox"))
    return Flame;
  if (lower.includes("muscle") || lower.includes("protein") || lower.includes("recovery"))
    return Dumbbell;
  if (lower.includes("endurance") || lower.includes("pump") || lower.includes("performance") || lower.includes("pre-workout"))
    return Zap;
  if (lower.includes("heart") || lower.includes("blood") || lower.includes("nitric"))
    return Heart;
  if (lower.includes("immune") || lower.includes("antioxidant") || lower.includes("anti-inflam"))
    return Shield;
  if (lower.includes("iron") || lower.includes("oxygen"))
    return Droplets;
  if (lower.includes("stress") || lower.includes("cortisol") || lower.includes("hormone") || lower.includes("digest"))
    return Brain;
  return Leaf;
}

export function BenefitBadge({ benefit, size = "md", className }: BenefitBadgeProps) {
  const Icon = getIcon(benefit);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-sage/20 bg-cream font-medium text-forest transition-all duration-200 hover:border-sage/40 hover:bg-sage/10 hover:scale-[1.03]",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs",
        className
      )}
    >
      <Icon className={cn("flex-shrink-0", size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5")} />
      {benefit}
    </span>
  );
}
