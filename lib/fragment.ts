export const ArticlePreviewFragment = /* GraphQL */ `
  fragment ArticlePreviewFragment on Article {
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
