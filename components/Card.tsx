import Image from "next/image";
import Link from "next/link";

interface CardProps {
  imageUrl: string;
  title: string;
  link: string;
  children?: any;
}

const Card = ({ imageUrl, link, title, children }: CardProps) => {
  return (
    <Link href={link} passHref>
      <div className="cursor-pointer">
        <div className="relative w-full h-80 lg:h-96 border-b-2 border-black">
          <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
        {children}
      </div>
    </Link>
  );
};

export default Card;
