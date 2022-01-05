import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import usePlayerState from "../hooks/usePlayerState";
import useRadioCo from "../hooks/useRadioCo";
import Banner from "./Banner";
import Logo from "../icons/Logo";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import SliderButton from "./ui/SliderButton";
import DropdownButton from "./ui/DropdownButton";
import PlayerDropdown from "./PlayerDropdown";
import { OROKO_LIVE } from "../constants";

const BroadcastingIndicator = ({
  status,
}: {
  status: "online" | "offline" | undefined;
}) => {
  if (status === "online")
    return (
      <div className="flex-grow-0 flex items-center">
        <div className="pl-10 pr-4">
          <Logo className="text-black stroke-current stroke-2 w-10 h-full" />
        </div>
        <p className="leading-none font-sans mb-0 pr-10">Live</p>
      </div>
    );

  return (
    <div className="flex-grow-0 flex items-center">
      <div className="flex-shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white opacity-25" />
      <p className="leading-none font-sans mb-0">Offline</p>
    </div>
  );
};

export default function LivePlayer() {
  const AUDIO_SRC = `https://s5.radio.co/${OROKO_LIVE}/listen`;

  const { data } = useRadioCo(OROKO_LIVE);

  const isOnline = data?.status === "online";

  const player = useRef<HTMLAudioElement>(null);
  const source = useRef<HTMLSourceElement>(null);

  const { isPlaying, play, pause } = usePlayerState({
    audioRef: player,
    sourceRef: source,
    url: AUDIO_SRC,
  });

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    if ("mediaSession" in navigator && data?.current_track) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.current_track.title,
        artist: "Oroko Radio",
        artwork: [
          {
            src: data.current_track.artwork_url,
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
      });
    }
  }, [data]);

  return (
    <section
      className={cn(
        "group text-white h-18 flex items-center border-b-2 border-black",
        {
          "sticky top-0 z-30": isOnline,
        }
      )}
    >
      {isOnline && (
        <div className="px-4 h-full flex bg-orokoYellow text-black border-r-2 border-black">
          <div className="rounded-full self-center bg-white border-black border-2 h-16 w-16 flex justify-center items-center">
            <button
              className="h-7 w-7 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
              onClick={isPlaying ? pause : play}
              aria-label={
                isPlaying ? "Pause Live Broadcast" : "Play Live Broadcast"
              }
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
          </div>
        </div>
      )}

      {isOnline ? (
        <div className="overflow-hidden h-full z-30">
          <Banner color="red">
            <div className="h-full flex align-middle items-center">
              <div className="border-black border-l-2 h-full"></div>
              <BroadcastingIndicator status={data?.status} />
              <h1 className="font-heading inline text-5xl xl:text-6xl mr-10">
                {data?.current_track?.title.split(" - ")[1]}
              </h1>
              <div className="relative h-full w-36 border-r-2 border-l-2 border-black">
                <Image
                  src={data.current_track.artwork_url}
                  alt={data.current_track.title}
                  layout="fill"
                  objectFit="cover"
                  unoptimized
                />
              </div>
              <h1 className="font-serif inline text-4xl xl:text-5xl mx-10">
                With {data?.current_track?.title.split(" - ")[0]}
              </h1>
            </div>
          </Banner>
        </div>
      ) : null}

      <audio hidden id="oroko-live-player" preload="none" ref={player}>
        <source ref={source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {isOnline && (
        <>
          <div
            className={cn("absolute w-full transition-transform", {
              "-translate-y-full -top-full": !dropdownOpen,
              "translate-y-0 top-18 h-auto ": dropdownOpen,
            })}
          >
            <PlayerDropdown />
          </div>
          <div className="hidden md:block absolute left-1/2 top-10 z-10 transition-all group-hover:top-22">
            <DropdownButton
              onClick={() => setDropdownOpen(!dropdownOpen)}
              dropdownOpen={dropdownOpen}
            />
          </div>
        </>
      )}
    </section>
  );
}

export function LivePlayerLoading() {
  return (
    <section className="bg-black text-white h-12 sm:h-16 px-4 sm:px-8 flex items-center">
      <div className="flex-grow-0 flex items-center space-x-6">
        <div className="flex-shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white opacity-25" />
        <p className="hidden md:block leading-none mt-1">Loading Broadcast</p>
      </div>
    </section>
  );
}
