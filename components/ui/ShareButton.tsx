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

  const URL = `https://refuge-worldwide.vercel.app${slug}`;

  const handleOnClick = async () => {
    const shareData: ShareData = {
      text: title,
      title: "Refuge Worldwide",
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
        className="w-20 h-20 sm:w-28 sm:h-28 focus:outline-none"
        onClick={handleOnClick}
      >
        Share
      </button>
    );

  return <ShareMenu url={URL} />;
}
