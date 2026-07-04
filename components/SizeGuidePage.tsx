import Footer from "@/components/Footer";

const WHATSAPP_SIZE_URL = "https://wa.me/919384007074?text=Hi%20Life%E2%80%99s%20Once%2C%20I%20need%20help%20with%20size%20selection.";

export default function SizeGuidePage({
  title,
  description,
  rows,
}: {
  title: string;
  description: string;
  rows: string[];
}) {
  return (
    <div style={{ backgroundColor: "#FAFAF9", minHeight: "100vh", color: "#1C1917" }}>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: "72px 0 88px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, color: "#A16207", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>Size Guide</p>
        <h1 className="lo-serif font-semibold" style={{ fontSize: "clamp(34px, 6vw, 56px)", marginBottom: "12px" }}>{title}</h1>
        <p style={{ fontSize: "15px", color: "#57534E", lineHeight: "1.8", marginBottom: "28px" }}>{description}</p>
        <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4", borderRadius: "16px", overflow: "hidden", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ backgroundColor: "#F5F5F4" }}>
                <th style={{ textAlign: "left", padding: "14px", color: "#1C1917" }}>Size</th>
                <th style={{ textAlign: "left", padding: "14px", color: "#1C1917" }}>Fit Note</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((size) => (
                <tr key={size}>
                  <td style={{ padding: "14px", borderTop: "1px solid #E7E5E4", fontWeight: 700 }}>{size}</td>
                  <td style={{ padding: "14px", borderTop: "1px solid #E7E5E4", color: "#57534E" }}>Regular comfort fit. Confirm exact sizing on WhatsApp.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "13px", color: "#78716C", lineHeight: "1.8", marginBottom: "22px" }}>
          Measurements are approximate. For exact fit support, message us on WhatsApp.
        </p>
        <a href={WHATSAPP_SIZE_URL} target="_blank" rel="noopener noreferrer" className="lo-btn-primary inline-flex font-semibold" style={{ backgroundColor: "#1C1917", color: "#FFFFFF", padding: "14px 28px", borderRadius: "8px", textDecoration: "none", fontSize: "13px" }}>
          WhatsApp Size Help
        </a>
      </main>
      <Footer />
    </div>
  );
}
