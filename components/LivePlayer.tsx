import cn from "classnames";
import { useEffect, useRef } from "react";
import Image from "next/image";
import usePlayerState from "../hooks/usePlayerState";
import useRadioCo from "../hooks/useRadioCo";
import Pause from "../icons/pause";
import Play from "../icons/play";
import Banner from "./Banner";
import Logo from "./Logo";

const BroadcastingIndicator = ({
  status,
}: {
  status: "online" | "offline" | undefined;
}) => {
  if (status === "online")
    return (
      <div className="flex-grow-0 flex items-center space-x-6">
        <div className="flex-shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-red animate-pulse" />
        <Logo color="black" width="10" height="full" />
        <p className="hidden md:block leading-none font-sans mb-0 pr-10">
          Live
        </p>
      </div>
    );

  return (
    <div className="flex-grow-0 flex items-center space-x-6">
      <div className="flex-shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white opacity-25" />
      <p className="leading-none font-sans mb-0">Offline</p>
    </div>
  );
};

export default function LivePlayer() {
  const REFUGE_WORLDWIDE = "s3699c5e49";

  const AUDIO_SRC = `https://streaming.radio.co/${REFUGE_WORLDWIDE}/listen`;

  const { data } = useRadioCo(REFUGE_WORLDWIDE);
  const isOnline = data?.status === "online";

  const player = useRef<HTMLAudioElement>(null);
  const source = useRef<HTMLSourceElement>(null);

  const { isPlaying, play, pause } = usePlayerState({
    audioRef: player,
    sourceRef: source,
    url: AUDIO_SRC,
  });

  useEffect(() => {
    if ("mediaSession" in navigator && data?.current_track) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.current_track.title,
        artist: "Refuge Worldwide",
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
        "text-white h-18 flex items-center border-b border-black overflow-hidden",
        {
          "sticky top-0 z-20": isOnline,
        }
      )}
    >
      {isOnline && (
        <div className="px-4 h-full flex bg-yellow-400 text-black border-r border-black">
          <div className="rounded-full self-center bg-white border-black border h-16 w-16 flex justify-center items-center">
            <button
              className="h-7 w-7 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
              onClick={isPlaying ? pause : play}
              aria-label={
                isPlaying ? "Pause Live Broadcast" : "Play Live Broadcast"
              }
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
          </div>
        </div>
      )}

      {isOnline ? (
        <Banner color="red">
          {[...Array(3)].map((x, idx) => (
            <div className="h-full flex align-middle items-center" key={idx}>
              <BroadcastingIndicator status={data?.status} />
              <h1 className="font-heading inline text-5xl xl:text-6xl ml-3 mr-4">
                {data?.current_track?.title}
              </h1>
              <div className="relative h-full w-36 border-r border-l border-black">
                <Image
                  src={data.current_track.artwork_url}
                  alt={data.current_track.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))}
        </Banner>
      ) : null}

      <audio hidden id="refuge-live-player" preload="none" ref={player}>
        <source ref={source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
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
