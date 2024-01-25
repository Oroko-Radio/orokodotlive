import cn from "classnames";
import Image from "next/legacy/image";
import Link from "next/link";
import PlayButton from "./ui/PlayButton";
import { CardProps } from "../types/shared";

const Card = ({
  imageUrl,
  link,
  title,
  mixcloudLink,
  children,
  cardWidth = "quarter",
}: CardProps) => {
  if (cardWidth === "featured") {
    return (
      <div className="grid xl:grid-cols-2 h-full xl:min-h-[600px]">
        <div className="p-8 pb-0 xl:pb-8">
          <div className="relative h-80 xl:h-full border-2 border-black self-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
              />
            )}
            {mixcloudLink && (
              <div className="absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <PlayButton
                  colorScheme="transparent"
                  mixcloudLink={mixcloudLink}
                />
              </div>
            )}
          </div>
        </div>
        <div className="p-4 pt-0 xl:p-8 xl:pl-0">{children}</div>
      </div>
    );
  }

  return (
    <Link href={link} passHref>
      <div className="cursor-pointer h-full flex flex-col">
        <div
          className={cn(
            "relative w-full h-80 md:h-72 2xl:h-96 border-b-2 border-black",
            {
              "xl:h-80": cardWidth === "quarter",
              "lg:h-96 xl:h-[32rem]": cardWidth === "half",
            }
          )}
        >
          {imageUrl && (
            <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
          )}
          {mixcloudLink && (
            <div className="absolute z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
              <PlayButton
                colorScheme="transparent"
                mixcloudLink={mixcloudLink}
              />
            </div>
          )}
        </div>
        {children}
      </div>
    </Link>
  );
};

export default Card;

function FeaturedCard() {}
