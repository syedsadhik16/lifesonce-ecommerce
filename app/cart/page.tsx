"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

/* ── Icons ── */
const IconMinus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);
const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconBag = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const WHATSAPP_URL = "https://wa.me/919384007074";
const RAZORPAY_KEY_ID = "rzp_test_SXLFLibCfQ0Xui";

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
    reason?: string;
  };
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  prefill: {
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
  modal: {
    ondismiss: () => void;
  };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
      on: (event: "payment.failed", callback: (response: RazorpayFailureResponse) => void) => void;
    };
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    let settled = false;
    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      resolve(loaded);
    };

    const existingScript = document.getElementById("razorpay-checkout-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => finish(Boolean(window.Razorpay)), { once: true });
      existingScript.addEventListener("error", () => finish(false), { once: true });
      window.setTimeout(() => finish(Boolean(window.Razorpay)), 3000);
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => finish(Boolean(window.Razorpay));
    script.onerror = () => finish(false);
    document.body.appendChild(script);
  });
}
/* ── Cart Item Row ── */
function CartRow({ item }: { item: CartItem }) {
  const { removeFromCart, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        padding: "24px 0",
        borderBottom: "1px solid #F0EFEE",
        alignItems: "flex-start",
      }}
    >
      {/* Thumbnail */}
      <div
        className="lo-placeholder"
        style={{
          width: "88px",
          height: "112px",
          flexShrink: 0,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {!imgError && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="88px"
            className="object-contain"
            style={{ position: "absolute", zIndex: 1 }}
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span className="lo-serif italic" style={{ fontSize: "32px", color: "#C9BEB3" }}>
              {item.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          className="lo-serif font-semibold"
          style={{ fontSize: "16px", color: "#1C1917", marginBottom: "4px", lineHeight: "1.3" }}
        >
          {item.name}
        </h3>
        <p style={{ fontSize: "12px", color: "#78716C", marginBottom: "10px" }}>
          Size: <strong>{item.selectedSize}</strong> &nbsp;&middot;&nbsp; Color: <strong>{item.selectedColor}</strong>
        </p>
        <p style={{ fontSize: "14px", fontWeight: 700, color: "#1C1917", marginBottom: "14px" }}>
          ₹{item.discountPrice.toLocaleString("en-IN")}
          <span style={{ fontSize: "11px", fontWeight: 400, color: "#A8A29E", marginLeft: "6px" }}>each</span>
        </p>

        {/* Qty controls */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
            aria-label="Decrease quantity"
            style={{
              width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid #D6D3D1", borderRadius: "6px 0 0 6px",
              backgroundColor: "#FFFFFF", color: "#1C1917", cursor: "pointer",
            }}
          >
            <IconMinus />
          </button>
          <div
            style={{
              width: "40px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid #D6D3D1", borderLeft: "none", borderRight: "none",
              fontSize: "13px", fontWeight: 600, color: "#1C1917",
              backgroundColor: "#FAFAF9",
            }}
          >
            {item.quantity}
          </div>
          <button
            onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
            aria-label="Increase quantity"
            style={{
              width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1.5px solid #D6D3D1", borderRadius: "0 6px 6px 0",
              backgroundColor: "#FFFFFF", color: "#1C1917", cursor: "pointer",
            }}
          >
            <IconPlus />
          </button>
        </div>
      </div>

      {/* Right: line total + remove */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", flexShrink: 0 }}>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#1C1917" }}>
          ₹{(item.discountPrice * item.quantity).toLocaleString("en-IN")}
        </p>
        <button
          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
          aria-label={`Remove ${item.name}`}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            fontSize: "11px", color: "#A8A29E", fontWeight: 500,
            background: "none", border: "none", cursor: "pointer",
            padding: "4px 0",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#A8A29E")}
        >
          <IconTrash /> Remove
        </button>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyCart() {
  return (
    <div
      style={{
        minHeight: "55vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "64px 24px", textAlign: "center",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E7E5E4",
        borderRadius: "18px",
        boxShadow: "0 14px 44px rgba(28,25,23,0.07)",
      }}
    >
      <div style={{ color: "#D6D3D1", marginBottom: "28px" }}><IconBag /></div>
      <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: "#1C1917", marginBottom: "10px" }}>
        Your Cart is Empty
      </h2>
      <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207", margin: "0 auto 16px" }} />
      <p style={{ fontSize: "14px", color: "#78716C", maxWidth: "320px", lineHeight: "1.75", marginBottom: "36px" }}>
        You haven&apos;t added anything yet. Browse the latest Life&apos;s Once collection and add your preferred size and color.
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
        Continue Shopping
      </Link>
    </div>
  );
}

/* ── Page ── */
export default function CartPage() {
  const { items, cartTotal, cartCount, clearCart } = useCart();
  const [isPayingOnline, setIsPayingOnline] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const buildWaMessage = () => {
    const lines = items.map(
      (item, i) =>
        `${i + 1}. ${item.name}\nSize: ${item.selectedSize}\nColor: ${item.selectedColor}\nQty: ${item.quantity}\nPrice: ₹${(item.discountPrice * item.quantity).toLocaleString("en-IN")}`
    );
    return encodeURIComponent(
      `Hi Life's Once, I want to place this order:\n\n${lines.join("\n\n")}\n\nTotal: ₹${cartTotal.toLocaleString("en-IN")}\n\nPlease confirm availability.`
    );
  };

  const handleRazorpayCheckout = async () => {
    if (items.length === 0 || cartTotal <= 0) return;

    setIsPayingOnline(true);
    setPaymentMessage(null);

    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      setIsPayingOnline(false);
      setPaymentMessage({
        type: "error",
        text: "Razorpay could not load. You can try again or place order through WhatsApp.",
      });
      return;
    }

    let completed = false;

    // This frontend-only Razorpay test checkout is for demo.
    // For production, create Razorpay order from server/API route using RAZORPAY_KEY_SECRET and verify payment signature on server.
    const razorpay = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: Math.round(cartTotal * 100),
      currency: "INR",
      name: "Life's Once",
      description: "Clothing order payment",
      prefill: {
        contact: "9384007074",
      },
      theme: {
        color: "#1C1917",
      },
      handler: () => {
        completed = true;
        setIsPayingOnline(false);
        setPaymentMessage({
          type: "success",
          text: "Payment successful. Please send order details on WhatsApp for confirmation.",
        });
      },
      modal: {
        ondismiss: () => {
          if (!completed) {
            setIsPayingOnline(false);
            setPaymentMessage({
              type: "error",
              text: "Payment was not completed. You can try again or place order through WhatsApp.",
            });
          }
        },
      },
    });

    razorpay.on("payment.failed", (response) => {
      completed = true;
      setIsPayingOnline(false);
      setPaymentMessage({
        type: "error",
        text: response.error?.description || "Payment was not completed. You can try again or place order through WhatsApp.",
      });
    });

    razorpay.open();
    setIsPayingOnline(false);
  };

  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>

      {/* ── Announcement Bar ── */}

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "16px" }}>
        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#A8A29E" }}>
          <Link href="/" style={{ color: "#78716C", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "#1C1917", fontWeight: 500 }}>Cart</span>
        </nav>
      </div>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: "32px", paddingBottom: "80px" }}>

        {/* Page title */}
        <div style={{ marginBottom: "32px" }}>
          <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1C1917", marginBottom: "6px" }}>
            Shopping Cart
          </h1>
          <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207" }} />
          {cartCount > 0 && (
            <p style={{ fontSize: "13px", color: "#78716C", marginTop: "8px" }}>
              {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: "32px", alignItems: "start" }}>

            {/* ── Items (2 / 3) ── */}
            <div className="lg:col-span-2">
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E7E5E4",
                  padding: "0 24px",
                }}
              >
                {items.map((item) => (
                  <CartRow
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Bottom controls */}
              <div
                className="flex items-center justify-between flex-wrap"
                style={{ marginTop: "16px", gap: "12px" }}
              >
                <Link
                  href="/shop"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontSize: "13px", fontWeight: 600, color: "#78716C",
                    textDecoration: "none", transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1C1917")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#78716C")}
                >
                  <IconArrowLeft /> Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  style={{
                    fontSize: "12px", color: "#A8A29E", fontWeight: 500,
                    background: "none", border: "none", cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* ── Order Summary (1 / 3) ── */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #E7E5E4",
                padding: "28px 24px",
                position: "sticky",
                top: "96px",
              }}
            >
              <h2 className="lo-serif font-semibold" style={{ fontSize: "22px", color: "#1C1917", marginBottom: "4px" }}>
                Order Summary
              </h2>
              <div style={{ width: "32px", height: "1px", backgroundColor: "#A16207", marginBottom: "20px" }} />

              {/* Line items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}
                  >
                    <span style={{ fontSize: "12px", color: "#78716C", lineHeight: "1.5", flex: 1 }}>
                      {item.name} &times; {item.quantity}
                      <br />
                      <span style={{ color: "#A8A29E" }}>{item.selectedSize} / {item.selectedColor}</span>
                    </span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1C1917", flexShrink: 0 }}>
                      ₹{(item.discountPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ height: "1px", backgroundColor: "#E7E5E4", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#78716C" }}>Subtotal</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#1C1917" }}>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "12px", color: "#A8A29E" }}>Shipping</span>
                <span style={{ fontSize: "12px", color: "#15803D", fontWeight: 500 }}>Store Pickup</span>
              </div>

              <div style={{ height: "1px", backgroundColor: "#E7E5E4", margin: "16px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                <span style={{ fontSize: "15px", fontWeight: 700, color: "#1C1917" }}>Total</span>
                <span style={{ fontSize: "20px", fontWeight: 700, color: "#1C1917" }}>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Razorpay test checkout */}
              <button
                type="button"
                onClick={handleRazorpayCheckout}
                disabled={items.length === 0 || isPayingOnline}
                style={{
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  backgroundColor: items.length === 0 || isPayingOnline ? "#A8A29E" : "#1C1917",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: items.length === 0 || isPayingOnline ? "not-allowed" : "pointer",
                  marginBottom: "12px",
                }}
              >
                {isPayingOnline ? "Opening Razorpay..." : "Pay Online with Razorpay"}
              </button>

              {paymentMessage && (
                <div
                  style={{
                    border: `1px solid ${paymentMessage.type === "success" ? "#86EFAC" : "#FECACA"}`,
                    backgroundColor: paymentMessage.type === "success" ? "#F0FDF4" : "#FEF2F2",
                    color: paymentMessage.type === "success" ? "#166534" : "#991B1B",
                    borderRadius: "10px",
                    padding: "12px",
                    marginBottom: "12px",
                    fontSize: "12px",
                    lineHeight: "1.6",
                  }}
                >
                  <p style={{ marginBottom: paymentMessage.type === "success" ? "10px" : 0 }}>
                    {paymentMessage.text}
                  </p>
                  {paymentMessage.type === "success" && (
                    <a
                      href={`${WHATSAPP_URL}?text=${buildWaMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#166534", fontWeight: 700, textDecoration: "underline" }}
                    >
                      Send order details on WhatsApp
                    </a>
                  )}
                </div>
              )}

              {/* WhatsApp Checkout */}
              <a
                href={`${WHATSAPP_URL}?text=${buildWaMessage()}`}
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
                  marginBottom: "12px",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <IconWhatsApp /> Checkout on WhatsApp
              </a>

              {/* Continue Shopping */}
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
                <IconArrowLeft /> Continue Shopping
              </Link>

              <p style={{ fontSize: "11px", color: "#A8A29E", textAlign: "center", marginTop: "16px", lineHeight: "1.6" }}>
                Final availability and delivery will be confirmed on WhatsApp.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
