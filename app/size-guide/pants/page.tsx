import type { Metadata } from "next";
import SizeGuidePage from "@/components/SizeGuidePage";

export const metadata: Metadata = {
  title: "Pant Size Guide | Life's Once Chennai",
  description: "Life's Once pant and trouser size guide.",
};

export default function Page() {
  return <SizeGuidePage title="Pant Size Guide" description="Recommended waist sizes for pants, trousers and denim." rows={["30", "32", "34", "36", "38"]} />;
}
