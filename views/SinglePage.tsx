import React from "react";
import Image from "next/image";
import { ArtistInterface } from "../types/shared";
import { renderRichTextWithImages } from "../lib/rich-text";
import Play from "../icons/play";
import dayjs from "dayjs";

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
      <div
        className="relative h-96"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      ></div>
      <article>
        <section className="border-2 border-black">
          <div className="relative container mx-auto">
            {date && (
              <p className="mb-0">
                {dayjs(date).format("DD MMM YYYY / HH") + "H"}
              </p>
            )}
            <h1 className="text-6xl font-heading">{title}</h1>
            {artists &&
              artists.map(({ name, slug }) => <h2 key={slug}>{name}</h2>)}
            {genres && genres.map(({ name }, idx) => <h2 key={idx}>{name}</h2>)}
            {mixcloudLink && (
              <div className="flex absolute right-0 top-0 h-full border-l-2 border-black bg-orokoBlue text-black">
                <div className="rounded-full self-center bg-white border-black border-2 h-16 w-16 flex justify-center items-center">
                  <button
                    className="h-7 w-7 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
                    onClick={handlePlayShow}
                  >
                    <Play />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="container mx-auto">
          {renderRichTextWithImages(content)}
        </section>
      </article>
    </>
  );
}
