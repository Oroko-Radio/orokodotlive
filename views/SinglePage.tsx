import React, { ReactNode } from "react";
import Image from "next/image";
import BackButton from "@/components/ui/BackButton";

interface SinglePageProps {
  title: string;
  coverImage: string | undefined;
  coverImageAlt: string;
  objectPosition?: string;
  withBackButton?: boolean;
  repeatCover?: boolean;
  children: ReactNode;
}

const SinglePage = ({
  title,
  coverImage,
  coverImageAlt,
  objectPosition,
  withBackButton = false,
  repeatCover = true,
  children,
}: SinglePageProps) => {
  return (
    <>
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
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: objectPosition || "center",
                    }}
                    priority
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
