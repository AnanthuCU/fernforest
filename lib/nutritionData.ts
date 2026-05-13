/**
 * FernForest Microgreens — Nutritional Data
 *
 * Sources:
 * - USDA FoodData Central
 * - Xiao et al. (2012), "An Assessment of Marketed Fresh-Cut Salad Mixes Using the USDA Nutrient Database for Standard Reference", Journal of Food Composition and Analysis
 * - Scientific Reports (2025): "Nutritional quality profiles of six microgreens" — PMC11842852
 * - PeerJ (2025): "Microgreens: nutritional properties, health benefits, production techniques, and food safety risk"
 * - Bouranis et al. (2023): "Sulforaphane Bioavailability in Healthy Subjects Fed a Single Serving of Fresh Broccoli Microgreens", Foods — PMC10606698
 * - Banu et al. (2025): "From seed to superfood: Amaranthus tricolor microgreens", European Food Research and Technology
 * - Sustainable cultivation and value-addition of green amaranth microgreens, ScienceDirect (2025)
 * - Acharya et al. (2021): "Pigments, ascorbic acid, and total polyphenols content and antioxidant capacities of beet microgreens", International Journal of Food Properties
 * - PMC8565237: "Beetroot as a functional food with huge health benefits"
 * - PMC9864543: "Microgreens — A Comprehensive Review of Bioactive Molecules and Health Benefits"
 * - Precision Nutrition: basil phytochemistry research
 * - Nutrition-and-you.com: peer-referenced mineral and vitamin data for mature comparators
 *
 * All values are per 100 g fresh weight (FW) unless otherwise noted.
 * Ranges are given where studies report variance across cultivars or growing conditions.
 */

export interface NutrientEntry {
  name: string;
  value: string;         // e.g. "51 mg" or "10–100×"
  unit?: string;         // optional if included in value
  percentDV?: string;    // % Daily Value where known
  note?: string;         // context or caveat
}

export interface PhytoEntry {
  compound: string;
  benefit: string;
  note?: string;
}

export interface VarietyNutrition {
  id: string;
  // A short, human-readable callout headline (e.g. "51 mg Vitamin C per 100 g")
  headlineStat: string;
  // One-liner on the bioactive "superstar" compound
  keyCompound: string;
  macros: {
    calories: string;       // kcal / 100 g FW
    protein: string;        // g / 100 g FW
    carbohydrates: string;
    fiber: string;
    fat: string;
  };
  vitamins: NutrientEntry[];
  minerals: NutrientEntry[];
  bioactives: PhytoEntry[];
  // Practical tips for your customers
  consumptionTips: string[];
  // References (short citation keys)
  references: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// INDIVIDUAL VARIETIES
// ─────────────────────────────────────────────────────────────────────────────

export const VARIETY_NUTRITION: Record<string, VarietyNutrition> = {

  "white-radish": {
    id: "white-radish",
    headlineStat: "~15 mg Vitamin C + rich glucosinolates per 100 g",
    keyCompound: "Glucoraphenin → Sulforaphane (activated on chewing)",
    macros: {
      calories: "~25–30 kcal",
      protein: "~1.5–2 g",
      carbohydrates: "~3–4 g",
      fiber: "~1.5–2 g",
      fat: "~0.3 g",
    },
    vitamins: [
      {
        name: "Vitamin C",
        value: "14.8–25 mg",
        percentDV: "~16–28%",
        note: "White/daikon cultivars sit at the lower end; China Rose and red varieties trend higher",
      },
      { name: "Vitamin A (as β-carotene)", value: "traces–0.5 mg", note: "Primarily found in leaf tissue" },
      { name: "Vitamin E (α-tocopherol)", value: "~0.3 mg", percentDV: "~2%" },
      { name: "Vitamin K", value: "~20–30 µg", percentDV: "~17–25%", note: "Important for blood clotting and bone health" },
      { name: "Folate (B9)", value: "~25 µg", percentDV: "~6%" },
    ],
    minerals: [
      { name: "Potassium", value: "~233 mg", percentDV: "~5%", note: "USDA radish microgreen data" },
      { name: "Calcium", value: "~67–100 mg", percentDV: "~7–10%" },
      { name: "Magnesium", value: "~46–60 mg", percentDV: "~11–14%" },
      { name: "Iron", value: "~0.5–1.0 mg", percentDV: "~3–6%" },
      { name: "Phosphorus", value: "~40–55 mg", percentDV: "~3–4%" },
    ],
    bioactives: [
      {
        compound: "Glucoraphenin (glucosinolate)",
        benefit: "Converts to sulforaphane on chewing — supports liver detox enzymes (Phase II) and has documented anti-inflammatory and potential anti-cancer activity",
        note: "Heat destroys myrosinase, the activating enzyme — eat raw for full benefit",
      },
      {
        compound: "Isothiocyanates",
        benefit: "Activate Nrf2 antioxidant pathway; support gut microbiome diversity",
      },
      {
        compound: "Flavonoids & Anthocyanins",
        benefit: "Potent antioxidants; protect cells from oxidative stress",
        note: "Highest in red/purple cultivars",
      },
      {
        compound: "Chlorophyll",
        benefit: "Supports detoxification pathways and gives microgreens their vibrant colour",
      },
    ],
    consumptionTips: [
      "Always eat raw — cooking destroys sulforaphane bioavailability",
      "Chew well or chop before eating to activate the glucoraphenin → sulforaphane conversion",
      "Pair with a fat source (avocado, olive oil) to enhance fat-soluble nutrient absorption",
      "30 g per day delivers a meaningful dose of sulforaphane for detox support",
    ],
    references: [
      "USDA FoodData Central — Radish microgreens",
      "Xiao et al. (2012) — 25 microgreen variety nutrition study",
      "Tilahun et al. (2024), Foods — radish microgreens mineral profile",
      "Wind River Greens (2025) — glucosinolate review",
    ],
  },

  "china-rose-radish": {
    id: "china-rose-radish",
    headlineStat: "Higher Vitamin C & anthocyanins vs white radish; gentler heat profile",
    keyCompound: "Anthocyanins + Glucosinolates",
    macros: {
      calories: "~25–32 kcal",
      protein: "~1.5–2.0 g",
      carbohydrates: "~3.5–4.5 g",
      fiber: "~1.5–2.0 g",
      fat: "~0.3 g",
    },
    vitamins: [
      {
        name: "Vitamin C",
        value: "18–30 mg",
        percentDV: "~20–33%",
        note: "China Rose cultivar typically scores higher than white daikon in ascorbic acid studies",
      },
      { name: "Vitamin A (β-carotene precursor)", value: "0.4–0.8 mg", note: "From carotenoids in leaf cotyledons" },
      { name: "Vitamin E", value: "~0.4 mg", percentDV: "~3%" },
      { name: "Vitamin K", value: "~25–35 µg", percentDV: "~21–29%" },
      { name: "Folate (B9)", value: "~25–30 µg", percentDV: "~7%" },
    ],
    minerals: [
      { name: "Potassium", value: "~220–260 mg", percentDV: "~5–6%" },
      { name: "Calcium", value: "~80–110 mg", percentDV: "~8–11%" },
      { name: "Magnesium", value: "~50–65 mg", percentDV: "~12–15%" },
      { name: "Iron", value: "~0.6–1.0 mg", percentDV: "~3–6%" },
      { name: "Phosphorus", value: "~45–60 mg", percentDV: "~4%" },
    ],
    bioactives: [
      {
        compound: "Glucoraphenin",
        benefit: "Liver detox support via sulforaphane activation; milder flavour compared to purple varieties",
      },
      {
        compound: "Anthocyanins (cyanidin derivatives)",
        benefit: "The pink-to-red pigmentation in China Rose stems directly signals higher anthocyanin content — potent antioxidants that reduce oxidative stress and support cardiovascular health",
      },
      {
        compound: "Phenolic compounds",
        benefit: "Anti-inflammatory; shown in vitro to inhibit cancer cell proliferation",
      },
    ],
    consumptionTips: [
      "The milder heat makes China Rose ideal for people new to radish microgreens",
      "Use raw as a garnish or salad base to preserve both flavour and sulforaphane",
      "The pink stems make it visually striking on plates — great for smoothie bowls",
    ],
    references: [
      "USDA FoodData Central — Radish microgreens",
      "Tilahun et al. (2024), Foods — five cultivar comparison",
      "Xiao et al. (2012) — USDA 25-variety study",
    ],
  },

  "purple-radish": {
    id: "purple-radish",
    headlineStat: "Highest anthocyanin & antioxidant capacity of all radish varieties",
    keyCompound: "Anthocyanins (1,193 mg/100 g) + Glucosinolates",
    macros: {
      calories: "~28–35 kcal",
      protein: "~1.5–2.2 g",
      carbohydrates: "~3.5–5 g",
      fiber: "~1.5–2 g",
      fat: "~0.3 g",
    },
    vitamins: [
      {
        name: "Vitamin C",
        value: "20–35 mg",
        percentDV: "~22–39%",
        note: "'Asia red' cultivar tested highest for vitamin C among radish microgreens in peer-reviewed substrate study (Tilahun et al., 2024)",
      },
      { name: "Vitamin A (β-carotene)", value: "0.5–1.0 mg", note: "Concentrated in cotyledons" },
      { name: "Vitamin E", value: "~0.5 mg", percentDV: "~3%" },
      { name: "Vitamin K", value: "~30–40 µg", percentDV: "~25–33%" },
      { name: "Folate (B9)", value: "~25–30 µg", percentDV: "~7%" },
    ],
    minerals: [
      { name: "Potassium", value: "~220–250 mg", percentDV: "~5%" },
      { name: "Calcium", value: "~90–120 mg", percentDV: "~9–12%" },
      { name: "Magnesium", value: "~55–70 mg", percentDV: "~13–17%" },
      { name: "Iron", value: "~0.7–1.2 mg", percentDV: "~4–7%" },
      { name: "Phosphorus", value: "~50–65 mg", percentDV: "~4–5%" },
    ],
    bioactives: [
      {
        compound: "Anthocyanins — 1,193 mg/100 g",
        benefit: "Second highest anthocyanin concentration of all tested microgreen varieties (University of Maryland / USDA analysis); potent cellular protection against oxidative stress",
        note: "The deep purple-violet pigment IS the anthocyanin — more colour = more antioxidant power",
      },
      {
        compound: "Glucoraphenin / Sulforaphane precursors",
        benefit: "Detox enzyme activation; stronger peppery heat correlates with higher glucosinolate content",
      },
      {
        compound: "Total Phenolics & Flavonoids",
        benefit: "'Koregon red' and 'Asia red' cultivars showed highest total phenolics and flavonoids in substrate-free indoor growing trials (Tilahun et al., 2024)",
      },
      {
        compound: "α-Glucosidase inhibition",
        benefit: "Sango (purple) radish showed 58% α-glucosidase inhibition in vitro — supports blood sugar regulation (Brassicaceae microgreens review, PMC11852083)",
      },
    ],
    consumptionTips: [
      "The bold peppery bite means a little goes a long way — 20–30 g is enough to feel the heat",
      "Purple colour fades with heat — always use raw to preserve anthocyanins",
      "Combine with citrus dressings to enhance both flavour and Vitamin C absorption",
    ],
    references: [
      "MicroGrow / University of Maryland — USDA 25-variety anthocyanin data",
      "Tilahun et al. (2024), Foods 13(5):789 — radish cultivar mineral and metabolite profiles",
      "PMC11852083 — Brassicaceae microgreens comprehensive antioxidant profiling",
    ],
  },

  "sunflower": {
    id: "sunflower",
    headlineStat: "Highest zinc (0.96 mg/100 g) of 6 tested microgreens; complete protein with 8/9 essential amino acids",
    keyCompound: "Complete Plant Protein + Vitamin E + Zinc",
    macros: {
      calories: "~28–35 kcal",
      protein: "~2.0–3.0 g",
      carbohydrates: "~3.5–5 g",
      fiber: "~1.0–1.5 g",
      fat: "~0.8–1.2 g",   // includes beneficial PUFAs from seed residue
    },
    vitamins: [
      {
        name: "Vitamin E (α-tocopherol)",
        value: "~38 mg",
        percentDV: "~253%",
        note: "Exceptional — sunflower microgreens at 38 mg/100 g deliver more than twice the adult daily RDA of 15 mg in a single serving (MicroGrow, sourcing USDA data)",
      },
      { name: "Vitamin A (β-carotene)", value: "~0.5–1.0 mg", percentDV: "~6–11%" },
      { name: "Vitamin C", value: "~22–30 mg", percentDV: "~24–33%" },
      { name: "Vitamin K", value: "~40–60 µg", percentDV: "~33–50%", note: "Supports cardiovascular health and bone density" },
      { name: "Vitamin D", value: "~trace amounts", note: "Present only when light-grown; not a significant source" },
      { name: "B-complex (B2 Riboflavin, B3 Niacin, B6, B9 Folate)", value: "Multiple", note: "Folate ~30–45 µg; B6 supports over 100 enzymatic reactions including protein metabolism" },
    ],
    minerals: [
      {
        name: "Zinc",
        value: "0.96 mg / 100 g (956 µg)",
        percentDV: "~9%",
        note: "Highest zinc concentration of 6 microgreens tested in Scientific Reports (2025) Nature study (PMC11842852)",
      },
      { name: "Magnesium", value: "~60–87 mg", percentDV: "~14–21%", note: "Important for testosterone synthesis and 300+ enzymatic reactions" },
      { name: "Iron", value: "~0.5–0.8 mg", percentDV: "~3–4%" },
      { name: "Calcium", value: "~67–100 mg", percentDV: "~7–10%" },
      { name: "Potassium", value: "~200–300 mg", percentDV: "~4–6%" },
      { name: "Phosphorus", value: "~70–90 mg", percentDV: "~6–7%" },
      { name: "Copper", value: "~0.5 mg", percentDV: "~56%", note: "High copper supports iron absorption and collagen synthesis" },
      { name: "Selenium", value: "~trace–2 µg", note: "Supports DNA repair and immune function; amount varies with growing medium" },
      { name: "Manganese", value: "~0.2–0.3 mg", percentDV: "~9–13%" },
    ],
    bioactives: [
      {
        compound: "Complete Essential Amino Acids",
        benefit: "Contains 8 of the 9 essential amino acids required for tissue repair and muscle protein synthesis — superior to most other microgreens for muscle recovery",
        note: "Studies show sunflower microgreens offer better mineral absorption vs raw sunflower seeds due to reduced phytic acid after germination",
      },
      {
        compound: "Chlorogenic acid & Phenolic compounds",
        benefit: "Antioxidant activity; anti-inflammatory; supports metabolic health",
      },
      {
        compound: "Linoleic acid (Omega-6)",
        benefit: "Beneficial PUFA from seed residue; supports cell membrane integrity and anti-inflammatory signalling when in proper ratio with Omega-3",
      },
    ],
    consumptionTips: [
      "Excellent post-workout: the complete amino acid + zinc + magnesium profile supports muscle repair and testosterone",
      "Pairs well with avocado, nuts, or tahini to complement fat-soluble Vitamin E absorption",
      "Mild, nutty flavour — great raw as a standalone snack or mixed into salads",
      "Zinc bioavailability improves vs seeds because sprouting reduces anti-nutritional phytic acid",
    ],
    references: [
      "Scientific Reports (2025), PMC11842852 — 6 microgreen nutritional quality profiles",
      "BetterMe (2024) — sunflower microgreens nutrition overview",
      "Home Microgreens — essential amino acid and mineral absorption study references",
      "MicroGrow / USDA — Vitamin E data",
    ],
  },

  "green-amaranthus": {
    id: "green-amaranthus",
    headlineStat: "51 mg Vitamin C + 1.31 mg Iron per 100 g — superior oxygen support",
    keyCompound: "Iron + Vitamin K + Betaxanthins",
    macros: {
      calories: "~23 kcal",
      protein: "~2.0–2.5 g",
      carbohydrates: "~4–5 g",
      fiber: "~1.5–2 g",
      fat: "~0.2–0.4 g",
    },
    vitamins: [
      {
        name: "Vitamin C (Ascorbic Acid)",
        value: "~51 mg",
        percentDV: "~57%",
        note: "ScienceDirect (2025) study of green amaranth microgreens grown under sunlight reported 51.2 ± 0.12 mg/100 g FW",
      },
      {
        name: "Vitamin K",
        value: "~950 µg+",
        percentDV: "~792%",
        note: "Amaranth leaves contain exceptionally high Vitamin K (USDA amaranth leaves data); microgreens are proportionally high though exact µg depends on cultivar",
      },
      { name: "Vitamin A (β-carotene)", value: "~1.5–3.0 mg", percentDV: "~17–33%", note: "Green morphs are rich in chlorophyll and carotenoids" },
      { name: "Folate (B9)", value: "~85–100 µg", percentDV: "~21–25%", note: "Amaranth is a notable folate source" },
      { name: "Vitamin E", value: "~0.5–1.0 mg", percentDV: "~3–7%" },
    ],
    minerals: [
      {
        name: "Iron",
        value: "~1.31 mg",
        percentDV: "~7–16%",
        note: "ScienceDirect (2025) sun-grown green amaranth study; 100 g of amaranth leaves provide ~29% DRI iron per nutrition-and-you.com citing USDA",
      },
      { name: "Calcium", value: "~52 mg", percentDV: "~5%", note: "ScienceDirect (2025) — 52.15 ± 0.03 mg/100 g" },
      { name: "Magnesium", value: "~55–80 mg", percentDV: "~13–19%", note: "Microgreen phase shows 61% higher Mg vs mature greens (Banu et al., 2025)" },
      { name: "Potassium", value: "~200–300 mg", percentDV: "~4–6%" },
      { name: "Phosphorus", value: "~60–80 mg", percentDV: "~5–6%", note: "57% higher in microgreens vs mature greens (Banu et al., 2025)" },
      { name: "Manganese", value: "~0.3–0.5 mg", percentDV: "~13–22%", note: "24% higher in microgreens vs mature (Banu et al., 2025)" },
      { name: "Copper", value: "~0.1–0.2 mg", percentDV: "~11–22%", note: "29% higher in microgreens vs mature (Banu et al., 2025)" },
      { name: "Zinc", value: "~0.5–0.8 mg", percentDV: "~5–7%" },
    ],
    bioactives: [
      {
        compound: "Betaxanthins (yellow-orange betalain pigments)",
        benefit: "Potent antioxidants unique to the amaranth family; anti-inflammatory and hepatoprotective activity",
        note: "Green amaranth is higher in betaxanthins; red garnet is higher in betacyanins",
      },
      {
        compound: "β-carotene (1,289–1,675 µg/g FW)",
        benefit: "Converts to Vitamin A; supports vision, immune function, and skin integrity",
        note: "Stem amaranth leaf data (PMC7054523); microgreens at cotyledon stage show high carotenoid density",
      },
      {
        compound: "Chlorophyll a & b",
        benefit: "Supports detoxification; anti-mutagenic properties; aids in nitrogen metabolism",
      },
      {
        compound: "Phenolics & Flavonoids",
        benefit: "Antioxidant; reduces oxidative stress linked to iron deficiency anaemia",
      },
      {
        compound: "GC-MS metabolome (76 unique compounds)",
        benefit: "Microgreen phase of Amaranthus tricolor contains 20 more metabolic compounds than mature greens (Banu et al., 2025, European Food Research and Technology)",
      },
    ],
    consumptionTips: [
      "Combine with Vitamin C-rich foods or dressings to enhance non-heme iron absorption by up to 3×",
      "The mild, earthy flavour works well raw in smoothies, salads, or as a topping on dal",
      "30 g daily gives a meaningful iron + folate boost without cooking",
      "Avoid pairing with calcium supplements or dairy at the same meal — calcium competes with iron absorption",
    ],
    references: [
      "ScienceDirect (2025) — Green Amaranth microgreen sun-cultivation study",
      "Banu et al. (2025), European Food Research and Technology — Amaranthus tricolor microgreens",
      "USDA via nutrition-and-you.com — amaranth leaf iron content",
      "PMC7054523 — stem amaranth phytopigments and minerals",
    ],
  },

  "red-garnet-amaranthus": {
    id: "red-garnet-amaranthus",
    headlineStat: "Highest Vitamin C, A, E, K concentration of all amaranth cultivars",
    keyCompound: "Betacyanins (Red Pigment Antioxidants) + Iron + Complete Vitamin Suite",
    macros: {
      calories: "~23 kcal",
      protein: "~2.0–2.5 g",
      carbohydrates: "~4–5 g",
      fiber: "~1.5–2 g",
      fat: "~0.2–0.4 g",
    },
    vitamins: [
      {
        name: "Vitamin C",
        value: "~50–65 mg",
        percentDV: "~55–72%",
        note: "Red garnet (Amaranthus tricolor) is documented as the highest-vitamin amaranth cultivar for C, A, E, and K (naturalyield.com.au citing USDA)",
      },
      {
        name: "Vitamin K",
        value: "~950+ µg",
        percentDV: "~790%+",
        note: "One of the richest plant sources of Vitamin K1; critical for coagulation and bone mineral density",
      },
      { name: "Vitamin A (RAE / β-carotene)", value: "~2.0–4.0 mg", percentDV: "~22–44%" },
      { name: "Vitamin E", value: "~1.0–1.5 mg", percentDV: "~7–10%", note: "Higher than green morphs due to denser carotenoid profile" },
      { name: "Folate (B9)", value: "~85–100 µg", percentDV: "~21–25%" },
    ],
    minerals: [
      { name: "Iron", value: "~1.3–1.5 mg", percentDV: "~7–18%", note: "Strong non-heme iron source; key for red blood cell production" },
      { name: "Calcium", value: "~55–80 mg", percentDV: "~6–8%" },
      { name: "Magnesium", value: "~60–90 mg", percentDV: "~14–21%" },
      { name: "Potassium", value: "~200–300 mg", percentDV: "~4–6%" },
      { name: "Manganese", value: "~0.4–0.6 mg", percentDV: "~17–26%" },
      { name: "Copper", value: "~0.15–0.25 mg", percentDV: "~17–28%" },
      { name: "Zinc", value: "~0.5–0.9 mg", percentDV: "~5–8%" },
    ],
    bioactives: [
      {
        compound: "Betacyanins (betanin, isobetanin derivatives)",
        benefit: "The vivid red-garnet colour is betacyanin — a potent antioxidant that scavenges free radicals, protects DNA, and has anti-inflammatory activity. Research shows betacyanin antioxidant capacity rivals Vitamin C in some assay systems.",
        note: "Betacyanin is heat-stable at lower temperatures but degrades above 60°C — ideally consumed raw",
      },
      {
        compound: "Betalains (betaxanthins + betacyanins combined)",
        benefit: "Comprehensive betalain profile found in red garnet; both pigment classes demonstrate hepatoprotective and anti-tumour activity in vitro",
      },
      {
        compound: "β-carotene (very high concentration)",
        benefit: "Precursor to Vitamin A; supports vision, immune defence, and skin repair",
      },
      {
        compound: "Phenolic compounds & Flavonoids",
        benefit: "Strong DPPH radical scavenging capacity; reduces oxidative stress linked to training-induced tissue damage",
      },
    ],
    consumptionTips: [
      "Use raw for maximum betalain and Vitamin C preservation",
      "The striking red colour makes it ideal as a visual garnish or salad centrepiece",
      "Pair with iron-absorption enhancers (lemon, amla) at the same meal for 3× better uptake",
      "30 g/day meets a meaningful share of daily Vitamin A and K requirements",
    ],
    references: [
      "naturalyield.com.au — Amaranth microgreen USDA-derived nutrition sheet",
      "Banu et al. (2025), European Food Research and Technology — Amaranthus tricolor microgreens",
      "PMC7054523 — stem amaranth betalain and carotenoid profiling",
      "USDA FoodData Central — amaranth leaves raw",
    ],
  },

  "beetroot": {
    id: "beetroot",
    headlineStat: "Natural dietary nitrates (250–400 mg/100 g) — clinically shown to boost endurance",
    keyCompound: "Dietary Nitrates → Nitric Oxide + Betalains",
    macros: {
      calories: "~22 kcal",
      protein: "~2.2 g",
      carbohydrates: "~4.3 g",
      fiber: "~1.5–2 g",
      fat: "~0.1 g",
    },
    vitamins: [
      { name: "Vitamin K", value: "~400 µg", percentDV: "~333%", note: "Beet greens (leaves) are exceptionally high in Vitamin K1" },
      { name: "Vitamin A (RAE)", value: "~380 µg", percentDV: "~42%", note: "From carotenoids in beet leaf cotyledons" },
      { name: "Vitamin C", value: "~32–40 mg", percentDV: "~36–44%", note: "Scientific Reports (2025) 6-variety study: red beet lowest at 32.72 mg; beet greens higher" },
      { name: "Folate (B9)", value: "~109 µg", percentDV: "~27%", note: "USDA beetroot data; microgreen cotyledons retain high folate" },
      { name: "Vitamin B6", value: "~0.1–0.15 mg", percentDV: "~6–9%" },
      { name: "Riboflavin (B2)", value: "~0.1 mg", percentDV: "~8%" },
    ],
    minerals: [
      { name: "Potassium", value: "~250–350 mg", percentDV: "~5–7%" },
      { name: "Manganese", value: "~0.3–0.4 mg", percentDV: "~13–17%", note: "Important for energy production and bone formation" },
      { name: "Magnesium", value: "~58–80 mg", percentDV: "~14–19%" },
      { name: "Iron", value: "~0.8–1.2 mg", percentDV: "~4–7%", note: "Beet greens are one of the better vegetable iron sources" },
      { name: "Copper", value: "~0.1–0.2 mg", percentDV: "~11–22%", note: "Supports iron transport and collagen synthesis" },
      { name: "Phosphorus", value: "~40–55 mg", percentDV: "~3–4%" },
      { name: "Calcium", value: "~67–100 mg", percentDV: "~7–10%" },
      { name: "Sodium", value: "~65–80 mg", note: "Slightly higher vs other microgreens; still low overall" },
    ],
    bioactives: [
      {
        compound: "Dietary Nitrates — 250–400 mg/100 g fresh weight",
        benefit: "Converted by oral bacteria to nitrite → nitric oxide (NO) in the body. NO dilates blood vessels, reduces oxygen cost of exercise, and improves endurance performance. Meta-analyses show beetroot nitrate supplementation reduces systolic blood pressure by 4–5 mmHg (Siervo et al., 2013, Journal of Nutrition) and extends time-to-exhaustion in athletes by 2–5%",
        note: "Beetroot microgreens retain meaningful nitrate levels; concentrated forms (powder/juice) provide higher doses per serving",
      },
      {
        compound: "Betalains — Betacyanins + Betaxanthins",
        benefit: "The deep red-violet pigment is betanin (dominant betacyanin). Betalains scavenge DPPH free radicals, protect DNA from oxidative damage, reduce LDL oxidation, and have documented anti-tumour activity in vitro. Betalain antioxidant capacity has been compared to ~10× that of Vitamin E in some in vitro assays",
        note: "Beet microgreens contain the highest flavonoid content of all tested microgreen varieties — 1,625 mg/100 g (University of Maryland / USDA analysis)",
      },
      {
        compound: "Betanin (dominant betalain pigment)",
        benefit: "Hepatoprotective; reduces inflammation; anti-tumour activity by inhibiting cell proliferation and inducing apoptosis in cancer cell lines",
        note: "PMC8565237 (2021): betacyanins 2.075 g/100 g + betaxanthins 1.901 g/100 g dry extract of beetroot",
      },
      {
        compound: "Polyphenols & Flavonoids",
        benefit: "Synergistic antioxidant effect with betalains; support cardiovascular and metabolic health",
      },
    ],
    consumptionTips: [
      "Consume 2–3 hours pre-exercise to allow nitrate → nitric oxide conversion to peak in circulation",
      "30–60 g raw beetroot microgreens provides a meaningful pre-workout nitrate dose",
      "Do not use mouthwash immediately after eating — oral bacteria are essential for the nitrate → nitrite conversion step",
      "Combining with green amaranth or sunflower increases the protein + endurance benefit for athletes",
    ],
    references: [
      "Scientific Reports (2025) PMC11842852 — 6 microgreen profiles including red beet",
      "PMC8565237 (2021) — Beetroot as functional food: betalain and nitrate composition",
      "Siervo et al. (2013), Journal of Nutrition — beetroot nitrate blood pressure meta-analysis",
      "PMC10000616 — Antioxidant and nitrate content in beetroot dietary supplements",
      "MicroGrow/University of Maryland — 1,625 mg/100 g flavonoid data",
    ],
  },

  "broccoli": {
    id: "broccoli",
    headlineStat: "Up to 100× more sulforaphane precursor than mature broccoli",
    keyCompound: "Glucoraphanin → Sulforaphane (most studied anti-cancer, anti-inflammatory compound in food)",
    macros: {
      calories: "~31 kcal",
      protein: "~2.3 g",
      carbohydrates: "~7 g",
      fiber: "~0.4 g",
      fat: "~0.4 g",
    },
    vitamins: [
      {
        name: "Vitamin C",
        value: "51–117 mg",
        percentDV: "~57–130%",
        note: "Multiple peer-reviewed sources report 51 mg (USDA) to 117 mg (Signature Microgreens citing research). Conservative estimate: ~51 mg/100 g FW.",
      },
      {
        name: "Vitamin K",
        value: "~130 µg",
        percentDV: "~108%",
        note: "Supports blood coagulation and bone mineralisation",
      },
      { name: "Folate (B9)", value: "~108 µg", percentDV: "~27%" },
      { name: "Vitamin E", value: "Higher than mature broccoli", note: "Microgreens phase accumulates more α-tocopherol than adult plant" },
      { name: "Vitamin A (β-carotene + lutein)", value: "Significant lutein and zeaxanthin", note: "Carotenoids protect retinal cells — sulforaphane also supports eye health" },
    ],
    minerals: [
      {
        name: "Iron",
        value: "~2.6 mg (2,610 µg)",
        percentDV: "~14–32%",
        note: "HIGHEST iron concentration of 6 microgreens tested in Scientific Reports (2025) Nature study — 2,610 µg/100 g FW",
      },
      { name: "Manganese", value: "~0.35 mg (350 µg)", percentDV: "~15%", note: "Also highest manganese of 6 varieties tested (Scientific Reports, 2025)" },
      { name: "Potassium", value: "~326 mg", percentDV: "~7%", note: "USDA broccoli microgreens data" },
      { name: "Calcium", value: "~100–148 mg", percentDV: "~10–15%" },
      { name: "Magnesium", value: "~55–80 mg", percentDV: "~13–19%" },
      { name: "Phosphorus", value: "~70–90 mg", percentDV: "~6–7%" },
      { name: "Zinc", value: "~0.5–0.8 mg", percentDV: "~5–7%" },
    ],
    bioactives: [
      {
        compound: "Glucoraphanin — 73–161 mg/100 g",
        benefit: "The direct precursor to sulforaphane. Broccoli microgreens are consistently documented as one of the richest food sources of glucoraphanin — similar to broccoli sprouts (Bouranis et al., 2023, Foods / PMC10606698)",
        note: "4.8 µmol/g of glucoraphanin in microgreen phase",
      },
      {
        compound: "Sulforaphane (activated by myrosinase on chewing)",
        benefit: "Activates the Nrf2 antioxidant pathway (Phase II detox enzymes); documented anti-inflammatory, chemopreventive, and neuroprotective properties. Clinical trials show benefits for blood sugar regulation in Type 2 diabetes, cardiovascular inflammation reduction, and potential Alzheimer's prevention (PMC10606698). Research links it to reduced risk of prostate, breast, and colon cancers.",
        note: "Broccoli microgreens contain 10–100× more sulforaphane precursor than mature florets. DO NOT cook — heat destroys myrosinase.",
      },
      {
        compound: "Isothiocyanates (sulforaphane + others)",
        benefit: "Broad-spectrum anticancer; anti-inflammatory; activate Nrf2-mediated cellular defence",
      },
      {
        compound: "Lutein + Zeaxanthin",
        benefit: "Carotenoids that accumulate in retinal tissue; protect against age-related macular degeneration and blue-light damage",
      },
      {
        compound: "Kaempferol & other flavonoids",
        benefit: "Synergistic antioxidant and anti-inflammatory effect alongside sulforaphane",
      },
    ],
    consumptionTips: [
      "Always eat raw — cooking inactivates myrosinase and destroys sulforaphane generation",
      "Chop or chew thoroughly before eating to trigger the glucoraphanin + myrosinase reaction",
      "20–40 g daily (roughly a handful) is the dose studied in clinical trials for sulforaphane benefits",
      "Sulforaphane has been shown to survive light blending — adding to smoothies is effective",
      "Pair with mustard seeds or radish microgreens — they contain extra myrosinase that boosts sulforaphane yield even in lightly cooked dishes",
    ],
    references: [
      "Bouranis et al. (2023), Foods PMC10606698 — sulforaphane bioavailability study",
      "Scientific Reports (2025) PMC11842852 — iron and manganese highest in broccoli microgreens",
      "microgreensworld.com — 51 mg Vitamin C and USDA data",
      "signaturemicrogreens.co.uk — 117 mg Vitamin C, 130 µg Vitamin K",
      "Piedmont Microgreens — 73–161 mg/100 g glucoraphanin citing Renna et al. (2020)",
    ],
  },

  "bok-choy": {
    id: "bok-choy",
    headlineStat: "35–53 mg Vitamin C + 2.6 mg Vitamin E + bone-critical Ca, Mg, Vitamin K per 100 g",
    keyCompound: "Vitamin K + Calcium + Magnesium (joint & bone matrix triad)",
    macros: {
      calories: "~13–18 kcal",
      protein: "~1.5–2.0 g",
      carbohydrates: "~2–3 g",
      fiber: "~1.0–1.5 g",
      fat: "~0.2 g",
    },
    vitamins: [
      {
        name: "Vitamin C",
        value: "35–53 mg",
        percentDV: "~39–59%",
        note: "Pak choi microgreens: 35–52.7 mg/100 g FW ascorbic acid (peer-reviewed review, microgreensworld.com). Mature bok choy: 45 mg/100 g FW (USDA).",
      },
      {
        name: "Vitamin A",
        value: "~4,468 IU / ~149% DV",
        note: "Extremely high Vitamin A as β-carotene; microgreen cotyledons concentrate this further vs mature form",
      },
      {
        name: "Vitamin E (α-tocopherol)",
        value: "2.6 mg",
        percentDV: "~17%",
        note: "2.6 mg/100 g FW in pak choi microgreens (research cited in microgreensworld.com review)",
      },
      {
        name: "Vitamin K",
        value: "~40–80 µg",
        percentDV: "~33–67%",
        note: "Brassica family vitamin K is exceptionally bioavailable; critical for bone density and joint collagen matrix",
      },
      { name: "Folate (B9)", value: "~66 µg", percentDV: "~16–17%", note: "USDA mature bok choy data; microgreens are likely comparable" },
      { name: "B-complex (B5, B6, B1, B2)", value: "Multiple", note: "Bok choy is a notable source of B-vitamins including pyridoxine, riboflavin, and pantothenic acid" },
    ],
    minerals: [
      {
        name: "Calcium",
        value: "~105–145 mg",
        percentDV: "~11–15%",
        note: "One of the higher calcium microgreens; works synergistically with Vitamin K and Magnesium for bone density",
      },
      {
        name: "Magnesium",
        value: "~55–80 mg",
        percentDV: "~13–19%",
        note: "Magnesium and calcium together support bone density, muscle contraction, and nerve function. Deficiency of both is linked to increased fracture risk and osteoporosis.",
      },
      { name: "Potassium", value: "~252 mg", percentDV: "~5%", note: "USDA bok choy data" },
      { name: "Iron", value: "~0.8 mg", percentDV: "~4–10%", note: "Modest but meaningful; Vitamin C in same food enhances absorption" },
      { name: "Manganese", value: "~0.4 mg", percentDV: "~17%", note: "Co-factor for superoxide dismutase antioxidant enzyme" },
      { name: "Phosphorus", value: "~40–60 mg", percentDV: "~3–5%", note: "Works with calcium for bone mineralisation" },
      { name: "Zinc", value: "~0.2–0.4 mg", note: "Zinc + iron play roles in collagen synthesis for joint cartilage" },
      { name: "Copper", value: "~0.03 mg", note: "Collagen cross-linking enzyme support" },
      { name: "Selenium", value: "~trace", note: "Antioxidant immune support" },
    ],
    bioactives: [
      {
        compound: "Glucosinolates → Sulforaphane (Brassica family)",
        benefit: "Bok choy, as a Brassica rapa, contains glucosinolates that convert to sulforaphane — supporting liver detox and anti-inflammatory pathways",
        note: "Lower glucosinolate density than broccoli but still meaningful; eat raw for best bioavailability",
      },
      {
        compound: "Indole-3-carbinol (I3C)",
        benefit: "Brassica-specific compound with documented oestrogen-metabolism modulating activity; studied for cancer prevention (breast, cervical)",
      },
      {
        compound: "β-carotene + Lutein + Zeaxanthin",
        benefit: "Comprehensive carotenoid profile supporting eye health, immune function, and skin integrity",
      },
      {
        compound: "DPPH Antioxidant Capacity",
        benefit: "160.1 µmol Trolox equivalent/100 g FW (peer-reviewed measurement) — solid antioxidant profile for a mild-flavoured green",
      },
      {
        compound: "Folate + Vitamin B6",
        benefit: "Together these B-vitamins reduce homocysteine build-up — high homocysteine is a risk factor for cardiovascular disease and joint inflammation",
      },
    ],
    consumptionTips: [
      "Best consumed raw — mild flavour makes it easy to add to smoothies, salads, or as a rice bowl topper",
      "The Ca + Mg + Vitamin K triad in bok choy makes it specifically excellent for bone and joint health",
      "30 g with a meal provides a meaningful share of daily Vitamin A and C requirements",
      "Pairs particularly well with basil microgreens for a stress + joint recovery combination",
    ],
    references: [
      "microgreensworld.com — pak choi microgreens Vitamin C (35–52.7 mg) and Vitamin E (2.6 mg) research review",
      "USDA via nutrition-and-you.com — bok choy mineral and vitamin profile",
      "Healthline — bok choy calcium, magnesium, Vitamin K bone health review",
      "PMC9864543 — Microgreens Comprehensive Review including bok choy bioactive compounds",
    ],
  },

  "basil": {
    id: "basil",
    headlineStat: "Vitamin A: 175% DV | Iron: 40% DV | Eugenol + Linalool — natural stress modulators",
    keyCompound: "Eugenol + Linalool (essential oils) + Orientin + Vicenin (flavonoids)",
    macros: {
      calories: "~23 kcal",
      protein: "~1.5–2.5 g",
      carbohydrates: "~4–5 g",
      fiber: "~1.0–1.6 g",
      fat: "~0.4–0.6 g",
    },
    vitamins: [
      {
        name: "Vitamin A (β-carotene, cryptoxanthin, lutein, zeaxanthin)",
        value: "~5,275 IU / 175% DV",
        note: "nutrition-and-you.com citing USDA — basil is exceptionally rich in provitamin A carotenoids. Basil herb contains 'exceptionally high levels of beta-carotene, vitamin-A, cryptoxanthin, lutein, and zeaxanthin'",
      },
      { name: "Vitamin K", value: "~414 µg", percentDV: "~345%", note: "Basil is one of the richest plant sources of Vitamin K1" },
      { name: "Vitamin C", value: "~18–25 mg", percentDV: "~20–28%", note: "Fresh basil; microgreens likely higher due to concentrated nutrients" },
      { name: "Folate (B9)", value: "~68 µg", percentDV: "~17%", note: "USDA fresh basil data" },
      { name: "Calcium", value: "~177 mg / ~18% DV", note: "Basil is notably calcium-rich for an herb" },
    ],
    minerals: [
      {
        name: "Iron",
        value: "~3.17 mg",
        percentDV: "~18–40%",
        note: "nutrition-and-you.com/USDA: basil herb 40% DV iron per 100 g. One of the highest non-legume plant iron sources.",
      },
      { name: "Calcium", value: "~177 mg", percentDV: "~18%", note: "Exceptionally high for a herb" },
      {
        name: "Magnesium",
        value: "~64 mg",
        percentDV: "~15%",
        note: "Basil is described as 'one of the best sources of magnesium' for blood pressure and heart function regulation (draxe.com citing clinical research)",
      },
      { name: "Potassium", value: "~295 mg", percentDV: "~6%" },
      { name: "Manganese", value: "~1.15 mg", percentDV: "~50%", note: "Very high — important for antioxidant enzymes and bone health" },
      { name: "Copper", value: "~0.38 mg", percentDV: "~42%", note: "Supports collagen synthesis and iron absorption" },
      { name: "Zinc", value: "~0.81 mg", percentDV: "~7%" },
    ],
    bioactives: [
      {
        compound: "Linalool (essential oil terpene)",
        benefit: "Acts on the central nervous system to reduce stress and anxiety, improve sleep quality, and promote mental balance. Research in chronically stressed rats showed linalool inhalation (basil essential oil) improved lipid metabolism, reduced stress hormone levels, and decreased cortisol-linked weight gain (PMC9105046, 2022)",
        note: "Linalool is also found in lavender and is the primary compound responsible for basil's anti-anxiety effects",
      },
      {
        compound: "Eugenol (phenolic essential oil)",
        benefit: "Inhibits COX-2 inflammatory enzymes (same target as ibuprofen but naturally). Strong antibacterial, antifungal activity. Relaxes blood vessel walls, supporting healthy blood pressure. Anti-spasmodic for digestive support.",
        note: "Also found in cloves; eugenol is basil's primary anti-inflammatory compound",
      },
      {
        compound: "Orientin + Vicenin (flavonoids)",
        benefit: "Tested in vitro for antioxidant protection against radiation-induced lipid peroxidation in liver cells. Together they constitute the major antioxidant flavonoid fraction in basil.",
      },
      {
        compound: "Anthocyanins (purple varieties especially)",
        benefit: "Up to 126 mg total phenolics per gram of plant material in purple basil cultivars — roughly half the concentration found in green tea (Precision Nutrition research review)",
        note: "Green basil microgreens still carry meaningful anthocyanin + phenolic levels",
      },
      {
        compound: "Rosmarinic acid",
        benefit: "Potent anti-inflammatory and antioxidant polyphenol; has demonstrated cortisol-regulating and immune-modulating activity in research studies",
      },
      {
        compound: "β-carotene + Lutein + Zeaxanthin",
        benefit: "Carotenoid-rich profile protects cells from free radical damage; supports eye health and immune function",
      },
    ],
    consumptionTips: [
      "The stress-modulatory effects of linalool are best preserved fresh and raw — heat volatilises essential oils",
      "30 g daily provides a strong dose of Vitamin A, K, and iron in a low-calorie package",
      "Blend into smoothies or juice for anti-anxiety benefits without adding significant calories",
      "Pair with sunflower microgreens for a complete stress + muscle recovery combination (cortisol regulation + protein + zinc)",
      "Iron in basil is non-heme; always pair with Vitamin C foods for optimal absorption",
    ],
    references: [
      "nutrition-and-you.com/USDA — basil herb vitamin and mineral profile",
      "PMC9105046 (2022) — linalool and basil essential oil cortisol/stress research",
      "Precision Nutrition — basil phenolics, anthocyanins, flavonoid research review",
      "draxe.com — basil magnesium, eugenol anti-inflammatory clinical reference",
      "PMC11125838 (2024) — basil microgreens phenolics and Vitamin C under different LED conditions",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MIXES — derived from constituent variety data
// ─────────────────────────────────────────────────────────────────────────────

export interface MixNutrition {
  id: string;
  constituents: string[];    // variety IDs
  combinedBenefit: string;   // the synergy story
  headlineStats: string[];   // 2-4 key combined stats
  keyNutrients: {
    nutrient: string;
    source: string;          // which variety contributes it
    benefit: string;
  }[];
  synergies: {
    combination: string;
    mechanism: string;
  }[];
  consumptionTips: string[];
}

export const MIX_NUTRITION: Record<string, MixNutrition> = {

  "fat-loss-mix": {
    id: "fat-loss-mix",
    constituents: ["white-radish", "broccoli", "bok-choy"],
    combinedBenefit:
      "This trio combines radish's glucoraphenin-driven detox enzymes, broccoli's unmatched sulforaphane content, and bok choy's Vitamin K + Calcium + Magnesium for metabolic and gut support — creating a complete liver detox and metabolism-activating blend.",
    headlineStats: [
      "Up to 100× more sulforaphane precursor than mature broccoli (broccoli component)",
      "~35–53 mg Vitamin C per 100 g (bok choy + broccoli combined)",
      "Highest iron of any microgreen in blend (broccoli: 2.61 mg/100 g)",
      "Triple glucosinolate source — radish, broccoli, and bok choy all produce sulforaphane",
    ],
    keyNutrients: [
      {
        nutrient: "Glucoraphanin / Sulforaphane (73–161 mg/100 g in broccoli)",
        source: "Broccoli",
        benefit: "Phase II liver detox enzyme activation; anti-inflammatory; documented fat-metabolism support via Nrf2 pathway",
      },
      {
        nutrient: "Glucoraphenin + Isothiocyanates",
        source: "White Radish",
        benefit: "Additional glucosinolate input; supports bile secretion and gut motility",
      },
      {
        nutrient: "Calcium (105–145 mg) + Magnesium (55–80 mg) + Vitamin K",
        source: "Bok Choy",
        benefit: "Calcium and Magnesium together regulate cortisol — chronic stress elevates cortisol which promotes fat storage; Vitamin K supports metabolic enzyme function",
      },
      {
        nutrient: "Iron (2.61 mg from broccoli component)",
        source: "Broccoli",
        benefit: "Supports oxygen delivery and metabolic rate — iron deficiency is a common hidden cause of low energy and sluggish metabolism",
      },
      {
        nutrient: "Vitamin C (combined 40–80 mg estimate)",
        source: "All three varieties",
        benefit: "Supports collagen and carnitine synthesis — carnitine is the transport molecule that moves fatty acids into mitochondria for fat burning",
      },
      {
        nutrient: "Dietary Fiber",
        source: "All three varieties",
        benefit: "Combined fiber supports gut microbiome diversity, reduces bloating, and slows glucose absorption — all associated with better fat metabolism",
      },
    ],
    synergies: [
      {
        combination: "Radish + Broccoli glucosinolates",
        mechanism: "Both Brassica family members contribute different glucosinolate profiles that activate Phase I and Phase II detox enzymes in the liver. Combining radish (glucoraphenin) and broccoli (glucoraphanin) gives a broader enzyme activation spectrum than either alone.",
      },
      {
        combination: "Bok Choy Vitamin C + Broccoli Iron",
        mechanism: "Bok choy's ascorbic acid (35–53 mg) dramatically improves the absorption of broccoli's non-heme iron (highest of any tested microgreen). Iron supports haemoglobin synthesis and metabolic oxygen delivery.",
      },
      {
        combination: "Sulforaphane (Broccoli) + B-vitamins (Bok Choy)",
        mechanism: "Sulforaphane's Nrf2 activation works synergistically with B6 and folate (from bok choy) for optimal methylation and detox pathway function.",
      },
    ],
    consumptionTips: [
      "Always consume raw — cooking inactivates myrosinase and eliminates sulforaphane generation in all three varieties",
      "30 g per serving provides a meaningful detox-activating dose from all three glucosinolate sources",
      "Chew thoroughly or chop before eating — mechanical disruption of cells triggers the glucosinolate → isothiocyanate conversion",
      "Pair with a squeeze of lemon (Vitamin C) to further enhance iron absorption from the broccoli component",
      "Use in salads, smoothie bowls, or as a topping on a light meal — the mild-to-peppery flavour profile works well with acidic dressings",
    ],
  },

  "muscle-recovery-mix": {
    id: "muscle-recovery-mix",
    constituents: ["sunflower", "green-amaranthus"],
    combinedBenefit:
      "Sunflower's complete amino acid profile + highest zinc of all tested microgreens combines with amaranth's exceptional iron, Vitamin K, and Vitamin C for a comprehensive post-workout recovery blend covering protein synthesis, oxygen transport, and antioxidant defence.",
    headlineStats: [
      "Zinc: 0.96 mg/100 g (highest of 6 tested microgreens — sunflower)",
      "Iron: ~1.3–1.5 mg/100 g from amaranth component",
      "Vitamin C: ~70–80 mg combined — enhances iron absorption 3×",
      "Complete plant protein: 8/9 essential amino acids from sunflower",
    ],
    keyNutrients: [
      {
        nutrient: "Complete Protein + 8/9 Essential Amino Acids",
        source: "Sunflower",
        benefit: "Provides the structural building blocks for muscle protein synthesis post-workout",
      },
      {
        nutrient: "Zinc (0.96 mg) + Magnesium (60–87 mg)",
        source: "Sunflower",
        benefit: "Zinc is essential for testosterone production, wound healing, and immune defence — all critical for recovery. Magnesium supports 300+ enzymatic reactions and improves sleep quality (both key for muscle repair).",
      },
      {
        nutrient: "Vitamin E (~38 mg) — 253% DV",
        source: "Sunflower",
        benefit: "Major fat-soluble antioxidant that protects muscle cell membranes from exercise-induced oxidative damage. Reduces DOMS (delayed onset muscle soreness) by scavenging reactive oxygen species generated during training.",
      },
      {
        nutrient: "Iron (~1.3 mg) + Folate (~85–100 µg)",
        source: "Green Amaranth",
        benefit: "Iron is the core component of haemoglobin — adequate iron restores oxygen-carrying capacity depleted during heavy training. Folate supports red blood cell production.",
      },
      {
        nutrient: "Vitamin K (very high)",
        source: "Green Amaranth",
        benefit: "Supports bone health and may play a role in insulin sensitivity and muscle protein metabolism",
      },
      {
        nutrient: "Vitamin C (~51 mg from amaranth)",
        source: "Green Amaranth",
        benefit: "Collagen synthesis (tendon and ligament repair); antioxidant defence; enhances iron absorption from the blend",
      },
      {
        nutrient: "Betaxanthins (yellow betalain pigments)",
        source: "Green Amaranth",
        benefit: "Anti-inflammatory antioxidants that reduce exercise-induced oxidative stress and support liver detox of metabolic by-products",
      },
    ],
    synergies: [
      {
        combination: "Sunflower Vitamin C + Amaranth Iron",
        mechanism: "The Vitamin C in both varieties (especially amaranth's ~51 mg) dramatically enhances absorption of non-heme iron from the amaranth component — up to 3× improvement in bioavailability. This combination specifically addresses the oxygen delivery aspect of recovery.",
      },
      {
        combination: "Sunflower Zinc + Amaranth Magnesium + Vitamin B6",
        mechanism: "Zinc + Magnesium together (a combination marketed as ZMA in sports nutrition) is well-researched for improving sleep quality and testosterone levels — both critical for muscle protein synthesis during recovery.",
      },
      {
        combination: "Sunflower protein + Amaranth iron",
        mechanism: "Protein provides the building blocks; iron ensures the blood can deliver oxygen for aerobic recovery metabolism. Together they address the two primary limiting factors in post-workout recovery.",
      },
    ],
    consumptionTips: [
      "Ideal 30–60 minutes post-workout while muscle protein synthesis window is open",
      "Pair with a whole protein source (eggs, paneer, legumes) to complete the amino acid profile for maximum muscle repair",
      "The mild, nutty flavour of sunflower + earthy amaranth works well in post-workout smoothies or salad bowls",
      "30 g serving gives a meaningful zinc and iron dose without excessive calories",
      "Add lemon juice to further enhance the iron bioavailability from the amaranth component",
    ],
  },

  "pump-performance-mix": {
    id: "pump-performance-mix",
    constituents: ["beetroot", "white-radish", "green-amaranthus"],
    combinedBenefit:
      "A pre-workout triad that combines beetroot's clinical-grade nitrate → nitric oxide pathway, radish's glucosinolate-driven circulation support, and amaranth's iron + Vitamin K for oxygen transport and blood health — delivering a complete blood-flow and endurance stack.",
    headlineStats: [
      "Dietary nitrates: 250–400 mg/100 g (beetroot) — proven to extend endurance 2–5%",
      "Iron: beetroot + amaranth combined ~2.0–2.5 mg/100 g blend",
      "Flavonoids: beetroot contributes 1,625 mg/100 g — highest of all microgreens",
      "Vitamin C: ~80–90 mg combined — supports nitric oxide stability and iron absorption",
    ],
    keyNutrients: [
      {
        nutrient: "Dietary Nitrates (250–400 mg/100 g)",
        source: "Beetroot",
        benefit: "Converted to nitric oxide (NO) in the body → vasodilation → improved blood flow, reduced O₂ cost of exercise, enhanced endurance. Clinical meta-analyses show 4–5 mmHg blood pressure reduction and 2–5% improvement in time-to-exhaustion.",
      },
      {
        nutrient: "Betalains (1,625 mg/100 g flavonoids in beet component)",
        source: "Beetroot",
        benefit: "Potent antioxidants that protect blood vessel walls, reduce LDL oxidation, and support cardiovascular health. Also anti-inflammatory, reducing exercise-induced oxidative damage.",
      },
      {
        nutrient: "Iron (~1.3–1.5 mg from amaranth) + Folate (~85–100 µg)",
        source: "Green Amaranth",
        benefit: "Haemoglobin synthesis and red blood cell production — iron is the rate-limiting nutrient for oxygen delivery during high-intensity exercise",
      },
      {
        nutrient: "Glucosinolates → Sulforaphane",
        source: "White Radish",
        benefit: "Supports vascular health through Nrf2 activation; anti-inflammatory effects on blood vessel endothelium; complements beetroot's nitrate pathway",
      },
      {
        nutrient: "Vitamin C (combined ~70–90 mg)",
        source: "All three varieties",
        benefit: "Stabilises nitric oxide, enhances iron absorption, and supports collagen in blood vessel walls. Also regenerates Vitamin E to extend antioxidant protection.",
      },
      {
        nutrient: "Potassium (combined ~650–950 mg)",
        source: "Beetroot + Amaranth + Radish",
        benefit: "Essential electrolyte for heart rate regulation and muscle contraction during exercise",
      },
    ],
    synergies: [
      {
        combination: "Beetroot Nitrates + Amaranth Iron",
        mechanism: "Nitric oxide improves blood flow; iron ensures haemoglobin can carry the oxygen that improved blood flow delivers. These two mechanisms are directly complementary for endurance performance.",
      },
      {
        combination: "Beetroot Betalains + Radish Sulforaphane",
        mechanism: "Betalains (antioxidant) + sulforaphane (Nrf2 activator) create a dual-pathway antioxidant defence against exercise-induced oxidative stress — betalains scavenge free radicals directly while sulforaphane upregulates the body's own antioxidant enzyme production.",
      },
      {
        combination: "Amaranth Vitamin C + Beetroot Iron",
        mechanism: "Vitamin C from amaranth triples the absorption of non-heme iron from the beetroot component — maximising the blood-building benefit of the blend.",
      },
    ],
    consumptionTips: [
      "Consume 2–3 hours before exercise — allows nitrate → nitric oxide conversion to peak in circulation",
      "Do not use antibacterial mouthwash before consumption — oral bacteria are essential for the first step of nitrate → nitrite conversion",
      "30–60 g serving is the dose range studied in clinical nitrate research",
      "Works well as a juice blend, smoothie addition, or raw topping on a pre-workout meal",
      "Consistent daily use (not just on training days) builds up a background nitrate pool for sustained cardiovascular benefits",
    ],
  },

  "stress-hormone-mix": {
    id: "stress-hormone-mix",
    constituents: ["basil", "sunflower", "bok-choy"],
    combinedBenefit:
      "Basil's linalool and eugenol modulate the central nervous system and cortisol response; sunflower's magnesium + zinc + complete protein address the hormonal rebuilding side; bok choy's calcium + Vitamin K + B-vitamins complete the structural and homocysteine-clearing support.",
    headlineStats: [
      "Magnesium: ~120–170 mg combined (27–40% DV) — key anti-stress mineral",
      "Vitamin A: basil contributes 175% DV — critical for adrenal health",
      "Iron: basil contributes 40% DV — supports dopamine and serotonin synthesis",
      "Zinc (0.96 mg from sunflower) + Magnesium synergy — researched for cortisol regulation",
    ],
    keyNutrients: [
      {
        nutrient: "Linalool + Eugenol (essential oil terpenes)",
        source: "Basil",
        benefit: "Linalool acts on GABA receptors to reduce anxiety and promote calm; eugenol inhibits COX-2 inflammatory enzymes. Research shows basil essential oil inhalation reduces stress hormone levels in chronically stressed subjects (PMC9105046).",
      },
      {
        nutrient: "Magnesium (~64 mg basil + ~70 mg sunflower + ~65 mg bok choy)",
        source: "Basil + Sunflower + Bok Choy",
        benefit: "Magnesium is the anti-stress mineral — it regulates the HPA (hypothalamic-pituitary-adrenal) axis, reduces cortisol secretion, improves sleep quality, and is required for over 300 enzymatic reactions. Many athletes and professionals are deficient.",
      },
      {
        nutrient: "Zinc (0.96 mg) + Selenium",
        source: "Sunflower",
        benefit: "Zinc deficiency is directly linked to elevated cortisol and reduced testosterone. Zinc is required for synthesis of testosterone, thyroid hormone, and insulin — the three key anabolic/recovery hormones.",
      },
      {
        nutrient: "Calcium (105–145 mg) + Vitamin K",
        source: "Bok Choy",
        benefit: "Calcium + Vitamin K work together for bone density; calcium also acts as a neurotransmitter signal that regulates cortisol release from the adrenal gland",
      },
      {
        nutrient: "Iron (3.17 mg from basil) + Folate",
        source: "Basil",
        benefit: "Iron is a cofactor for tyrosine hydroxylase — the enzyme that produces dopamine and norepinephrine. Low iron is directly linked to low mood, brain fog, and impaired stress resilience.",
      },
      {
        nutrient: "Vitamin B6 + Folate (combined from bok choy + basil)",
        source: "Bok Choy + Basil",
        benefit: "B6 and folate are essential for serotonin and GABA synthesis — the two primary calming neurotransmitters. They also reduce homocysteine, elevated levels of which are associated with anxiety disorders.",
      },
      {
        nutrient: "Vitamin E (~38 mg from sunflower) — 253% DV",
        source: "Sunflower",
        benefit: "Protects adrenal gland tissue from oxidative damage caused by chronic stress; supports cell membrane integrity throughout the endocrine system",
      },
    ],
    synergies: [
      {
        combination: "Basil Linalool/Eugenol + Sunflower Magnesium",
        mechanism: "Linalool reduces acute CNS stress response while magnesium addresses the chronic HPA axis dysregulation. Together they target both immediate and underlying hormonal stress pathways.",
      },
      {
        combination: "Sunflower Zinc + Bok Choy B6/Folate",
        mechanism: "Zinc is required for B6 activation — several B6-dependent enzymes that produce serotonin and dopamine need zinc as a cofactor. This combination supports complete neurotransmitter synthesis.",
      },
      {
        combination: "Basil Iron + Bok Choy Vitamin C",
        mechanism: "Basil's high iron (needed for mood neurotransmitter synthesis) is non-heme; bok choy's Vitamin C enhances its absorption by up to 3×. The pairing maximises the mood-supporting iron benefit.",
      },
    ],
    consumptionTips: [
      "Best consumed in the morning or at lunch — the calming effect of linalool is mild and supports daytime clarity rather than sedation",
      "Consistent daily use (rather than occasional) builds up the magnesium and zinc levels needed for chronic cortisol regulation",
      "The aromatic basil component is best raw — heat volatilises linalool and eugenol essential oils",
      "30 g mixed into a smoothie or salad before a stressful day provides the most comprehensive support",
      "Pair with adequate sleep and a protein-rich evening meal — the blend provides the micronutrient support but cannot replace sleep in cortisol recovery",
    ],
  },

  "elite-performance-mix": {
    id: "elite-performance-mix",
    constituents: ["sunflower", "white-radish", "green-amaranthus", "broccoli", "beetroot"],
    combinedBenefit:
      "The most nutritionally complete blend — combining all five metabolic pillars: protein synthesis (sunflower), detox (radish + broccoli sulforaphane), blood-building (amaranth iron), nitric oxide and endurance (beetroot), and antioxidant defence (broccoli + beetroot betalains). Designed for daily use as a complete micronutrient foundation.",
    headlineStats: [
      "Sulforaphane: up to 100× mature broccoli concentration (broccoli component)",
      "Dietary nitrates: 250–400 mg from beetroot component",
      "Iron: highest of any blend (~2.5–3.5 mg/100 g combined)",
      "Zinc: 0.96 mg from sunflower — highest tested microgreen zinc",
      "Vitamin C: ~100–130 mg combined estimate — exceeds daily RDA in one 100 g serving",
      "Complete protein: 8/9 essential amino acids from sunflower component",
    ],
    keyNutrients: [
      {
        nutrient: "Sulforaphane (broccoli): 73–161 mg/100 g glucoraphanin precursor",
        source: "Broccoli",
        benefit: "Daily Nrf2 activation for cellular detox, anti-inflammation, DNA protection, and neuroprotection",
      },
      {
        nutrient: "Dietary Nitrates (250–400 mg/100 g in beet component)",
        source: "Beetroot",
        benefit: "Sustained NO production supports vascular health, blood pressure, and exercise capacity even on rest days",
      },
      {
        nutrient: "Iron (~2.5–3.5 mg combined)",
        source: "Broccoli (2.61 mg) + Amaranth (1.3 mg)",
        benefit: "Highest iron of any blend — supports oxygen transport, metabolic rate, immune function, and dopamine synthesis",
      },
      {
        nutrient: "Complete Amino Acids + Zinc + Vitamin E",
        source: "Sunflower",
        benefit: "Recovery, testosterone support, and fat-soluble antioxidant protection from a single component",
      },
      {
        nutrient: "Glucosinolates (triple source)",
        source: "Radish + Broccoli",
        benefit: "Broader glucosinolate diversity than any single variety — activates multiple detox enzyme isoforms for comprehensive liver support",
      },
      {
        nutrient: "Betalains (beetroot) + Anthocyanins (radish) + Carotenoids (amaranth)",
        source: "All components",
        benefit: "Multi-pigment antioxidant array covering the full oxidative stress spectrum — each pigment class targets different free radical types",
      },
    ],
    synergies: [
      {
        combination: "Beetroot Nitrates + Broccoli Sulforaphane",
        mechanism: "Nitrates support vascular dilation while sulforaphane activates Nrf2-mediated endothelial protection. Both improve cardiovascular function through complementary (not overlapping) mechanisms.",
      },
      {
        combination: "Sunflower Vitamin C + Broccoli Iron + Amaranth Iron",
        mechanism: "Combined Vitamin C from all varieties maximises absorption of the two highest iron microgreens in the blend — creating the strongest blood-building combination possible.",
      },
      {
        combination: "Five-variety glucosinolate diversity",
        mechanism: "Different glucosinolate profiles in radish (glucoraphenin) and broccoli (glucoraphanin) activate both Phase I and Phase II liver detox enzymes — broader coverage than either alone.",
      },
      {
        combination: "Betalains + Sulforaphane + Vitamin E",
        mechanism: "Three mechanistically different antioxidant pathways in one blend: direct free radical scavenging (betalains), enzyme upregulation (sulforaphane/Nrf2), and membrane protection (Vitamin E). This is a complete antioxidant defence stack.",
      },
    ],
    consumptionTips: [
      "Designed for daily use — the 60 g serving covers a substantial portion of daily micronutrient requirements",
      "Best eaten raw in the morning or pre-workout for maximum nitrate + sulforaphane availability",
      "Chew well or chop — mechanical breakdown is required to activate sulforaphane (broccoli + radish) and increase bioavailability",
      "Do not use mouthwash before eating if consumed pre-workout — preserves oral nitrate → nitrite conversion for beetroot's NO pathway",
      "Works in salads, bowls, smoothies, or as a garnish — the diverse variety profile creates a balanced flavour",
      "The iron content is substantial — pair consistently with Vitamin C-containing foods for best absorption",
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: get nutrition for any product by ID
// ─────────────────────────────────────────────────────────────────────────────

export function getVarietyNutrition(id: string): VarietyNutrition | undefined {
  return VARIETY_NUTRITION[id];
}

export function getMixNutrition(id: string): MixNutrition | undefined {
  return MIX_NUTRITION[id];
}

// Plans are combinations of mixes — their nutrition is derived from the mix components.
// No separate plan nutrition object is needed; reference the relevant mix IDs.
