import Link from "next/link";
import Footer from "@/components/Footer";

const WHATSAPP_URL = "https://wa.me/919384007074";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "72px 0 88px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
          {eyebrow}
        </p>
        <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(34px, 6vw, 58px)", color: "#1C1917", lineHeight: 1.05, marginBottom: "14px" }}>
          {title}
        </h1>
        <div style={{ width: "44px", height: "1px", backgroundColor: "#A16207", marginBottom: "22px" }} />
        <p style={{ fontSize: "15px", color: "#57534E", lineHeight: "1.8", maxWidth: "680px", marginBottom: "36px" }}>
          {description}
        </p>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function CTAButtons() {
  return (
    <div className="flex flex-wrap" style={{ gap: "12px", marginTop: "28px" }}>
      <Link href="/shop" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", fontSize: "13px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}>
        Shop Now
      </Link>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="lo-btn-outline inline-flex font-semibold border" style={{ borderColor: "#1C1917", color: "#1C1917", fontSize: "13px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}>
        Chat on WhatsApp
      </a>
    </div>
  );
}
