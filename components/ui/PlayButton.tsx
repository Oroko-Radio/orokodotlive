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
    <>
      {colorScheme === "solid" ? (
        <div className="bg-white text-black mx-8 my-2 rounded-full self-center border-black border-2 h-16 w-16 lg:h-24 lg:w-24 flex justify-center items-center">
          <button
            className="h-7 w-7 lg:h-14 lg:w-14 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
            onClick={handlePlayShow}
            aria-label="Play Archived Show"
          >
            <Play />
          </button>
        </div>
      ) : (
        <button
          onClick={handlePlayShow}
          className="hover:scale-110 transition-transform w-16 h-16 lg:w-24 lg:h-24"
        >
          <svg
            id="Play_Button_Transparent"
            data-name="Play Button Transparent"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 114 114"
          >
            <g
              id="Ellipse_24"
              data-name="Ellipse 24"
              fill="rgba(0,0,0,0.2)"
              stroke="#fff"
              strokeWidth="2"
            >
              <circle cx="57" cy="57" r="57" stroke="none" />
              <circle cx="57" cy="57" r="56" fill="none" />
            </g>
            <g
              id="Pfad_65"
              data-name="Pfad 65"
              transform="translate(93.107 28) rotate(90)"
              fill="none"
            >
              <path d="M29.182,0,58.363,56.595H0Z" stroke="none" />
              <path
                d="M 29.18161964416504 4.364063262939453 L 3.281467437744141 54.59469985961914 L 55.08180618286133 54.59469985961914 L 29.18161964416504 4.364063262939453 M 29.18161964416504 -3.814697265625e-06 L 58.36327743530273 56.59469985961914 L 0 56.59469985961914 L 29.18161964416504 -3.814697265625e-06 Z"
                stroke="none"
                fill="#fff"
              />
            </g>
          </svg>
        </button>
      )}
    </>
  );
};

export default PlayButton;
