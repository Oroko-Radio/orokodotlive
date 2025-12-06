import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
  upload: {
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        crop: "focalPoint",
        formatOptions: {
          format: "webp",
          options: { quality: 80 },
        },
      },
      {
        name: "card",
        width: 800,
        height: 600,
        crop: "focalPoint",
        formatOptions: {
          format: "webp",
          options: { quality: 85 },
        },
      },
      {
        name: "small-full",
        width: 600,
        formatOptions: {
          format: "webp",
          options: { quality: 85 },
        },
      },
      {
        name: "large-full",
        width: 1200,
        formatOptions: {
          format: "webp",
          options: { quality: 90 },
        },
      },
    ],
  },
};
