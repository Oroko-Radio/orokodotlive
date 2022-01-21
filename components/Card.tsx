import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import PlayButton from "./ui/PlayButton";

interface CardProps {
  imageUrl: string;
  title: string;
  link: string;
  mixcloudLink?: string;
  children?: any;
  cardWidth?: "half" | "quarter";
  artistCard?: boolean;
}

const Card = ({
  imageUrl,
  link,
  title,
  mixcloudLink,
  children,
  cardWidth = "quarter",
  artistCard = false,
}: CardProps) => {
  return (
    <Link href={link} passHref>
      <div className="cursor-pointer">
        <div
          className={cn(
            "relative w-full h-80 md:h-72 border-b-2 border-black",
            {
              "xl:h-80": cardWidth === "quarter",
              "xl:h-80 2xl:h-96": artistCard,
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
