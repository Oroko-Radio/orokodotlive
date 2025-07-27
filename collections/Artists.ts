import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { SlateToLexicalFeature } from "@payloadcms/richtext-lexical/migrate";
import { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
  slug: "artists",
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
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          SlateToLexicalFeature({}),
        ],
      }),
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
