import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeArticleFields {
  articleType?: EntryFieldTypes.Symbol<"Blog" | "Event" | "News">;
  city?: EntryFieldTypes.EntryLink<TypeCitySkeleton>;
  title?: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  date?: EntryFieldTypes.Date;
  subtitle?: EntryFieldTypes.Symbol;
  content?: EntryFieldTypes.RichText;
  coverImage?: EntryFieldTypes.AssetLink;
  isFeatured?: EntryFieldTypes.Boolean;
  author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

export type TypeArticleSkeleton = EntrySkeletonType<
  TypeArticleFields,
  "article"
>;
export type TypeArticle<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export interface TypeArtistFields {
  name?: EntryFieldTypes.Symbol;
  isResident?: EntryFieldTypes.Boolean;
  city: EntryFieldTypes.EntryLink<TypeCitySkeleton>;
  slug: EntryFieldTypes.Symbol;
  photo?: EntryFieldTypes.AssetLink;
  content?: EntryFieldTypes.RichText;
}

export type TypeArtistSkeleton = EntrySkeletonType<TypeArtistFields, "artist">;
export type TypeArtist<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeArtistSkeleton, Modifiers, Locales>;

export interface TypeAuthorFields {
  name?: EntryFieldTypes.Symbol;
}

export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeAuthor<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;

export interface TypeCityFields {
  name: EntryFieldTypes.Symbol;
}

export type TypeCitySkeleton = EntrySkeletonType<TypeCityFields, "city">;
export type TypeCity<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeCitySkeleton, Modifiers, Locales>;

export interface TypeGenresFields {
  name: EntryFieldTypes.Symbol;
}

export type TypeGenresSkeleton = EntrySkeletonType<TypeGenresFields, "genres">;
export type TypeGenres<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeGenresSkeleton, Modifiers, Locales>;

export interface TypePageFields {
  title?: EntryFieldTypes.Symbol;
  subtitle?: EntryFieldTypes.Symbol;
  coverImage?: EntryFieldTypes.AssetLink;
  content?: EntryFieldTypes.RichText;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypePageSkeleton, Modifiers, Locales>;

export interface TypeShowFields {
  title?: EntryFieldTypes.Symbol;
  date?: EntryFieldTypes.Date;
  slug: EntryFieldTypes.Symbol;
  isFeatured?: EntryFieldTypes.Boolean;
  mixcloudLink?: EntryFieldTypes.Symbol;
  coverImage?: EntryFieldTypes.AssetLink;
  content?: EntryFieldTypes.RichText;
  genres?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeGenresSkeleton>>;
  artists: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArtistSkeleton>>;
}

export type TypeShowSkeleton = EntrySkeletonType<TypeShowFields, "show">;
export type TypeShow<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeShowSkeleton, Modifiers, Locales>;
