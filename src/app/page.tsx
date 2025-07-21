// src/app/page.tsx
import ProductGrid from "../components/Product/ProductGrid";

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ProductGrid />
    </div>
  );
}