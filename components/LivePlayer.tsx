import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import usePlayerState from "../hooks/usePlayerState";
import useRadioCo from "../hooks/useRadioCo";
import Banner from "./Banner";
import Logo from "../icons/Logo";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
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
          <Logo className="text-black stroke-current stroke-2 w-8 md:w-10 h-full" />
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
    <>
      <audio hidden id="oroko-live-player" preload="none" ref={player}>
        <source ref={source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {isOnline && (
        <section
          className={cn("sticky", {
            "top-0 z-30 mb-14 md:mb-18": isOnline,
          })}
        >
          <div className="absolute w-full">
            <div className="relative group">
              <div className="flex items-center h-14 md:h-18 border-b-2 border-t-2 border-black text-white">
                <div className="px-4 h-full flex bg-orokoYellow text-black border-r-2 border-black">
                  <div className="rounded-full self-center bg-white border-black border-2 h-12 w-12 md:h-16 md:w-16 flex justify-center items-center">
                    <button
                      className="h-7 w-7 md:h-9 md:w-9 focus:outline-none focus:ring-4"
                      onClick={isPlaying ? pause : play}
                      aria-label={
                        isPlaying
                          ? "Pause Live Broadcast"
                          : "Play Live Broadcast"
                      }
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                  </div>
                </div>

                <div
                  className="overflow-hidden h-full z-30 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <Banner color="red">
                    <div className="h-full flex align-middle items-center">
                      <div className="border-black border-l-2 h-full"></div>
                      <BroadcastingIndicator status={data?.status} />
                      <h1 className="font-heading inline text-5xl xl:text-6xl mr-10">
                        {data?.current_track?.title.split(" - ")[1]}
                      </h1>
                      <div className="relative h-full w-36 border-r-2 border-l-2 border-black">
                        <Image
                          src={
                            data.current_track.artwork_url ||
                            "https://oroko.live/oroko-logo-full.jpeg"
                          }
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
              </div>

              <div
                className={cn(
                  "hidden md:block absolute transition-all -translate-x-1/2 -translate-y-1/2 left-1/2 z-10",
                  {
                    "z-10 -bottom-8 group-hover:-bottom-18 delay-200":
                      !dropdownOpen,
                    "z-20 -bottom-18": dropdownOpen,
                  }
                )}
              >
                <DropdownButton
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  dropdownOpen={dropdownOpen}
                />
              </div>

              <div
                className={cn("w-full transition-all", {
                  "h-0 overflow-hidden": !dropdownOpen,
                  "h-auto": dropdownOpen,
                })}
              >
                <PlayerDropdown />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
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
