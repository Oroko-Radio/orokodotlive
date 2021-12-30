import cn from "classnames";
import Play from "../../icons/play";

interface PlayButtonProps {
  handlePlayShow: () => Promise<void>;
  colorScheme: "solid" | "transparent";
}

const PlayButton = ({
  handlePlayShow,
  colorScheme = "solid",
}: PlayButtonProps) => {
  return (
    <div
      className={cn(
        "mx-8 my-2 rounded-full self-center border-black border-2 h-16 w-16 lg:h-32 lg:w-32 flex justify-center items-center",
        {
          "bg-white": colorScheme === "solid",
          "bg-transparent": colorScheme === "transparent",
        }
      )}
    >
      <button
        className="h-7 w-7 lg:h-14 lg:w-14 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
        onClick={handlePlayShow}
        aria-label="Play Archived Show"
      >
        <Play />
      </button>
    </div>
  );
};

export default PlayButton;
