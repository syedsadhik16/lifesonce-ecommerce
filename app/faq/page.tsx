import type { Metadata } from "next";
import { PageShell } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "FAQ | Life's Once Chennai",
  description: "Frequently asked questions about ordering, COD, WhatsApp checkout, store pickup, sizing and exchange support at Life's Once Chennai.",
};

const faqs = [
  ["How do I place an order?", "Open a product, choose size and color, add it to cart, then checkout through WhatsApp."],
  ["Is Cash on Delivery available?", "COD is available for eligible orders. Final confirmation happens on WhatsApp."],
  ["Can I order through WhatsApp?", "Yes. WhatsApp ordering is the active checkout flow for this demo."],
  ["Can I visit the store?", "Yes. Store pickup and in-store support are available at our Kodambakkam location."],
  ["How do I choose the correct size?", "Use the size guide or message us on WhatsApp for exact fit support."],
  ["Can I exchange a product?", "A 7-day exchange for size issues is available if the item is unused and has its original tag."],
  ["How long does delivery take?", "Delivery timing depends on location and product availability, and is confirmed on WhatsApp."],
  ["Do you have all products available online?", "Not always. Final product availability is confirmed on WhatsApp before order completion."],
];

export default function FAQPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Frequently Asked Questions"
      description="Straight answers about Life's Once ordering, sizing, pickup and WhatsApp checkout."
    >
      <div style={{ display: "grid", gap: "14px" }}>
        {faqs.map(([question, answer]) => (
          <section key={question} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "14px", padding: "22px" }}>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "22px", color: "#1C1917", marginBottom: "6px" }}>{question}</h2>
            <p style={{ fontSize: "14px", color: "#57534E", lineHeight: "1.8" }}>{answer}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
