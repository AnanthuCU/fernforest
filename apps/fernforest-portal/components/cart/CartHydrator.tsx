"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/store";

/** Loads the saved cart from localStorage once the page has hydrated. */
export function CartHydrator() {
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);
  return null;
}
