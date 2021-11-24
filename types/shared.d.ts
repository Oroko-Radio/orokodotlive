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
  author?: {
    name: string;
  };
  date: string;
  slug: string;
  coverImage: CoverImage;
  coverImagePosition: CoverImagePosition;
  content: Content;
}
