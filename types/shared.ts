import { Document } from "@contentful/rich-text-types";

declare global {
  interface Window {
    CustomSubstackWidget: any;
  }
}

export interface CoverImage {
  sys: { id: string };
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

export interface Links {
  assets: {
    block: Asset[];
  };
  entries: {
    block: Entry[];
  };
}

export interface Content {
  json: Document;
  links?: Links;
}

export type ErrorPayloadMessage = {
  message: string;
  extensions: {
    contentful: {
      code: string;
      requestId: string;
      details: {
        maximumCost: number;
        cost: number;
      };
    };
  };
};

export type ErrorPayload = {
  errors: ErrorPayloadMessage[];
};

export interface ArticleInterface {
  title: string;
  subtitle?: string;
  articleType: "News" | "Blog" | "Event";
  city: CityInterface;
  author?: {
    name: string;
  };
  date: string;
  slug: string;
  coverImage: CoverImage;
  content: Content;
}

export interface ActivationInterface {
  title: string;
  city: CityInterface;
  year: string;
  slug: string;
  coverImage: CoverImage;
  content: Content;
}

export interface CityInterface {
  name: string;
}

export interface Asset {
  sys: { id: string };
  contentType: string;
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

export interface Entry {
  sys: { id: string };
  __typename: string;
  title?: string;
  shareLink?: string;
  imagesCollection?: {
    items: Asset[];
  };
}

export interface ShowInterface {
  mixcloudLink: string;
  title: string;
  date: string;
  slug: string;
  coverImage: CoverImage;
  isFeatured: boolean;
  lead: string;
  artistsCollection: {
    items: ArtistInterface[];
  };
  genresCollection: {
    items: GenreInterface[];
  };
  content: Content;
}

export interface GenreInterface {
  name: string;
  genreCategory: GenreCategoryInterface;
  linkedFrom?: { showCollection: { items: ShowInterface[] | [] } };
}

export interface GenreCategoryInterface {
  name: string;
  linkedFrom?: { genresCollection: { items: GenreInterface[] | [] } };
}

export type ArtistEntry = {
  sys: { id: string };
  name: string;
  slug: string;
  city: {
    name: string;
  };
  photo: CoverImage;
  content?: Content;
  linkedFrom?: { showCollection: { items: ShowInterface[] | [] } };
};

export type AllArtistEntry = {
  name: string;
  slug: string;
  city: {
    name: string;
  };
  isResident: boolean;
  isAlumni: boolean;
  photo: CoverImage;
};

export interface ArtistInterface {
  sys: { id: string };
  name: string;
  slug: string;
  city: {
    name: string;
  };
  photo: CoverImage;
  isResident: boolean;
  content?: Content;
  linkedFrom?: { showCollection: { items: ShowInterface[] | [] } };
}

export interface NextUpSection {
  content: Content;
}

export type HomePageData = {
  featuredShowsCollection: {
    items: Array<ShowPreviewEntry>;
  };
};

type ShowPreviewEntry = {
  coverImage: CoverImage;
  date: string;
  genresCollection: {
    items: GenreInterface[];
  };
  mixcloudLink: string;
  slug: string;
  title: string;
};

export interface LinkInterface {
  name: string;
  url: string;
}

export interface SinglePageData {
  title: string;
  subtitle: string;
  coverImage: CoverImage;
  content: Content;
}

export interface CardProps {
  imageUrl: string;
  objectPosition?: string;
  title: string;
  link: string;
  idx?: number;
  children?: any;
  cardWidth?: "half" | "third" | "quarter" | "featured";
  playButton?: boolean;
  mixcloudLink?: string;
  bgColor?: "gray" | "white";
}

export interface EventInterface {
  id: string;
  stationId: string;
  title: string;
  startDateUtc: string;
  endDateUtc: string;
  description?: JSON;
  duration: number;
  timezone: string;
  color?: string;
  artistIds?: string[];
  isRecurring: boolean;
  media:
    | {
        type: "mix";
        trackId?: string | undefined;
      }
    | {
        type: "playlist";
        playlistId: string;
      }
    | {
        type: "live";
      };
}

export interface MetadataInterface {
  title: string;
  duration: number;
  album: string | undefined;
  artist: string | undefined;
  playoutStartUnixTimestamp: string;
  playoutStartUnixIsoTimestamp: string;
  artwork:
    | {
        original?: string;
        default?: string;
        "32x32"?: string;
        "64x64"?: string;
        "128x128"?: string;
        "256x256"?: string;
        "512x512"?: string;
      }
    | undefined;
}

export interface SuccessfulRadioCultResponse {
  success: true;
  result:
    | {
        status: "schedule";
        content: EventInterface;
        metadata: MetadataInterface;
      }
    | { status: "offAir"; content: "Off Air"; metadata: MetadataInterface }
    | {
        status: "defaultPlaylist";
        content: {
          name: string;
          numberOfSongs: number;
          duration: number;
        };
        metadata: MetadataInterface;
      };
}

export interface UnsuccessfulRadioCultResponse {
  success: false;
  error?: string;
}

export type RadioCultResponse =
  | SuccessfulRadioCultResponse
  | UnsuccessfulRadioCultResponse;

export interface SettingsInterface {
  applicationsOpen: boolean;
}

export interface Product {
  title: string;
  price: number;
  link: string;
  image: CoverImage;
}
