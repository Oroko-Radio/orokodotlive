"use client";

import React from "react";
import { DateTimeField, useDocumentInfo } from "@payloadcms/ui";
import type { DateFieldClientComponent } from "payload";

const CustomDateFieldClient: DateFieldClientComponent = (props) => {
  const docInfo = useDocumentInfo();
  docInfo.initialData;
  return (
    <div>
      <DateTimeField {...props} />
      <p style={{ margin: "6px 0 20px 0" }}>
        ACTUAL STORED GHANA TIME:{" "}
        {new Date(
          JSON.stringify(docInfo.initialData?.date).slice(1, -1),
        ).toUTCString()}
      </p>
    </div>
  );
};
export default CustomDateFieldClient;
