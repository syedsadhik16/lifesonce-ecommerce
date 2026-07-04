"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import SharedProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

/* ─────────────────────────── SVG Icons ─────────────────────────── */
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconTag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconStore = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const IconHeadset = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
  </svg>
);

/* ─────────────────────────── Constants ─────────────────────────── */
const WHATSAPP_URL = "https://wa.me/919384007074";
const MAPS_URL     = "https://share.google/czE1UOZfj9dD8fpOR";

const NAV_LINKS = [
  { label: "New Arrivals",  href: "#new-arrivals"               },
  { label: "Polo T-Shirts", href: "#polo-tshirts-jeans"         },
  { label: "Formal Pants",  href: "#formal-pants"               },
  { label: "Shirts + Jeans",href: "#shirt-jeans"                },
  { label: "Drop Shoulder", href: "#drop-shoulder-tshirts-jeans"},
  { label: "Contact",       href: "#contact"                    },
];

const CATEGORY_CARDS = [
  {
    title: "Polo T-Shirts",
    slug: "polo-tshirts-jeans",
    image: "/categories/polo-tshirts-jeans/1.png",
    description: "Classic polo tees paired with sharp denim for an effortless, smart-casual look.",
    itemCount: "Coming soon",
    href: "/collections/polo-tshirts-jeans",
  },
  {
    title: "Formal Pants",
    slug: "formal-pants",
    image: "/categories/formal-pants/1.png",
    description: "Tailored formal trousers crafted for clean lines, comfort and all-day confidence.",
    itemCount: "Coming soon",
    href: "/collections/formal-pants",
  },
  {
    title: "Shirts + Jeans",
    slug: "shirt-jeans",
    image: "/categories/shirt-jeans/1.png",
    description: "Premium shirts in cotton and blended fabrics, perfectly matched with classic denim.",
    itemCount: "10 styles",
    href: "/collections/shirt-jeans",
  },
  {
    title: "Drop Shoulder",
    slug: "drop-shoulder-tshirts-jeans",
    image: "/categories/drop-shoulder-tshirts-jeans/1.png",
    description: "Relaxed drop-shoulder cuts with wide-leg denim for a bold streetwear edge.",
    itemCount: "Coming soon",
    href: "/collections/drop-shoulder-tshirts-jeans",
  },
];

const WHY_ITEMS = [
  { icon: <IconStar />,    title: "Premium Collections",     desc: "Imported fabrics with top-grade finish — quality you can feel, pricing you'll love." },
  { icon: <IconTag />,     title: "Budget-Friendly Pricing", desc: "Direct-from-source, no middlemen. Get premium fashion without the premium price tag." },
  { icon: <IconStore />,   title: "In-Store Pickup",         desc: "Visit our Kodambakkam store, try before you buy, and walk out wearing it." },
  { icon: <IconHeadset />, title: "WhatsApp Support",        desc: "Chat with us instantly for sizing help, order updates, and custom requests." },
];

/* ─────────────────────────── Product Placeholder ─────────────────── */
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

/* ─────────────────────────── Product Image w/ Fallback ─────────────── */
function ProductImage({ src, alt, category }: { src: string; alt: string; category: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ProductPlaceholder category={category} />;
  }

  return (
    <>
      {/* placeholder sits behind as a loading skeleton */}
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

/* ─────────────────────────── Product Card ─────────────────────────── */
function ProductCard({ product }: { product: typeof products[0] }) {
  const saved       = product.price - product.discountPrice;
  const sizesToShow = product.sizes.slice(0, 5);
  const extraSizes  = product.sizes.length - 5;

  return (
    <article className="lo-card bg-white rounded-xl overflow-hidden border flex flex-col" style={{ borderColor: "#E7E5E4" }}>

      {/* ── Image / Placeholder ── */}
      <div className="lo-product-image-wrap" style={{ aspectRatio: "3/4" }}>
        <ProductImage src={product.image} alt={product.name} category={product.category} />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-white font-medium uppercase tracking-wider"
            style={{ backgroundColor: "#1C1917", fontSize: "9px", letterSpacing: "0.09em", padding: "4px 8px", borderRadius: "3px" }}
          >
            {product.badge}
          </span>
        )}

        {/* Low stock */}
        {product.stock <= 6 && (
          <span
            className="absolute top-3 right-3 font-medium"
            style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontSize: "9px", padding: "4px 8px", borderRadius: "3px" }}
          >
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col flex-1 p-4 pt-3">
        <p className="uppercase tracking-widest mb-1" style={{ color: "#A8A29E", fontSize: "9px", letterSpacing: "0.12em" }}>
          {product.category}
        </p>

        <h3 className="lo-serif font-semibold leading-snug mb-3" style={{ fontSize: "17px", color: "#1C1917" }}>
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold" style={{ fontSize: "16px", color: "#1C1917" }}>
            ₹{product.discountPrice.toLocaleString("en-IN")}
          </span>
          <span className="line-through" style={{ fontSize: "12px", color: "#A8A29E" }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="font-semibold" style={{ fontSize: "11px", color: "#92400E" }}>
            −₹{saved.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Sizes */}
        <div className="flex flex-wrap gap-1 mb-4">
          {sizesToShow.map((s) => (
            <span
              key={s}
              className="lo-size-pill border cursor-pointer select-none"
              style={{ borderColor: "#D6D3D1", color: "#44403C", fontSize: "10px", padding: "2px 7px", borderRadius: "3px" }}
            >
              {s}
            </span>
          ))}
          {extraSizes > 0 && (
            <span style={{ color: "#A8A29E", fontSize: "10px", alignSelf: "center", paddingLeft: "2px" }}>
              +{extraSizes}
            </span>
          )}
        </div>

        {/* CTA — pushed to bottom */}
        <div className="mt-auto">
          <Link
            href={`/products/${product.slug}`}
            className="lo-view-btn w-full border font-semibold tracking-wide"
            style={{
              display: "block", textAlign: "center", textDecoration: "none",
              borderColor: "#1C1917", color: "#1C1917",
              fontSize: "12px", letterSpacing: "0.07em", padding: "10px 0", borderRadius: "6px",
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

/* ─────────────────────────── Category Card ─────────────────────────── */
function CategoryCard({ cat }: { cat: (typeof CATEGORY_CARDS)[number] }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      id={cat.slug}
      className="lo-img-cat-card bg-white rounded-xl border flex flex-col"
      style={{ borderColor: "#E7E5E4" }}
    >
      {/* Image */}
      <div
        className="lo-img-cat-img"
        style={{ aspectRatio: "3/4", position: "relative", backgroundColor: "#F5F2EE", borderRadius: "12px 12px 0 0", flexShrink: 0 }}
      >
        {!imgError ? (
          <Image
            src={cat.image}
            alt={cat.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
            unoptimized
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="lo-placeholder absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="lo-serif italic font-light" style={{ fontSize: "72px", color: "#C9BEB3", lineHeight: 1 }}>
              {cat.title.charAt(0)}
            </span>
            <div style={{ width: "24px", height: "1px", backgroundColor: "#C9BEB3" }} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1" style={{ padding: "20px 20px 24px" }}>
        <h3
          className="lo-serif font-semibold"
          style={{ fontSize: "19px", color: "#1C1917", marginBottom: "8px", lineHeight: "1.3" }}
        >
          {cat.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#78716C", lineHeight: "1.65", marginBottom: "16px", flex: 1 }}>
          {cat.description}
        </p>
        <div className="flex items-center justify-between" style={{ marginTop: "auto" }}>
          <span style={{ fontSize: "11px", color: "#A8A29E", fontWeight: 500, letterSpacing: "0.08em" }}>
            {cat.itemCount}
          </span>
          <Link
            href={cat.href}
            className="lo-btn-outline inline-flex items-center gap-1.5 font-semibold border"
            style={{
              borderColor: "#1C1917",
              color: "#1C1917",
              fontSize: "11px",
              letterSpacing: "0.07em",
              padding: "8px 14px",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Explore Collection <IconArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Hero Right Visual ─────────────────────── */
function HeroVisual() {
  const [heroImgError,   setHeroImgError]   = useState(false);
  const [secondImgError, setSecondImgError] = useState(false);
  const hero   = products[0];
  const second = products[1];
  const heroPct = Math.round(((hero.price - hero.discountPrice) / hero.price) * 100);

  return (
    <div className="lo-hero-visual hidden lg:block" style={{ height: "560px" }}>
      {/* Main tall card */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          bottom: "64px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E7E5E4",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 60px rgba(28,25,23,0.12)",
        }}
      >
        {/* Image area — top 72%, position:relative for next/image fill */}
        <div style={{ height: "72%", position: "relative", backgroundColor: "#F5F2EE" }}>
          {/* Warm placeholder sits behind */}
          <div
            className="lo-placeholder"
            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}
          >
            <div className="lo-serif italic font-light" style={{ fontSize: "96px", color: "#C9BEB3", lineHeight: 1 }}>L</div>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#C9BEB3" }} />
            <div style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#B5ABA3", textTransform: "uppercase" }}>New Collection</div>
          </div>
          {/* Real image */}
          {!heroImgError && (
            <Image
              src={hero.image}
              alt={hero.name}
              fill
              sizes="(max-width: 1280px) 40vw, 560px"
              className="object-cover"
              style={{ position: "absolute", zIndex: 1 }}
              onError={() => setHeroImgError(true)}
              priority
            />
          )}
        </div>

        {/* Product info — bottom 28% */}
        <div style={{ height: "28%", padding: "16px 20px", borderTop: "1px solid #F0EFEE", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#A8A29E", textTransform: "uppercase", marginBottom: "4px" }}>
            {hero.badge} · {hero.category}
          </p>
          <p className="lo-serif font-semibold" style={{ fontSize: "17px", color: "#1C1917", marginBottom: "6px" }}>
            {hero.name}
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontWeight: 700, fontSize: "15px", color: "#1C1917" }}>₹{hero.discountPrice.toLocaleString("en-IN")}</span>
            <span style={{ textDecoration: "line-through", fontSize: "12px", color: "#A8A29E" }}>₹{hero.price.toLocaleString("en-IN")}</span>
            <span style={{ fontSize: "11px", color: "#92400E", fontWeight: 600 }}>{heroPct}% off</span>
          </div>
        </div>
      </div>

      {/* Floating secondary card */}
      <div
        className="absolute"
        style={{
          bottom: "0px",
          right: "0px",
          width: "160px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #E7E5E4",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 12px 32px rgba(28,25,23,0.14)",
        }}
      >
        <div style={{ height: "110px", position: "relative", backgroundColor: "#F5F2EE" }}>
          <div className="lo-placeholder" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="lo-serif italic font-light" style={{ fontSize: "48px", color: "#C9BEB3" }}>S</span>
          </div>
          {!secondImgError && (
            <Image
              src={second.image}
              alt={second.name}
              fill
              sizes="160px"
              className="object-cover"
              style={{ position: "absolute", zIndex: 1 }}
              onError={() => setSecondImgError(true)}
            />
          )}
        </div>
        <div style={{ padding: "10px 12px" }}>
          <p style={{ fontSize: "9px", color: "#A8A29E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>{second.category}</p>
          <p style={{ fontWeight: 700, fontSize: "13px", color: "#1C1917" }}>₹{second.discountPrice.toLocaleString("en-IN")}</p>
        </div>
      </div>

      {/* Chip — top right */}
      <div
        className="absolute"
        style={{
          top: "16px",
          right: "16px",
          padding: "8px 14px",
          borderRadius: "999px",
          backgroundColor: "#1C1917",
          color: "#FAFAF9",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          boxShadow: "0 4px 12px rgba(28,25,23,0.3)",
        }}
      >
        10 New Styles
      </div>

      {/* Chip — bottom left */}
      <div
        className="absolute"
        style={{
          bottom: "80px",
          left: "-16px",
          padding: "12px 16px",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E7E5E4",
          boxShadow: "0 8px 24px rgba(28,25,23,0.12)",
          minWidth: "120px",
        }}
      >
        <p className="lo-serif font-semibold" style={{ fontSize: "22px", color: "#1C1917" }}>500+</p>
        <p style={{ fontSize: "10px", color: "#78716C", marginTop: "2px" }}>Styles In Store</p>
      </div>
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF9", color: "#1C1917" }}>

      {/* ──────────── 1. Announcement Bar ──────────── */}

      {/* ──────────── 3. Hero — Split Layout ──────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#FAFAF9", padding: "56px 0 64px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "48px" }}>

            {/* ── Left: Editorial Text ── */}
            <div>
              {/* Label */}
              <div className="flex items-center gap-3 mb-6">
                <div style={{ width: "32px", height: "1px", backgroundColor: "#A16207" }} />
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#A16207", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Premium Men&apos;s Fashion — Chennai
                </p>
              </div>

              {/* Headline */}
              <h1
                className="lo-serif italic font-light leading-none mb-5"
                style={{ fontSize: "clamp(52px, 8vw, 96px)", color: "#1C1917", letterSpacing: "-0.02em" }}
              >
                Life&apos;s Once
              </h1>

              {/* Gold accent line */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207" }} />
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#A16207", opacity: 0.7 }} />
                <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207" }} />
              </div>

              {/* Subtitle */}
              <p
                className="lo-serif font-normal leading-snug mb-4"
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)", color: "#44403C", maxWidth: "480px" }}
              >
                Premium men&apos;s fashion from Kodambakkam, Chennai.
              </p>

              <p
                style={{ fontSize: "15px", lineHeight: "1.85", color: "#78716C", maxWidth: "440px", marginBottom: "36px" }}
              >
                Sharp shirts, clean fits, and smart casual essentials selected for everyday confidence.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "36px" }}>
                <a
                  href="/collections/new-arrivals"
                  className="lo-btn-primary inline-flex items-center justify-center font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "#1C1917",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    letterSpacing: "0.07em",
                    padding: "14px 32px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    minWidth: "190px",
                  }}
                >
                  Shop New Arrivals
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lo-btn-outline inline-flex items-center justify-center gap-2 font-semibold border cursor-pointer"
                  style={{
                    borderColor: "#1C1917",
                    color: "#1C1917",
                    fontSize: "13px",
                    letterSpacing: "0.07em",
                    padding: "14px 28px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    minWidth: "160px",
                  }}
                >
                  <IconWhatsApp /> Chat on WhatsApp
                </a>
              </div>

              {/* Trust Points */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {["Store Pickup", "WhatsApp Ordering", "COD Available", "Easy Exchange"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#92400E", display: "flex" }}>
                      <IconCheck />
                    </span>
                    <span style={{ fontSize: "12px", color: "#78716C", fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Fashion Visual Card ── */}
            <div className="relative" style={{ height: "540px" }}>
              <HeroVisual />
              {/* Mobile fallback — shown instead of HeroVisual on mobile */}
              <div className="lg:hidden flex flex-col items-center py-10 gap-4">
                <div className="rounded-2xl overflow-hidden" style={{ width: "220px", height: "280px", position: "relative", backgroundColor: "#F5F2EE" }}>
                  <div className="lo-placeholder" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="lo-serif italic font-light" style={{ fontSize: "80px", color: "#C9BEB3" }}>L</span>
                  </div>
                  <Image
                    src={products[0].image}
                    alt={products[0].name}
                    fill
                    sizes="220px"
                    className="object-cover"
                    style={{ position: "absolute", zIndex: 1 }}
                  />
                </div>
                <p className="lo-serif italic" style={{ fontSize: "16px", color: "#78716C" }}>New Collection · 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── 4. Category Section ──────────── */}
      <section id="categories" style={{ padding: "80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center" style={{ marginBottom: "48px" }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
              Browse
            </p>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1C1917" }}>
              Shop by Category
            </h2>
            <div className="lo-divider" style={{ marginTop: "14px" }} />
            <p style={{ fontSize: "14px", color: "#78716C", maxWidth: "440px", margin: "16px auto 0", lineHeight: "1.7" }}>
              Curated looks for every occasion — styled and ready to wear.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
            {CATEGORY_CARDS.map((cat) => (
              <CategoryCard key={cat.slug} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── 5. New Arrivals ──────────── */}
      <section id="new-arrivals" style={{ padding: "80px 0", backgroundColor: "#FAFAF9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center" style={{ marginBottom: "48px" }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
              Just In
            </p>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1C1917" }}>
              New Arrivals
            </h2>
            <div className="lo-divider" style={{ marginTop: "14px" }} />
            <p style={{ fontSize: "14px", color: "#78716C", maxWidth: "440px", margin: "16px auto 0", lineHeight: "1.7" }}>
              Fresh drops — premium fabric, modern cuts, straight from the store.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: "20px" }}>
            {products.map((product) => (
              <SharedProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "48px" }}>
            <Link
              href="/shop"
              className="lo-btn-outline inline-flex items-center gap-2.5 font-semibold border cursor-pointer"
              style={{
                borderColor: "#1C1917",
                color: "#1C1917",
                fontSize: "13px",
                letterSpacing: "0.07em",
                padding: "14px 36px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              View All Products <IconArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── 6. Store Visit ──────────── */}
      <section id="contact" style={{ padding: "80px 0", backgroundColor: "#1C1917" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "56px" }}>

            {/* Left: Info */}
            <div>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
                Find Us
              </p>
              <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FAFAF9", marginBottom: "16px" }}>
                Visit Our Store
              </h2>
              <p style={{ fontSize: "14px", color: "#A8A29E", lineHeight: "1.8", marginBottom: "36px", maxWidth: "380px" }}>
                Come in, try your favourites, and take them home same day. Our team is always ready to help you find the perfect fit.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
                {[
                  {
                    icon: <IconMapPin />,
                    label: "Address",
                    content: <>Life&apos;s Once<br />25/A, Karnan St, Rangarajapuram,<br />Kodambakkam, Chennai, Greater Chennai,<br />Tamil Nadu 600024</>
                  },
                  {
                    icon: <IconPhone />,
                    label: "Phone",
                    content: <a href="tel:+919384007074" style={{ color: "#D6D3D1" }}>093840 07074</a>
                  },
                  {
                    icon: <IconClock />,
                    label: "Store Hours",
                    content: <>9:30 AM - 11:00 PM, All Days</>
                  },
                ].map(({ icon, label, content }) => (
                  <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{ color: "#A16207", marginTop: "2px", flexShrink: 0 }}>{icon}</div>
                    <div>
                      <p style={{ fontSize: "9px", fontWeight: 600, color: "#57534E", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</p>
                      <div style={{ fontSize: "13px", color: "#D6D3D1", lineHeight: "1.6" }}>{content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Action Card */}
            <div style={{ backgroundColor: "#242120", borderRadius: "16px", padding: "36px", border: "1px solid #2D2B28" }}>
              <h3 className="lo-serif font-medium" style={{ fontSize: "22px", color: "#FAFAF9", marginBottom: "6px" }}>
                Plan your visit
              </h3>
              <p style={{ fontSize: "13px", color: "#78716C", lineHeight: "1.7", marginBottom: "28px" }}>
                Get directions or ping us on WhatsApp before you drop in.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lo-btn-primary flex items-center justify-center gap-2.5 font-semibold cursor-pointer"
                  style={{
                    backgroundColor: "#FAFAF9",
                    color: "#1C1917",
                    padding: "14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    border: "none",
                  }}
                >
                  <IconMapPin /> Open Google Maps
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 font-semibold"
                  style={{
                    border: "1.5px solid #25D366",
                    color: "#25D366",
                    padding: "14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <IconWhatsApp /> WhatsApp Us
                </a>
              </div>

              <div style={{ height: "1px", backgroundColor: "#2D2B28", margin: "24px 0" }} />

              <div className="grid grid-cols-2" style={{ gap: "12px", textAlign: "center" }}>
                {[
                  { num: "500+", text: "Styles In Store" },
                  { num: "COD",  text: "Available" },
                ].map(({ num, text }) => (
                  <div key={num} style={{ backgroundColor: "#1C1917", borderRadius: "10px", padding: "16px 12px" }}>
                    <p className="lo-serif font-semibold" style={{ fontSize: "22px", color: "#FAFAF9" }}>{num}</p>
                    <p style={{ fontSize: "11px", color: "#78716C", marginTop: "3px" }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── 7. Why Shop With Us ──────────── */}
      <section style={{ padding: "80px 0", backgroundColor: "#FFFFFF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center" style={{ marginBottom: "48px" }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
              Our Promise
            </p>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1C1917" }}>
              Why Shop With Us
            </h2>
            <div className="lo-divider" style={{ marginTop: "14px" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "20px" }}>
            {WHY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="lo-why-card border"
                style={{ borderColor: "#E7E5E4", backgroundColor: "#FAFAF9", borderRadius: "12px", padding: "28px 24px" }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#FEF3C7", color: "#92400E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                  {item.icon}
                </div>
                <h3 className="lo-serif font-semibold" style={{ fontSize: "18px", color: "#1C1917", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#78716C", lineHeight: "1.75" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── 8. Footer ──────────── */}
      <section style={{ padding: "80px 0", backgroundColor: "#FAFAF9" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center" style={{ marginBottom: "40px" }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
              Quick Help
            </p>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1C1917" }}>
              FAQ
            </h2>
            <div className="lo-divider" style={{ marginTop: "14px" }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "16px" }}>
            {[
              ["How do I order?", "Add products to cart and checkout through WhatsApp."],
              ["Can I visit the store?", "Yes, store pickup and in-store support are available."],
              ["Need size help?", "Use the size guide or message us before ordering."],
            ].map(([question, answer]) => (
              <div key={question} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "14px", padding: "22px" }}>
                <h3 className="lo-serif font-semibold" style={{ fontSize: "22px", color: "#1C1917", marginBottom: "8px" }}>{question}</h3>
                <p style={{ fontSize: "13px", color: "#57534E", lineHeight: "1.7" }}>{answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: "28px" }}>
            <Link href="/faq" className="lo-btn-outline inline-flex font-semibold border" style={{ borderColor: "#1C1917", color: "#1C1917", fontSize: "13px", padding: "13px 26px", borderRadius: "8px", textDecoration: "none" }}>
              View FAQ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
