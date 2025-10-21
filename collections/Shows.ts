import { CollectionConfig } from "payload";

export const Shows: CollectionConfig = {
  slug: "shows",
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
        collection: "shows",
        path: `/radio/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || "",
      });

      return `/api/preview?${encodedParams.toString()}`;
    },
    useAsTitle: "title",
    defaultColumns: ["title", "artists", "coverImage", "slug", "date"],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/radio/${data.slug}`,
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
      name: "date",
      label: "Date",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        components: {
          Field: "/components/UTCDateTime",
        },
      },
      timezone: true,
      required: true,
    },
    {
      name: "isFeatured",
      label: "Is Featured",
      type: "checkbox",
    },
    {
      name: "lead",
      label: "Lead",
      type: "textarea",
    },
    {
      name: "mixcloudLink",
      label: "Mixcloud Link",
      type: "text",
    },
    {
      name: "coverImage",
      label: "Cover Image",
      type: "upload",
      relationTo: "media",
      // required: true,
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
      name: "genres",
      label: "Genres",
      type: "relationship",
      relationTo: "genres",
      hasMany: true,
    },
    {
      name: "artists",
      label: "Artists",
      type: "relationship",
      relationTo: "artist-profiles",
      hasMany: true,
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
