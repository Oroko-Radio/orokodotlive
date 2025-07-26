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
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "richText",
    },
    {
      name: "contentfulId",
      type: "text",
    },
  ],
};
