export type Collection = {
  slug: string;
  title: string;
  image: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  productCategory?: string;
  productKeywords: string[];
  productCollectionSlugs: string[];
  comingSoon?: boolean;
};

const defaultImage = "/categories/shirt-jeans/1.png";

export const collections: Collection[] = [
  {
    slug: "new-arrivals",
    title: "New Arrivals",
    image: defaultImage,
    description: "Fresh Life's Once drops selected for clean everyday styling.",
    seoTitle: "New Arrivals | Life's Once Chennai",
    seoDescription: "Shop new men's fashion arrivals from Life's Once, Kodambakkam Chennai.",
    productCategory: "New Arrivals",
    productKeywords: ["new arrival"],
    productCollectionSlugs: ["new-arrivals"],
  },
  {
    slug: "all-products",
    title: "All Products",
    image: defaultImage,
    description: "Browse every available Life's Once product in one place.",
    seoTitle: "All Products | Life's Once Chennai",
    seoDescription: "Shop Life's Once shirts and men's fashion products online through WhatsApp.",
    productKeywords: [],
    productCollectionSlugs: ["all-products"],
  },
  {
    slug: "shirts",
    title: "Shirts",
    image: defaultImage,
    description: "Premium shirts for daily wear, office looks, and smart casual outfits.",
    seoTitle: "Premium Shirts | Life's Once Chennai",
    seoDescription: "Shop premium men's shirts from Life's Once, Kodambakkam Chennai.",
    productCategory: "Shirts",
    productKeywords: ["shirt"],
    productCollectionSlugs: ["shirts"],
  },
  {
    slug: "polo-tshirts",
    title: "Polo T-Shirts",
    image: "/categories/polo-tshirts-jeans/1.png",
    description: "Smart polo T-shirt styles are being curated for the next Life's Once drop.",
    seoTitle: "Polo T-Shirts | Life's Once Chennai",
    seoDescription: "Explore upcoming polo T-shirt styles from Life's Once Chennai.",
    productCategory: "Polo T-Shirts",
    productKeywords: ["polo"],
    productCollectionSlugs: ["polo-tshirts"],
    comingSoon: true,
  },
  {
    slug: "trousers",
    title: "Trousers",
    image: "/categories/formal-pants/1.png",
    description: "Clean trousers and formal pants for work and occasion wear.",
    seoTitle: "Trousers | Life's Once Chennai",
    seoDescription: "Explore trousers and formal pants from Life's Once Chennai.",
    productCategory: "Trousers",
    productKeywords: ["trouser", "formal pants"],
    productCollectionSlugs: ["trousers"],
  },
  {
    slug: "drop-shoulder",
    title: "Drop Shoulder",
    image: "/categories/drop-shoulder-tshirts-jeans/1.png",
    description: "Relaxed drop-shoulder T-shirts for streetwear-inspired casual looks.",
    seoTitle: "Drop Shoulder T-Shirts | Life's Once Chennai",
    seoDescription: "Explore upcoming drop shoulder T-shirt styles from Life's Once Chennai.",
    productCategory: "Drop Shoulder",
    productKeywords: ["drop shoulder"],
    productCollectionSlugs: ["drop-shoulder"],
    comingSoon: true,
  },
  {
    slug: "jeans",
    title: "Jeans",
    image: "/categories/shirt-jeans/1.png",
    description: "Denim looks paired with premium shirts and casual styling.",
    seoTitle: "Jeans | Life's Once Chennai",
    seoDescription: "Explore denim and jeans styling from Life's Once Chennai.",
    productCategory: "Jeans",
    productKeywords: ["jeans", "denim"],
    productCollectionSlugs: ["jeans"],
    comingSoon: true,
  },
  {
    slug: "office-wear",
    title: "Office Wear",
    image: "/categories/formal-pants/1.png",
    description: "Polished shirts and trouser looks for office and formal occasions.",
    seoTitle: "Office Wear | Life's Once Chennai",
    seoDescription: "Shop office-ready men's fashion from Life's Once Chennai.",
    productKeywords: ["formal", "office", "trouser"],
    productCollectionSlugs: ["office-wear"],
  },
  {
    slug: "weekend-wear",
    title: "Weekend Wear",
    image: defaultImage,
    description: "Comfortable smart casual pieces for weekends and relaxed plans.",
    seoTitle: "Weekend Wear | Life's Once Chennai",
    seoDescription: "Shop weekend-ready men's fashion from Life's Once Chennai.",
    productKeywords: ["casual", "smart"],
    productCollectionSlugs: ["weekend-wear"],
  },
  {
    slug: "premium-shirts",
    title: "Premium Shirts",
    image: defaultImage,
    description: "A focused edit of premium shirts with clean finishes and everyday comfort.",
    seoTitle: "Premium Shirts Collection | Life's Once Chennai",
    seoDescription: "Shop premium shirts from Life's Once, Kodambakkam Chennai.",
    productKeywords: ["premium", "shirt"],
    productCollectionSlugs: ["premium-shirts"],
  },
  {
    slug: "best-sellers",
    title: "Best Sellers",
    image: defaultImage,
    description: "Customer-favourite styles from the current Life's Once collection.",
    seoTitle: "Best Sellers | Life's Once Chennai",
    seoDescription: "Shop best-selling men's fashion products from Life's Once Chennai.",
    productKeywords: ["best seller", "trending"],
    productCollectionSlugs: ["best-sellers"],
  },
  {
    slug: "under-999",
    title: "Under Rs. 999",
    image: defaultImage,
    description: "Budget-friendly styles will be added here when available.",
    seoTitle: "Under Rs. 999 | Life's Once Chennai",
    seoDescription: "Explore Life's Once products under Rs. 999 when available.",
    productKeywords: [],
    productCollectionSlugs: ["under-999"],
    comingSoon: true,
  },
];

export const collectionAliases: Record<string, string> = {
  "polo-tshirts-jeans": "polo-tshirts",
  "formal-pants": "trousers",
  "shirt-jeans": "shirts",
  "drop-shoulder-tshirts-jeans": "drop-shoulder",
};

export function resolveCollectionSlug(slug: string) {
  return collectionAliases[slug] ?? slug;
}
