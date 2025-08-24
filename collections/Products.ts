import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "link",
      label: "Link",
      type: "text",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "upload",
      relationTo: "media",
      // required: true
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
