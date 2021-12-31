import React, { ReactNode } from "react";
import Image from "next/image";
import BackButton from "../components/ui/BackButton";

interface SinglePageProps {
  coverImage: string;
  coverImageAlt: string;
  withBackButton?: boolean;
  children: ReactNode;
}

const SinglePage = ({
  coverImage,
  coverImageAlt,
  withBackButton = false,
  children,
}: SinglePageProps) => {
  return (
    <article>
      <div className="relative h-half border-r-2 border-l-2 border-black">
        <Image
          src={coverImage}
          layout="fill"
          alt={coverImageAlt}
          objectFit="cover"
        />
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
