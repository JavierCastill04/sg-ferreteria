import ProductGrid from "@/components/ProductGrid/ProductGrid";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ padding: "2rem" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#5E246E",
        }}
      >
        Ferretería Pablito
      </h1>

      <ProductGrid />
    </main>
  );
}
