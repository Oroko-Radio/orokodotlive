'use client';

import { useEffect } from "react";

export default function NewsletterWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://substackapi.com/widget.js";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    if (window !== undefined) {
      window.CustomSubstackWidget = {
        substackUrl: "orokoradio.substack.com",
        placeholder: "example@gmail.com",
        buttonText: "Subscribe",
        theme: "custom",
        colors: {
          primary: "#FFFFFF",
          input: "#FFFFFF",
          email: "#000000",
          text: "#000000",
        },
      };
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="custom-substack-embed" />;
}
