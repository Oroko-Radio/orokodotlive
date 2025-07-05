import Image from "next/image";
import { Asset } from "../types/shared";

export default function ImageBlock({ images }: { images: Asset[] }) {
  return (
    <section className="border-2 border-black grid grid-cols-2 md:grid-cols-3">
      {images.map((image) => (
        <div>
          <Image
            className="object-cover h-full w-full"
            src={image.url}
            alt={image.title}
            width={image.width}
            height={image.height}
          />
        </div>
      ))}
    </section>
  );
}
