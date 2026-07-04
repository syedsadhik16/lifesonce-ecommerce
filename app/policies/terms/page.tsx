import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Terms of Service | Life's Once Chennai",
  description: "Terms of service for Life's Once WhatsApp-based ecommerce orders.",
};

export default function TermsOfServicePage() {
  return (
    <PolicyPage title="Terms of Service">
      <p>
        Product availability, pricing, COD eligibility, shipping charges, and delivery timing are confirmed before order completion.
      </p>
      <p>
        Store pickup is available. A 7-day exchange for size issue is available only if the product is unused and has its original tag.
      </p>
      <p>
        No return or exchange is available for damaged, used, washed, altered, or tag-removed products.
      </p>
    </PolicyPage>
  );
}
