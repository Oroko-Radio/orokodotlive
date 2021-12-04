import cn from "classnames";
import { useEffect, useRef } from "react";
import usePlayerState from "../hooks/usePlayerState";
import useRadioCo from "../hooks/useRadioCo";
import Pause from "../icons/pause";
import Play from "../icons/play";
import Banner from "./Banner";

const BroadcastingIndicator = ({
  status,
}: {
  status: "online" | "offline" | undefined;
}) => {
  if (status === "online")
    return (
      <div className="flex-grow-0 flex items-center space-x-6">
        <div className="flex-shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-red animate-pulse" />
        <p className="hidden md:block leading-none mt-1">Live</p>
      </div>
    );

  return (
    <div className="flex-grow-0 flex items-center space-x-6">
      <div className="flex-shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white opacity-25" />
      <p className="leading-none mt-1">Offline</p>
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

  const playerWrapperClassNames = cn(
    "bg-black text-white h-12 sm:h-16 px-4 sm:px-8 flex items-center space-x-3 sm:space-x-9",
    {
      "sticky top-0 z-50": isOnline,
    }
  );

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
    <section className={playerWrapperClassNames}>
      <BroadcastingIndicator status={data?.status} />

      {isOnline ? (
        <Banner color="black">{data?.current_track?.title}</Banner>
      ) : null}

      {isOnline && (
        <button
          className="flex-grow-0 h-7 w-7 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
          onClick={isPlaying ? pause : play}
          aria-label={
            isPlaying ? "Pause Live Broadcast" : "Play Live Broadcast"
          }
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      )}

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
