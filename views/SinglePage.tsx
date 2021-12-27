import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArtistInterface } from "../types/shared";
import { renderRichTextWithImages } from "../lib/rich-text";
import Play from "../icons/play";
import dayjs from "dayjs";
import Tag from "../components/Tag";

interface SinglePageProps {
  coverImage: string;
  title: string;
  content: any;
  date?: string;
  artists?: ArtistInterface[];
  genres?: { name: string }[];
  mixcloudLink?: string;
  handlePlayShow: () => Promise<void>;
}

export default function SinglePage({
  coverImage,
  title,
  date,
  artists,
  genres,
  mixcloudLink,
  content,
  handlePlayShow,
}: SinglePageProps) {
  return (
    <>
      <div className="relative h-half border-r-2 border-l-2 border-black">
        <Image src={coverImage} layout="fill" alt={title} objectFit="cover" />
      </div>
      <article>
        <section className="relative border-2 border-black mb-6">
          {mixcloudLink && (
            <div className="flex md:absolute right-0 top-0 h-full border-b-2 md:border-b-0 md:border-l-2 border-black bg-orokoBlue text-black">
              <div className="mx-8 my-2 rounded-full self-center bg-white border-black border-2 h-16 w-16 flex justify-center items-center">
                <button
                  className="h-7 w-7 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
                  onClick={handlePlayShow}
                >
                  <Play />
                </button>
              </div>
            </div>
          )}
          <div className="container max-w-3xl mx-auto">
            {date && (
              <p className="my-4 font-sans font-semibold tracking-wide text-xl">
                {dayjs(date).format("ddd DD MMMM YYYY @ HH") + "H"}
              </p>
            )}
            <h1 className="text-6xl mb-0 font-heading md:max-w-xl lg:max-w-3xl">
              {title}
            </h1>
            <h2 className="font-serif text-3xl mb-6">
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
            <div className="flex gap-1 mb-6">
              {genres &&
                genres.map(({ name }, idx) => (
                  <Tag text={name} color="white" key={idx} />
                ))}
            </div>
          </div>
        </section>
        <section className="container max-w-3xl mx-auto rich-text">
          {renderRichTextWithImages(content)}
        </section>
      </article>
    </>
  );
}
