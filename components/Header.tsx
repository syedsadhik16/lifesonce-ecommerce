"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const announcement = "New arrivals live now  ·  Store pickup available  ·  COD available  ·  WhatsApp support available  ·  ";

const navLinks = [
  { label: "New Arrivals", href: "/#new-arrivals" },
  { label: "All Products", href: "/shop" },
  { label: "Polo T-Shirts", href: "/collections/polo-tshirts-jeans" },
  { label: "Formal Pants", href: "/collections/formal-pants" },
  { label: "Shirts + Jeans", href: "/collections/shirt-jeans" },
  { label: "Drop Shoulder", href: "/collections/drop-shoulder-tshirts-jeans" },
  { label: "Contact", href: "/#contact" },
];

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconClose = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <>
      <div className="w-full overflow-hidden py-2.5" style={{ backgroundColor: "#1C1917" }}>
        <div className="lo-marquee-track">
          {[announcement, announcement, announcement].map((text, index) => (
            <span key={index} className="inline-block px-6 text-white" style={{ fontSize: "11px", letterSpacing: "0.11em", textTransform: "uppercase" }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: "#FFFFFF", borderColor: "#E7E5E4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: "72px" }}>
            <Link href="/" aria-label="Life's Once - Home" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div className="relative" style={{ height: "52px", width: "148px" }}>
                <Image src="/logo.png" alt="Life's Once" fill sizes="148px" className="object-contain" style={{ objectPosition: "left center" }} priority />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center" style={{ gap: "24px" }} aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="lo-nav-link" style={{ fontSize: "13px", fontWeight: 500, color: "#1C1917", letterSpacing: "0.04em", textDecoration: "none" }}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link
                href="/cart"
                className="lo-btn-primary flex items-center gap-2 font-semibold"
                style={{
                  backgroundColor: "#1C1917",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  padding: "9px 18px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  position: "relative",
                }}
                aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              >
                <IconCart />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      backgroundColor: "#A16207",
                      color: "#FFFFFF",
                      borderRadius: "999px",
                      fontSize: "10px",
                      fontWeight: 700,
                      minWidth: "18px",
                      height: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                className="lg:hidden flex items-center justify-center border cursor-pointer"
                style={{ borderColor: "#D6D3D1", color: "#1C1917", width: "44px", height: "44px", borderRadius: "8px", backgroundColor: "#FFFFFF" }}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <IconClose /> : <IconMenu />}
              </button>
            </div>
          </div>
        </div>

        <div
          className="lo-mobile-menu lg:hidden border-t"
          style={{
            maxHeight: menuOpen ? "520px" : "0",
            opacity: menuOpen ? 1 : 0,
            borderColor: "#E7E5E4",
            backgroundColor: "#FFFFFF",
          }}
        >
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b py-3.5"
                style={{ fontSize: "14px", fontWeight: 500, color: "#1C1917", borderColor: "#F5F5F4", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
