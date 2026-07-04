import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Life's Once Chennai",
  description: "Return and exchange policy for Life's Once products, including size issue exchange support.",
};

export default function ReturnsPolicyPage() {
  return (
    <PolicyPage title="Return & Exchange Policy">
      <p>
        We offer a 7-day exchange for size issues only when the item is unused, unwashed, and returned with its original tag.
      </p>
      <p>
        Damaged, used, washed, altered, or tag-removed products are not eligible for return or exchange.
      </p>
      <p>
        COD and store pickup are available. Please WhatsApp us before visiting for exchange confirmation.
      </p>
    </PolicyPage>
  );
}
