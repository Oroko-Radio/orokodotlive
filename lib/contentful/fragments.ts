export const ArticlePreviewFragment = /* GraphQL */ `
  fragment ArticlePreviewFragment on Article {
    articleType
    author {
      name
    }
    content {
      json
    }
    coverImage {
      sys {
        id
      }
      title
      description
      url
      width
      height
    }
    date
    slug
    title
  }
`;

export const FeaturedArticleFragment = /* GraphQL */ `
  fragment FeaturedArticleFragment on Article {
    articleType
    coverImage {
      sys {
        id
      }
      title
      description
      url
      width
      height
    }
    date
    slug
    subtitle
    title
  }
`;

export const RelatedArticleFragment = /* GraphQL */ `
  fragment RelatedArticleFragment on Article {
    articleType
    coverImage {
      sys {
        id
      }
      title
      description
      url
      width
      height
    }
    date
    slug
    title
  }
`;

export const AllArtistFragment = /* GraphQL */ `
  fragment AllArtistFragment on Artist {
    name
    slug
    isResident: role
    photo {
      sys {
        id
      }
      title
      description
      url
      width
      height
    }
  }
`;
