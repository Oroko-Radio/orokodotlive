import React from "react";
import Image from "next/image";
import { ArtistInterface } from "../types/shared";
import { renderRichTextWithImages } from "../lib/rich-text";
import Play from "../icons/play";

interface SinglePageProps {
  coverImage: string;
  title: string;
  artists?: ArtistInterface[];
  genres?: { name: string }[];
  slug: string;
  mixcloudLink?: string;
  content: any;
  handlePlayShow: () => Promise<void>;
}

export default function SinglePage({
  coverImage,
  title,
  artists,
  genres,
  slug,
  mixcloudLink,
  content,
  handlePlayShow,
}: SinglePageProps) {
  return (
    <>
      <div
        className="relative h-96 border-b-2 border-black"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      ></div>
      <h1>{title}</h1>
      {artists && artists.map(({ name, slug }) => <h2 key={slug}>{name}</h2>)}
      {genres && genres.map(({ name }, idx) => <h2 key={idx}>{name}</h2>)}
      <div>{renderRichTextWithImages(content)}</div>
      {mixcloudLink && (
        <div
          className="relative h-10 w-10 cursor-pointer"
          onClick={handlePlayShow}
        >
          {mixcloudLink && <Play />}
        </div>
      )}
    </>
  );
}
