import { CollectionConfig } from "payload";

export const GenreCategory: CollectionConfig = {
  slug: "genreCategory",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
