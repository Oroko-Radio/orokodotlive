import type { Metadata } from "next";
import Link from "next/link";
import { getRadioPageSingle, getAllShowSlugs } from "@/lib/payload/pages/radio";
import SinglePage from "@/views/SinglePage";
import DateTime from "@/components/DateTime";
import Tag from "@/components/Tag";
import { renderPayloadRichText } from "@/lib/rich-text";
import TitleBox from "@/components/TitleBox";
import { GenreTag } from "@/components/GenreTag";
import FeaturedTag from "@/components/FeaturedTag";
import RelatedShows from "@/views/RelatedShows";
import type { Show, Genre } from "@/payload-types";

export const revalidate = 3600; // 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: showSlug } = await params;
  const { show } = await getRadioPageSingle(showSlug);
  return {
    title: show.title,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllShowSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Show({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: showSlug } = await params;
  const { show, relatedShows } = await getRadioPageSingle(showSlug);

  const coverImageUrl =
    typeof show.coverImage === "object" &&
    show.coverImage?.sizes?.["large-full"]?.url
      ? show.coverImage.sizes["large-full"].url
      : typeof show.coverImage === "object" && show.coverImage?.url
        ? show.coverImage.url
        : "/default-cover.jpg";

  return (
    <SinglePage
      coverImage={coverImageUrl}
      coverImageAlt={show.title}
      withBackButton
      title={show.title}
    >
      <TitleBox
        boxText={
          <>
            <DateTime date={show.date} format="DD MMM YY HH:mm" />
            <span>H</span>
          </>
        }
        mixcloudLink={show.mixcloudLink || undefined}
        title={show.title}
        slug={`radio/${show.slug}`}
      >
        <div className="container max-w-5xl mx-auto">
          {show.date && (
            <p className="hidden md:block mb-4 font-sans font-semibold tracking-wide text-lg">
              <DateTime date={show.date} format="ddd DD MMMM YYYY @ HH:mm" />
              <span>H</span>
            </p>
          )}
          {show.isFeatured && <FeaturedTag />}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-0 font-heading md:mr-36 lg:mr-40">
            {show.title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-10">
            {" "}
            With{" "}
            {show.artists &&
              Array.isArray(show.artists) &&
              show.artists.map((artist: any, idx: number) => (
                <span key={idx}>
                  <Link
                    href={`/artists/${typeof artist === "object" ? artist.slug : artist}`}
                    passHref
                  >
                    <span className="border-b-2 border-black cursor-pointer">
                      {typeof artist === "object" ? artist.name : artist}
                    </span>
                  </Link>
                  {idx !== show.artists!.length - 1 && ", "}
                </span>
              ))}
          </h2>
          <div className="flex gap-1 flex-wrap">
            {show.artists &&
              Array.isArray(show.artists) &&
              show.artists[0] &&
              typeof show.artists[0] === "object" &&
              show.artists[0].city && (
                <Link
                  href={
                    "/artists?city=" +
                    (typeof show.artists[0].city === "object"
                      ? show.artists[0].city.name
                      : show.artists[0].city)
                  }
                  passHref
                >
                  <Tag
                    text={
                      typeof show.artists[0].city === "object"
                        ? show.artists[0].city.name
                        : String(show.artists[0].city)
                    }
                    color="black"
                  />
                </Link>
              )}
            {show.genres &&
              Array.isArray(show.genres) &&
              show.genres
                .filter((genre): genre is Genre => typeof genre === "object")
                .map((genre, idx) => <GenreTag genre={genre} key={idx} />)}
          </div>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        {show.content && renderPayloadRichText(show.content)}
      </section>
      {relatedShows && relatedShows.length > 0 && (
        <RelatedShows shows={relatedShows} />
      )}
    </SinglePage>
  );
}
