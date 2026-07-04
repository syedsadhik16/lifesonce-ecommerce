export const collections = [
  {
    slug: "polo-tshirts-jeans",
    title: "Polo T-Shirts",
    image: "/categories/polo-tshirts-jeans/1.png",
    description: "Smart casual polo T-shirt and denim combinations for everyday style.",
    productKeywords: ["polo"],
  },
  {
    slug: "formal-pants",
    title: "Formal Pants",
    image: "/categories/formal-pants/1.png",
    description: "Clean formal and semi-formal pants for office and occasion wear.",
    productKeywords: ["formal pants"],
  },
  {
    slug: "shirt-jeans",
    title: "Shirts + Jeans",
    image: "/categories/shirt-jeans/1.png",
    description: "Premium shirt and denim combinations for casual and smart looks.",
    productKeywords: ["shirt"],
  },
  {
    slug: "drop-shoulder-tshirts-jeans",
    title: "Drop Shoulder",
    image: "/categories/drop-shoulder-tshirts-jeans/1.png",
    description: "Relaxed drop-shoulder T-shirts paired with denim for streetwear style.",
    productKeywords: ["drop shoulder"],
  },
] as const;

export type Collection = (typeof collections)[number];
