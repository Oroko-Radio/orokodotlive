import { ShowInterface } from "./types/shared";
import dayjs from "dayjs";
import domtoimage from "dom-to-image";

interface PageResponse {
  data: {
    [key: string]: any;
  };
}

export const extractPage = <T>(fetchResponse: PageResponse, key: string): T =>
  fetchResponse?.data?.[key];

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

export const isServer = typeof window === "undefined";

export function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this);
    }, ms);
  };
}

export const getMeta = async (url: string) => {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
};

export function download(element: HTMLDivElement) {
  domtoimage
    .toJpeg(element, {
      style: {
        transform: "scale(1)",
      },
    })
    .then((dataUrl) => {
      domtoimage
        .toJpeg(element, {
          style: {
            transform: "scale(1)",
          },
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "oroko-thumbnail.jpeg";
          link.href = dataUrl;
          link.click();
        });
    });
}
