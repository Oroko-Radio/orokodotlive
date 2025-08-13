import useSWR from "swr";
import { RadioCultResponse } from "../types/shared";

const apiKey = process.env.NEXT_PUBLIC_RADIO_CULT_API_KEY;

async function fetcher(station_id: string) {
  if (!apiKey) {
    throw new Error("API key is missing");
  }
  const headers = { "x-api-key": apiKey as string };

  const liveData = await fetch(
    `https://api.radiocult.fm/api/station/${station_id}/schedule/live`,
    { headers },
  ).then((res) => res.json());

  let artist: string | undefined;

  if (liveData.result.status === "schedule") {
    const artistData = await fetch(
      `https://api.radiocult.fm/api/station/${station_id}/artists/${liveData.result.content.artistIds[0]}`,
      { headers },
    ).then((res) => res.json());

    artist = artistData.artist.name;
  }

  return {
    live: liveData,
    artist: artist || undefined,
  };
}

export default function useRadioCult(station_id: string) {
  return useSWR<{ live: RadioCultResponse; artist?: string }>(
    station_id,
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000,
    },
  );
}
