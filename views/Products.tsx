import Link from "next/link";
import Card from "../components/Card";
import DotButton from "../components/ui/DotButton";
import type { Product } from "../types/shared";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  if (products.length < 1) return null;

  return (
    <div className="bg-orokoYellow border-b-2 border-black">
      <div className="flex justify-between py-8 px-4 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Products</h1>
        <Link href="https://shop.oroko.live/" target="_blank" rel="noopener noreferrer" passHref>
          <div className="hidden md:block mt-4">
            <DotButton transparent size="large">
              All Products
            </DotButton>
          </div>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 md:px-8 pb-10 md:pb-12">
        {products.map((product, idx) => (
          <div key={product.link || idx} className="border-black border-2 bg-transparent">
            <Card
              imageUrl={product.image?.url || ""}
              title={product.title}
              link={product.link}
            >
              <div className="p-4 bg-transparent">
                <h3 className="font-heading text-4xl mb-2">{product.title}</h3>
                <p className="font-sans text-xl font-semibold">€{product.price}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
