import useSWR from "swr";
import fetcher from "../lib/fetcher";

type RadioCoResponse = {
  status: "online" | "offline";
  source: {
    type: string;
    collaborator?: any;
    relay?: any;
  };
  collaborators: any[];
  relays: any[];
  current_track: {
    title: string;
    start_time: string;
    artwork_url: string;
    artwork_url_large: string;
  };
  history: { title: string }[];
  logo_url: string;
  streaming_hostname: string;
  outputs: {
    name: string;
    format: string;
    bitrate: number;
  }[];
};

export default function useRadioCo(station_id: string) {
  return useSWR<RadioCoResponse>(
    `https://public.radio.co/stations/${station_id}/status`,
    fetcher,
    {
      refreshInterval: 10 * 60 * 1000,
    }
  );
}
