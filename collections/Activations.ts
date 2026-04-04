import { CollectionConfig } from "payload";
import { lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";

export const Activations: CollectionConfig = {
  slug: "activations",
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    preview: ({ slug }) => {
      const encodedParams = new URLSearchParams({
        slug: String(slug),
        collection: "activations",
        path: `/activations/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || "",
      });

      return `/api/preview?${encodedParams.toString()}`;
    },
    useAsTitle: "title",
    defaultColumns: ["title", "coverImage", "slug", "city", "year"],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/activations/${data.slug}`,
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "relationship",
      relationTo: "city",
      required: true,
    },
    {
      name: "year",
      label: "Year",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "yyyy",
        },
      },
    },
    {
      name: "coverImage",
      label: "Cover Image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [
              {
                slug: "imageGrid",
                labels: {
                  singular: "Image Grid",
                  plural: "Image Grids",
                },
                fields: [
                  {
                    name: "images",
                    label: "Images",
                    type: "array",
                    minRows: 4,
                    maxRows: 6,
                    fields: [
                      {
                        name: "image",
                        label: "Image",
                        type: "upload",
                        relationTo: "media",
                        required: true,
                      },
                    ],
                  },
                ],
              },
            ],
          }),
        ],
      }),
    },
  ],
};
