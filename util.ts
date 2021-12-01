interface CollectionResponse {
  data: {
    [key: string]: {
      items: any[];
    };
  };
}

export const extractCollection = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T[] => fetchResponse?.data?.[key]?.items;

export const extractCollectionItem = <T>(
  fetchResponse: CollectionResponse,
  key: string
): T => fetchResponse?.data?.[key]?.items?.[0];
