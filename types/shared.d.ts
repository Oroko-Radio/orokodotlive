import { Document } from "@contentful/rich-text-types";

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
  city?: string;
  author?: {
    name: string;
  };
  date: string;
  slug: string;
  coverImage: CoverImage;
  coverImagePosition: CoverImagePosition;
  content: Content;
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

export type ArtistEntry = {
  sys: { id: string };
  name: string;
  slug: string;
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

export interface NextUpSection {
  content: Content;
}

export type HomePageData = {
  featuredShowsCollection: {
    items: Array<ShowPreviewEntry>;
  };
};
