const baseProducts = [
  {
    id: 1,
    name: "Premium Sky Blue Shirt Set",
    slug: "premium-sky-blue-shirt",
    category: "Shirts",
    collection: "New Arrivals",
    description:
      "Premium slim-fit sky blue shirt crafted from high-grade woven cotton. Ideal for smart casual outings, formal events, and elevated everyday wear. A refined wardrobe essential.",
    price: 1999,
    discountPrice: 1299,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Sky Blue", "White"],
    stock: 12,
    badge: "New Arrival",
    image: "/products/shirt-blue.png",
  },
  {
    id: 2,
    name: "Premium Olive Shirt Set",
    slug: "premium-olive-shirt",
    category: "Shirts",
    collection: "Smart Casuals",
    description:
      "Rich olive green premium shirt with a refined texture. Versatile for both office wear and evening outings. Pairs beautifully with beige and neutral trousers.",
    price: 1999,
    discountPrice: 1299,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Olive Green", "Beige"],
    stock: 10,
    badge: "New Arrival",
    image: "/products/shirt-olive.png",
  },
  {
    id: 3,
    name: "Textured Cream Shirt Set",
    slug: "textured-cream-shirt",
    category: "Shirts",
    collection: "Formal Wear",
    description:
      "Luxuriously textured cream formal shirt with a smooth premium finish. Ideal for special occasions, wedding functions, and high-profile formal meetings.",
    price: 2199,
    discountPrice: 1399,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Cream", "White"],
    stock: 8,
    badge: "Best Seller",
    image: "/products/shirt-cream.png",
  },
  {
    id: 4,
    name: "White Shirt with Black Trouser",
    slug: "white-shirt-black-trouser",
    category: "Shirt + Trouser Set",
    collection: "Formal Wear",
    description:
      "Classic white premium shirt paired with sleek black trousers. The ultimate formal combination for any occasion - office, events, or parties.",
    price: 2299,
    discountPrice: 1499,
    sizes: ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"],
    colors: ["White", "Black"],
    stock: 6,
    badge: "Trouser Set",
    image: "/products/shirt-white-black-pan.png",
  },
  {
    id: 5,
    name: "Navy Premium Shirt Set",
    slug: "navy-premium-shirt",
    category: "Shirts",
    collection: "New Arrivals",
    description:
      "Deep navy premium shirt for a sophisticated and polished appearance. Clean collar finish with a slim fit that works beautifully for both formal and smart casual settings.",
    price: 1999,
    discountPrice: 1299,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Navy Blue", "Charcoal"],
    stock: 12,
    badge: "New Arrival",
    image: "/products/shirt-navy.png",
  },
  {
    id: 6,
    name: "Grey Premium Shirt Set",
    slug: "grey-premium-shirt",
    category: "Shirts",
    collection: "Best Sellers",
    description:
      "Elegant grey shirt with a smooth premium finish. A timeless wardrobe staple that pairs with virtually everything - a must-have for any discerning gentleman.",
    price: 1999,
    discountPrice: 1299,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Grey", "Black"],
    stock: 10,
    badge: "Best Seller",
    image: "/products/shirt-grey.png",
  },
  {
    id: 7,
    name: "White Shirt with Beige Trouser",
    slug: "white-shirt-beige-trouser",
    category: "Shirt + Trouser Set",
    collection: "Smart Casuals",
    description:
      "Crisp white shirt styled with warm beige trousers. A fresh, clean smart-casual combination that exudes effortless confidence for daytime and evening wear.",
    price: 2299,
    discountPrice: 1499,
    sizes: ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"],
    colors: ["White", "Beige"],
    stock: 7,
    badge: "Trouser Set",
    image: "/products/shirt-white-beige.png",
  },
  {
    id: 8,
    name: "Beige Premium Shirt Set",
    slug: "beige-premium-shirt",
    category: "Shirts",
    collection: "Smart Casuals",
    description:
      "Warm beige premium shirt with a soft, refined texture. Perfect for relaxed formal styling, brunches, and elevated casual wear. Timeless and sophisticated.",
    price: 2099,
    discountPrice: 1399,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Beige", "White"],
    stock: 10,
    badge: "New Arrival",
    image: "/products/shirt-beige.png",
  },
  {
    id: 9,
    name: "Brown Premium Shirt Set",
    slug: "brown-premium-shirt",
    category: "Shirts",
    collection: "Best Sellers",
    description:
      "Rich brown premium shirt for a warm, sophisticated look. Crafted from high-quality woven cotton with a refined fit that elevates any ensemble.",
    price: 1999,
    discountPrice: 1299,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Brown", "Beige"],
    stock: 8,
    badge: "Trending",
    image: "/products/shirt-brown.png",
  },
  {
    id: 10,
    name: "Black Premium Shirt Set",
    slug: "black-premium-shirt",
    category: "Shirts",
    collection: "Best Sellers",
    description:
      "Classic black premium shirt - bold, versatile, and effortlessly stylish. A foundational wardrobe piece that commands attention at every occasion.",
    price: 2099,
    discountPrice: 1399,
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: ["Black", "Beige"],
    stock: 9,
    badge: "Best Seller",
    image: "/products/shirt-black.png",
  },
];

function getCollectionSlugs(product: (typeof baseProducts)[number]) {
  const slugs = ["all-products", "shirts", "premium-shirts"];
  if (product.collection === "New Arrivals" || product.badge === "New Arrival") slugs.push("new-arrivals");
  if (product.collection === "Best Sellers" || product.badge === "Best Seller") slugs.push("best-sellers");
  if (product.discountPrice < 999) slugs.push("under-999");
  if (product.collection === "Formal Wear") slugs.push("office-wear");
  if (product.collection === "Smart Casuals" || product.collection === "Best Sellers") slugs.push("weekend-wear");
  if (product.name.toLowerCase().includes("trouser")) slugs.push("trousers");
  return Array.from(new Set(slugs));
}

export const products = baseProducts.map((product) => ({
  ...product,
  fit: product.name.toLowerCase().includes("slim") ? "Slim comfort fit" : "Regular comfort fit",
  fabric: "Soft cotton-blend fabric",
  sleeve: "Full sleeve",
  occasion: product.collection === "Formal Wear" ? "Office wear, occasions, and smart evenings" : "Daily wear, office wear, and casual outings",
  careInstructions: "Gentle wash recommended. Do not bleach. Iron on low to medium heat.",
  modelInfo: "Model sizing available on request.",
  madeIn: "India",
  tags: [
    product.category,
    product.collection,
    product.badge,
    ...product.colors,
  ].filter(Boolean),
  isNewArrival: product.collection === "New Arrivals" || product.badge === "New Arrival",
  isBestSeller: product.collection === "Best Sellers" || product.badge === "Best Seller",
  availableSizes: product.sizes,
  availableColors: product.colors,
  collectionSlugs: getCollectionSlugs(product),
  seoTitle: `${product.name} | Life's Once Chennai`,
  seoDescription: `${product.name} from Life's Once, Kodambakkam Chennai. Order through WhatsApp or visit store for size and availability support.`,
}));

export type Product = (typeof products)[number];
