import { isServer } from "../../util";
import dynamic from "next/dynamic";

const ShareMenu = dynamic(() => import("./ShareMenu"));

export default function ShareButton({
  details,
}: {
  details: {
    title: string;
    slug: string;
  };
}) {
  const { title, slug } = details;

  const URL = `https://oroko.live/${slug}`;

  const handleOnClick = async () => {
    const shareData: ShareData = {
      text: title,
      title: "Oroko Radio",
      url: URL,
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isServer && navigator.share)
    return (
      <button
        className="bg-white rounded-full px-4 lg:px-6 py-1.5 border-black border-2 font-semibold text-base md:text-lg lg:text-xl"
        onClick={handleOnClick}
      >
        <span className="text-sm">Share</span>
      </button>
    );

  return <ShareMenu url={URL} />;
}
