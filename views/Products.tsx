import Link from "next/link";
import DotButton from "../components/ui/DotButton";
import type { Product } from "../types/shared";
import Slider from "../components/Slider";
import SliderCard from "../components/SliderCard";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  if (products.length < 1) return null;

  return (
    <div className="bg-orokoYellow border-b-2 border-black">
      <div className="flex justify-between py-8 px-4 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl">Merch</h1>
        <Link
          href="https://shop.oroko.live/"
          target="_blank"
          rel="noopener noreferrer"
          passHref
        >
          <div className="hidden md:block mt-4">
            <DotButton transparent size="large">
              All Products
            </DotButton>
          </div>
        </Link>
      </div>

      <div>
        <Slider>
          {products.map((product, idx) => (
            <SliderCard
              key={product.link || idx}
              imageUrl={product.image?.url || ""}
              title={product.title}
              link={product.link}
              idx={idx}
              cardWidth="third"
            >
              <div className="p-4 bg-transparent">
                <h3 className="font-heading text-4xl mb-2">{product.title}</h3>
                <p className="font-sans text-xl font-medium">
                  €{product.price}
                </p>
              </div>
            </SliderCard>
          ))}
        </Slider>
      </div>
    </div>
  );
}
