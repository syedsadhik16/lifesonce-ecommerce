import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

const WHATSAPP_URL = "https://wa.me/919384007074";

function getRelatedProducts(collection: (typeof collections)[number]) {
  return products.filter((product) => {
    const haystack = `${product.name} ${product.category} ${product.collection} ${product.description}`.toLowerCase();
    return collection.productKeywords.some((keyword) => haystack.includes(keyword));
  });
}

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);

  if (!collection) {
    return (
      <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "96px 0", textAlign: "center" }}>
          <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Collection</p>
          <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(32px, 6vw, 56px)", color: "#1C1917", marginBottom: "12px" }}>Collection Not Found</h1>
          <p style={{ fontSize: "15px", color: "#78716C", marginBottom: "28px" }}>This collection is not available right now.</p>
          <Link href="/shop" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", fontSize: "13px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}>
            Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(collection);

  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
      <main>
        <section style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E7E5E4", padding: "64px 0" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center" style={{ gap: "48px" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>
                Collection
              </p>
              <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(34px, 5vw, 58px)", color: "#1C1917", lineHeight: 1.05, marginBottom: "16px" }}>
                {collection.title}
              </h1>
              <div style={{ width: "44px", height: "1px", backgroundColor: "#A16207", marginBottom: "22px" }} />
              <p style={{ fontSize: "15px", color: "#57534E", lineHeight: "1.8", maxWidth: "520px", marginBottom: "30px" }}>
                {collection.description}
              </p>
              <div className="flex flex-wrap" style={{ gap: "12px" }}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", fontSize: "13px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}>
                  WhatsApp Enquiry
                </a>
                <Link href="/shop" className="lo-btn-outline inline-flex font-semibold border" style={{ borderColor: "#1C1917", color: "#1C1917", fontSize: "13px", padding: "14px 28px", borderRadius: "8px", textDecoration: "none" }}>
                  Back to Shop
                </Link>
              </div>
            </div>

            <div className="lo-placeholder" style={{ position: "relative", aspectRatio: "3/4", borderRadius: "16px", overflow: "hidden", border: "1px solid #E7E5E4" }}>
              <Image src={collection.image} alt={collection.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority unoptimized />
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "72px 0 88px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 className="lo-serif font-semibold" style={{ fontSize: "clamp(28px, 4vw, 42px)", color: "#1C1917", marginBottom: "10px" }}>
              {relatedProducts.length > 0 ? "Available Products" : "Coming Soon"}
            </h2>
            <div style={{ width: "40px", height: "1px", backgroundColor: "#A16207" }} />
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" style={{ gap: "20px" }}>
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "16px", padding: "48px 24px", textAlign: "center" }}>
              <h3 className="lo-serif font-semibold" style={{ fontSize: "28px", color: "#1C1917", marginBottom: "10px" }}>
                This collection is coming soon.
              </h3>
              <p style={{ fontSize: "14px", color: "#78716C", marginBottom: "24px" }}>
                Message us to check availability.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", fontSize: "13px", padding: "13px 24px", borderRadius: "8px", textDecoration: "none" }}>
                WhatsApp Enquiry
              </a>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
