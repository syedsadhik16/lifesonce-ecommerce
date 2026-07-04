import type { Metadata } from "next";
import SizeGuidePage from "@/components/SizeGuidePage";

export const metadata: Metadata = {
  title: "Size Guide | Life's Once Chennai",
  description: "Find Life's Once size guidance for shirts, pants and T-shirts. Message us on WhatsApp for exact fit support.",
};

export default function Page() {
  return <SizeGuidePage title="Life's Once Size Guide" description="Use this guide for quick sizing across our core product categories." rows={["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"]} />;
}
