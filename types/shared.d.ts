import { Document } from "@contentful/rich-text-types";

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
  articleType: ArticleType;
  city: CityInterface;
  author?: {
    name: string;
  };
  date: string;
  slug: string;
  coverImage: CoverImage;
  coverImagePosition: CoverImagePosition;
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

export interface Links {
  assets: {
    block: Asset[];
  };
}

export interface Content {
  json: Document;
  links?: Links;
}

export interface ShowInterface {
  mixcloudLink: string;
  title: string;
  date: string;
  slug: string;
  coverImage: CoverImage;
  coverImagePosition: CoverImagePosition;
  isFeatured: boolean;
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
}

export type ArtistEntry = {
  sys: { id: string };
  name: string;
  slug: string;
  city: {
    name: string;
  };
  photo: CoverImage;
  coverImagePosition: CoverImagePosition;
  content?: Content;
  linkedFrom?: { showCollection: { items: ShowInterface[] | [] } };
};

export type AllArtistEntry = {
  name: string;
  slug: string;
  isResident: boolean;
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
  coverImagePosition: CoverImagePosition;
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
