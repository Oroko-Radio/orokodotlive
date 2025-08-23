import { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
  slug: "artist-profiles",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "photo", "slug", "city"],
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/artists/${data.slug}`,
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
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "isResident",
      label: "Is Resident",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "isAlumni",
      label: "Is Alumni",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "city",
      label: "City",
      type: "relationship",
      relationTo: "city",
    },
    {
      name: "photo",
      label: "Photo",
      type: "upload",
      relationTo: "media",
      // required: true
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
      name: "contentfulId",
      type: "text",
    },
  ],
};
