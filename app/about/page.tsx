import type { Metadata } from "next";
import { CTAButtons, PageShell } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About Life's Once | Men's Fashion Store Chennai",
  description: "Learn about Life's Once, a men's fashion store in Kodambakkam Chennai focused on comfort, clean styling and WhatsApp ordering.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Life's Once"
      description="Life's Once is a men's fashion store based in Kodambakkam, Chennai, offering premium everyday wear including shirts, polos, trousers, jeans and casual outfits."
    >
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "18px" }}>
        {[
          ["Brand story", "We focus on clean styling, comfort, and simple outfit choices that work for daily wear, office wear, and weekends."],
          ["What we sell", "Premium shirts, polos, trousers, jeans, drop shoulder T-shirts, and coordinated casual looks."],
          ["Why customers choose us", "Easy WhatsApp support, practical sizing help, store pickup, COD availability, and straightforward exchange guidance."],
          ["Store support", "Visit the Kodambakkam store or message us on WhatsApp before ordering to confirm size, color, and latest availability."],
        ].map(([title, text]) => (
          <section key={title} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "14px", padding: "24px" }}>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "24px", color: "#1C1917", marginBottom: "8px" }}>{title}</h2>
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>{text}</p>
          </section>
        ))}
      </div>
      <CTAButtons />
    </PageShell>
  );
}
