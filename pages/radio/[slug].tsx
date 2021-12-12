import Image from "next/image";

import { getRadioPageSingle } from "../../lib/contentful/pages/radio";
import { getShowPathsToPreRender } from "../../lib/contentful/paths";
import { playerWidget, showKey } from "../../lib/mixcloud";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ShowInterface } from "../../types/shared";
import { getMixcloudKey } from "../../util";

type Props = {
  show: ShowInterface;
  relatedShows?: ShowInterface[];
  preview: boolean;
};

export default function Show({ show, relatedShows, preview }: Props) {
  const [, setKey] = showKey.use();
  const player = playerWidget.useValue();

  console.log(show);

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

  return (
    <div key={show.slug}>
      <Image
        src={show.coverImage.url}
        alt={show.coverImage.title}
        objectFit="cover"
        width="200"
        height="200"
      />
      <h1>{show.title}</h1>
      {show.artistsCollection.items.map(({ name, slug }) => (
        <h2 key={slug}>{name}</h2>
      ))}
      <p>{renderRichTextWithImages(show.content)}</p>
      <h1 className="text-extrabold cursor-pointer" onClick={handlePlayShow}>
        PLAY
      </h1>
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
