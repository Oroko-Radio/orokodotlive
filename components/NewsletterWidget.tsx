"use client";

import { useEffect } from "react";

export default function NewsletterWidget() {
  useEffect(() => {
    // supascribe script
    const script = document.createElement("script");
    script.src =
      "https://js.supascribe.com/v1/loader/eDQZMGLukSfCacLPEr17bbn1D7m2.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        data-supascribe-embed-id="647101469440"
        data-supascribe-subscribe
      ></div>
    </>
  );
}
