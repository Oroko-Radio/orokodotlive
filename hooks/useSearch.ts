import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((r) => r.json());

export default function useSearchData(
  query: string,
  { fallbackData }: { fallbackData: any },
) {
  return useSWR(`/api/search?query=${query}`, fetcher, {
    fallbackData,
    revalidateOnFocus: false,
  });
}
