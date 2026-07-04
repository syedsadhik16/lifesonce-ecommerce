import Image from "next/image";
import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/919384007074";

const shopLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "All Products", href: "/shop" },
  { label: "Shirts", href: "/collections/shirts" },
  { label: "Polo T-Shirts", href: "/collections/polo-tshirts" },
  { label: "Trousers", href: "/collections/trousers" },
  { label: "Drop Shoulder", href: "/collections/drop-shoulder" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Return & Exchange", href: "/policies/returns" },
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Terms of Service", href: "/policies/terms" },
  { label: "FAQ", href: "/faq" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Our Store", href: "/our-store" },
  { label: "About Us", href: "/about" },
];

const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IconMapPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1C1917", borderTop: "1px solid #2D2B28", padding: "64px 0 0" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "40px", paddingBottom: "48px" }}>
          <div>
            <div style={{ backgroundColor: "#FAFAF9", borderRadius: "8px", padding: "8px 12px", display: "inline-block", marginBottom: "16px" }}>
              <div className="relative" style={{ height: "40px", width: "120px" }}>
                <Image src="/logo.png" alt="Life's Once" fill sizes="120px" className="object-contain" style={{ objectPosition: "left center" }} />
              </div>
            </div>
            <p className="lo-serif italic" style={{ fontSize: "16px", color: "#A8A29E", marginBottom: "10px" }}>
              Wear it ASAP!
            </p>
            <p style={{ fontSize: "13px", color: "#57534E", lineHeight: "1.75", marginBottom: "20px" }}>
              Premium men&apos;s fashion from the heart of Kodambakkam, Chennai.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium" style={{ color: "#25D366", fontSize: "13px", textDecoration: "none" }}>
              <IconWhatsApp /> Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, color: "#FAFAF9", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "20px" }}>
              Shop
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {shopLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="lo-footer-link" style={{ fontSize: "13px", color: "#78716C", textDecoration: "none" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, color: "#FAFAF9", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "20px" }}>
              Policies
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {policyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="lo-footer-link" style={{ fontSize: "13px", color: "#78716C", textDecoration: "none" }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: "10px", fontWeight: 700, color: "#FAFAF9", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "20px" }}>
              Visit Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ color: "#A16207", marginTop: "2px", flexShrink: 0 }}><IconMapPin /></span>
                <p style={{ fontSize: "13px", color: "#78716C", lineHeight: "1.65" }}>
                  Life&apos;s Once<br />25/A, Karnan St, Rangarajapuram,<br />Kodambakkam, Chennai, Greater Chennai<br />Tamil Nadu 600024
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#A16207" }}><IconPhone /></span>
                <a href="tel:+919384007074" style={{ fontSize: "13px", color: "#78716C", textDecoration: "none" }}>
                  093840 07074
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#A16207" }}><IconClock /></span>
                <p style={{ fontSize: "13px", color: "#78716C" }}>9:30 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between" style={{ borderTop: "1px solid #2D2B28", padding: "20px 0", gap: "8px" }}>
          <p style={{ fontSize: "12px", color: "#44403C" }}>
            © {new Date().getFullYear()} Life&apos;s Once. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", color: "#44403C" }}>
            Kodambakkam, Chennai &middot; Premium Men&apos;s Fashion
          </p>
        </div>
      </div>
    </footer>
  );
}
