"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";

type Product = (typeof products)[number];

function ProductPlaceholder({ category }: { category: string }) {
  return (
    <div className="lo-placeholder w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="lo-serif italic font-light leading-none" style={{ fontSize: "64px", color: "#C9BEB3" }}>
        {category.charAt(0)}
      </div>
      <div style={{ width: "24px", height: "1px", backgroundColor: "#C9BEB3" }} />
      <div className="text-center px-4" style={{ color: "#B5ABA3", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {category}
      </div>
    </div>
  );
}

function ProductImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return <ProductPlaceholder category={category} />;

  return (
    <>
      <div className="absolute inset-0">
        <ProductPlaceholder category={category} />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
        style={{ zIndex: 1 }}
        onError={() => setHasError(true)}
      />
    </>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const saved = product.price - product.discountPrice;
  const sizesToShow = product.sizes.slice(0, 5);
  const extraSizes = product.sizes.length - 5;

  return (
    <article className="lo-card bg-white rounded-xl overflow-hidden border flex flex-col" style={{ borderColor: "#E7E5E4", boxShadow: "0 10px 30px rgba(28,25,23,0.06)" }}>
      <div className="lo-product-image-wrap" style={{ aspectRatio: "3/4" }}>
        <ProductImage src={product.image} alt={product.name} category={product.category} />

        {product.badge && (
          <span
            className="absolute top-3 left-3 text-white font-medium uppercase tracking-wider"
            style={{ backgroundColor: "#1C1917", fontSize: "9px", letterSpacing: "0.09em", padding: "4px 8px", borderRadius: "3px" }}
          >
            {product.badge}
          </span>
        )}

        {product.stock <= 6 && (
          <span
            className="absolute top-3 right-3 font-medium"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontSize: "9px", padding: "4px 8px", borderRadius: "3px" }}
          >
            Only {product.stock} left
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 pt-3">
        <p className="uppercase tracking-widest mb-1" style={{ color: "#A8A29E", fontSize: "9px", letterSpacing: "0.12em" }}>
          {product.category}
        </p>

        <h3 className="lo-serif font-semibold leading-snug mb-3" style={{ fontSize: "17px", color: "#1C1917" }}>
          {product.name}
        </h3>

        <div className="flex flex-wrap" style={{ gap: "6px", marginBottom: "12px" }}>
          {["Premium fit", "Store pickup"].map((label) => (
            <span key={label} style={{ backgroundColor: "#F5F5F4", color: "#78716C", fontSize: "10px", fontWeight: 600, padding: "4px 7px", borderRadius: "999px" }}>
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold" style={{ fontSize: "16px", color: "#1C1917" }}>
            Rs. {product.discountPrice.toLocaleString("en-IN")}
          </span>
          <span className="line-through" style={{ fontSize: "12px", color: "#A8A29E" }}>
            Rs. {product.price.toLocaleString("en-IN")}
          </span>
          <span className="font-semibold" style={{ fontSize: "11px", color: "#92400E" }}>
            Save Rs. {saved.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {sizesToShow.map((size) => (
            <span
              key={size}
              className="lo-size-pill border select-none"
              style={{ borderColor: "#D6D3D1", color: "#44403C", fontSize: "10px", padding: "2px 7px", borderRadius: "3px" }}
            >
              {size}
            </span>
          ))}
          {extraSizes > 0 && (
            <span style={{ color: "#A8A29E", fontSize: "10px", alignSelf: "center", paddingLeft: "2px" }}>
              +{extraSizes}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="lo-view-btn w-full border font-semibold tracking-wide"
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              borderColor: "#1C1917",
              color: "#1C1917",
              fontSize: "12px",
              letterSpacing: "0.07em",
              padding: "10px 0",
              borderRadius: "6px",
            }}
            aria-label={`View ${product.name}`}
          >
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}
