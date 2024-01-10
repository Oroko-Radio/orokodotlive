import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((r) => r.json());

export default function useSearchData(query: string, { fallbackData }) {
  return useSWR(`/api/search?query=${query}`, fetcher, {
    fallbackData,
    revalidateOnFocus: false,
  });
}
