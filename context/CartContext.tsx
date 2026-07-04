"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  discountPrice: number;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (
    product: Pick<CartItem, "id" | "name" | "slug" | "image" | "price" | "discountPrice">,
    selectedSize: string,
    selectedColor: string
  ) => void;
  removeFromCart: (id: number, selectedSize: string, selectedColor: string) => void;
  updateQuantity: (id: number, selectedSize: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "lifesonce_cart";

function isSameItem(item: CartItem, id: number, size: string, color: string) {
  return item.id === id && item.selectedSize === size && item.selectedColor === color;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      // ignore corrupt storage data
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addToCart(
    product: Pick<CartItem, "id" | "name" | "slug" | "image" | "price" | "discountPrice">,
    selectedSize: string,
    selectedColor: string
  ) {
    setItems((prev) => {
      const idx = prev.findIndex((i) => isSameItem(i, product.id, selectedSize, selectedColor));
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...product, selectedSize, selectedColor, quantity: 1 }];
    });
  }

  function removeFromCart(id: number, selectedSize: string, selectedColor: string) {
    setItems((prev) => prev.filter((i) => !isSameItem(i, id, selectedSize, selectedColor)));
  }

  function updateQuantity(id: number, selectedSize: string, selectedColor: string, quantity: number) {
    if (quantity < 1) {
      removeFromCart(id, selectedSize, selectedColor);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (isSameItem(i, id, selectedSize, selectedColor) ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const cartCount = items.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = items.reduce((s, i) => s + i.discountPrice * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
