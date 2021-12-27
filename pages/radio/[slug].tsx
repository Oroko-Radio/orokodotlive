import { getRadioPageSingle } from "../../lib/contentful/pages/radio";
import { getShowPathsToPreRender } from "../../lib/contentful/paths";
import { playerWidget, showKey } from "../../lib/mixcloud";
import { ShowInterface } from "../../types/shared";
import { getMixcloudKey } from "../../util";
import SinglePage from "../../views/SinglePage";

type Props = {
  show: ShowInterface;
  relatedShows?: ShowInterface[];
  preview: boolean;
};

export default function Show({ show, relatedShows, preview }: Props) {
  const [, setKey] = showKey.use();
  const player = playerWidget.useValue();

  const handlePlayShow = async () => {
    setKey(getMixcloudKey(show.mixcloudLink));

    if (player?.play) {
      console.log("[Mixcloud]", "Play");

      try {
        await player.togglePlay();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const {
    coverImage,
    title,
    date,
    content,
    artistsCollection,
    genresCollection,
    mixcloudLink,
  } = show;

  return (
    <div>
      <SinglePage
        coverImage={coverImage.url}
        title={title}
        date={date}
        content={content}
        artists={artistsCollection.items}
        genres={genresCollection.items}
        mixcloudLink={mixcloudLink}
        handlePlayShow={handlePlayShow}
      />
    </div>
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
