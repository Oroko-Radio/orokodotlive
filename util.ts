import { ShowInterface } from "./types/shared";
import dayjs from "dayjs";

interface CollectionResponse {
  data: {
    [key: string]: {
      items: any[];
    };
  };
}

export const extractCollection = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T[] => fetchResponse?.data?.[key]?.items;

export const extractCollectionItem = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T => fetchResponse?.data?.[key]?.items?.[0];

export const sort = {
  alpha: (a: string, b: string) =>
    a.localeCompare(b, "en", { sensitivity: "base" }),
  date_DESC: (a: ShowInterface, b: ShowInterface) =>
    dayjs(a.date).isAfter(b.date) ? -1 : 1,
  date_ASC: (a: ShowInterface, b: ShowInterface) =>
    dayjs(a.date).isBefore(b.date) ? -1 : 1,
};

export const uniq = <T>(arr: T[]) => Array.from(new Set(arr));

export const getMixcloudKey = (url: string) =>
  url.replace("https://www.mixcloud.com", "");
