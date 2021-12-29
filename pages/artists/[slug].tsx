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
  const {
    name,
    city,
    photo: { url: imageUrl },
    content,
  } = artist;

  return (
    <SinglePage coverImage={imageUrl} coverImageAlt={name} withBackButton>
      <TitleBox>
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {name}
          </h1>
          <div className="inline-block">
            <Tag text={city.name} color="black" />
          </div>
        </div>
      </TitleBox>
      <section className="container max-w-4xl mx-auto rich-text mb-24">
        {renderRichTextWithImages(content)}
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
