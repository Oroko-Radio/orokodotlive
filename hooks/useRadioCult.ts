import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { RadioCultResponse } from "../types/shared";

const apiKey = process.env.NEXT_PUBLIC_RADIO_CULT_API_KEY;

export default function useRadioCult(station_id: string) {
  return useSWR<RadioCultResponse>(
    [
      `https://api.radiocult.fm/api/station/${station_id}/schedule/live`,
      apiKey,
    ],
    ([url, apiKey]: [string, string]) => fetcher(url, apiKey),
    {
      refreshInterval: 10 * 60 * 1000,
    }
  );
}
