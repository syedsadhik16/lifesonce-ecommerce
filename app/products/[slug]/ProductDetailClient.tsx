"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

type Product = typeof products[0];

/* ─────────────────────────── Icons ─────────────────────────── */
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconCart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
  </svg>
);
const IconTruck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
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

/* ─────────────────────────── Constants ─────────────────────────── */
const WHATSAPP_BASE = "https://wa.me/919384007074";
const SIZE_HELP_URL = "https://wa.me/919384007074?text=Hi%20Life%E2%80%99s%20Once%2C%20I%20need%20help%20with%20size%20selection.";

const NAV_LINKS = [
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "All Products", href: "/shop" },
  { label: "Polo T-Shirts", href: "/collections/polo-tshirts-jeans" },
  { label: "Formal Pants", href: "/collections/formal-pants" },
  { label: "Shirts + Jeans", href: "/collections/shirt-jeans" },
  { label: "Drop Shoulder", href: "/collections/drop-shoulder-tshirts-jeans" },
  { label: "Contact", href: "/#contact" },
];

/* ─────────────────────────── Helpers ─────────────────────────── */
function getMaterial(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("denim") || c.includes("shorts")) return "Premium imported hyperflex denim — 80% Cotton, 18% Polyester, 2% Elastane";
  if (c.includes("shirt"))  return "Premium woven cotton — 100% Cotton";
  if (c.includes("polo"))   return "High-grade cotton piqué — 95% Cotton, 5% Elastane";
  if (c.includes("pant") || c.includes("pants")) return "Stretch lycra blend — 70% Polyester, 25% Rayon, 5% Lycra";
  if (c.includes("hoodie")) return "Premium fleece cotton blend — 80% Cotton, 20% Polyester";
  if (c.includes("sweatshirt") || c.includes("turtle")) return "Premium cotton fleece — 85% Cotton, 15% Polyester";
  return "Premium fabric blend — see label for full composition";
}

function getCare(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("denim") || c.includes("shorts"))
    return "Machine wash cold, inside out. Tumble dry low. Do not bleach. Do not iron on print.";
  if (c.includes("shirt"))
    return "Machine wash cold. Do not bleach. Iron on low heat. Dry in shade.";
  if (c.includes("polo"))
    return "Machine wash cold. Do not bleach. Iron on medium heat. Do not tumble dry.";
  if (c.includes("hoodie") || c.includes("sweatshirt") || c.includes("turtle"))
    return "Machine wash cold. Tumble dry low. Do not iron on graphic. Wash inside out.";
  if (c.includes("pant") || c.includes("pants"))
    return "Machine wash cold. Tumble dry low. Do not bleach. Iron on low heat.";
  return "Machine wash cold. Dry in shade. Iron on low heat.";
}

/* ─────────────────────────── Product Image ─────────────────────────── */
function ProductImage({ src, alt, category, onOpenZoom }: { src: string; alt: string; category: string; onOpenZoom: () => void }) {
  const [hasError, setHasError] = useState(false);
  const initial = category.charAt(0).toUpperCase();

  return (
    <button
      type="button"
      onClick={onOpenZoom}
      aria-label={`Open larger view of ${alt}`}
      className="lo-placeholder"
      style={{ position: "relative", width: "100%", aspectRatio: "3/4", borderRadius: "18px", overflow: "hidden", border: "1px solid #E7E5E4", boxShadow: "0 18px 50px rgba(28,25,23,0.10)", padding: 0, cursor: "zoom-in", background: "none", display: "block" }}
    >
      {/* Placeholder always sits behind */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
        }}
      >
        <div className="lo-serif italic font-light" style={{ fontSize: "96px", color: "#C9BEB3", lineHeight: 1 }}>
          {initial}
        </div>
        <div style={{ width: "32px", height: "1px", backgroundColor: "#C9BEB3" }} />
        <div style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#B5ABA3", textTransform: "uppercase" }}>
          {category}
        </div>
      </div>

      {/* Real image on top — object-contain keeps full outfit visible */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
          style={{ position: "absolute", zIndex: 1 }}
          onError={() => setHasError(true)}
          priority
        />
      )}
      <span
        style={{
          position: "absolute",
          right: "14px",
          bottom: "14px",
          zIndex: 2,
          backgroundColor: "rgba(28,25,23,0.86)",
          color: "#FFFFFF",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "8px 10px",
          borderRadius: "999px",
          pointerEvents: "none",
        }}
      >
        Tap to zoom
      </span>
    </button>
  );
}

/* ─────────────────────────── Not Found ─────────────────────────── */
function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh", backgroundColor: "#FAFAF9",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px 24px", textAlign: "center",
      }}
    >
      <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
        404
      </p>
      <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(32px, 6vw, 56px)", color: "#1C1917", marginBottom: "12px" }}>
        Product Not Found
      </h1>
      <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207", margin: "0 auto 20px" }} />
      <p style={{ fontSize: "15px", color: "#78716C", maxWidth: "360px", lineHeight: "1.75", marginBottom: "36px" }}>
        The product you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/shop"
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          backgroundColor: "#1C1917", color: "#FFFFFF",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.07em",
          padding: "14px 32px", borderRadius: "8px", textDecoration: "none",
        }}
      >
        <IconArrowLeft /> Back to Shop
      </Link>
    </div>
  );
}

/* ─────────────────────────── Detail Row ─────────────────────────── */
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid #E7E5E4" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 0", background: "none", border: "none", cursor: "pointer",
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#1C1917", letterSpacing: "0.04em" }}>{title}</span>
        <span style={{ fontSize: "18px", color: "#A16207", lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ paddingBottom: "16px" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── Main Component ─────────────────────────── */
function ImageZoomModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} larger view`}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "rgba(28,25,23,0.86)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image zoom"
        style={{
          position: "absolute",
          top: "18px",
          right: "18px",
          zIndex: 2,
          border: "1px solid rgba(255,255,255,0.32)",
          backgroundColor: "rgba(255,255,255,0.12)",
          color: "#FFFFFF",
          width: "44px",
          height: "44px",
          borderRadius: "999px",
          cursor: "pointer",
          fontSize: "22px",
          lineHeight: 1,
        }}
      >
        x
      </button>
      <div
        style={{
          position: "relative",
          width: "min(92vw, 820px)",
          height: "min(86vh, 980px)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="92vw"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  const shirtSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const pantSizes = ["28", "30", "32", "34", "36", "38", "40", "42", "44"];

  const tableStyle = { width: "100%", borderCollapse: "collapse" as const, fontSize: "12px", color: "#57534E" };
  const cellStyle = { padding: "10px 8px", borderBottom: "1px solid #F0EFEE" };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(28,25,23,0.58)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(720px, 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E7E5E4",
          boxShadow: "0 24px 80px rgba(28,25,23,0.28)",
          padding: "28px",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>
              Fit Help
            </p>
            <h2 id="size-guide-title" className="lo-serif font-semibold" style={{ fontSize: "30px", color: "#1C1917", lineHeight: 1.1 }}>
              Size Guide
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            style={{ border: "1px solid #D6D3D1", backgroundColor: "#FFFFFF", color: "#1C1917", width: "40px", height: "40px", borderRadius: "8px", cursor: "pointer", fontSize: "20px", lineHeight: 1 }}
          >
            x
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "13px", color: "#1C1917", fontWeight: 700, marginBottom: "10px" }}>
              Shirts / T-Shirts / Polos / Hoodies
            </h3>
            <table style={tableStyle}>
              <tbody>
                {shirtSizes.map((size) => (
                  <tr key={size}>
                    <td style={{ ...cellStyle, color: "#1C1917", fontWeight: 700 }}>{size}</td>
                    <td style={cellStyle}>Regular fit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 style={{ fontSize: "13px", color: "#1C1917", fontWeight: 700, marginBottom: "10px" }}>
              Pants / Jeans / Formal Pants
            </h3>
            <table style={tableStyle}>
              <tbody>
                {pantSizes.map((size) => (
                  <tr key={size}>
                    <td style={{ ...cellStyle, color: "#1C1917", fontWeight: 700 }}>{size}</td>
                    <td style={cellStyle}>Waist size</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{ fontSize: "13px", color: "#78716C", lineHeight: "1.7", marginTop: "22px" }}>
          For exact fit confirmation, WhatsApp us before ordering.
        </p>

        <div className="flex flex-col sm:flex-row" style={{ gap: "12px", marginTop: "24px" }}>
          <button
            type="button"
            onClick={onClose}
            className="lo-btn-outline border font-semibold"
            style={{ borderColor: "#1C1917", color: "#1C1917", fontSize: "13px", padding: "13px 24px", borderRadius: "8px", backgroundColor: "#FFFFFF", cursor: "pointer" }}
          >
            Close
          </button>
          <a
            href={SIZE_HELP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lo-btn-primary font-semibold"
            style={{ backgroundColor: "#1C1917", color: "#FFFFFF", fontSize: "13px", padding: "13px 24px", borderRadius: "8px", textDecoration: "none", textAlign: "center" }}
          >
            WhatsApp for Size Help
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailClient({ product }: { product: Product | null }) {
  const [selectedSize,  setSelectedSize]  = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [cartMsg,       setCartMsg]       = useState<"idle" | "no-size" | "no-color" | "added">("idle");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);
  const { addToCart }                     = useCart();

  if (!product) return <NotFound />;

  const saved      = product.price - product.discountPrice;
  const pct        = Math.round((saved / product.price) * 100);
  const waMessage  = encodeURIComponent(
    `Hi Life's Once, I want to buy ${product.name}. Please share availability.`
  );
  const waUrl = `${WHATSAPP_BASE}?text=${waMessage}`;

  const handleCart = () => {
    if (!selectedSize)  { setCartMsg("no-size");  setTimeout(() => setCartMsg("idle"), 2500); return; }
    if (!selectedColor) { setCartMsg("no-color"); setTimeout(() => setCartMsg("idle"), 2500); return; }
    addToCart(
      { id: product.id, name: product.name, slug: product.slug, image: product.image, price: product.price, discountPrice: product.discountPrice },
      selectedSize,
      selectedColor
    );
    setCartMsg("added");
    setTimeout(() => setCartMsg("idle"), 3000);
  };

  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>

      {/* ── Announcement Bar ── */}

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "16px" }}>
        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#A8A29E" }}>
          <Link href="/" style={{ color: "#78716C", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/#new-arrivals" style={{ color: "#78716C", textDecoration: "none" }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: "#1C1917", fontWeight: 500 }}>{product.name}</span>
        </nav>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "56px", alignItems: "start" }}>

          {/* ── Left: Image ── */}
          <div>
            <ProductImage src={product.image} alt={product.name} category={product.category} onOpenZoom={() => setImageZoomOpen(true)} />

            {/* Trust strips below image on desktop */}
            <div
              className="hidden lg:flex items-center justify-center"
              style={{ gap: "24px", marginTop: "24px", padding: "16px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E7E5E4" }}
            >
              {[
                { icon: <IconTruck />,   text: "Store Pickup Available" },
                { icon: <IconShield />,  text: "Genuine Products" },
                { icon: <IconRefresh />, text: "Easy Returns" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "11px", color: "#78716C", fontWeight: 500 }}>
                  <span style={{ color: "#A16207" }}>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Details ── */}
          <div>
            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
              {product.badge && (
                <span
                  style={{
                    backgroundColor: "#1C1917", color: "#FFFFFF",
                    fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em",
                    padding: "4px 10px", borderRadius: "3px", textTransform: "uppercase",
                  }}
                >
                  {product.badge}
                </span>
              )}
              <span
                style={{
                  backgroundColor: "#F5F5F4", color: "#78716C",
                  fontSize: "9px", fontWeight: 500, letterSpacing: "0.08em",
                  padding: "4px 10px", borderRadius: "3px", textTransform: "uppercase",
                }}
              >
                {product.collection}
              </span>
            </div>

            {/* Category */}
            <p style={{ fontSize: "11px", fontWeight: 600, color: "#A16207", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
              {product.category}
            </p>

            {/* Name */}
            <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1917", lineHeight: "1.2", marginBottom: "16px" }}>
              {product.name}
            </h1>

            {/* Gold divider */}
            <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207", marginBottom: "20px" }} />

            {/* Price */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "28px", fontWeight: 700, color: "#1C1917" }}>
                  ₹{product.discountPrice.toLocaleString("en-IN")}
                </span>
                <span style={{ fontSize: "16px", textDecoration: "line-through", color: "#A8A29E" }}>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span
                  style={{
                    backgroundColor: "#FEF3C7", color: "#92400E",
                    fontSize: "12px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px",
                  }}
                >
                  {pct}% off
                </span>
              </div>
              <p style={{ fontSize: "12px", color: "#92400E", fontWeight: 500, marginTop: "4px" }}>
                You save ₹{saved.toLocaleString("en-IN")}
              </p>
            </div>

            {/* Description */}
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8", marginBottom: "24px" }}>
              {product.description}
            </p>

            <div className="grid grid-cols-2" style={{ gap: "10px", marginBottom: "24px" }}>
              {["Premium fit", "Store pickup available", "WhatsApp order support", "Easy exchange"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "10px", padding: "11px 12px" }}>
                  <span style={{ color: "#A16207", display: "flex", flexShrink: 0 }}><IconCheck /></span>
                  <span style={{ fontSize: "12px", color: "#57534E", fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* ── Size Selector ── */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#1C1917", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Size {selectedSize && <span style={{ color: "#A16207" }}>— {selectedSize}</span>}
                </p>
                <button
                  type="button"
                  onClick={() => setSizeGuideOpen(true)}
                  style={{ fontSize: "11px", color: "#A16207", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
                >
                  Size Guide
                </button>
              </div>
              <a href={SIZE_HELP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", color: "#15803D", fontSize: "12px", fontWeight: 600, marginBottom: "10px", textDecoration: "none" }}>
                Need size help? WhatsApp us
              </a>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.sizes.map((s) => {
                  const active = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "1.5px solid",
                        borderColor: active ? "#1C1917" : "#D6D3D1",
                        backgroundColor: active ? "#1C1917" : "#FFFFFF",
                        color: active ? "#FFFFFF" : "#44403C",
                        transition: "all 0.15s ease",
                        minWidth: "44px",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Color Selector ── */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#1C1917", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
                Color {selectedColor && <span style={{ color: "#A16207" }}>— {selectedColor}</span>}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {product.colors.map((c) => {
                  const active = selectedColor === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 500,
                        cursor: "pointer",
                        border: "1.5px solid",
                        borderColor: active ? "#1C1917" : "#D6D3D1",
                        backgroundColor: active ? "#1C1917" : "#FFFFFF",
                        color: active ? "#FFFFFF" : "#57534E",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stock */}
            <div
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 14px", borderRadius: "8px",
                backgroundColor: product.stock <= 5 ? "#FEF3C7" : "#F0FDF4",
                marginBottom: "24px",
              }}
            >
              <span style={{ color: product.stock <= 5 ? "#92400E" : "#15803D", display: "flex" }}>
                <IconCheck />
              </span>
              <span
                style={{
                  fontSize: "12px", fontWeight: 600,
                  color: product.stock <= 5 ? "#92400E" : "#15803D",
                }}
              >
                {product.stock <= 5 ? `Only ${product.stock} left in stock — order soon` : `In Stock — ${product.stock} units available`}
              </span>
            </div>

            {/* ── Action Buttons ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>

              {/* Validation messages */}
              {(cartMsg === "no-size" || cartMsg === "no-color") && (
                <p style={{ fontSize: "12px", color: "#DC2626", fontWeight: 500, marginBottom: "-4px" }}>
                  {cartMsg === "no-size" ? "Please select a size" : "Please select a color"}
                </p>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleCart}
                disabled={cartMsg === "added"}
                className="lo-btn-primary"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  cursor: cartMsg === "added" ? "default" : "pointer",
                  border: "none",
                  backgroundColor: cartMsg === "added" ? "#15803D" : "#1C1917",
                  color: "#FFFFFF",
                  transition: "background-color 0.2s ease",
                  width: "100%",
                }}
              >
                {cartMsg === "added" ? <IconCheck /> : <IconCart />}
                {cartMsg === "added" ? "Added to Cart!" : "Add to Cart"}
              </button>

              {/* WhatsApp Buy */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  padding: "16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  backgroundColor: "#25D366",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  border: "none",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <IconWhatsApp /> Buy on WhatsApp
              </a>

              {/* Back to Shop */}
              <Link
                href="/shop"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "14px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  border: "1.5px solid #D6D3D1",
                  color: "#44403C",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1C1917")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D6D3D1")}
              >
                <IconArrowLeft /> Back to Shop
              </Link>
            </div>

            {/* Trust strips — mobile */}
            <div
              className="lg:hidden flex items-center justify-center"
              style={{ gap: "20px", padding: "14px", backgroundColor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E7E5E4", flexWrap: "wrap" }}
            >
              {[
                { icon: <IconTruck />,   text: "Store Pickup" },
                { icon: <IconShield />,  text: "Genuine" },
                { icon: <IconRefresh />, text: "Easy Returns" },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#78716C", fontWeight: 500 }}>
                  <span style={{ color: "#A16207" }}>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Product Details Accordion ── */}
        <div
          style={{
            marginTop: "64px",
            padding: "32px",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E7E5E4",
            maxWidth: "760px",
          }}
        >
          <h2 className="lo-serif font-semibold" style={{ fontSize: "22px", color: "#1C1917", marginBottom: "4px" }}>
            Product Details
          </h2>
          <div style={{ width: "32px", height: "1px", backgroundColor: "#A16207", marginBottom: "20px" }} />

          <DetailSection title="Description">
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>{product.description}</p>
            <ul style={{ marginTop: "12px", paddingLeft: "18px", fontSize: "13px", color: "#78716C", lineHeight: "1.9" }}>
              <li>Category: {product.category}</li>
              <li>Collection: {product.collection}</li>
              <li>Available in {product.colors.length} colors</li>
              <li>Sizes: {product.sizes.join(", ")}</li>
            </ul>
          </DetailSection>

          <DetailSection title="Product Highlights">
            <div style={{ display: "grid", gap: "10px" }}>
              {[
                "Premium fit for everyday styling",
                "Store pickup available from Kodambakkam",
                "WhatsApp order support before checkout",
                "Easy exchange support for size issues",
              ].map((point) => (
                <div key={point} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "#A16207", marginTop: "2px" }}><IconCheck /></span>
                  <span style={{ fontSize: "13px", color: "#57534E", lineHeight: "1.7" }}>{point}</span>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Material &amp; Fabric">
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>{product.fabric}</p>
            <p style={{ fontSize: "13px", color: "#78716C", marginTop: "8px", lineHeight: "1.8" }}>
              Fit: {product.fit}. Sleeve: {product.sleeve}. Occasion: {product.occasion}.
            </p>
          </DetailSection>

          <DetailSection title="Size &amp; Fit">
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>
              Available sizes: {product.availableSizes.join(", ")}. {product.modelInfo}
            </p>
            <a href={SIZE_HELP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", marginTop: "12px", color: "#15803D", fontSize: "13px", fontWeight: 700, textDecoration: "none" }}>
              Need Size Help? WhatsApp Us
            </a>
          </DetailSection>

          <DetailSection title="Wash Care">
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>{product.careInstructions}</p>
            <p style={{ fontSize: "13px", color: "#78716C", marginTop: "8px" }}>
              Made in {product.madeIn}. Proper care extends the life of your garment.
            </p>
          </DetailSection>

          <DetailSection title="Delivery &amp; Store Pickup">
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>
              Store pickup is available from Life&apos;s Once, Kodambakkam. Delivery timing and final availability are confirmed on WhatsApp before order completion.
            </p>
          </DetailSection>

          <DetailSection title="Exchange Support">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "Easy 7-day return or exchange from date of purchase.",
                "Item must be unworn, unwashed and in original condition.",
                "Visit our store or WhatsApp us to initiate a return.",
                "COD orders: Exchange available at store. Refund via bank transfer.",
              ].map((point) => (
                <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <span style={{ color: "#A16207", marginTop: "2px", flexShrink: 0 }}><IconCheck /></span>
                  <span style={{ fontSize: "13px", color: "#57534E", lineHeight: "1.7" }}>{point}</span>
                </div>
              ))}
            </div>
          </DetailSection>
        </div>
      </main>

      {/* ── Footer strip ── */}
      <Footer />
      {imageZoomOpen && <ImageZoomModal src={product.image} alt={product.name} onClose={() => setImageZoomOpen(false)} />}
      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
    </div>
  );
}
