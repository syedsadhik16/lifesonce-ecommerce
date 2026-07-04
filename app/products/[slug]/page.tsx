import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

const productSlugAliases: Record<string, string> = {
  "premium-sky-blue-shirt-set": "premium-sky-blue-shirt",
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = productSlugAliases[slug] ?? slug;
  const product = products.find((p) => p.slug === resolvedSlug) ?? null;
  return <ProductDetailClient product={product} />;
}

/* Let Next.js know all valid slugs at build time */
export function generateStaticParams() {
  return [
    ...products.map((p) => ({ slug: p.slug })),
    ...Object.keys(productSlugAliases).map((slug) => ({ slug })),
  ];
}
