"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  /** False until the saved cart has been loaded from localStorage (browser only). */
  hasHydrated: boolean;

  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

function getItemKey(productId: string, size?: string) {
  return `${productId}__${size ?? "plan"}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,

      addItem: (newItem) => {
        set((state) => {
          const key = getItemKey(newItem.productId, newItem.size);
          const existing = state.items.find(
            (i) => getItemKey(i.productId, i.size) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                getItemKey(i.productId, i.size) === key
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        });
      },

      removeItem: (productId, size) => {
        const key = getItemKey(productId, size);
        set((state) => ({
          items: state.items.filter(
            (i) => getItemKey(i.productId, i.size) !== key
          ),
        }));
      },

      updateQuantity: (productId, size, quantity) => {
        const key = getItemKey(productId, size);
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(
              (i) => getItemKey(i.productId, i.size) !== key
            ),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            getItemKey(i.productId, i.size) === key ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "fernforest-cart",
      // Only the items are saved; the drawer always starts closed.
      partialize: (state) => ({ items: state.items }),
      // The server always renders an empty cart, so the saved cart is loaded
      // after the first client render (see CartHydrator). Loading it earlier
      // makes the first render differ from the server HTML (hydration error).
      skipHydration: true,
      onRehydrateStorage: () => () => {
        useCartStore.setState({ hasHydrated: true });
      },
    }
  )
);
