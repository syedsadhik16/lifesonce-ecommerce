import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Men's Fashion | Life's Once Chennai",
  description: "Shop premium shirts, polos, trousers, jeans and men's fashion from Life's Once, Kodambakkam Chennai.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
