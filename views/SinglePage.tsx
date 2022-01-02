import React, { ReactNode } from "react";
import Image from "next/image";
import BackButton from "../components/ui/BackButton";

interface SinglePageProps {
  coverImage: string;
  coverImageAlt: string;
  withBackButton?: boolean;
  repeatCover?: boolean;
  children: ReactNode;
}

const SinglePage = ({
  coverImage,
  coverImageAlt,
  withBackButton = false,
  repeatCover = true,
  children,
}: SinglePageProps) => {
  return (
    <article>
      <div className="relative h-half border-r-2 border-l-2 border-black">
        {repeatCover ? (
          <div className="flex relative h-full">
            {[...Array(2)].map((x, idx) => (
              <div
                key={idx}
                className="relative w-full lg:w-3/5 flex-shrink-0 border-r-2 border-black"
              >
                <Image
                  key={idx}
                  alt={coverImageAlt}
                  src={coverImage}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={coverImage}
            layout="fill"
            alt={coverImageAlt}
            objectFit="cover"
          />
        )}
        {withBackButton && (
          <div className="absolute top-4 left-4 md:top-8 md:left-8">
            <BackButton />
          </div>
        )}
      </div>
      {children}
    </article>
  );
};

export default SinglePage;
