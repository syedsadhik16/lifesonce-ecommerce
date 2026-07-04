import type { MetadataRoute } from "next";

const baseUrl = "https://lifesonce-ecommerce-tagt-owoe0o6fr-syedsadhik16s-projects.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
