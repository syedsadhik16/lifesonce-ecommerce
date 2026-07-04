import Link from "next/link";
import Footer from "@/components/Footer";

type PolicyPageProps = {
  title: string;
  children: React.ReactNode;
};

export default function PolicyPage({ title, children }: PolicyPageProps) {
  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "72px 0 88px" }}>
        <Link href="/" style={{ color: "#78716C", fontSize: "13px", textDecoration: "none" }}>
          Back to Home
        </Link>
        <div style={{ marginTop: "28px", marginBottom: "32px" }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
            Life&apos;s Once
          </p>
          <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#1C1917", marginBottom: "14px" }}>
            {title}
          </h1>
          <div style={{ width: "44px", height: "1px", backgroundColor: "#A16207" }} />
        </div>

        <section style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "16px", padding: "32px", fontSize: "14px", color: "#57534E", lineHeight: "1.85" }}>
          {children}
          <div style={{ height: "1px", backgroundColor: "#E7E5E4", margin: "28px 0" }} />
          <p>
            <strong style={{ color: "#1C1917" }}>Contact:</strong> 093840 07074
          </p>
          <p>
            <strong style={{ color: "#1C1917" }}>Address:</strong> 25/A, Karnan St, Rangarajapuram, Kodambakkam, Chennai, Tamil Nadu 600024
          </p>
          <p>
            <strong style={{ color: "#1C1917" }}>Store Hours:</strong> 9:30 AM - 11:00 PM
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
