import { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { SlateToLexicalFeature } from "@payloadcms/richtext-lexical/migrate";

export const Shows: CollectionConfig = {
  slug: "shows",
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          SlateToLexicalFeature({
            converters: ({ defaultConverters }) => [
              ...defaultConverters,
              {
                nodeTypes: ["hr"],
                converter: ({ slateNode }) => {
                  return {
                    type: "hr",
                    version: 1,
                  };
                },
              },
            ],
          }),
        ],
      }),
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
      relationTo: "artists",
      hasMany: true,
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
