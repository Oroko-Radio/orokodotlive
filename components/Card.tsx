import React from "react";
import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import SliderContext from "./contexts/sliderContext";
import dayjs from "dayjs";

const Card = ({ data, idx, children }) => (
  <SliderContext.Consumer>
    {({ elementRef }) => {
      const { title, date, slug, articleType, city, subtitle, coverImage } =
        data;

      return (
        <div
          ref={elementRef}
          className={cn(
            "inline-block flex-shrink-0 slider-container bg-orokoGray cursor-pointer border-2 border-black",
            {
              "border-l-0": idx !== 0,
            }
          )}
        >
          <Link href={`/news/${slug}`} passHref>
            <div>
              <div className="relative w-full h-80">
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
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default Card;
