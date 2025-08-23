import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  SlateToLexicalFeature,
  defaultSlateConverters,
} from "@payloadcms/richtext-lexical/migrate";
import { CollectionConfig } from "payload";
import { SlateHRConverter } from "./hrConverter";

export const Pages: CollectionConfig = {
  slug: "pages",
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
      name: "subtitle",
      label: "Subtitle",
      type: "text",
    },
    {
      name: "coverImage",
      label: "Cover Image",
      type: "upload",
      relationTo: "media",
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
