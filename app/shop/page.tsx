"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const filters = ["All", "Shirts", "Polo T-Shirts", "Formal Pants", "Drop Shoulder", "Jeans"] as const;

function productMatchesFilter(product: (typeof products)[number], filter: (typeof filters)[number]) {
  if (filter === "All") return true;
  const haystack = `${product.name} ${product.category} ${product.collection} ${product.description}`.toLowerCase();

  if (filter === "Polo T-Shirts") return haystack.includes("polo");
  if (filter === "Formal Pants") return haystack.includes("formal pants");
  if (filter === "Drop Shoulder") return haystack.includes("drop shoulder");
  if (filter === "Jeans") return haystack.includes("jeans") || haystack.includes("denim");
  return haystack.includes(filter.toLowerCase());
}

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const visibleProducts = useMemo(
    () => products.filter((product) => productMatchesFilter(product, activeFilter)),
    [activeFilter]
  );

  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "64px 0 80px" }}>
        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
            Shop
          </p>
          <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#1C1917", marginBottom: "12px" }}>
            All Products
          </h1>
          <div style={{ width: "44px", height: "1px", backgroundColor: "#A16207", marginBottom: "18px" }} />
          <p style={{ fontSize: "14px", color: "#78716C", lineHeight: "1.8", maxWidth: "520px" }}>
            Browse the full Life&apos;s Once collection and open any product for size, color, cart, and WhatsApp ordering options.
          </p>
        </div>

        <div className="flex flex-wrap" style={{ gap: "10px", marginBottom: "32px" }} aria-label="Product filters">
          {filters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  border: "1.5px solid",
                  borderColor: active ? "#1C1917" : "#D6D3D1",
                  backgroundColor: active ? "#1C1917" : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#44403C",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "9px 16px",
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: "20px" }}>
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "16px", padding: "48px 24px", textAlign: "center" }}>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "28px", color: "#1C1917", marginBottom: "10px" }}>
              Products coming soon.
            </h2>
            <p style={{ fontSize: "14px", color: "#78716C", marginBottom: "24px" }}>
              WhatsApp us for latest stock.
            </p>
            <a href="https://wa.me/919384007074" target="_blank" rel="noopener noreferrer" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", fontSize: "13px", padding: "13px 24px", borderRadius: "8px", textDecoration: "none" }}>
              WhatsApp Us
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
