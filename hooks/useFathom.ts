import * as Fathom from "fathom-client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FATHOM_SITE_ID } from "../constants";

export default function useFathom() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    Fathom.load(FATHOM_SITE_ID, {
      includedDomains: ["oroko.live"],
      honorDNT: true,
    });
  }, []);

  useEffect(() => {
    Fathom.trackPageview();
  }, [pathname, searchParams]);
}
