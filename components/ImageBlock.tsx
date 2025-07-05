import Image from "next/image";
import { Asset } from "../types/shared";
import cn from "classnames";

export default function ImageBlock({ images }: { images: Asset[] }) {
  if (!images) return null;

  return (
    <section
      className={cn("image-block grid grid-cols-2 pb-6", {
        "md:grid-cols-3": images.length > 4,
      })}
    >
      {images.length === 4 ? (
        <FourImageBlock images={images} />
      ) : (
        <SixImageBlock images={images} />
      )}
    </section>
  );
}

function FourImageBlock({ images }: { images: Asset[] }) {
  return (
    <>
      {images.map((image, idx) => (
        <Image
          key={image.sys.id}
          className={cn("object-cover h-full w-full border-black border-t-2", {
            "md:border-b-2": idx >= 2,
            "border-b-2": idx >= 2,
            "border-r-2": idx % 2 === 0,
          })}
          src={image.url}
          alt={image.title}
          width={image.width}
          height={image.height}
        />
      ))}
    </>
  );
}

function SixImageBlock({ images }: { images: Asset[] }) {
  return (
    <>
      {images.map((image, idx) => (
        <Image
          key={image.sys.id}
          className={cn("object-cover h-full w-full border-black border-t-2", {
            "border-b-2": idx >= 4,
            "md:border-b-2": idx >= 3,
            "border-r-2 md:border-r-0": idx % 2 === 0,
            "md:border-l-2": idx !== 0 && idx !== 3,
          })}
          src={image.url}
          alt={image.title}
          width={image.width}
          height={image.height}
        />
      ))}
    </>
  );
}
