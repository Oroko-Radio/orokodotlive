import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArtistInterface } from "../types/shared";
import { renderRichTextWithImages } from "../lib/rich-text";
import Play from "../icons/play";
import dayjs from "dayjs";
import Tag from "../components/Tag";

interface SingleShowProps {
  coverImage: string;
  title: string;
  content: any;
  date: string;
  artists: ArtistInterface[];
  genres: { name: string }[];
  mixcloudLink?: string;
  handlePlayShow: () => Promise<void>;
}

export default function SingleShow({
  coverImage,
  title,
  date,
  artists,
  genres,
  mixcloudLink,
  content,
  handlePlayShow,
}: SingleShowProps) {
  return (
    <article>
      <div className="relative h-half border-r-2 border-l-2 border-black">
        <Image src={coverImage} layout="fill" alt={title} objectFit="cover" />
      </div>
      <section className="relative border-2 border-black mb-6">
        {mixcloudLink && (
          <div className="flex md:absolute right-0 top-0 h-full border-b-2 md:border-b-0 md:border-l-2 border-black bg-orokoBlue text-black">
            <div className="mx-8 my-2 rounded-full self-center bg-white border-black border-2 h-16 w-16 lg:h-32 lg:w-32 flex justify-center items-center">
              <button
                className="h-7 w-7 lg:h-14 lg:w-14 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
                onClick={handlePlayShow}
                aria-label="Play Archived Show"
              >
                <Play />
              </button>
            </div>
          </div>
        )}
        <div className="container max-w-4xl mx-auto">
          {date && (
            <p className="my-4 lg:mt-6 lg:mb-8 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              {dayjs(date).format("ddd DD MMMM YYYY @ HH") + "H"}
            </p>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-0 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl mb-6 lg:mb-10">
            {" "}
            With{" "}
            {artists &&
              artists.map(({ name, slug }, idx) => (
                <span key={slug}>
                  <Link href={`/residents/${slug}`} passHref>
                    <span className="border-b-2 border-black cursor-pointer">
                      {name}
                    </span>
                  </Link>
                  {idx !== artists.length - 1 && ", "}
                </span>
              ))}
          </h2>
          <div className="flex gap-1 mb-6 lg:mb-8">
            {genres &&
              genres.map(({ name }, idx) => (
                <Tag text={name} color="white" key={idx} />
              ))}
          </div>
        </div>
      </section>
      <section className="container max-w-4xl mx-auto rich-text">
        {renderRichTextWithImages(content)}
      </section>
    </article>
  );
}
