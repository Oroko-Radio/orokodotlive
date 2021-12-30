import cn from "classnames";
import Play from "../../icons/Play";
import { playerWidget, showKey } from "../../lib/mixcloud";
import { getMixcloudKey } from "../../util";

interface PlayButtonProps {
  colorScheme?: "solid" | "transparent";
  mixcloudLink: string;
}

const PlayButton = ({
  colorScheme = "solid",
  mixcloudLink,
}: PlayButtonProps) => {
  const [, setKey] = showKey.use();
  const player = playerWidget.useValue();

  const handlePlayShow = async () => {
    setKey(getMixcloudKey(mixcloudLink));

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
    <div
      className={cn(
        "mx-8 my-2 rounded-full self-center border-black border-2 h-16 w-16 lg:h-32 lg:w-32 flex justify-center items-center",
        {
          "bg-white border-black text-black": colorScheme === "solid",
          "text-white border-white bg-orokoTransparentBlack hover:scale-110 transition-transform":
            colorScheme === "transparent",
        }
      )}
    >
      <button
        className="h-7 w-7 lg:h-14 lg:w-14 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
        onClick={handlePlayShow}
        aria-label="Play Archived Show"
      >
        <Play solid={colorScheme === "solid"} />
      </button>
    </div>
  );
};

export default PlayButton;
