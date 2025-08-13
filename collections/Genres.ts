import { CollectionConfig } from "payload";

export const Genres: CollectionConfig = {
  slug: "genres",
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
      name: "genreCategory",
      label: "Genre Category",
      type: "relationship",
      relationTo: "genreCategory",
      hasMany: true,
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
