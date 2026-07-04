"use client";

import { useEffect, useMemo, useState } from "react";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const categoryOptions = ["All", "Shirts", "Polo T-Shirts", "Trousers", "Drop Shoulder", "Jeans"] as const;
const sizeOptions = ["All", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"] as const;
const colorOptions = ["All", "Beige", "Black", "Blue", "Brown", "Cream", "Grey", "Navy", "Olive", "White"] as const;
const priceOptions = ["All", "Under Rs. 999", "Rs. 999 - Rs. 1499", "Rs. 1500 - Rs. 1999", "Above Rs. 1999"] as const;
const sortOptions = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Name: A to Z"] as const;

function toSlug(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function matchesCategory(product: (typeof products)[number], category: (typeof categoryOptions)[number]) {
  if (category === "All") return true;
  if (category === "Polo T-Shirts") return product.collectionSlugs.includes("polo-tshirts");
  if (category === "Trousers") return product.collectionSlugs.includes("trousers");
  if (category === "Drop Shoulder") return product.collectionSlugs.includes("drop-shoulder");
  if (category === "Jeans") return product.collectionSlugs.includes("jeans");
  return product.category === category;
}

function matchesPrice(product: (typeof products)[number], price: (typeof priceOptions)[number]) {
  if (price === "All") return true;
  if (price === "Under Rs. 999") return product.discountPrice < 999;
  if (price === "Rs. 999 - Rs. 1499") return product.discountPrice >= 999 && product.discountPrice <= 1499;
  if (price === "Rs. 1500 - Rs. 1999") return product.discountPrice >= 1500 && product.discountPrice <= 1999;
  return product.discountPrice > 1999;
}

function normalizeColor(color: string) {
  return color.toLowerCase().replace("sky ", "").replace("navy blue", "navy").replace("olive green", "olive");
}

function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
      <span style={{ fontSize: "10px", color: "#78716C", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ height: "42px", border: "1px solid #D6D3D1", borderRadius: "8px", backgroundColor: "#FFFFFF", color: "#1C1917", padding: "0 12px", fontSize: "13px", fontWeight: 600 }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ShopPage() {
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>("All");
  const [size, setSize] = useState<(typeof sizeOptions)[number]>("All");
  const [color, setColor] = useState<(typeof colorOptions)[number]>("All");
  const [price, setPrice] = useState<(typeof priceOptions)[number]>("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Featured");

  useEffect(() => {
    const categoryParam = new URLSearchParams(window.location.search).get("category");
    if (!categoryParam) return;

    const nextCategory = categoryOptions.find((option) => toSlug(option) === toSlug(categoryParam));
    if (nextCategory) setCategory(nextCategory);
  }, []);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const hasSize = size === "All" || product.availableSizes.includes(size);
      const hasColor = color === "All" || product.availableColors.some((item) => normalizeColor(item).includes(color.toLowerCase()));
      return matchesCategory(product, category) && hasSize && hasColor && matchesPrice(product, price);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "Price: Low to High") return a.discountPrice - b.discountPrice;
      if (sort === "Price: High to Low") return b.discountPrice - a.discountPrice;
      if (sort === "Name: A to Z") return a.name.localeCompare(b.name);
      if (sort === "Newest") return Number(b.isNewArrival) - Number(a.isNewArrival) || b.id - a.id;
      return Number(b.isBestSeller) - Number(a.isBestSeller) || Number(b.isNewArrival) - Number(a.isNewArrival);
    });
  }, [category, size, color, price, sort]);

  const activeFilters = [category, size, color, price].filter((item) => item !== "All");

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
          <p style={{ fontSize: "14px", color: "#78716C", lineHeight: "1.8", maxWidth: "560px" }}>
            Filter by category, size, color and budget. Final availability is confirmed on WhatsApp before checkout.
          </p>
        </div>

        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "16px", padding: "18px", marginBottom: "28px" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ gap: "14px" }}>
            <SelectFilter label="Category" value={category} options={categoryOptions} onChange={(value) => setCategory(value as typeof category)} />
            <SelectFilter label="Size" value={size} options={sizeOptions} onChange={(value) => setSize(value as typeof size)} />
            <SelectFilter label="Color" value={color} options={colorOptions} onChange={(value) => setColor(value as typeof color)} />
            <SelectFilter label="Price" value={price} options={priceOptions} onChange={(value) => setPrice(value as typeof price)} />
            <SelectFilter label="Sort" value={sort} options={sortOptions} onChange={(value) => setSort(value as typeof sort)} />
          </div>

          <div className="flex flex-wrap items-center justify-between" style={{ gap: "12px", marginTop: "16px" }}>
            <p style={{ fontSize: "12px", color: "#A16207", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"} shown
            </p>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setSize("All");
                  setColor("All");
                  setPrice("All");
                }}
                style={{ border: "none", background: "none", color: "#78716C", cursor: "pointer", fontSize: "12px", fontWeight: 700, textDecoration: "underline" }}
              >
                Clear filters
              </button>
            )}
          </div>
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
              This collection is coming soon.
            </h2>
            <p style={{ fontSize: "14px", color: "#78716C", marginBottom: "24px" }}>
              Message us to check availability.
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
