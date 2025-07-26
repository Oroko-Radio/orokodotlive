import { CollectionConfig } from "payload";

export const City: CollectionConfig = {
  slug: "city",
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
