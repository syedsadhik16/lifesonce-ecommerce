import type { Metadata } from "next";
import Footer from "@/components/Footer";

const MAPS_URL = "https://share.google/czE1UOZfj9dD8fpOR";
const WHATSAPP_URL = "https://wa.me/919384007074";

export const metadata: Metadata = {
  title: "Our Store | Life's Once Kodambakkam Chennai",
  description: "Visit Life's Once at Kodambakkam Chennai for premium men's fashion, store pickup and WhatsApp ordering support.",
};

export default function OurStorePage() {
  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "72px 0 88px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>Store Visit</p>
        <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(34px, 6vw, 58px)", marginBottom: "16px" }}>Life&apos;s Once</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: "28px", alignItems: "stretch" }}>
          <section style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "16px", padding: "30px" }}>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "28px", marginBottom: "14px" }}>Visit the store</h2>
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.9" }}>
              25/A, Karnan St, Rangarajapuram, Kodambakkam, Chennai, Greater Chennai, Tamil Nadu 600024
            </p>
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.9", marginTop: "14px" }}>Phone: 093840 07074</p>
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.9" }}>Hours: 9:30 AM - 11:00 PM</p>
            <div className="flex flex-wrap" style={{ gap: "12px", marginTop: "26px" }}>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", padding: "13px 22px", borderRadius: "8px", textDecoration: "none", fontSize: "13px" }}>Open Google Maps</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="lo-btn-outline inline-flex font-semibold border" style={{ borderColor: "#1C1917", color: "#1C1917", padding: "13px 22px", borderRadius: "8px", textDecoration: "none", fontSize: "13px" }}>Chat on WhatsApp</a>
              <a href="tel:+919384007074" className="lo-btn-outline inline-flex font-semibold border" style={{ borderColor: "#1C1917", color: "#1C1917", padding: "13px 22px", borderRadius: "8px", textDecoration: "none", fontSize: "13px" }}>Call Store</a>
            </div>
          </section>
          <section className="lo-placeholder" style={{ borderRadius: "16px", padding: "30px", border: "1px solid #E7E5E4", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p className="lo-serif italic" style={{ fontSize: "34px", color: "#1C1917", lineHeight: 1.2 }}>Try fits in store, confirm stock on WhatsApp, and pick up your order with confidence.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
