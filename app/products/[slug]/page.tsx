import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug) ?? null;
  return <ProductDetailClient product={product} />;
}

/* Let Next.js know all valid slugs at build time */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
