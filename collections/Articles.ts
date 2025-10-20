import { CollectionConfig } from "payload";

export const Articles: CollectionConfig = {
  slug: "articles",
  admin: {
    preview: ({ slug }) => {
      const encodedParams = new URLSearchParams({
        slug: String(slug),
        collection: "articles",
        path: `/news/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || "",
      });

      return `/api/preview?${encodedParams.toString()}`;
    },
    useAsTitle: "title",
    defaultColumns: ["title", "coverImage", "slug", "articleType", "date"],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/news/${data.slug}`,
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
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
      name: "articleType",
      label: "Article Type",
      type: "select",
      options: [
        {
          label: "News",
          value: "News",
        },
        {
          label: "Blog",
          value: "Blog",
        },
        {
          label: "Event",
          value: "Event",
        },
      ],
      required: true,
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "textarea",
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
      // NECESSARY FOR MIGRATION ONLY:
      // editor: lexicalEditor({
      //   features: ({ defaultFeatures }) => [
      //     ...defaultFeatures,
      //     SlateToLexicalFeature({
      //       converters: [...defaultSlateConverters, SlateHRConverter],
      //       disableHooks: true,
      //     }),
      //   ],
      // }),
    },
    {
      name: "city",
      label: "City",
      type: "relationship",
      relationTo: "city",
      required: true,
    },
    {
      name: "isFeatured",
      label: "Is Featured",
      type: "checkbox",
    },
    {
      name: "author",
      label: "Author",
      type: "relationship",
      relationTo: "author",
      required: true,
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
