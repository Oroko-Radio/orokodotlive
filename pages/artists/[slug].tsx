import Tag from "../../components/Tag";
import TitleBox from "../../components/TitleBox";
import { getArtistsPageSingle } from "../../lib/contentful/pages/artists";
import { getArtistPathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ArtistEntry, ShowInterface } from "../../types/shared";
import SinglePage from "../../views/SinglePage";

type ArtistProps = {
  artist: ArtistEntry;
  preview: boolean;
  relatedShows?: ShowInterface[];
};

export default function Artist({ artist, relatedShows, preview }: ArtistProps) {
  const { name, slug, city, content } = artist;

  return (
    <SinglePage
      coverImage={artist.photo && artist.photo.url ? artist.photo.url : null}
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 mt-6 md:mt-0 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {name}
          </h1>
          {city && city.name && (
            <div className="inline-block">
              <Tag text={city.name} color="black" />
            </div>
          )}
        </div>
      </TitleBox>
      <section className="container max-w-5xl mx-auto rich-text py-10 mb-24">
        {content && renderRichTextWithImages(content)}
      </section>
    </SinglePage>
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
