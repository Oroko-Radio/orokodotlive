import { CollectionConfig } from "payload";

export const Genres: CollectionConfig = {
  slug: "genres",
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
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
