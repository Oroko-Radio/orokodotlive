import Image from "next/image";
import { Asset } from "../types/shared";
import cn from "classnames";

export default function ImageBlock({ images }: { images: Asset[] }) {
  return (
    <section className="image-block grid grid-cols-2 md:grid-cols-3 pb-6">
      {images.map((image, idx) => (
        <Image
          key={image.sys.id}
          className={cn("object-cover h-full w-full border-black border-t-2", {
            "md:border-b-2": idx >= 3,
            "md:border-r-2": idx !== 2 && idx !== 5,
            "border-b-2": idx >= 4,
            "border-r-2": idx % 2 === 0,
          })}
          src={image.url}
          alt={image.title}
          width={image.width}
          height={image.height}
        />
      ))}
    </section>
  );
}
