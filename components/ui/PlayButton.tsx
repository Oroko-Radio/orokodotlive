'use client';

import PlayIcon from "../../icons/PlayIcon";
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
    <>
      {colorScheme === "solid" ? (
        <div className="hover:scale-110 transition-transform bg-white text-black mx-8 my-1 md:my-2 rounded-full self-center border-black border-2 h-14 w-14 md:h-16 md:w-16 lg:h-24 lg:w-24 xl:h-32 xl:w-32 flex justify-center items-center">
          <button
            className="h-7 w-7 md:h-9 md:w-9 lg:h-14 lg:w-14 xl:h-20 xl:w-20 focus:outline-none focus:ring-4"
            onClick={handlePlayShow}
            aria-label="Play Archived Show"
          >
            <PlayIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={handlePlayShow}
          className="hover:scale-110 transition-transform w-16 h-16 lg:w-24 lg:h-24"
        >
          <PlayIcon transparent />
        </button>
      )}
    </>
  );
};

export default PlayButton;
