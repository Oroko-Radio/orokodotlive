import useSWR from "swr";
import { RadioCultResponse } from "../types/shared";

const apiKey = process.env.NEXT_PUBLIC_RADIO_CULT_API_KEY;

async function fetcher(
  station_id: string,
): Promise<RadioCultResponse> {
  const r = await fetch(
    `https://api.radiocult.fm/api/station/${station_id}/schedule/live`,
    {  headers: { "x-api-key": apiKey } }
  );

  if (r.ok) {
    return r.json();
  }

  throw new Error(r.status + " " + r.statusText);
}


export default function useRadioCult(station_id: string) {
  return useSWR<RadioCultResponse>(
    station_id,
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000,
    }
  );
}
