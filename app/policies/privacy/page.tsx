import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Life's Once Chennai",
  description: "Privacy policy for Life's Once WhatsApp ordering, store pickup and customer support.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>
        We collect only the details needed to confirm your order, respond on WhatsApp, and support store pickup or delivery.
      </p>
      <p>
        Customer contact and order details are used by Life&apos;s Once for service communication only. We do not sell customer information.
      </p>
      <p>
        COD and store pickup are available. Shipping charges and delivery time can be confirmed on WhatsApp for now.
      </p>
    </PolicyPage>
  );
}
