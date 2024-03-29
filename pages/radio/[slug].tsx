import Link from "next/link";
import { getRadioPageSingle } from "../../lib/contentful/pages/radio";
import { getShowPathsToPreRender } from "../../lib/contentful/paths";
import { GenreInterface, ShowInterface } from "../../types/shared";
import SinglePage from "../../views/SinglePage";
import dayjs from "dayjs";
import Tag from "../../components/Tag";
import { renderRichTextWithImages } from "../../lib/rich-text";
import TitleBox from "../../components/TitleBox";
import { GenreTag } from "../../components/GenreTag";
import FeaturedTag from "../../components/FeaturedTag";
import RelatedShows from "../../views/RelatedShows";

type Props = {
  show: ShowInterface;
  relatedShows?: ShowInterface[];
  preview: boolean;
};

export default function Show({ show, relatedShows, preview }: Props) {
  const {
    coverImage,
    title,
    slug,
    date,
    isFeatured,
    content,
    artistsCollection,
    genresCollection,
    mixcloudLink,
  } = show;

  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt={title}
      withBackButton
      title={title}
    >
      <TitleBox
        boxText={dayjs(date).format("DD MMM YY HH:mm") + "H"}
        mixcloudLink={mixcloudLink}
        title={title}
        slug={`radio/${slug}`}
      >
        <div className="container max-w-5xl mx-auto">
          {date && (
            <p className="hidden md:block mb-4 font-sans font-semibold tracking-wide text-lg">
              {dayjs(date).format("ddd DD MMMM YYYY @ HH:mm") + "H"}
            </p>
          )}
          {isFeatured && <FeaturedTag />}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-0 font-heading md:mr-36 lg:mr-40">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 lg:mb-10">
            {" "}
            With{" "}
            {artistsCollection.items[0].slug &&
              artistsCollection.items.map(({ name, slug }, idx) => (
                <span key={slug}>
                  <Link href={`/artists/${slug}`} passHref>
                    <span className="border-b-2 border-black cursor-pointer">
                      {name}
                    </span>
                  </Link>
                  {idx !== artistsCollection.items.length - 1 && ", "}
                </span>
              ))}
          </h2>
          <div className="flex gap-1 flex-wrap">
            <Link
              href={"/artists?city=" + artistsCollection.items[0].city.name}
              passHref
            >
              <Tag text={artistsCollection.items[0].city.name} color="black" />
            </Link>
            {genresCollection &&
              genresCollection.items.map((genre, idx) => (
                <GenreTag genre={genre} key={idx} />
              ))}
          </div>
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
        {content && renderRichTextWithImages(content)}
      </section>
      {relatedShows.length > 0 && <RelatedShows shows={relatedShows} />}
    </SinglePage>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getRadioPageSingle(params.slug, preview);

  return {
    props: { preview, ...data },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getShowPathsToPreRender();

  return { paths, fallback: "blocking" };
}
