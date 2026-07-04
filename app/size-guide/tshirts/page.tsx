import type { Metadata } from "next";
import SizeGuidePage from "@/components/SizeGuidePage";

export const metadata: Metadata = {
  title: "T-Shirt Size Guide | Life's Once Chennai",
  description: "Life's Once T-shirt and polo size guide.",
};

export default function Page() {
  return <SizeGuidePage title="T-Shirt Size Guide" description="Recommended sizes for T-shirts, polos and relaxed casual tops." rows={["S", "M", "L", "XL", "XXL"]} />;
}
