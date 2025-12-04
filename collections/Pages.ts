import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  // access: {
  //   read: () => true,
  //   create: ({ req: { user } }) => Boolean(user),
  //   update: ({ req: { user } }) => Boolean(user),
  //   delete: ({ req: { user } }) => Boolean(user),
  // },
  admin: {
    // preview: ({ slug }) => {
    //   const encodedParams = new URLSearchParams({
    //     slug: String(slug),
    //     collection: "pages",
    //     path: `/${slug}`,
    //     previewSecret: process.env.PREVIEW_SECRET || "",
    //   });

    //   return `/api/preview?${encodedParams.toString()}`;
    // },
    useAsTitle: "title",
  },
  // versions: {
  //   drafts: {
  //     autosave: {
  //       interval: 375,
  //     },
  //   },
  // },
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
