import type * as CFRichTextTypes from "@contentful/rich-text-types";
import type * as Contentful from "contentful";

export interface TypeArticleFields {
  contentTypeId: "Article";
  fields: {
    internal?: Contentful.EntryFields.Symbol;
    coverImage: Contentful.Asset;
    title: Contentful.EntryFields.Symbol;
    subtitle?: Contentful.EntryFields.Symbol;
    author: Contentful.Entry<TypeAuthorFields>;
    articleType?: "Blog" | "News" | "Event";
    slug: Contentful.EntryFields.Symbol;
    isFeatured?: Contentful.EntryFields.Boolean;
    date: Contentful.EntryFields.Date;
    content: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  };
}

export type TypeArticle = Contentful.Entry<TypeArticleFields>;

export interface TypeArtistFields {
  contentTypeId: "Artist";
  fields: {
    internal?: Contentful.EntryFields.Symbol;
    name: Contentful.EntryFields.Symbol;
    isResident: Contentful.EntryFields.Boolean;
    slug: Contentful.EntryFields.Symbol;
    photo: Contentful.Asset;
    content?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  };
}

export type TypeArtist = Contentful.Entry<TypeArtistFields>;

export interface TypeAuthorFields {
  contentTypeId: "Author";
  fields: {
    internal: Contentful.EntryFields.Symbol;
    name: Contentful.EntryFields.Symbol;
  };
}

export type TypeAuthor = Contentful.Entry<TypeAuthorFields>;

export interface TypeShowFields {
  contentTypeId: "Show";
  fields: {
    internal?: Contentful.EntryFields.Symbol;
    mixcloudLink?: Contentful.EntryFields.Symbol;
    coverImage: Contentful.Asset;
    title: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    isFeatured?: Contentful.EntryFields.Boolean;
    date: Contentful.EntryFields.Date;
    artists: Contentful.Entry<TypeArtistFields>[];
    genres: Contentful.Entry<TypeGenreFields>[];
    content?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
  };
}

export type TypeShow = Contentful.Entry<TypeShowFields>;

export interface TypeGenreFields {
  contentTypeId: "Genre";
  fields: {
    name: Contentful.EntryFields.Symbol;
    slug?: Contentful.EntryFields.Symbol;
  };
}

export type TypeGenre = Contentful.Entry<TypeGenreFields>;
