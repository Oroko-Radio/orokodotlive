import { MutableRefObject, useCallback, useEffect } from "react";
import { newRidgeState } from "react-ridge-state";
import { showKey } from "../lib/mixcloud";

export const livePlayerState = newRidgeState<Boolean | undefined>(undefined);
export const shouldUnloadLivePlayerState = newRidgeState(false);

export default function usePlayerState({
  audioRef,
  sourceRef,
  url,
}: {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  sourceRef: MutableRefObject<HTMLSourceElement | null>;
  url: string;
}) {
  const [isPlaying, setIsPlaying] = livePlayerState.use();
  const [shouldUnloadLivePlayer, shouldUnloadLivePlayerSet] =
    shouldUnloadLivePlayerState.use();
  useEffect(() => {
    const setStatePlaying = () => setIsPlaying(true);
    const setStatePaused = () => setIsPlaying(false);

    audioRef?.current?.addEventListener("play", setStatePlaying);
    audioRef?.current?.addEventListener("pause", setStatePaused);

    return () => {
      audioRef?.current?.removeEventListener("play", setStatePlaying);
      audioRef?.current?.removeEventListener("pause", setStatePaused);
    };
  }, [audioRef]);

  const [, setKey] = showKey.use();
  const unmountMixcloudPlayer = () => setKey(null);

  const play = useCallback(async () => {
    try {
      setIsPlaying(true);

      shouldUnloadLivePlayerSet(false);

      unmountMixcloudPlayer();

      if (!sourceRef?.current?.getAttribute("src")) {
        sourceRef?.current?.setAttribute("src", url);
        audioRef?.current?.load();
      }

      await audioRef?.current?.play();
    } catch (error) {
      setIsPlaying(false);

      console.error(error);
    }
  }, [audioRef]);

  const pause = useCallback(async () => {
    try {
      setIsPlaying(false);

      sourceRef?.current?.setAttribute("src", "");
      audioRef?.current?.pause();
    } catch (error) {
      setIsPlaying(false);

      console.error(error);
    }
  }, [audioRef]);

  useEffect(() => {
    if (shouldUnloadLivePlayer) {
      pause();
    }
  }, [shouldUnloadLivePlayer]);

  return {
    isPlaying,
    play,
    pause,
  };
}
