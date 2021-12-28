import Image from "next/image";
import { getArtistsPageSingle } from "../../lib/contentful/pages/artists";
import { getArtistPathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArtistEntry, ShowInterface } from "../../types/shared";

type ArtistProps = {
  artist: ArtistEntry;
  preview: boolean;
  relatedShows?: ShowInterface[];
};

export default function Artist({ artist, relatedShows, preview }: ArtistProps) {
  const {
    name,
    photo: { url: imageUrl },
    content,
  } = artist;
  return (
    <div>
      <h1>{name}</h1>
      <Image
        src={imageUrl}
        alt={name}
        height="200"
        width="200"
        objectFit="cover"
      />
      <p>{renderRichTextWithImages(content)}</p>
    </div>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getArtistsPageSingle(params.slug, preview);

  return {
    props: { preview, ...data },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getArtistPathsToPreRender();

  return { paths, fallback: "blocking" };
}
