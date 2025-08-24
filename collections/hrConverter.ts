// hrConverter.js
import type { SlateNodeConverter } from "@payloadcms/richtext-lexical";

export const SlateHRConverter: SlateNodeConverter = {
  converter({ slateNode }) {
    if (!slateNode) {
      return {
        type: "horizontalrule",
        version: 1,
      } as const;
    }

    if (typeof slateNode !== "object") {
      return {
        type: "horizontalrule",
        version: 1,
      } as const;
    }

    // Convert the custom hr Slate node to Lexical horizontal rule
    return {
      type: "horizontalrule",
      version: 1,
    } as const;
  },
  nodeTypes: ["hr"], // This matches the custom hr type from the migration
};
