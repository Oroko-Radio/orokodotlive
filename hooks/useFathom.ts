import * as Fathom from "fathom-client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FATHOM_SITE_ID } from "../constants";

export default function useFathom() {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(FATHOM_SITE_ID, {
      includedDomains: ["oroko.live"],
      honorDNT: true,
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);
}
