import Image from "next/image";
import Link from "next/link";
import PlayButton from "./ui/PlayButton";

interface CardProps {
  imageUrl: string;
  title: string;
  link: string;
  mixcloudLink?: string;
  children?: any;
}

const Card = ({ imageUrl, link, title, mixcloudLink, children }: CardProps) => {
  return (
    <Link href={link} passHref>
      <div className="cursor-pointer">
        <div className="relative w-full h-80 lg:h-96 border-b-2 border-black">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
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
