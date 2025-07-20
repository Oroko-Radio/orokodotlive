import { Product } from "@/types/shared";
import { graphql } from "@/lib/contentful/index";

const PRODUCTS_GRAPHQL_FIELDS = `
  title
  price
  link
  image {
    sys {
      id
    }
    title
    description
    url
    width
    height
  }
`;

async function fetchProducts(limit = 3, preview = false): Promise<Product[]> {
  const query = `query {
    productCollection(limit: ${limit}, preview: ${preview ? "true" : "false"}) {
      items {
        ${PRODUCTS_GRAPHQL_FIELDS}
      }
    }
  }`;

  const response = await graphql(query, {
    variables: { preview },
    preview,
  });
  return response?.data?.productCollection?.items || [];
}

export async function getProducts(limit = 3, preview = false): Promise<Product[]> {
  return await fetchProducts(limit, preview);
}
