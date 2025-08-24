"use client";

import { isServer, mobileCheck } from "@/util";
import dynamic from "next/dynamic";
import Button from "./Button";

const ShareMenu = dynamic(() => import("./ShareMenu"));

export default function ShareButton({
  details,
}: {
  details: {
    title: string;
    slug: string;
  };
}) {
  const { title, slug } = details;

  const URL = `https://oroko.live/${slug}`;

  const handleOnClick = async () => {
    const shareData: ShareData = {
      text: title,
      title: "Oroko Radio",
      url: URL,
    };

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isServer) {
    const isMobile = mobileCheck();

    if (isMobile) {
      return (
        <Button onClick={handleOnClick}>
          <span>Share</span>
        </Button>
      );
    }
  }

  return <ShareMenu url={URL} />;
}
