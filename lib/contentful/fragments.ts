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

export const ActivationPreviewFragment = /* GraphQL */ `
  fragment ActivationPreviewFragment on Activation {
    city {
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
    year
    slug
    title
  }
`;

export const RelatedActivationFragment = /* GraphQL */ `
  fragment RelatedActivationFragment on Activation {
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
    year
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
    isAlumni
  }
`;

export const ShowPreviewFragment = /* GraphQL */ `
  fragment ShowPreviewFragment on Show {
    title
    slug
    date
    isFeatured
    lead
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
        genreCategory {
          name
        }
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
