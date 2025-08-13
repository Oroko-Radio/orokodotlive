import { CollectionConfig } from "payload";

export const GenreCategory: CollectionConfig = {
  slug: "genreCategory",
  admin: {
    useAsTitle: "name",
  },
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
