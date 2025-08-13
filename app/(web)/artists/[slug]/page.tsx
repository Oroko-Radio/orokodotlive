import type { Metadata } from "next";
import Link from "next/link";
import Tag from "@/components/Tag";
import TitleBox from "@/components/TitleBox";
import { getArtistsPageSingle } from "@/lib/payload/pages/artists";
import { renderPayloadRichText } from "@/lib/rich-text";
import RelatedShows from "@/views/RelatedShows";
import SinglePage from "@/views/SinglePage";

export const revalidate = 3600; // 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: artistSlug } = await params;
  const { artist } = await getArtistsPageSingle(artistSlug);
  return {
    title: artist.name,
  };
}

export default async function Artist({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: artistSlug } = await params;
  const { artist, relatedShows } = await getArtistsPageSingle(artistSlug);
  const { name, slug, city, content } = artist;

  return (
    <SinglePage
      coverImage={
        typeof artist.photo === "object" && artist.photo?.sizes?.["large-full"]?.url
          ? artist.photo.sizes["large-full"].url
          : (typeof artist.photo === "object" && artist.photo?.url ? artist.photo.url : undefined)
      }
      coverImageAlt={name}
      withBackButton
      title={name}
    >
      <TitleBox
        boxText="About the artist"
        title={name}
        slug={`artists/${slug}`}
      >
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            About the artist
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 mt-6 md:mt-0 font-heading md:mr-36 lg:mr-40">
            {name}
          </h1>
          {city && (
            <div className="inline-block">
              <Link
                href={
                  "/artists?city=" +
                  (typeof city === "object" ? city.name : city)
                }
                passHref
              >
                <Tag
                  text={typeof city === "object" ? city.name : String(city)}
                  color="black"
                />
              </Link>
            </div>
          )}
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-10 mb-24">
        {content && renderPayloadRichText(content)}
      </section>
      {relatedShows && relatedShows.length > 0 && (
        <RelatedShows shows={relatedShows} />
      )}
    </SinglePage>
  );
}
