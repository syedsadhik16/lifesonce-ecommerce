import type { Metadata } from "next";
import SizeGuidePage from "@/components/SizeGuidePage";

export const metadata: Metadata = {
  title: "Shirt Size Guide | Life's Once Chennai",
  description: "Life's Once shirt size guide for men's premium shirts.",
};

export default function Page() {
  return <SizeGuidePage title="Shirt Size Guide" description="Recommended shirt sizes for Life's Once premium shirts." rows={["S", "M", "L", "XL", "XXL"]} />;
}
