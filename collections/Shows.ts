import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  SlateToLexicalFeature,
  defaultSlateConverters,
} from "@payloadcms/richtext-lexical/migrate";
import { CollectionConfig } from "payload";
import { SlateHRConverter } from "./hrConverter";

export const Shows: CollectionConfig = {
  slug: "shows",
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
