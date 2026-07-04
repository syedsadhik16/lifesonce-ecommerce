import type { MetadataRoute } from "next";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

const baseUrl = "https://lifesonce-ecommerce-tagt-owoe0o6fr-syedsadhik16s-projects.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/cart",
    "/about",
    "/our-store",
    "/faq",
    "/size-guide",
    "/size-guide/shirts",
    "/size-guide/pants",
    "/size-guide/tshirts",
    "/policies/privacy",
    "/policies/returns",
    "/policies/shipping",
    "/policies/terms",
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}` })),
    ...collections.map((collection) => ({ url: `${baseUrl}/collections/${collection.slug}` })),
    ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}` })),
  ];
}
