import { useEffect } from "react";
import useScript from "../hooks/useScript";

export default function NewsletterWidget() {
  useScript("https://substackapi.com/widget.js");

  useEffect(() => {
    if (window) {
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
  }, []);

  return <div id="custom-substack-embed" />;
}
