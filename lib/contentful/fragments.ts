export const ArticlePreviewFragment = /* GraphQL */ `
  fragment ArticlePreviewFragment on Article {
    articleType
    city {
      name
    }
    author {
      name
    }
    subtitle
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
    city {
      name
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
    city {
      name
    }
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
    isResident
  }
`;

export const ShowPreviewFragment = /* GraphQL */ `
  fragment ShowPreviewFragment on Show {
    title
    slug
    date
    mixcloudLink
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
    genresCollection(limit: 9) {
      items {
        name
      }
    }
    artistsCollection(limit: 5) {
      items {
        name
        city {
          name
        }
      }
    }
  }
`;
