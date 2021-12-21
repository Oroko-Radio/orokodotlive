import React from "react";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

interface CardProps {
  data: any;
  children?: any;
}

const Card = ({ data, children }: CardProps) => {
  const { title, date, slug, articleType, city, subtitle, coverImage } = data;

  return (
    <Link href={`/news/${slug}`} passHref>
      <div>
        <div className="relative w-full h-80 border-b-2 border-black">
          <Image
            src={coverImage.url}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <div className="border-2 border-black inline-block mb-4">
            {city && (
              <p className="font-sans inline-block font-semibold text-sm mb-0 bg-black text-white border-r-2 border-black px-3 py-1">
                {city.toUpperCase()}
              </p>
            )}
            <p className="font-sans inline-block font-semibold text-sm py-1 px-3 mb-0">
              {articleType.toUpperCase()}
            </p>
          </div>
          <p className="font-sans mb-2 font-semibold">
            {dayjs(date).format("DD MMMM YYYY")}
          </p>
          <h1 className="font-heading mb-1 text-4xl">{title}</h1>
          <p className="mb-4 text-2xl">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
