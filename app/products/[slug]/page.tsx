import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

const productSlugAliases: Record<string, string> = {
  "premium-sky-blue-shirt-set": "premium-sky-blue-shirt",
};

function getProduct(slug: string) {
  const resolvedSlug = productSlugAliases[slug] ?? slug;
  return products.find((p) => p.slug === resolvedSlug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product?.seoTitle ?? "Product | Life's Once Chennai",
    description: product?.seoDescription ?? "Shop Life's Once men's fashion products through WhatsApp or visit our Chennai store.",
    openGraph: {
      title: product?.seoTitle ?? "Product | Life's Once Chennai",
      description: product?.seoDescription ?? "Shop Life's Once men's fashion products through WhatsApp or visit our Chennai store.",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  return <ProductDetailClient product={product} />;
}

/* Let Next.js know all valid slugs at build time */
export function generateStaticParams() {
  return [
    ...products.map((p) => ({ slug: p.slug })),
    ...Object.keys(productSlugAliases).map((slug) => ({ slug })),
  ];
}
