import React, { ReactNode } from "react";
import Image from "next/legacy/image";
import BackButton from "@/components/ui/BackButton";
import Meta from "@/components/Meta";

interface SinglePageProps {
  title: string;
  coverImage: string;
  coverImageAlt: string;
  withBackButton?: boolean;
  repeatCover?: boolean;
  children: ReactNode;
}

const SinglePage = ({
  title,
  coverImage,
  coverImageAlt,
  withBackButton = false,
  repeatCover = true,
  children,
}: SinglePageProps) => {
  return (
    <>
      <Meta title={title} />
      <article>
        <div className="relative h-forty md:h-half border-black border-b-2">
          {coverImage && repeatCover ? (
            <div className="flex relative h-full overflow-hidden">
              {[...Array(3)].map((x, idx) => (
                <div
                  key={idx}
                  className="relative w-full lg:w-3/5 xl:w-2/5 flex-shrink-0 lg:border-r-2 border-black"
                >
                  <Image
                    quality={50}
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
            coverImage && (
              <Image
                quality={50}
                src={coverImage}
                layout="fill"
                alt={coverImageAlt}
                objectFit="cover"
              />
            )
          )}
          {withBackButton && (
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
              <BackButton />
            </div>
          )}
        </div>
        {children}
      </article>
    </>
  );
};

export default SinglePage;
