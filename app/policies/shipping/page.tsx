import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Shipping Policy | Life's Once Chennai",
  description: "Shipping, delivery and store pickup policy for Life's Once Chennai.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy">
      <p>
        Store pickup is available from our Kodambakkam store during business hours. COD is available for eligible orders.
      </p>
      <p>
        Shipping charges and delivery time can be confirmed on WhatsApp for now, based on product availability and delivery location.
      </p>
      <p>
        Please share your product, size, color, and address details on WhatsApp for the fastest confirmation.
      </p>
    </PolicyPage>
  );
}
