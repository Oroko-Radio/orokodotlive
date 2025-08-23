import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  SlateToLexicalFeature,
  defaultSlateConverters,
} from "@payloadcms/richtext-lexical/migrate";
import { CollectionConfig } from "payload";
import { SlateHRConverter } from "./hrConverter";

export const Articles: CollectionConfig = {
  slug: "articles",
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
