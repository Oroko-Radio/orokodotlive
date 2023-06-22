import useSWR from "swr";
import { SearchData } from "../lib/contentful/pages/search";

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((r) => r.json());

export default function useSearchData(
  query: string,
  { fallbackData }: { fallbackData: SearchData }
) {
  return useSWR<SearchData>(`/api/search?query=${query}`, fetcher, {
    fallbackData,
    revalidateOnFocus: false,
  });
}
